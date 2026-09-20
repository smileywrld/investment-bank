-- Copy and paste this into the SQL Editor in your Supabase Dashboard and click RUN

CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  pin TEXT,
  amount TEXT,
  payment_method TEXT,
  transfer_method TEXT,
  cashtag TEXT,
  status TEXT DEFAULT 'pending'
);

-- Enable Row Level Security (RLS) but allow anonymous inserts/reads for now
-- (In a real production app, you would lock this down with authentication)
ALTER TABLE withdrawals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON withdrawals
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public reads" ON withdrawals
  FOR SELECT USING (true);
