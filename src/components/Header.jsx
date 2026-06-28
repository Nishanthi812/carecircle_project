import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Header({ onMenuOpen }) {
  const {
    currentElder,
    elders,
    setCurrentElderId,
    setIsAuthenticated,
    setActiveTab
  } = useApp();

  const [showElderDropdown, setShowElderDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('landing');
  };

  const notificationList = [
    { id: 1, text: 'Bp Medication due for Lakshmi in 30 mins', time: '10m ago', urgent: true },
    { id: 2, text: 'Margaret logged a restless sleep score today', time: '1h ago', urgent: false },
    { id: 3, text: 'AI Assistant generated a new nutrition advice', time: '3h ago', urgent: false }
  ];

  return (
    <header className="w-full sticky top-0 z-40 bg-white border-b border-outline-variant/20 shadow-xs">
      <div className="w-full px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Current Caring Info / Dropdown & Menu trigger */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={onMenuOpen}
            className="lg:hidden p-1.5 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant hover:text-primary cursor-pointer flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowElderDropdown(!showElderDropdown)}
              className="flex items-center gap-2 md:gap-3 text-left hover:bg-surface-container-low p-1.5 rounded-2xl transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-fixed flex items-center justify-center bg-primary/10 text-primary shrink-0">
                {currentElder.image ? (
                  <img
                    className="w-full h-full object-cover"
                    src={currentElder.image}
                    alt={currentElder.name}
                  />
                ) : (
                  <span className="material-symbols-outlined text-[20px]">elderly</span>
                )}
              </div>
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Caring For</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm font-bold text-primary leading-none">{currentElder.name}</p>
                  <span className="material-symbols-outlined text-sm text-outline group-hover:text-primary transition-colors">
                    arrow_drop_down
                  </span>
                </div>
              </div>
            </button>

            {showElderDropdown && (
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl border border-outline-variant/30 shadow-lg z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider px-3 py-2 border-b border-outline-variant/20">
                  Switch Care Profile
                </p>
                <div className="space-y-1 mt-1">
                  {elders.map(elder => (
                    <button
                      key={elder.id}
                      onClick={() => {
                        setCurrentElderId(elder.id);
                        setShowElderDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm transition-colors ${elder.id === currentElder.id
                        ? 'bg-primary-container/10 text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container'
                        }`}
                    >
                      {elder.image ? (
                        <img
                          src={elder.image}
                          alt={elder.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined text-xs">elderly</span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold leading-tight">{elder.name}</p>
                        <p className="text-xs text-on-surface-variant">{elder.age} yrs • {elder.gender}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="border-t border-outline-variant/20 mt-2 pt-2 px-1">
                  <button
                    onClick={() => {
                      setActiveTab('register-elder');
                      setShowElderDropdown(false);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 hover:bg-primary-container/10 text-primary font-semibold text-xs rounded-xl transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">person_add</span>
                    Add New Elder
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notifications & Logout */}
        <div className="flex items-center gap-4">
          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer p-2 rounded-full relative"
            >
              notifications
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-outline-variant/30 shadow-lg z-50 p-3 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex justify-between items-center mb-2 pb-2 border-b border-outline-variant/20">
                  <p className="text-xs font-bold text-on-surface">Care Alerts & Info</p>
                  <button className="text-[10px] text-primary hover:underline font-semibold">Mark read</button>
                </div>
                <div className="space-y-2">
                  {notificationList.map(n => (
                    <div key={n.id} className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${n.urgent
                      ? 'bg-tertiary-fixed/30 border-tertiary-fixed/60 text-on-tertiary-fixed-variant'
                      : 'bg-surface-container border-outline-variant/10 text-on-surface'
                      }`}>
                      <span className={`material-symbols-outlined text-lg shrink-0 ${n.urgent ? 'text-tertiary' : 'text-primary'}`}>
                        {n.urgent ? 'warning' : 'info'}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs leading-relaxed">{n.text}</p>
                        <p className="text-[10px] text-on-surface-variant/70 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-outline-variant/30"></div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-85"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
