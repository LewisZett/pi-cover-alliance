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
    const { authResult } = await req.json();
    const accessToken = authResult.accessToken;
    const PI_API_KEY = Deno.env.get('PI_API_KEY');

    if (!PI_API_KEY) {
      throw new Error('PI_API_KEY is not configured');
    }

    console.log('Verifying Pi Network token...');

    // Verify with Pi Network API
    const piResponse = await fetch('https://api.minepi.com/v2/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'pi-api-key': PI_API_KEY
      }
    });

    if (!piResponse.ok) {
      console.error('Pi API error:', await piResponse.text());
      throw new Error('Invalid Pi Network token');
    }

    const piUserData = await piResponse.json();
    console.log('Pi user authenticated:', piUserData.username);

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if user exists or create new auth user
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('pi_uid', piUserData.uid)
      .maybeSingle();

    let userId;
    
    if (existingProfile) {
      userId = existingProfile.user_id;
      console.log('Existing user found:', userId);
    } else {
      // Create new auth user
      const { data: newUser, error: authError } = await supabase.auth.admin.createUser({
        email: `${piUserData.username}@pi.network`,
        email_confirm: true,
        user_metadata: {
          pi_username: piUserData.username,
          pi_uid: piUserData.uid
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }

      userId = newUser.user.id;
      console.log('New user created:', userId);

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: userId,
          pi_username: piUserData.username,
          pi_uid: piUserData.uid,
          display_name: piUserData.username
        });

      if (profileError) {
        console.error('Profile error:', profileError);
        throw profileError;
      }
    }

    // Generate session token
    const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: `${piUserData.username}@pi.network`,
    });

    if (sessionError) {
      console.error('Session error:', sessionError);
      throw sessionError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: piUserData,
        session: sessionData
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in pi-signin:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
