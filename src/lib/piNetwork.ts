import { supabase } from "@/integrations/supabase/client";

// Initialize Pi SDK
declare global {
  interface Window {
    Pi: any;
  }
}

export const initPiSDK = () => {
  if (typeof window !== 'undefined' && window.Pi) {
    window.Pi.init({ version: "2.0", sandbox: false });
  }
};

// Handle incomplete payments
const onIncompletePaymentFound = (payment: any) => {
  console.log("Incomplete payment found:", payment.identifier);
};

// Sign in with Pi Network
export const signInWithPi = async () => {
  try {
    if (!window.Pi) {
      throw new Error("Pi SDK not loaded");
    }

    const scopes = ["username", "payments"];
    const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);

    console.log("Pi authentication successful");

    // Call our Edge Function to verify and create/login user
    const { data, error } = await supabase.functions.invoke('pi-signin', {
      body: { authResult }
    });

    if (error) throw error;

    if (data.success) {
      // Sign in to Supabase using the session
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: `${data.user.username}@pi.network`,
        password: data.session.hashed_token || ''
      });

      if (signInError) {
        console.error("Supabase sign in error:", signInError);
      }

      return { success: true, user: data.user };
    }

    return { success: false, message: data.message };
  } catch (error) {
    console.error("Pi sign in error:", error);
    throw error;
  }
};

// Create a Pi payment
export const createPiPayment = async (
  amount: number,
  memo: string,
  metadata: any = {}
) => {
  try {
    if (!window.Pi) {
      throw new Error("Pi SDK not loaded");
    }

    // Get current user profile
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!profile) throw new Error("Profile not found");

    // Create payment in our database
    const { data, error } = await supabase.functions.invoke('pi-create-payment', {
      body: {
        amount,
        memo,
        metadata,
        profileId: profile.id,
        policyId: metadata.policyId || null
      }
    });

    if (error) throw error;

    if (!data.success) {
      throw new Error(data.message);
    }

    // Start Pi payment flow
    const paymentResult = await window.Pi.createPayment(data.payment, {
      onReadyForServerApproval: async (paymentId: string) => {
        console.log("Ready for server approval:", paymentId);
        await supabase.functions.invoke('pi-payment-callback/approve', {
          body: { paymentId: data.payment.metadata.paymentId, txid: null }
        });
      },
      onReadyForServerCompletion: async (paymentId: string, txid: string) => {
        console.log("Ready for server completion:", paymentId, txid);
        await supabase.functions.invoke('pi-payment-callback/complete', {
          body: { paymentId: data.payment.metadata.paymentId, txid }
        });
      },
      onCancel: async (paymentId: string) => {
        console.log("Payment cancelled:", paymentId);
        await supabase.functions.invoke('pi-payment-callback/cancel', {
          body: { paymentId: data.payment.metadata.paymentId, txid: null }
        });
      },
      onError: (error: any, payment: any) => {
        console.error("Payment error:", error, payment);
      },
      onIncompletePaymentFound
    });

    return { success: true, payment: paymentResult };
  } catch (error) {
    console.error("Create Pi payment error:", error);
    throw error;
  }
};
