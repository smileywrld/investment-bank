-- Copy and paste this into the SQL Editor in your Supabase Dashboard and click RUN
-- This creates the tables needed for the custom live chat feature

-- Chat sessions: one per user conversation
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_email TEXT,
  user_name TEXT DEFAULT 'Visitor',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat messages: each message in a session
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sender TEXT NOT NULL CHECK (sender IN ('user', 'admin')),
  content TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS policies (public access, matching existing pattern)
CREATE POLICY "Allow public insert sessions" ON chat_sessions
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read sessions" ON chat_sessions
  FOR SELECT USING (true);
CREATE POLICY "Allow public update sessions" ON chat_sessions
  FOR UPDATE USING (true);

CREATE POLICY "Allow public insert messages" ON chat_messages
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read messages" ON chat_messages
  FOR SELECT USING (true);

-- Enable Realtime on both tables
ALTER PUBLICATION supabase_realtime ADD TABLE chat_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;

-- Index for fast message lookups by session
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_chat_sessions_status ON chat_sessions(status);
