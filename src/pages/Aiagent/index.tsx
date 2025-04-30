import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './ChatApp.css';

// Define types for our chat messages
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to the bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    // Adjust textarea height back to default
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: `${input}`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Auto-resize textarea based on content
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    // Auto adjust height
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`; // Limit height to 120px
  };

  return (
    <div className="chat-container">

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message-row ${message.sender === 'user' ? 'user-message-row' : 'bot-message-row'}`}
            >
              {message.sender === 'bot' && (
                <div className="message-avatar">
                  <span role="img" aria-label="donut">🤖</span>
                </div>
              )}

              <div className={`message-bubble ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                <div className="message-text">{message.text}</div>
                <div className="message-timestamp">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>

              {message.sender === 'user' && (
                <div className="message-avatar">
                  <span role="img" aria-label="donut">👤</span>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="chat-input"
          rows={3}
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatApp;
