import React from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, conversations, onNewChat, onToggle }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onToggle}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🤖</span>
            <span className="logo-text">DeepSeek Chat</span>
          </div>
        </div>
        
        <button className="new-chat-btn" onClick={onNewChat}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          New Chat
        </button>
        
        <div className="conversations-list">
          <div className="conversations-header">Recent Chats</div>
          {conversations.map(conv => (
            <div key={conv.id} className="conversation-item active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span className="conversation-title">{conv.title}</span>
            </div>
          ))}
        </div>
        
        <div className="sidebar-footer">
          <div className="model-info">
            <div className="model-badge">FREE</div>
            <div className="model-details">
              <span className="model-name">DeepSeek R1</span>
              <span className="model-context">163K context</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
