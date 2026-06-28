import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function CaregiverWellness() {
  const { wellnessLog, setWellnessLog, caregiver } = useApp();
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '', q4: '', q5: '' });
  const [assessmentResult, setAssessmentResult] = useState(null);

  const handleSlider = (field, value) => {
    setWellnessLog(prev => ({ ...prev, [field]: parseInt(value) }));
  };

  const recalculateScore = (log) => {
    return Math.round((log.sleep * 10 + log.stress * 10 + log.mood * 10 + log.energy * 10) / 4);
  };

  const handleSave = () => {
    setWellnessLog(prev => ({ ...prev, score: recalculateScore(prev) }));
    alert('Wellness data saved! Your score has been updated.');
  };

  const sliders = [
    { key: 'sleep', label: 'Sleep Quality', icon: 'bedtime', color: 'primary', description: 'How restful was your sleep?' },
    { key: 'stress', label: 'Stress Level', icon: 'psychology', color: 'tertiary', description: 'Lower is better — how calm do you feel?' },
    { key: 'mood', label: 'Overall Mood', icon: 'sentiment_satisfied', color: 'secondary', description: 'Rate your current mood.' },
    { key: 'energy', label: 'Energy Level', icon: 'bolt', color: 'primary', description: 'How energized do you feel?' }
  ];

  const tips = [
    { icon: 'self_improvement', title: 'Mindful Breathing', desc: 'Try 5 minutes of box breathing (4s in, 4s hold, 4s out).' },
    { icon: 'directions_walk', title: 'Short Walk', desc: 'A 10-minute walk can significantly reduce stress levels.' },
    { icon: 'water_drop', title: 'Hydration Reminder', desc: 'Drink at least 8 glasses of water today.' },
    { icon: 'music_note', title: 'Calm Playlist', desc: 'Listen to soothing music during your break.' }
  ];

  const getColorForSlider = (color) => {
    const colors = {
      primary: { track: '#006565', bg: 'bg-primary/10', text: 'text-primary' },
      secondary: { track: '#4f6349', bg: 'bg-secondary/10', text: 'text-secondary' },
      tertiary: { track: '#3d5f90', bg: 'bg-tertiary/10', text: 'text-tertiary' }
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="w-full p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-on-surface tracking-tight">Your Wellness</h2>
        <p className="text-sm text-on-surface-variant mt-1">
          Caregiving is emotionally demanding, {caregiver.name}. Track your own well-being — <em>you matter too</em>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score + Sliders */}
        <div className="lg:col-span-8 space-y-6">
          {/* Score Card */}
          <div className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20 flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <div className="w-28 h-28 rounded-full bg-white flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-primary">{wellnessLog.score}</span>
                  <span className="text-[10px] font-bold text-on-surface-variant">/ 100</span>
                </div>
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-black text-on-surface mb-1">
                {wellnessLog.score >= 80 ? '🌟 Fantastic!' : wellnessLog.score >= 60 ? '💪 Doing Well' : wellnessLog.score >= 40 ? '🌱 Room to Grow' : '❤️ Take Care'}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {wellnessLog.score >= 70
                  ? "You're taking great care of yourself. Keep up the positive habits!"
                  : "Remember, caring for yourself enables you to care better for others. Try the tips below."}
              </p>
              <div className="flex gap-3 mt-4 justify-center sm:justify-start">
                <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-[10px] font-bold">Sleep: {wellnessLog.sleep}/10</span>
                <span className="bg-secondary-fixed text-secondary px-3 py-1 rounded-full text-[10px] font-bold">Mood: {wellnessLog.mood}/10</span>
                <span className="bg-tertiary-fixed text-tertiary px-3 py-1 rounded-full text-[10px] font-bold">Energy: {wellnessLog.energy}/10</span>
              </div>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sliders.map(s => {
              const c = getColorForSlider(s.color);
              return (
                <div key={s.key} className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-full ${c.bg} flex items-center justify-center ${c.text}`}>
                      <span className="material-symbols-outlined">{s.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-on-surface">{s.label}</h4>
                      <p className="text-[10px] text-on-surface-variant">{s.description}</p>
                    </div>
                    <span className={`text-2xl font-black ${c.text}`}>{wellnessLog[s.key]}</span>
                  </div>
                  <input
                    type="range" min="0" max="10" step="1"
                    value={wellnessLog[s.key]}
                    onChange={(e) => handleSlider(s.key, e.target.value)}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[var(--track-color)]"
                    style={{ '--track-color': c.track }}
                  />
                  <div className="flex justify-between text-[9px] text-on-surface-variant mt-1 font-semibold">
                    <span>Low</span><span>High</span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer mb-6"
          >
            <span className="material-symbols-outlined">save</span>
            Save Wellness Check-in
          </button>

          {/* Questionnaire Card */}
          <div className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20 space-y-4">
            <header className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined font-fill">psychology</span>
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Mental Wellness Assessment</h4>
            </header>

            {!assessmentResult ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const qKeys = ['q1', 'q2', 'q3', 'q4', 'q5'];
                  const optScores = { 'Excellent': 100, 'Good': 75, 'Average': 50, 'Poor': 25 };
                  const answeredCount = qKeys.filter(k => answers[k]).length;
                  if (answeredCount < 5) {
                    alert('Please answer all 5 questions.');
                    return;
                  }

                  const totalScore = qKeys.reduce((sum, key) => sum + optScores[answers[key]], 0);
                  const averageScore = Math.round(totalScore / qKeys.length);

                  const feedback = averageScore >= 60
                    ? 'Your wellness this week is Improving.'
                    : 'You may benefit from taking a short break.';

                  setAssessmentResult({ score: averageScore, feedback });
                  setWellnessLog(prev => ({ ...prev, score: averageScore }));
                }}
                className="space-y-4"
              >
                {(() => {
                  const questions = [
                    { key: 'q1', text: 'How stressed did you feel today?' },
                    { key: 'q2', text: 'Did you get enough sleep last night?' },
                    { key: 'q3', text: 'Did you have time to rest today?' },
                    { key: 'q4', text: 'How emotionally supported did you feel today?' },
                    { key: 'q5', text: 'Overall, how would you rate your mental well-being today?' }
                  ];
                  const options = ['Excellent', 'Good', 'Average', 'Poor'];

                  return (
                    <div className="space-y-3">
                      {questions.map((q, idx) => (
                        <div key={q.key} className="space-y-2 pb-3 border-b border-outline-variant/20 last:border-0 last:pb-0">
                          <p className="text-xs font-bold text-on-surface leading-tight">{idx + 1}. {q.text}</p>
                          <div className="grid grid-cols-4 gap-1">
                            {options.map(opt => {
                              const isSelected = answers[q.key] === opt;
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => setAnswers(prev => ({ ...prev, [q.key]: opt }))}
                                  className={`py-1.5 rounded-lg text-[10px] font-bold border text-center transition-all cursor-pointer ${isSelected
                                    ? 'bg-primary text-on-primary border-primary'
                                    : 'border-outline-variant text-on-surface-variant hover:bg-primary/5 hover:text-primary hover:border-primary'
                                    }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                <button
                  type="submit"
                  className="w-full bg-primary text-on-primary py-3 rounded-xl text-xs font-bold hover:opacity-95 transition-opacity cursor-pointer shadow-xs active:scale-[0.98]"
                >
                  Submit Assessment
                </button>
              </form>
            ) : (
              <div className="bg-primary-container/20 p-4 rounded-2xl border border-primary/20 space-y-4 animate-fade-in text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-1">
                  <span className="material-symbols-outlined text-2xl font-fill">sentiment_satisfied_alt</span>
                </div>
                <h5 className="font-black text-sm text-on-surface">Assessment Complete</h5>

                <div className="space-y-1">
                  <p className="text-[10px] text-on-surface-variant font-semibold">Your Calculated Wellness Score</p>
                  <p className="text-3xl font-black text-primary">{assessmentResult.score} / 100</p>
                </div>

                {/* Progress Indicator */}
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-500 rounded-full"
                    style={{ width: `${assessmentResult.score}%` }}
                  />
                </div>

                <div className="bg-white p-3 rounded-xl border border-outline-variant/30">
                  <p className="text-xs font-bold text-primary leading-relaxed">
                    "{assessmentResult.feedback}"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAssessmentResult(null);
                    setAnswers({ q1: '', q2: '', q3: '', q4: '', q5: '' });
                  }}
                  className="text-xs text-primary font-bold hover:underline cursor-pointer pt-1"
                >
                  Retake Assessment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tips */}
          <div className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4">Wellness Tips</h4>
            <div className="space-y-3">
              {tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-surface-container-low rounded-xl hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-primary text-xl">{tip.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-on-surface">{tip.title}</p>
                    <p className="text-[10px] text-on-surface-variant">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Affirmation */}
          <div className="bg-secondary-container text-on-secondary-container p-6 rounded-[20px] shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-2">Daily Affirmation</h4>
              <blockquote className="text-base font-semibold italic leading-relaxed">
                "Your compassion makes a real difference in someone's life every single day."
              </blockquote>
              <p className="mt-3 text-[10px] opacity-70">— CareCircle AI</p>
            </div>
            <div className="absolute -right-6 -bottom-6 opacity-10">
              <span className="material-symbols-outlined" style={{ fontSize: '100px' }}>favorite</span>
            </div>
          </div>

          {/* Weekly Trend */}
          <div className="bg-white p-6 rounded-[20px] card-shadow border border-outline-variant/20">
            <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-4">7-Day Wellness Trend</h4>
            <div className="relative">
              {(() => {
                const dayAbbrs = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                const scores = [65, 72, 68, 75, 80, 78, wellnessLog.score];
                const points = scores.map((val, idx) => {
                  const x = 25 + idx * 48; // scale to fit standard widths
                  const y = 110 - (val / 100) * 80; // range 110 to 30
                  return { x, y, score: val };
                });
                const pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;
                const fillD = `${pathD} L ${points[points.length - 1].x} 120 L ${points[0].x} 120 Z`;

                return (
                  <svg viewBox="0 0 330 150" className="w-full h-auto overflow-visible">
                    <defs>
                      <linearGradient id="wellness-chart-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#006565" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#006565" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="25" y1="30" x2="313" y2="30" stroke="#f1f3f4" strokeWidth="1" strokeDasharray="3" />
                    <line x1="25" y1="70" x2="313" y2="70" stroke="#f1f3f4" strokeWidth="1" strokeDasharray="3" />
                    <line x1="25" y1="110" x2="313" y2="110" stroke="#eceeef" strokeWidth="1" />

                    <path d={fillD} fill="url(#wellness-chart-grad)" />
                    <path d={pathD} fill="none" stroke="#006565" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                    {points.map((p, i) => (
                      <g key={i} className="group/dot">
                        <circle cx={p.x} cy={p.y} r="4" fill="#006565" stroke="white" strokeWidth="1.5" />
                        <text x={p.x} y={p.y - 8} textAnchor="middle" className="text-[9px] font-bold fill-primary select-none">
                          {p.score}
                        </text>
                        <text x={p.x} y="135" textAnchor="middle" className="text-[10px] font-semibold fill-on-surface-variant/80">
                          {dayAbbrs[i]}
                        </text>
                      </g>
                    ))}
                  </svg>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
