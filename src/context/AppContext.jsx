import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation / Routing State
  // Possible values: 'landing', 'login', 'register-caregiver', 'register-elder',
  // 'dashboard', 'elder-profile', 'daily-log', 'wellness', 'chat', 'journal', 'settings'
  const [activeTab, setActiveTab] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Caregiver Profile State
  const [caregiver, setCaregiver] = useState({
    name: 'Nisha',
    age: 34,
    gender: 'Female',
    phone: '+91 98765 43210',
    email: 'nisha@carecircle.com',
    role: 'daughter',
    language: 'english'
  });

  // Settings Notification State
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsAlerts: true,
    inAppReminders: false,
    language: 'English (US)'
  });

  // Elders List
  const [elders, setElders] = useState([
    {
      id: 1,
      name: 'Lakshmi Iyer',
      age: 72,
      gender: 'Female',
      phone: '+91 94432 12345',
      bloodGroup: 'O+',
      address: '123 Maple St, Coimbatore, TN - 641001',
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      medications: ['Metformin (500mg)', 'Amlodipine (10mg)'],
      allergies: ['Penicillin', 'Peanuts'],
      notes: 'Requires assistance with walking; occasional joint stiffness in mornings.',
      emergencyContact: {
        name: 'Nisha',
        relation: 'Daughter',
        phone: '+91 98765 43210'
      },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtA7xPkinpGmi2qbG8S8pkYa7QQQE_2OJqEP3HieJutaqD_8OGb-t4Nf5pxgidWkB2nLTfcsmNsLkMEG9Hpl5VRMtioHz6q_8v7Rv1R-EXV2Fq1egitNPH8icSb2HfyU7jg-Ozodttj6h_XcpvnaXHpw7w4djn1S6BSKF93ytyI6aUR76vvqiw3ZHf2tyd9MMn0LTAl6wwW8t6zoyUgZu-53HoiSAao50itCZsJ7ncof6wP7uERkcWzRyWdS56DStj8I8YUFcfbIGc',
      activeCare: true
    },
    {
      id: 2,
      name: 'Margaret Wells',
      age: 78,
      gender: 'Female',
      phone: '+1 (555) 123-4567',
      bloodGroup: 'A+',
      address: '742 Evergreen Terrace, Springfield',
      conditions: ['Osteoarthritis', 'Mild Cognitive Decline'],
      medications: ['Donepezil (5mg)', 'Vitamin D3 (1000 IU)'],
      allergies: ['Sulfa Drugs'],
      notes: 'Loves gardening; needs gentle prompts for medications.',
      emergencyContact: {
        name: 'Sarah Mitchell',
        relation: 'Primary Caregiver / Niece',
        phone: '+1 (555) 987-6543'
      },
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm3a1_09SHvpgqVxs7IVDANtaj2zzFYwtg3cI2SdDsez0NG8WI2Iag_g9oh7q7ATLzB8a57jhEaHhzyt63MOucuDBJtsT1OR3uXEK4nGExdkZQjU2c-uTxBbEKzMjEG8PINIawDjg3OrgzLT1W6zvStnNbDsQdB4nPo5kNwXDVkiYJaHFKQurrmSSwlA1o5eQjaZzXVh4fIoyEaiavn5YspfMKSL7Rv9Sh5_l6ROibn-XrWpF_Jsu0LI1YFCYVSyIPpv4kgxCoch7n',
      activeCare: true
    }
  ]);

  const [currentElderId, setCurrentElderId] = useState(1);

  // Daily Care Log states
  const [dailyLog, setDailyLog] = useState({
    meds: {
      metformin: true,
      bpTablet: false,
      vitaminD: true
    },
    activities: {
      foodGiven: true,
      waterIntake: false,
      exerciseCompleted: false,
      restTaken: true
    },
    observations: '',
    mood: ['Calm']
  });

  // Calculate dynamic medication completion percentage
  const getMedicationProgress = () => {
    const values = Object.values(dailyLog.meds);
    const completed = values.filter(Boolean).length;
    const total = values.length + 1; // Let's say there is 1 scheduled dose left (as in Stitch)
    const percentage = Math.round((completed / total) * 100);
    return {
      percentage,
      completed,
      total,
      nextMed: 'Vitamin D3 @ 2:00 PM'
    };
  };

  // Wellness check-in (0-10 sliders)
  const [wellnessLog, setWellnessLog] = useState({
    sleep: 7,
    stress: 5,
    mood: 8,
    energy: 6,
    score: 82
  });

  // AI Assistant Chat History
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'ai',
      content: `Hello! I'm your CareCircle AI assistant. I'm here to help you provide the best care for ${elders[0]?.name || 'your loved one'}. Ask me anything about care routines, medication, nutrition, or your own wellness.`
    }
  ]);

  // Caregiver Journal Entries
  const [journalEntries, setJournalEntries] = useState([
    {
      title: 'Evening Mood Check',
      body: 'Grandma seemed a bit tired today but her appetite was good. She ate her whole dinner and fell asleep easily.',
      mood: 'Calm',
      date: 'Wednesday, October 23, 2023',
      time: '08:30 PM'
    },
    {
      title: 'Physical Therapy Session',
      body: 'The therapist said her mobility is improving. We need to focus on leg lifts and light stretching every afternoon.',
      mood: 'Happy',
      date: 'Tuesday, October 22, 2023',
      time: '04:15 PM'
    },
    {
      title: 'A Rainy Saturday',
      body: 'We listened to her favorite old records today. She remembered every word of the songs and sang along with a big smile.',
      mood: 'Grateful',
      date: 'Saturday, October 21, 2023',
      time: '06:00 PM'
    }
  ]);

  const addJournalEntry = (entry) => {
    setJournalEntries(prev => [entry, ...prev]);
  };

  const currentElder = elders.find(e => e.id === currentElderId) || elders[0];

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isAuthenticated,
        setIsAuthenticated,
        caregiver,
        setCaregiver,
        settings,
        setSettings,
        elders,
        setElders,
        currentElderId,
        setCurrentElderId,
        currentElder,
        dailyLog,
        setDailyLog,
        getMedicationProgress,
        wellnessLog,
        setWellnessLog,
        chatHistory,
        setChatHistory,
        journalEntries,
        setJournalEntries,
        addJournalEntry
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
