import React from 'react';
import './Header.css';

function Header({ onToggleSidebar }) {
  return (
    <header className="header">
      <button className="menu-btn" onClick={onToggleSidebar}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      
      <div className="header-title">
        <h1>DeepSeek R1</h1>
        <span className="header-subtitle">Reasoning Model</span>
      </div>
      
      <div className="header-status">
        <span className="status-dot"></span>
        Online
      </div>
    </header>
  );
}

export default Header;
