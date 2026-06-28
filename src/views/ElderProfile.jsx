import React from 'react';
import { useApp } from '../context/AppContext';

export default function ElderProfile() {
  const { currentElder, caregiver, setActiveTab } = useApp();

  return (
    <div className="w-full p-4 md:p-8">
      {/* Header Section */}
      <section className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-3xl overflow-hidden card-shadow ring-4 ring-white flex items-center justify-center bg-primary/10 text-primary shrink-0">
            {currentElder.image ? (
              <img className="w-full h-full object-cover" src={currentElder.image} alt={currentElder.name} />
            ) : (
              <span className="material-symbols-outlined text-5xl">elderly</span>
            )}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-black text-on-surface tracking-tight">{currentElder.name}</h2>
              <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-on-primary-container"></span>
                Active Care
              </span>
            </div>
            <p className="text-base text-on-surface-variant mb-4">Age: {currentElder.age} • {currentElder.gender}</p>
            <div className="flex gap-3">
              <button onClick={() => setActiveTab('register-elder')} className="bg-primary text-on-primary px-5 py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 cursor-pointer">
                <span className="material-symbols-outlined text-base">edit</span> Edit Profile
              </button>
              <button onClick={() => setActiveTab('register-elder')} className="border border-primary text-primary px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-primary/5 transition-all flex items-center gap-1.5 cursor-pointer">
                <span className="material-symbols-outlined text-base">person_add</span> Add Another Elder
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <span className="material-symbols-outlined">badge</span>
                <h3 className="font-bold text-sm">Personal Information</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-on-surface-variant font-semibold">Full Name</span><span>{currentElder.name}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant font-semibold">Age / Gender</span><span>{currentElder.age} / {currentElder.gender}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant font-semibold">Contact</span><span>{currentElder.phone}</span></div>
                <div className="flex justify-between"><span className="text-on-surface-variant font-semibold">Blood Group</span><span className="font-bold text-primary">{currentElder.bloodGroup}</span></div>
                <div className="pt-1">
                  <span className="text-on-surface-variant font-semibold block mb-1">Address</span>
                  <span className="text-on-surface text-xs">{currentElder.address}</span>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-4 text-tertiary">
                <span className="material-symbols-outlined">medical_services</span>
                <h3 className="font-bold text-sm">Medical Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-on-surface-variant font-semibold text-xs block mb-2">Diagnosed Conditions</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentElder.conditions.map((c, i) => (
                      <span key={i} className="bg-secondary-container/20 text-secondary px-3 py-1 rounded-full text-[10px] font-bold">{c}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-on-surface-variant font-semibold text-xs block mb-2">Medications</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentElder.medications.map((m, i) => (
                      <span key={i} className="bg-primary-container/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold">{m}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-on-surface-variant font-semibold text-xs block mb-2">Allergies</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentElder.allergies.map((a, i) => (
                      <span key={i} className="bg-tertiary-fixed/40 text-tertiary px-3 py-1 rounded-full text-[10px] font-bold">{a}</span>
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-surface-container rounded-xl">
                  <span className="text-on-surface-variant font-bold text-[10px] block mb-1 uppercase tracking-wider">Medical Notes</span>
                  <p className="text-xs text-on-surface italic leading-relaxed">"{currentElder.notes}"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency & Caregiver Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-4 text-tertiary">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emergency</span>
                <h3 className="font-bold text-sm">Emergency Contact</h3>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-primary">person</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold">{currentElder.emergencyContact.name}</h4>
                  <p className="text-xs text-on-surface-variant">{currentElder.emergencyContact.relation}</p>
                  <p className="text-xs mt-0.5">{currentElder.emergencyContact.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-primary text-on-primary py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer hover:opacity-90 transition-opacity">
                  <span className="material-symbols-outlined text-base">call</span> Call
                </button>
                <button className="border border-primary text-primary py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1 cursor-pointer hover:bg-primary/5 transition-colors">
                  <span className="material-symbols-outlined text-base">sms</span> SMS
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <span className="material-symbols-outlined">favorite</span>
                <h3 className="font-bold text-sm">Primary Caregiver</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-fixed/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl text-primary">person</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold">{caregiver.name}</h4>
                  <p className="text-xs text-on-surface-variant capitalize">{caregiver.role}</p>
                  <p className="text-xs mt-0.5">{caregiver.phone}</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-surface-container-low rounded-xl">
                <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Language</p>
                <p className="text-xs font-bold text-primary capitalize">{caregiver.language}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-primary-container text-on-primary-container p-6 rounded-[20px] shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined">health_and_safety</span>
                <h4 className="font-bold text-xs uppercase tracking-wider">Quick Health Summary</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Blood Group</span>
                  <span className="font-black text-lg">{currentElder.bloodGroup}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Conditions</span>
                  <span className="font-bold">{currentElder.conditions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Active Meds</span>
                  <span className="font-bold">{currentElder.medications.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Known Allergies</span>
                  <span className="font-bold">{currentElder.allergies.length}</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-10">
              <span className="material-symbols-outlined" style={{ fontSize: '100px' }}>ecg_heart</span>
            </div>
          </div>

          <button onClick={() => setActiveTab('daily-log')} className="w-full bg-white p-5 rounded-[20px] card-shadow border border-outline-variant/20 hover:border-primary hover:shadow-md transition-all cursor-pointer text-left group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary p-2.5 bg-primary-fixed rounded-xl group-hover:scale-110 transition-transform">assignment</span>
              <div>
                <p className="text-sm font-bold text-on-surface">Go to Daily Care Log</p>
                <p className="text-[10px] text-on-surface-variant">Log today's meds, meals & activities</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
