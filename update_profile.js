const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateProfile() {
  console.log('Fetching current profile...');
  const { data: profile, error: fetchError } = await supabase
    .from('profile')
    .select('*')
    .limit(1)
    .single();

  if (fetchError) {
    console.error('Error fetching profile:', fetchError);
    return;
  }

  if (!profile) {
    console.error('No profile found to update.');
    return;
  }

  console.log('Current profile:', profile.name);
  console.log('Updating experience_years to 3 and location to "Yogyakarta, Indonesia"...');

  const { error: updateError } = await supabase
    .from('profile')
    .update({
      experience_years: 3,
      location: 'Yogyakarta, Indonesia'
    })
    .eq('id', profile.id);

  if (updateError) {
    console.error('Error updating profile:', updateError);
  } else {
    console.log('Profile successfully updated!');
  }
}

updateProfile();
