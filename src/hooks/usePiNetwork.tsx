import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initPiSDK, signInWithPi, createPiPayment } from '@/lib/piNetwork';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PiNetworkContextType {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  makePayment: (amount: number, memo: string, metadata?: any) => Promise<void>;
}

const PiNetworkContext = createContext<PiNetworkContextType | undefined>(undefined);

export function PiNetworkProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize Pi SDK
    initPiSDK();
    setIsInitialized(true);

    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        setUser(profile);
      }
      setLoading(false);
    };

    checkAuth();

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setIsAuthenticated(true);
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', session.user.id)
            .maybeSingle();
          setUser(profile);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPi();
      if (result.success) {
        toast({
          title: "Welcome!",
          description: `Signed in as @${result.user.username}`,
        });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign In Failed",
        description: error instanceof Error ? error.message : "Failed to sign in with Pi Network",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed Out",
        description: "You have been signed out successfully",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const makePayment = async (amount: number, memo: string, metadata: any = {}) => {
    try {
      setLoading(true);
      await createPiPayment(amount, memo, metadata);
      toast({
        title: "Payment Processing",
        description: "Your Pi payment is being processed",
      });
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PiNetworkContext.Provider
      value={{
        isInitialized,
        isAuthenticated,
        user,
        loading,
        signIn,
        signOut,
        makePayment,
      }}
    >
      {children}
    </PiNetworkContext.Provider>
  );
}

export function usePiNetwork() {
  const context = useContext(PiNetworkContext);
  if (context === undefined) {
    throw new Error('usePiNetwork must be used within a PiNetworkProvider');
  }
  return context;
}
