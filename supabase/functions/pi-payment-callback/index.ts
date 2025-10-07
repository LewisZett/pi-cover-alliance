import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const type = url.pathname.split('/').pop(); // approve, complete, or cancel
    const { paymentId, txid } = await req.json();

    console.log(`Payment callback: ${type}`, { paymentId, txid });

    if (!['approve', 'complete', 'cancel'].includes(type || '')) {
      throw new Error('Invalid callback type');
    }

    // Create Supabase admin client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Update payment status
    const updateData: any = {};
    
    if (type === 'approve') {
      updateData.status = 'approved';
      updateData.pi_payment_id = paymentId;
    } else if (type === 'complete') {
      updateData.status = 'completed';
      updateData.pi_payment_id = paymentId;
      updateData.tx_id = txid;
    } else if (type === 'cancel') {
      updateData.status = 'cancelled';
    }

    const { data: payment, error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('id', paymentId)
      .select()
      .single();

    if (error) {
      console.error('Payment update error:', error);
      throw error;
    }

    console.log('Payment updated:', payment);

    return new Response(
      JSON.stringify({ success: true, message: `Payment ${type}d successfully` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in pi-payment-callback:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
