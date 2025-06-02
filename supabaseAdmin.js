import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://rfzkmhpzadkmvrbjpykh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmemttaHB6YWRrbXZyYmpweWtoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODgwMzgzMCwiZXhwIjoyMDY0Mzc5ODMwfQ.Xe6los3KswZ3GhZAX1t8qjonkq9_OeSCCMUqyQcqay0" 
);

const { data, error } = await supabase.auth.admin.createUser({
  email: 'palashdhavle15@gmail.com',
  password: '123456',
  email_confirm: true,  
  user_metadata: {
    name: 'Palash Test'
  },
  role: 'super_admin'
});

if (error) {
  console.error('Error creating user:', error);
} else {
  console.log('User created:', data);
}
