import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function CaregiverRegistration() {
  const { setActiveTab, setCaregiver } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    language: 'english'
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLangChange = (lang) => {
    setFormData(prev => ({
      ...prev,
      language: lang
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!agreeTerms) {
      alert('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // Save caregiver data in AppContext
      setCaregiver({
        name: formData.name,
        age: parseInt(formData.age, 10),
        gender: formData.gender,
        phone: formData.phone,
        email: formData.email,
        role: formData.role,
        language: formData.language
      });

      setIsSubmitting(false);
      // Route caregiver to Elder Onboarding!
      setActiveTab('register-elder');
    }, 1200);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans">
      {/* Top Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center z-50 bg-white border-b border-outline-variant/20 shadow-xs">
        <button
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-2 text-left hover:opacity-85 transition-opacity cursor-pointer"
        >
          <span className="material-symbols-outlined text-primary text-3xl font-fill">diversity_1</span>
          <h1 className="text-xl font-bold text-primary tracking-tight">CareCircle</h1>
        </button>
        <button
          onClick={() => setActiveTab('login')}
          className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
        >
          Already have an account? Log in
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <h2 className="text-3xl font-black text-on-surface tracking-tight">Join the Circle of Care</h2>
            <p className="text-sm text-on-surface-variant">
              Start your journey in providing compassionate, reliable care for your loved ones.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Personal Info */}
            <div className="bg-white p-6 rounded-[24px] card-shadow border border-outline-variant/30">
              <div className="flex items-center gap-2 mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">person</span>
                <h3 className="text-lg font-bold text-primary">Personal Info</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full space-y-1">
                  <label className="block text-xs font-semibold text-on-surface-variant ml-1">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                    placeholder="e.g. John Doe"
                    required
                    type="text"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-on-surface-variant ml-1">Age</label>
                  <input
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                    placeholder="Years"
                    required
                    type="number"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-on-surface-variant ml-1">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm appearance-none"
                    required
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-on-surface-variant ml-1">Mobile</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                    placeholder="+91 00000 00000"
                    required
                    type="tel"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-on-surface-variant ml-1">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                    placeholder="john@example.com"
                    required
                    type="email"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-on-surface-variant ml-1">Password</label>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                    placeholder="••••••••"
                    required
                    type="password"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-on-surface-variant ml-1">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm"
                    placeholder="••••••••"
                    required
                    type="password"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Caregiving Context & Preferred Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Relationship */}
              <div className="bg-white p-6 rounded-[24px] card-shadow border border-outline-variant/30">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">family_history</span>
                  <h3 className="text-base font-bold text-primary">Relationship to Elder</h3>
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-on-surface-variant ml-1">Select Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-outline-variant bg-surface-bright text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-sm appearance-none"
                    required
                  >
                    <option value="" disabled>Select Relationship</option>
                    <option value="son">Son</option>
                    <option value="daughter">Daughter</option>
                    <option value="daughter-in-law">Daughter-in-law</option>
                    <option value="son-in-law">Son-in-law</option>
                    <option value="spouse">Spouse</option>
                    <option value="grandchild">Grandchild</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Language */}
              <div className="bg-white p-6 rounded-[24px] card-shadow border border-outline-variant/30">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-primary text-2xl">language</span>
                  <h3 className="text-base font-bold text-primary">Preferred Language</h3>
                </div>
                <div className="space-y-3">
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-surface-container-low transition-colors ${formData.language === 'english' ? 'border-primary bg-primary/5' : 'border-outline-variant'
                    }`}>
                    <input
                      type="radio"
                      name="language"
                      value="english"
                      checked={formData.language === 'english'}
                      onChange={() => handleLangChange('english')}
                      className="w-5 h-5 text-primary border-outline-variant focus:ring-primary"
                    />
                    <span className="text-sm font-semibold">English</span>
                  </label>
                  <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer hover:bg-surface-container-low transition-colors ${formData.language === 'tamil' ? 'border-primary bg-primary/5' : 'border-outline-variant'
                    }`}>
                    <input
                      type="radio"
                      name="language"
                      value="tamil"
                      checked={formData.language === 'tamil'}
                      onChange={() => handleLangChange('tamil')}
                      className="w-5 h-5 text-primary border-outline-variant focus:ring-primary"
                    />
                    <span className="text-sm font-semibold">Tamil</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Terms & Register */}
            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded text-primary border-outline-variant focus:ring-primary cursor-pointer transition-all"
                  required
                />
                <span className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors leading-relaxed">
                  I agree to the <a className="text-primary font-bold hover:underline" href="#terms">Terms of Service</a> and <a className="text-primary font-bold hover:underline" href="#privacy">Privacy Policy</a>. I understand that my data will be handled with utmost clinical confidentiality.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-primary text-on-primary font-bold rounded-2xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all shadow-md shadow-primary/10 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">Register Caregiver</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
