import { useChat } from '@ai-sdk/react';
import { ConnectKitButton } from 'connectkit';
import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { useAccount } from 'wagmi';

import './ChatApp.css';

('use client');

const ChatApp: React.FC = () => {
  const { address } = useAccount();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: process.env.NEXT_PUBLIC_AGENT_URL ?? '',
    body: {
      address: address ?? '0x0000000000000000000000000000000000000000',
    },
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to the bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  // Auto-resize textarea based on content
  const handleTextareaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);

    // Auto adjust height
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`; // Limit height to 120px
  };

  return (
    <div className="chat-container-full">
      <div className="chat-header flex justify-end items-center px-4 py-3 border-b bg-white rounded-t-lg">
        <ConnectKitButton />
      </div>
      <div className="chat-container flex-1 flex flex-col">
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <p>No messages yet. Start a conversation!</p>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`message-row ${
                  message.role === 'user' ? 'user-message-row' : 'bot-message-row'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="message-avatar">
                    <span role="img" aria-label="donut">
                      🤖
                    </span>
                  </div>
                )}

                <div
                  className={`message-bubble ${
                    message.role === 'user' ? 'user-message' : 'bot-message'
                  }`}
                >
                  <div className="message-text">
                    {message.role === 'assistant' ? (
                      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}>
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      message.content
                    )}
                  </div>
                  <div className="message-timestamp">
                    {new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="message-avatar">
                    <span role="img" aria-label="donut">
                      👤
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
          {isLoading && (
            <div className="typing-indicator">
              <span className="message-avatar">
                <span role="img" aria-label="donut">
                  🤖
                </span>
              </span>
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          )}
        </div>

        <form className="chat-input-form" onSubmit={handleSubmit}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaResize}
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
    </div>
  );
};

export default ChatApp;
