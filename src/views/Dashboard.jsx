import React from 'react';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { caregiver, currentElder, dailyLog, getMedicationProgress, wellnessLog, setActiveTab } = useApp();
  const medProgress = getMedicationProgress();

  const careStatusItems = [
    { label: 'Morning Bath', detail: 'Completed at 8:30 AM', done: true },
    { label: 'Physical Therapy', detail: 'Scheduled for 3:00 PM', done: false },
    { label: 'Breakfast', detail: 'Finished all oatmeal', done: true }
  ];

  const weeklyData = [
    { day: 'Mon', height: 'h-32' },
    { day: 'Tue', height: 'h-40' },
    { day: 'Wed', height: 'h-36' },
    { day: 'Thu', height: 'h-44' },
    { day: 'Fri', height: 'h-24' },
    { day: 'Sat', height: 'h-40' },
    { day: 'Sun', height: 'h-16', dim: true }
  ];

  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (medProgress.percentage / 100) * circumference;

  const getWellnessLabel = (score) => {
    if (score >= 80) return { text: 'Great State', color: 'bg-secondary-fixed text-secondary' };
    if (score >= 60) return { text: 'Moderate', color: 'bg-primary-fixed text-primary' };
    if (score >= 40) return { text: 'Needs Care', color: 'bg-tertiary-fixed text-tertiary' };
    return { text: 'Critical', color: 'bg-tertiary-container text-on-tertiary' };
  };

  const wellnessLabel = getWellnessLabel(wellnessLog.score);

  return (
    <div className="w-full p-4 md:p-8">
      {/* Welcome / Elder Profile Card */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white p-6 rounded-[24px] card-shadow border border-outline-variant/20">
        <div>
          <h2 className="text-3xl font-black text-on-surface tracking-tight">Welcome back, {caregiver.name}!</h2>
          <p className="text-base text-on-surface-variant mt-1">Caring for {currentElder.name} today.</p>
        </div>
        <div className="flex items-center gap-4 border-l border-outline-variant/30 pl-0 sm:pl-6 pt-4 sm:pt-0">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary-fixed flex items-center justify-center bg-primary/10 text-primary shrink-0">
            {currentElder.image ? (
              <img src={currentElder.image} alt={currentElder.name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-3xl">elderly</span>
            )}
          </div>
          <div>
            <h4 className="font-bold text-sm text-on-surface leading-snug">{currentElder.name}</h4>
            <p className="text-xs text-on-surface-variant">{currentElder.age} yrs • {currentElder.gender}</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Active Care Profile
            </span>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Medication Progress */}
        <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20 flex flex-col items-center justify-center">
          <h3 className="text-xs font-bold text-on-surface-variant self-start mb-4 uppercase tracking-wider">Medication Progress</h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="80" cy="80" r="70" fill="transparent" stroke="#e6e8e9" strokeWidth="12" />
              <circle cx="80" cy="80" r="70" fill="transparent" stroke="#006565" strokeWidth="12"
                strokeDasharray={circumference} strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-primary">{medProgress.percentage}%</span>
              <span className="text-[10px] font-bold text-on-surface-variant">{medProgress.completed} of {medProgress.total} doses</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-center text-on-surface-variant font-semibold">Next: {medProgress.nextMed}</p>
        </div>

        {/* Daily Care Status */}
        <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
          <h3 className="text-xs font-bold text-on-surface-variant mb-4 uppercase tracking-wider">Daily Care Status</h3>
          <ul className="space-y-3">
            {careStatusItems.map((item, i) => (
              <li key={i} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: item.done ? "'FILL' 1" : "'FILL' 0", color: item.done ? '#006565' : '#0060a8' }}>
                  {item.done ? 'check_circle' : 'pending'}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-on-surface">{item.label}</p>
                  <p className="text-[10px] text-on-surface-variant">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Wellness Score */}
        <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20 flex flex-col">
          <h3 className="text-xs font-bold text-on-surface-variant mb-4 uppercase tracking-wider">Wellness Score</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-5xl font-black text-secondary">{wellnessLog.score}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold mt-2 ${wellnessLabel.color}`}>
              {wellnessLabel.text}
            </span>
            <p className="mt-4 text-center text-xs text-on-surface-variant leading-relaxed">
              You've logged {wellnessLog.sleep * 2} hours of sleep. {wellnessLog.score >= 70 ? 'Looking good' : 'Take care'}, {caregiver.name}!
            </p>
          </div>
          <button
            onClick={() => setActiveTab('wellness')}
            className="mt-4 w-full border border-secondary text-secondary py-2.5 rounded-xl text-xs font-bold hover:bg-secondary-fixed/20 transition-colors cursor-pointer"
          >
            Log Mood
          </button>
        </div>

        {/* Weekly Medication Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Weekly Medication Completion</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1 text-[10px] font-bold"><span className="w-3 h-3 bg-primary rounded-full"></span> Taken</span>
              <span className="flex items-center gap-1 text-[10px] font-bold"><span className="w-3 h-3 bg-surface-container-high rounded-full"></span> Missed</span>
            </div>
          </div>
          <div className="flex items-end justify-between h-48 px-4">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 w-full">
                <div className={`w-8 ${d.dim ? 'bg-primary-fixed-dim' : 'bg-primary'} rounded-t-lg ${d.height} transition-all duration-500`}></div>
                <span className="text-[10px] font-bold text-on-surface-variant">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Care Tip */}
        <div className="col-span-12 lg:col-span-4 bg-primary-container text-on-primary-container p-6 rounded-[20px] shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined">smart_toy</span>
              <h3 className="text-xs font-bold uppercase tracking-wider">AI Care Tip</h3>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              "{currentElder.name} has been less active today. Try a light 5-minute leg stretching session after her lunch to boost circulation."
            </p>
            <button
              onClick={() => setActiveTab('chat')}
              className="bg-white text-primary px-5 py-2.5 rounded-xl text-xs font-bold hover:shadow-lg transition-all cursor-pointer"
            >
              Show Exercises
            </button>
          </div>
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>lightbulb</span>
          </div>
        </div>

        {/* Quick Shortcuts */}
        <div className="col-span-12 mt-4">
          <h3 className="text-xs font-bold text-on-surface-variant mb-4 uppercase tracking-wider">Quick Shortcuts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <button onClick={() => setActiveTab('daily-log')} className="flex flex-col items-center gap-3 bg-white p-6 rounded-[20px] border border-outline-variant/20 hover:border-primary hover:shadow-md transition-all cursor-pointer group">
              <span className="material-symbols-outlined text-primary p-3 bg-primary-fixed rounded-full group-hover:scale-110 transition-transform">edit_note</span>
              <span className="text-sm font-bold text-on-surface">Daily Care Log</span>
            </button>
            <button onClick={() => setActiveTab('chat')} className="flex flex-col items-center gap-3 bg-white p-6 rounded-[20px] border border-outline-variant/20 hover:border-secondary hover:shadow-md transition-all cursor-pointer group">
              <span className="material-symbols-outlined text-secondary p-3 bg-secondary-fixed rounded-full group-hover:scale-110 transition-transform">chat</span>
              <span className="text-sm font-bold text-on-surface">AI Assistant</span>
            </button>
            <button onClick={() => setActiveTab('journal')} className="flex flex-col items-center gap-3 bg-white p-6 rounded-[20px] border border-outline-variant/20 hover:border-tertiary hover:shadow-md transition-all cursor-pointer group">
              <span className="material-symbols-outlined text-tertiary p-3 bg-tertiary-fixed rounded-full group-hover:scale-110 transition-transform">draw</span>
              <span className="text-sm font-bold text-on-surface">Write Journal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
