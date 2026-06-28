import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Sidebar({ isOpen, onClose }) {
  const { activeTab, setActiveTab, dailyLog, setDailyLog } = useApp();
  const [showQuickNoteModal, setShowQuickNoteModal] = useState(false);
  const [quickNote, setQuickNote] = useState('');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'elder-profile', label: 'Elder Profile', icon: 'elderly' },
    { id: 'daily-log', label: 'Daily Care Log', icon: 'assignment' },
    { id: 'wellness', label: 'Caregiver Wellness', icon: 'self_care' },
    { id: 'chat', label: 'AI Care Assistant', icon: 'smart_toy' },
    { id: 'journal', label: 'Caregiver Journal', icon: 'book' },
    { id: 'settings', label: 'Settings', icon: 'settings' }
  ];

  const handleAddQuickNote = (e) => {
    e.preventDefault();
    if (!quickNote.trim()) return;

    // Append to daily log observations or alert
    setDailyLog(prev => ({
      ...prev,
      observations: prev.observations
        ? `${prev.observations}\n[Quick Note]: ${quickNote}`
        : `[Quick Note]: ${quickNote}`
    }));

    alert('Quick note added to your Daily Care Log observations!');
    setQuickNote('');
    setShowQuickNoteModal(false);
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-300"
        />
      )}

      <aside className={`h-screen w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col py-6 px-3 shadow-sm z-50 border-r border-outline-variant/30 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Logo & Close Button */}
        <div className="mb-8 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl font-fill">circles_ext</span>
            <div>
              <h1 className="text-xl font-bold text-primary tracking-tight">CareCircle</h1>
              <p className="text-xs text-on-surface-variant">Caregiver Support</p>
            </div>
          </div>
          {/* Close button for mobile/tablet */}
          <button 
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant hover:text-primary cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left font-medium text-sm ${isActive
                    ? 'text-primary bg-surface-container-high font-bold border-r-4 border-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-high/60 hover:text-primary'
                  }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Action */}
        <div className="mt-auto px-2 pt-4 border-t border-outline-variant/30">
          <button
            onClick={() => setShowQuickNoteModal(true)}
            className="w-full bg-primary text-on-primary py-3 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-1 shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Add Care Note
          </button>
        </div>
      </aside>

      {/* Quick Note Modal */}
      {showQuickNoteModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-[440px] p-6 shadow-xl border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">edit_note</span>
                Add Quick Care Note
              </h3>
              <button
                onClick={() => setShowQuickNoteModal(false)}
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddQuickNote} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1">
                  Type your note (will append to Daily Care Log observations)
                </label>
                <textarea
                  rows={4}
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  placeholder="e.g. Margaret was feeling slightly dizzy after lunch today, but rested well afterwards."
                  className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm transition-all"
                  required
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowQuickNoteModal(false)}
                  className="flex-1 py-2.5 border border-outline text-on-surface-variant hover:bg-surface-container-high font-semibold rounded-xl text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary text-on-primary font-semibold rounded-xl text-sm hover:opacity-90 transition-opacity"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
