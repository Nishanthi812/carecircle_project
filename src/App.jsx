import React from 'react';
import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './views/LandingPage';
import Login from './views/Login';
import CaregiverRegistration from './views/CaregiverRegistration';
import ElderRegistration from './views/ElderRegistration';
import Dashboard from './views/Dashboard';
import ElderProfile from './views/ElderProfile';
import DailyCareLog from './views/DailyCareLog';
import CaregiverWellness from './views/CaregiverWellness';
import AICareAssistant from './views/AICareAssistant';
import Journal from './views/Journal';
import Settings from './views/Settings';

function App() {
  const { activeTab, isAuthenticated } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Close sidebar automatically when activeTab changes
  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [activeTab]);

  // Public / unauthenticated views (no sidebar/header)
  if (!isAuthenticated) {
    switch (activeTab) {
      case 'login':
        return <Login />;
      case 'register-caregiver':
        return <CaregiverRegistration />;
      case 'register-elder':
        return <ElderRegistration />;
      default:
        return <LandingPage />;
    }
  }

  // Authenticated app shell
  const renderView = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'elder-profile': return <ElderProfile />;
      case 'daily-log': return <DailyCareLog />;
      case 'wellness': return <CaregiverWellness />;
      case 'chat': return <AICareAssistant />;
      case 'journal': return <Journal />;
      case 'settings': return <Settings />;
      case 'register-elder': return <ElderRegistration />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-surface overflow-x-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 lg:ml-64 lg:max-w-[calc(100vw-16rem)] flex flex-col min-w-0 transition-all duration-300">
        <Header onMenuOpen={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {renderView()}
        </main>
      </div>
    </div>
  );
}

export default App;
