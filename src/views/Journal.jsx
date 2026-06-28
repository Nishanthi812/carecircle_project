import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Journal() {
  const { journalEntries, addJournalEntry, caregiver } = useApp();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [showForm, setShowForm] = useState(false);

  const moodOptions = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😌', label: 'Calm' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😤', label: 'Frustrated' },
    { emoji: '🥱', label: 'Tired' },
    { emoji: '🙏', label: 'Grateful' }
  ];

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return;
    addJournalEntry({
      title: title.trim(),
      body: body.trim(),
      mood: selectedMood,
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    });
    setTitle('');
    setBody('');
    setSelectedMood('');
    setShowForm(false);
  };

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="w-full p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-on-surface tracking-tight">{getTimeOfDayGreeting()}, {caregiver.name}</h2>
          <p className="text-sm text-on-surface-variant mt-1">Your private space to reflect, vent, and grow.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined">{showForm ? 'close' : 'edit'}</span>
          {showForm ? 'Cancel' : 'New Entry'}
        </button>
      </div>

      {/* New Entry Form */}
      {showForm && (
        <section className="bg-white p-8 rounded-[24px] card-shadow border border-outline-variant/20 mb-8 animate-fade-in">
          <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">draw</span>
            Write Your Thoughts
          </h3>

          {/* Mood Selector */}
          <div className="mb-6">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-3">How are you feeling?</label>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map(m => (
                <button
                  key={m.label}
                  onClick={() => setSelectedMood(m.label)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-semibold transition-all cursor-pointer ${selectedMood === m.label
                    ? 'bg-primary text-on-primary border-primary'
                    : 'border-outline-variant text-on-surface hover:border-primary hover:text-primary'
                    }`}
                >
                  <span className="text-lg">{m.emoji}</span> {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title..."
              className="w-full p-4 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm bg-white transition-all"
            />
          </div>

          {/* Body */}
          <div className="mb-6">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Your Thoughts</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write freely — this is your safe space..."
              rows={6}
              className="w-full p-4 border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm bg-white transition-all resize-none"
            />
          </div>

          {/* Prompt */}
          <div className="mb-6 p-4 bg-primary-container/20 rounded-xl flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-xl shrink-0">lightbulb</span>
            <div>
              <p className="text-xs font-bold text-on-surface mb-1">Writing Prompt</p>
              <p className="text-xs text-on-surface-variant italic leading-relaxed">
                "What small moment of joy or connection happened during your caregiving today?"
              </p>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !body.trim()}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined">save</span>
            Save Journal Entry
          </button>
        </section>
      )}

      {/* Journal Entries */}
      <section>
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4">
          Your Journal ({journalEntries.length} {journalEntries.length === 1 ? 'entry' : 'entries'})
        </h3>

        {journalEntries.length === 0 ? (
          <div className="bg-white p-12 rounded-[24px] card-shadow border border-outline-variant/20 text-center">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">auto_stories</span>
            <h4 className="text-lg font-bold text-on-surface mb-2">No entries yet</h4>
            <p className="text-sm text-on-surface-variant mb-6">Start writing to build a record of your caregiving journey.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all cursor-pointer"
            >
              Write Your First Entry
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {journalEntries.map((entry, i) => (
              <article key={i} className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20 hover:border-primary/30 transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">{entry.title}</h4>
                    <p className="text-[10px] text-on-surface-variant mt-0.5">{entry.date} • {entry.time}</p>
                  </div>
                  {entry.mood && (
                    <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                      {moodOptions.find(m => m.label === entry.mood)?.emoji} {entry.mood}
                    </span>
                  )}
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">{entry.body}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Streak Banner */}
      {journalEntries.length > 0 && (
        <div className="mt-8 bg-secondary-container/10 p-6 rounded-[20px] flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl text-secondary">local_fire_department</span>
          <div>
            <p className="text-sm font-bold text-on-surface">Journaling Streak: {journalEntries.length} {journalEntries.length === 1 ? 'entry' : 'entries'}</p>
            <p className="text-[10px] text-on-surface-variant">Consistent journaling helps reduce caregiver stress by up to 28%.</p>
          </div>
        </div>
      )}
    </div>
  );
}
