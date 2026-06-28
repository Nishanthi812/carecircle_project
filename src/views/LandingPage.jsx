import React from 'react';
import { useApp } from '../context/AppContext';

export default function LandingPage() {
  const { setActiveTab } = useApp();

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-sans">
      {/* Top Navigation */}
      <nav className="flex justify-between items-center w-full px-6 py-4 sticky top-0 z-50 bg-white shadow-xs">
        <div className="flex items-center gap-1">
          <span className="material-symbols-outlined text-primary text-3xl font-fill">circles_ext</span>
          <span className="text-xl font-extrabold text-primary tracking-tight">CareCircle</span>
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a className="text-sm font-semibold text-primary" href="#home">Home</a>
          <a className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" href="#features">Features</a>
          <a className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" href="#how-it-works">How It Works</a>
          <button
            onClick={() => setActiveTab('login')}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
          >
            LOG IN
          </button>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setActiveTab('login')}
            className="material-symbols-outlined text-on-surface"
          >
            menu
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="w-full px-4 md:px-8 flex-1">
        {/* Hero Section */}
        <section id="home" className="flex flex-col md:flex-row items-center py-16 gap-12 min-h-[80vh]">
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-on-surface">
              Caring for the <span className="text-primary">Caregiver</span>,<br />
              Caring for the <span className="text-secondary">Elderly</span>.
            </h1>
            <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
              CareCircle helps family caregivers manage elderly care through AI-powered guidance, daily care planning, wellness monitoring, multilingual support, and digital care records.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setActiveTab('register-caregiver')}
                className="bg-primary text-on-primary px-8 py-3.5 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.98] transition-all min-h-[48px] cursor-pointer"
              >
                Get Started
              </button>
              <a
                href="#features"
                className="border-2 border-secondary text-secondary px-8 py-3 rounded-2xl text-sm font-bold hover:bg-secondary-fixed/20 active:scale-[0.98] transition-all min-h-[48px] flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary-fixed-dim rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative z-10 rounded-[32px] overflow-hidden card-shadow bg-surface-container-lowest p-2 border border-outline-variant/30">
              <img
                className="w-full h-auto rounded-[24px] object-cover aspect-[4/3]"
                alt="Caregiver holding elder hand"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqp6C8z_MhIjM5tDYRy5OPAZ7_AVQlxO2YBgzabcvCkoNi7eZBsxijj53x20Av_iX4cl-EjpK54P90BfHJZ7WMOUU0KAu7plpMkeVc2qpDTeDAxFho7OTlur1W6N2rGiYFBAsxlZl8WCFV1UNOoC674707PAHgjbNwnUo8MPYiRr2jxA1S-lBTcNq-ZKI377RcZ67tRr91J-7HpHqGmGu0_fWFJORJtTPauLkJaNXvHmazNUHg68WC2m2bOPvHWOI0S_Ca_Wh7yu48wEM"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16" id="features">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-on-surface mb-2">Designed for Your Peace of Mind</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-2xl card-shadow border border-outline-variant/30 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-primary-fixed text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl font-fill">assignment</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Daily Care Log</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Track medicines, meals, and activities with ease to stay on top of daily routines.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-2xl card-shadow border border-outline-variant/30 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-secondary-fixed text-secondary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl font-fill">self_care</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Caregiver Wellness</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Monitor your own stress levels and receive AI-driven self-care suggestions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-2xl card-shadow border border-outline-variant/30 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-tertiary-fixed text-tertiary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl font-fill">smart_toy</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">AI Care Assistant</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Get instant care guidance in Tamil and English via text or voice interaction.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-2xl card-shadow border border-outline-variant/30 hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 bg-primary-fixed text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-2xl font-fill">book</span>
              </div>
              <h3 className="text-lg font-bold text-on-surface mb-2">Caregiver Journal</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Record daily experiences and emotional milestones in a secure digital space.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-surface-container-low rounded-[32px] px-6 my-16" id="how-it-works">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-on-surface mb-2">How CareCircle Works</h2>
            <p className="text-sm text-on-surface-variant">Four simple steps to organized caregiving.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-2xl border-4 border-white shadow-md">1</div>
              <h4 className="text-lg font-bold text-on-surface">Register Caregiver</h4>
              <p className="text-sm text-on-surface-variant max-w-[200px]">Create your account and set up your wellness profile.</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-2xl border-4 border-white shadow-md">2</div>
              <h4 className="text-lg font-bold text-on-surface">Register Elder</h4>
              <p className="text-sm text-on-surface-variant max-w-[200px]">Add details about the senior's medical needs and routine.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-2xl border-4 border-white shadow-md">3</div>
              <h4 className="text-lg font-bold text-on-surface">Update Daily Care</h4>
              <p className="text-sm text-on-surface-variant max-w-[200px]">Log activities and health metrics throughout the day.</p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 bg-primary text-on-primary rounded-full flex items-center justify-center font-bold text-2xl border-4 border-white shadow-md">4</div>
              <h4 className="text-lg font-bold text-on-surface">Receive AI Guidance</h4>
              <p className="text-sm text-on-surface-variant max-w-[200px]">Get personalized insights and support from your AI assistant.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-inverse-surface text-on-primary-fixed-variant py-16">
        <div className="w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-primary-fixed text-3xl font-fill">circles_ext</span>
              <span className="text-xl font-extrabold text-primary-fixed">CareCircle</span>
            </div>
            <p className="text-sm text-surface-variant/80 leading-relaxed">
              Support for family caregivers, care for the elderly. Built with compassion and AI.
            </p>
          </div>
          <div>
            <h5 className="text-sm font-bold text-primary-fixed uppercase tracking-wider mb-4">Company</h5>
            <ul className="space-y-2 text-sm text-surface-variant">
              <li><a className="hover:text-primary-fixed transition-colors" href="#home">About Us</a></li>
              <li><a className="hover:text-primary-fixed transition-colors" href="#home">Contact</a></li>
              <li><a className="hover:text-primary-fixed transition-colors" href="#home">Careers</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-bold text-primary-fixed uppercase tracking-wider mb-4">Legal</h5>
            <ul className="space-y-2 text-sm text-surface-variant">
              <li><a className="hover:text-primary-fixed transition-colors" href="#home">Privacy Policy</a></li>
              <li><a className="hover:text-primary-fixed transition-colors" href="#home">Terms of Service</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-sm font-bold text-primary-fixed uppercase tracking-wider mb-2">Newsletter</h5>
            <p className="text-sm text-surface-variant">Caregiving tips delivered weekly.</p>
            <div className="flex gap-2">
              <input
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white text-xs w-full focus:outline-none focus:border-primary-fixed"
                placeholder="Email address"
                type="email"
              />
              <button
                onClick={() => alert('Thanks for joining our newsletter!')}
                className="bg-primary-fixed text-on-primary-fixed px-4 py-2 rounded-xl text-xs font-bold hover:bg-primary-fixed-dim transition-colors cursor-pointer"
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="w-full px-4 md:px-8 mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-surface-variant/50">© 2026 CareCircle Technologies. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
