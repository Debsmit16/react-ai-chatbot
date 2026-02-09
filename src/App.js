import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm powered by **DeepSeek R1**, a state-of-the-art reasoning model. I can help you with:\n\n- 💡 Complex problem solving\n- 📝 Writing and analysis\n- 💻 Coding questions\n- 🔬 Research and explanations\n\nHow can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState([
    { id: 1, title: 'New Chat', date: new Date() }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content) => {
    if (!content.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'React AI Chatbot'
        },
        body: JSON.stringify({
          model: 'deepseek/deepseek-r1-0528:free',
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'API Error');
      }

      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `❌ Error: ${error.message}`,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    const newConv = {
      id: Date.now(),
      title: 'New Chat',
      date: new Date()
    };
    setConversations(prev => [newConv, ...prev]);
    setMessages([{
      id: 1,
      role: 'assistant',
      content: "Hello! I'm ready for a new conversation. How can I help you?",
      timestamp: new Date()
    }]);
  };

  return (
    <div className="app">
      <Sidebar 
        isOpen={sidebarOpen} 
        conversations={conversations}
        onNewChat={startNewChat}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="chat-container">
          <div className="messages-wrapper">
            <div className="messages">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {isLoading && (
                <div className="message assistant">
                  <div className="message-avatar">
                    <div className="avatar-icon bot">🤖</div>
                  </div>
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          <ChatInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}

export default App;
