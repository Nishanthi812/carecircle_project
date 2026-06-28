import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const { caregiver, setCaregiver, currentElder } = useApp();
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState(caregiver.language || 'english');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setCaregiver(prev => ({ ...prev, language }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ checked, onChange, label, description }) => (
    <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
      <div>
        <p className="text-sm font-bold text-on-surface">{label}</p>
        <p className="text-[10px] text-on-surface-variant">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${checked ? 'bg-primary' : 'bg-outline-variant'}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
      </button>
    </div>
  );

  return (
    <div className="w-full p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-on-surface tracking-tight">Settings</h2>
        <p className="text-sm text-on-surface-variant mt-1">Manage your account, preferences, and notifications.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
          <div className="flex items-center gap-2 mb-5 text-primary">
            <span className="material-symbols-outlined">person</span>
            <h3 className="font-bold text-sm">Profile Information</h3>
          </div>
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-outline-variant/20">
            <div className="w-20 h-20 rounded-2xl bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-on-primary-container">person</span>
            </div>
            <div>
              <h4 className="text-lg font-bold text-on-surface">{caregiver.name}</h4>
              <p className="text-xs text-on-surface-variant capitalize">{caregiver.role} Caregiver</p>
              <p className="text-xs text-on-surface-variant">{caregiver.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Full Name</label>
              <input type="text" defaultValue={caregiver.name} className="w-full p-3 border border-outline-variant rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Email</label>
              <input type="email" defaultValue={caregiver.email} className="w-full p-3 border border-outline-variant rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Phone</label>
              <input type="tel" defaultValue={caregiver.phone} className="w-full p-3 border border-outline-variant rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 border border-outline-variant rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white cursor-pointer"
              >
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="tamil">Tamil</option>
                <option value="telugu">Telugu</option>
                <option value="marathi">Marathi</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
          <div className="flex items-center gap-2 mb-5 text-secondary">
            <span className="material-symbols-outlined">notifications</span>
            <h3 className="font-bold text-sm">Notifications</h3>
          </div>
          <div className="space-y-3">
            <Toggle
              checked={notifEnabled}
              onChange={setNotifEnabled}
              label="Push Notifications"
              description="Receive medication and care reminders"
            />
            <Toggle
              checked={true}
              onChange={() => { }}
              label="Daily Summary"
              description="Get a daily care report at 8 PM"
            />
            <Toggle
              checked={true}
              onChange={() => { }}
              label="Emergency Alerts"
              description="Critical alerts for missed medications"
            />
          </div>
        </section>

        {/* Appearance */}
        <section className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
          <div className="flex items-center gap-2 mb-5 text-tertiary">
            <span className="material-symbols-outlined">palette</span>
            <h3 className="font-bold text-sm">Appearance</h3>
          </div>
          <Toggle
            checked={darkMode}
            onChange={setDarkMode}
            label="Dark Mode"
            description="Switch to a darker color theme (coming soon)"
          />
        </section>

        {/* Care Info */}
        <section className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
          <div className="flex items-center gap-2 mb-5 text-primary">
            <span className="material-symbols-outlined">group</span>
            <h3 className="font-bold text-sm">Care Circle</h3>
          </div>
          <div className="p-4 bg-surface-container-low rounded-xl flex items-center gap-4">
            {currentElder.image ? (
              <img src={currentElder.image} alt={currentElder.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
            ) : (
              <div className="w-14 h-14 rounded-2xl bg-primary-fixed/30 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-2xl">elderly</span>
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-bold text-on-surface">{currentElder.name}</p>
              <p className="text-[10px] text-on-surface-variant">Age: {currentElder.age} • {currentElder.conditions.length} conditions • {currentElder.medications.length} medications</p>
            </div>
            <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-bold">Active</span>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-white p-6 rounded-[20px] card-shadow border border-tertiary/20">
          <div className="flex items-center gap-2 mb-5 text-tertiary">
            <span className="material-symbols-outlined">warning</span>
            <h3 className="font-bold text-sm">Danger Zone</h3>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-tertiary-fixed/10 rounded-xl">
            <div>
              <p className="text-sm font-bold text-on-surface">Delete Account</p>
              <p className="text-[10px] text-on-surface-variant">Permanently remove your data and care logs.</p>
            </div>
            <button className="border border-tertiary text-tertiary px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-tertiary hover:text-white transition-all cursor-pointer">
              Delete Account
            </button>
          </div>
        </section>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer ${saved ? 'bg-secondary text-on-primary' : 'bg-primary text-on-primary'
            }`}
        >
          <span className="material-symbols-outlined">{saved ? 'check_circle' : 'save'}</span>
          {saved ? 'Settings Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
