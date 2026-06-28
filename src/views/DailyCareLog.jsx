import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function DailyCareLog() {
  const { dailyLog, setDailyLog, currentElder, setActiveTab } = useApp();
  const [observations, setObservations] = useState(dailyLog.observations);
  const [selectedMoods, setSelectedMoods] = useState(dailyLog.mood);

  const meds = [
    { key: 'metformin', label: 'Metformin', detail: '8:00 AM • 500mg Oral' },
    { key: 'bpTablet', label: 'BP Tablet', detail: '8:00 AM • 10mg Oral' },
    { key: 'vitaminD', label: 'Vitamin D', detail: '12:00 PM • 1000 IU Capsule' }
  ];

  const activities = [
    { key: 'foodGiven', label: 'Food Given' },
    { key: 'waterIntake', label: 'Water Intake' },
    { key: 'exerciseCompleted', label: 'Exercise Completed' },
    { key: 'restTaken', label: 'Rest Taken' }
  ];

  const moods = ['Cheerful', 'Calm', 'Restless', 'Tired', 'Anxious'];

  const toggleMed = (key) => {
    setDailyLog(prev => ({
      ...prev,
      meds: { ...prev.meds, [key]: !prev.meds[key] }
    }));
  };

  const toggleActivity = (key) => {
    setDailyLog(prev => ({
      ...prev,
      activities: { ...prev.activities, [key]: !prev.activities[key] }
    }));
  };

  const toggleMood = (mood) => {
    setSelectedMoods(prev =>
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };

  const handleSubmit = () => {
    setDailyLog(prev => ({
      ...prev,
      observations,
      mood: selectedMoods
    }));
    alert('Daily Care Log submitted successfully! Dashboard will now reflect these updates.');
    setActiveTab('dashboard');
  };

  return (
    <div className="w-full p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Intro Banner */}
        <div className="md:col-span-12 mb-2 flex flex-col md:flex-row items-center justify-between bg-secondary-container/10 p-8 rounded-[24px]">
          <div className="max-w-xl">
            <h3 className="text-2xl font-black text-primary mb-1 tracking-tight">How is the care today?</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Consistent logging helps our AI assistant detect patterns in health and mood. Take a moment to check off the completed tasks.
            </p>
          </div>
          <div className="hidden md:flex w-24 h-24 items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-primary/20">assignment_turned_in</span>
          </div>
        </div>

        {/* Left: Checklists */}
        <div className="md:col-span-7 space-y-6">
          {/* Medications */}
          <section className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">medication</span>
              </div>
              <h4 className="text-base font-bold text-on-surface">Medication Checklist</h4>
            </div>
            <div className="space-y-3">
              {meds.map(med => (
                <label key={med.key} className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors group ${dailyLog.meds[med.key] ? 'bg-primary/5 border-primary' : 'border-outline-variant'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={dailyLog.meds[med.key]}
                      onChange={() => toggleMed(med.key)}
                      className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary"
                    />
                    <div>
                      <p className="text-sm font-bold text-on-surface">{med.label}</p>
                      <p className="text-[10px] text-on-surface-variant">{med.detail}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary text-lg">info</span>
                </label>
              ))}
            </div>
          </section>

          {/* Activities */}
          <section className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
            <div className="flex items-center gap-3 mb-4">
              <h4 className="text-base font-bold text-on-surface">Activities & Vitals</h4>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activities.map(act => (
                <label key={act.key} className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors ${dailyLog.activities[act.key] ? 'bg-primary/5 border-primary' : 'border-outline-variant'}`}>
                  <input
                    type="checkbox"
                    checked={dailyLog.activities[act.key]}
                    onChange={() => toggleActivity(act.key)}
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer accent-primary"
                  />
                  <span className="text-sm font-semibold text-on-surface">{act.label}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Right: Notes & Submit */}
        <div className="md:col-span-5 space-y-6">
          {/* Observations */}
          <section className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined">edit_note</span>
              </div>
              <h4 className="text-base font-bold text-on-surface">Care Observations</h4>
            </div>
            <p className="text-[10px] text-on-surface-variant mb-3">Use this space for qualitative updates on mood, physical state, or any unusual events.</p>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              className="w-full flex-1 min-h-[200px] p-4 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm bg-white transition-all resize-none"
              placeholder="Write today's observations..."
            />
            <div className="mt-3 p-3 bg-surface-container rounded-xl flex gap-2 items-start">
              <span className="material-symbols-outlined text-primary text-lg shrink-0">lightbulb</span>
              <p className="text-[10px] text-on-surface-variant italic leading-relaxed">
                Example: "Grandmother felt tired after lunch. Appetite was low but she enjoyed her afternoon tea."
              </p>
            </div>
          </section>

          {/* Mood Check-in */}
          <section className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
            <h5 className="text-xs font-bold text-on-surface mb-3 uppercase tracking-wider">Mood Check-in</h5>
            <div className="flex flex-wrap gap-2">
              {moods.map(mood => (
                <button
                  key={mood}
                  onClick={() => toggleMood(mood)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${selectedMoods.includes(mood)
                    ? 'bg-primary text-on-primary border-primary'
                    : 'border-outline-variant text-on-surface-variant hover:bg-primary hover:text-on-primary hover:border-primary'
                    }`}
                >
                  {mood}
                </button>
              ))}
            </div>
          </section>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-primary text-on-primary py-4 px-6 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined">task_alt</span>
            Submit Daily Care Log
          </button>
        </div>
      </div>

      {/* Footer History */}
      <footer className="mt-10 pt-6 border-t border-outline-variant/30">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-on-surface">Recent Logs</h4>
            <p className="text-[10px] text-on-surface-variant">You have logged 14 consecutive days!</p>
          </div>
          <button className="text-primary font-bold text-xs hover:underline cursor-pointer">View History</button>
        </div>
        <div className="flex gap-2 mt-3">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-1.5 bg-primary flex-1 rounded-full"></div>)}
          {[6, 7].map(i => <div key={i} className="h-1.5 bg-surface-variant flex-1 rounded-full"></div>)}
        </div>
      </footer>
    </div>
  );
}
