import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function AICareAssistant() {
  const { chatHistory, setChatHistory, currentElder } = useApp();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [chatHistory]);

  const aiResponses = [
    `Based on ${currentElder.name}'s recent patterns, I recommend focusing on hydration today. She seems to have lower water intake in the afternoons.`,
    `I notice you haven't logged exercise for ${currentElder.name} in the last 2 days. Light stretching or a short walk (5-10 minutes) can improve circulation and mood significantly.`,
    `Great question! For managing ${currentElder.conditions?.[0] || 'her condition'}, consistency in medication timing is key. Try setting alarms for each dose.`,
    `${currentElder.name}'s mood logs show she's most cheerful in the mornings. Schedule social activities or calls with family during that time for best engagement.`,
    `Here are some meal suggestions rich in nutrients for ${currentElder.name}: oatmeal with berries for breakfast, grilled fish with steamed vegetables for lunch, and a light soup for dinner.`,
    `Remember to take breaks yourself! Caregiver burnout is real. I recommend the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds.`
  ];

  const suggestedQuestions = [
    'What exercises are safe for her?',
    'Meal plan for this week?',
    'Tips for better sleep routine',
    'How to manage sundowning?'
  ];

  const sendMessage = (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;

    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setChatHistory(prev => [...prev, { role: 'ai', content: response }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full p-4 md:p-8 flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-outline-variant/20">
        <div className="w-12 h-12 bg-primary-container rounded-2xl flex items-center justify-center shadow-sm">
          <span className="material-symbols-outlined text-on-primary-container text-2xl">smart_toy</span>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-black text-on-surface tracking-tight">CareCircle AI Assistant</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-[10px] text-on-surface-variant font-semibold">Online • Caring for {currentElder.name}</p>
          </div>
        </div>
        <button className="p-2 rounded-xl hover:bg-surface-container transition-colors cursor-pointer" title="Clear Chat"
          onClick={() => setChatHistory([{ role: 'ai', content: `Hello! I'm your CareCircle AI assistant. I'm here to help you provide the best care for ${currentElder.name}. Ask me anything about care routines, medication, nutrition, or your own wellness.` }])}>
          <span className="material-symbols-outlined text-on-surface-variant">delete_sweep</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin">
        {chatHistory.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            {msg.role === 'ai' && (
              <div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center shrink-0 mt-1">
                <span className="material-symbols-outlined text-sm text-on-primary-container">smart_toy</span>
              </div>
            )}
            <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                ? 'bg-primary text-on-primary rounded-br-md'
                : 'bg-white border border-outline-variant/20 text-on-surface rounded-bl-md card-shadow'
              }`}>
              {msg.content}
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-secondary-container flex items-center justify-center shrink-0 mt-1">
                <span className="material-symbols-outlined text-sm text-on-secondary-container">person</span>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-start animate-fade-in">
            <div className="w-8 h-8 rounded-xl bg-primary-container flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-sm text-on-primary-container">smart_toy</span>
            </div>
            <div className="bg-white border border-outline-variant/20 rounded-2xl rounded-bl-md px-5 py-3 card-shadow">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {chatHistory.length <= 2 && (
        <div className="flex flex-wrap gap-2 mt-4 mb-2">
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => sendMessage(q)}
              className="bg-white border border-outline-variant/30 text-on-surface px-4 py-2 rounded-full text-xs font-semibold hover:border-primary hover:text-primary transition-all cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="mt-4 flex items-end gap-3 bg-white border border-outline-variant/30 rounded-2xl p-3 card-shadow focus-within:border-primary transition-colors">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask about ${currentElder.name}'s care...`}
          rows={1}
          className="flex-1 bg-transparent outline-none text-sm text-on-surface resize-none placeholder:text-on-surface-variant/50"
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim() || isTyping}
          className="w-10 h-10 bg-primary text-on-primary rounded-xl flex items-center justify-center hover:opacity-90 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <span className="material-symbols-outlined text-xl">send</span>
        </button>
      </div>
    </div>
  );
}
