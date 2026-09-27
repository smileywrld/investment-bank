import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useStepper } from '../context/StepperContext';

const getSessionId = () => localStorage.getItem('chat_session_id');
const setSessionId = (id) => localStorage.setItem('chat_session_id', id);

export const LiveChat = ({ isOpen, onToggle }) => {
  const stepperContext = useStepper();
  const stepperData = stepperContext?.data || {};

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionIdState] = useState(getSessionId);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const getUserDetails = (sid = sessionId) => {
    const email = localStorage.getItem('userEmail') || stepperData.email || null;
    const fullName = localStorage.getItem('userFullName') || stepperData.fullName || null;
    const fallbackId = sid ? sid.slice(0, 5).toUpperCase() : Math.floor(1000 + Math.random() * 9000);
    const name = fullName || email || `Client #${fallbackId}`;
    return { email, fullName, name };
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Load existing messages if session exists
  useEffect(() => {
    if (!sessionId) return;

    const loadMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (data) setMessages(data);
    };

    loadMessages();
  }, [sessionId]);

  // Dynamically sync updated email or name to Supabase whenever user inputs them
  useEffect(() => {
    if (!sessionId) return;
    const email = localStorage.getItem('userEmail') || stepperData.email || null;
    const fullName = localStorage.getItem('userFullName') || stepperData.fullName || null;
    const name = fullName || email;

    if (name || email) {
      supabase
        .from('chat_sessions')
        .update({
          ...(email ? { user_email: email } : {}),
          ...(name ? { user_name: name } : {}),
        })
        .eq('id', sessionId)
        .then();
    }
  }, [sessionId, stepperData.email, stepperData.fullName]);

  // Subscribe to new messages via Realtime
  useEffect(() => {
    if (!sessionId) return;

    const channel = supabase
      .channel(`chat-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some((m) => m.id === payload.new.id)) return prev;
            return [...prev, payload.new];
          });
          // If message is from admin and chat is closed, show indicator
          if (payload.new.sender === 'admin' && !isOpen) {
            setHasNewMessage(true);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId, isOpen]);

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const createSession = async () => {
    const { email, name } = getUserDetails();
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        user_email: email,
        user_name: name,
        status: 'active',
      })
      .select()
      .single();

    if (error) {
      console.error('Failed to create chat session:', error);
      return null;
    }

    setSessionId(data.id);
    setSessionIdState(data.id);
    return data.id;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setSending(true);

    try {
      let currentSessionId = sessionId;
      if (!currentSessionId) {
        currentSessionId = await createSession();
        if (!currentSessionId) {
          setSending(false);
          return;
        }
      }

      // Optimistic UI update
      const optimisticMsg = {
        id: `temp-${Date.now()}`,
        session_id: currentSessionId,
        sender: 'user',
        content: text,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimisticMsg]);
      setInput('');

      const { error } = await supabase.from('chat_messages').insert({
        session_id: currentSessionId,
        sender: 'user',
        content: text,
      });

      if (error) {
        console.error('Failed to send message:', error);
        // Remove optimistic message on error
        setMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id));
        setInput(text);
      }

      // Update session last_message_at & user details
      const { email, name } = getUserDetails(currentSessionId);
      await supabase
        .from('chat_sessions')
        .update({
          last_message_at: new Date().toISOString(),
          ...(email ? { user_email: email } : {}),
          ...(name ? { user_name: name } : {}),
        })
        .eq('id', currentSessionId);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="livechat-panel">
          <div className="livechat-header">
            <div className="livechat-header-info">
              <div className="livechat-avatar">♔</div>
              <div>
                <div className="livechat-title">Customer Support</div>
                <div className="livechat-status">
                  <span className="livechat-status-dot"></span>
                  We typically reply instantly
                </div>
              </div>
            </div>
            <button
              className="livechat-close"
              onClick={onToggle}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="livechat-messages">
            {messages.length === 0 && (
              <div className="livechat-empty">
                <div className="livechat-empty-icon">💬</div>
                <p>Welcome! How can we help you today?</p>
                <p className="livechat-empty-sub">
                  Send us a message and we'll respond as soon as possible.
                </p>
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`livechat-msg ${msg.sender === 'user' ? 'livechat-msg-user' : 'livechat-msg-admin'}`}
              >
                <div className="livechat-msg-bubble">
                  {msg.content}
                </div>
                <div className="livechat-msg-time">
                  {msg.sender === 'admin' && <span className="livechat-msg-label">Support · </span>}
                  {formatTime(msg.created_at)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="livechat-input-area" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              type="text"
              className="livechat-input"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={sending}
              maxLength={1000}
            />
            <button
              type="submit"
              className="livechat-send"
              disabled={!input.trim() || sending}
              aria-label="Send message"
            >
              ➤
            </button>
          </form>
        </div>
      )}

      {/* Notification dot on external .chat buttons */}
      {hasNewMessage && !isOpen && <div className="livechat-notif-dot" />}

      <style>{`
        .livechat-panel {
          position: fixed;
          bottom: 86px;
          left: 18px;
          width: 370px;
          max-width: calc(100vw - 36px);
          height: 520px;
          max-height: calc(100vh - 120px);
          background: linear-gradient(165deg, #0a1628, #060e1f);
          border: 1px solid rgba(229, 184, 47, 0.25);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(229, 184, 47, 0.08);
          display: flex;
          flex-direction: column;
          z-index: 100000;
          overflow: hidden;
          animation: livechat-slide-up 0.25s ease-out;
        }

        @keyframes livechat-slide-up {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .livechat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 18px;
          background: linear-gradient(135deg, rgba(229, 184, 47, 0.12), rgba(142, 23, 68, 0.12));
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          flex-shrink: 0;
        }

        .livechat-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .livechat-avatar {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ffe167, #d29d15);
          color: #0d121c;
          display: grid;
          place-items: center;
          font-size: 18px;
          font-weight: 800;
          box-shadow: 0 0 14px rgba(229, 184, 47, 0.35);
        }

        .livechat-title {
          font-size: 14px;
          font-weight: 700;
          color: #f0f4fc;
        }

        .livechat-status {
          font-size: 11px;
          color: #8899b5;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .livechat-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          display: inline-block;
          box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
        }

        .livechat-close {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.06);
          color: #8899b5;
          font-size: 14px;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: all 0.2s;
        }

        .livechat-close:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
        }

        .livechat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          scroll-behavior: smooth;
        }

        .livechat-messages::-webkit-scrollbar {
          width: 5px;
        }
        .livechat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .livechat-messages::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .livechat-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #8899b5;
          gap: 6px;
          padding: 20px;
        }

        .livechat-empty-icon {
          font-size: 40px;
          margin-bottom: 8px;
        }

        .livechat-empty p {
          margin: 0;
          font-size: 14px;
          color: #c0cadb;
        }

        .livechat-empty-sub {
          font-size: 12px !important;
          color: #6b7a94 !important;
          margin-top: 4px !important;
        }

        .livechat-msg {
          display: flex;
          flex-direction: column;
          max-width: 82%;
        }

        .livechat-msg-user {
          align-self: flex-end;
          align-items: flex-end;
        }

        .livechat-msg-admin {
          align-self: flex-start;
          align-items: flex-start;
        }

        .livechat-msg-bubble {
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 13.5px;
          line-height: 1.45;
          word-wrap: break-word;
          white-space: pre-wrap;
        }

        .livechat-msg-user .livechat-msg-bubble {
          background: linear-gradient(135deg, #a11943, #7a2040);
          color: #fff;
          border-bottom-right-radius: 5px;
        }

        .livechat-msg-admin .livechat-msg-bubble {
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #e4eaf5;
          border-bottom-left-radius: 5px;
        }

        .livechat-msg-time {
          font-size: 10px;
          color: #5d6d87;
          margin-top: 3px;
          padding: 0 4px;
        }

        .livechat-msg-label {
          color: #d4a520;
        }

        .livechat-input-area {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(0, 0, 0, 0.2);
          flex-shrink: 0;
        }

        .livechat-input {
          flex: 1;
          height: 40px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: #f0f4fc;
          font-size: 13px;
          padding: 0 14px;
          outline: none;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .livechat-input:focus {
          border-color: rgba(229, 184, 47, 0.4);
        }

        .livechat-input::placeholder {
          color: #4d5b72;
        }

        .livechat-send {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #f7d558, #c99313);
          color: #0b111e;
          font-size: 16px;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .livechat-send:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }

        .livechat-send:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none;
        }

        .livechat-notif-dot {
          position: fixed;
          left: 60px;
          bottom: 58px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ef4444;
          border: 2px solid #020716;
          z-index: 100001;
          animation: livechat-pulse 1.5s infinite;
          pointer-events: none;
        }

        @keyframes livechat-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        @media (max-width: 480px) {
          .livechat-panel {
            left: 8px;
            right: 8px;
            bottom: 80px;
            width: auto;
            max-width: none;
            height: 440px;
          }
        }
      `}</style>
    </>
  );
};
