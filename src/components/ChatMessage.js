import React from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatMessage.css';

function ChatMessage({ message }) {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message ${message.role} ${message.isError ? 'error' : ''}`}>
      <div className="message-avatar">
        <div className={`avatar-icon ${message.role === 'user' ? 'user' : 'bot'}`}>
          {message.role === 'user' ? '👤' : '🤖'}
        </div>
      </div>
      <div className="message-bubble">
        <div className="message-content">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        <div className="message-timestamp">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
