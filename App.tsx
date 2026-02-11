
import React, { useState } from 'react';
import { UserRole } from './types';
import { AppProvider, useAppContext } from './store';
import Sidebar from './components/Sidebar';
import AdminDashboard from './views/AdminDashboard';
import EventApprovals from './views/EventApprovals';
import CreateEvent from './views/CreateEvent';
import ParticipantExplore from './views/ParticipantExplore';
import ParticipantProfile from './views/ParticipantProfile';
import EventList from './views/EventList';
import Reports from './views/Reports';
import Organizers from './views/Organizers';
import Settings from './views/Settings';
import ManagementEnrollment from './views/ManagementEnrollment';
import SuperAdminDashboard from './views/SuperAdminDashboard';
import ManagementOverview from './views/ManagementOverview';
import { UserCircle } from 'lucide-react';
import Header from './components/Header';
import ParticleBackground from './components/ParticleBackground';
import { ThemeToggle } from './components/ui/theme-toggle';
import { Component as AnimatedLoginPage } from './components/ui/animated-characters-login-page';

const AppContent: React.FC = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo logic: Any password works for these emails
    // Fix: Added college and district to demo users to ensure event creation has required context
    if (email === 'admin@college.edu') {
      setCurrentUser({
        id: 'a1',
        name: 'Dr. Principal',
        email: 'admin@college.edu',
        role: UserRole.ADMIN,
        college: 'Anna University',
        district: 'Chennai'
      });
      setActiveView('dashboard');
    } else if (email === 'organizer@college.edu') {
      setCurrentUser({
        id: 'o1',
        name: 'Dr. Sarah Wilson',
        email: 'organizer@college.edu',
        role: UserRole.ORGANIZER,
        department: 'Computer Science',
        college: 'Anna University',
        district: 'Chennai'
      });
      setActiveView('dashboard');
    } else if (email === 'student@college.edu') {
      setCurrentUser({
        id: 's1',
        name: 'John Student',
        email: 'student@college.edu',
        role: UserRole.PARTICIPANT,
        college: 'Anna University',
        district: 'Chennai',
        profileCompleted: true
      });
      setActiveView('explore');
    } else if (email === 'management@college.edu') {
      setCurrentUser({
        id: 'm1',
        name: 'Government Admin',
        email: 'management@college.edu',
        role: UserRole.MANAGEMENT,
        college: 'PSG College of Technology',
        district: 'Coimbatore'
      });
      setActiveView('institutions');
    }
  };

  if (!currentUser) {
    return (
      <div className="relative">
        <div className="absolute top-8 right-8 z-50">
          <ThemeToggle />
        </div>
        <AnimatedLoginPage
          onSubmit={async (emailValue, passwordValue) => {
            // Use the existing handleLogin logic
            if (emailValue === 'admin@college.edu') {
              setCurrentUser({
                id: 'a1',
                name: 'Dr. Principal',
                email: 'admin@college.edu',
                role: UserRole.ADMIN,
                college: 'Anna University',
                district: 'Chennai'
              });
              setActiveView('dashboard');
            } else if (emailValue === 'organizer@college.edu') {
              setCurrentUser({
                id: 'o1',
                name: 'Dr. Sarah Wilson',
                email: 'organizer@college.edu',
                role: UserRole.ORGANIZER,
                department: 'Computer Science',
                college: 'Anna University',
                district: 'Chennai'
              });
              setActiveView('dashboard');
            } else if (emailValue === 'student@college.edu') {
              setCurrentUser({
                id: 's1',
                name: 'John Student',
                email: 'student@college.edu',
                role: UserRole.PARTICIPANT,
                college: 'Anna University',
                district: 'Chennai',
                profileCompleted: true
              });
              setActiveView('explore');
            } else if (emailValue === 'management@college.edu') {
              setCurrentUser({
                id: 'm1',
                name: 'Government Admin',
                email: 'management@college.edu',
                role: UserRole.MANAGEMENT,
                college: 'PSG College of Technology',
                district: 'Coimbatore'
              });
              setActiveView('institutions');
            } else {
              throw new Error('Invalid email or password. Please try again.');
            }
          }}
          onDemoClick={() => {
            // Demo credentials are handled internally by the component
          }}
        />
      </div>
    );
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        if (currentUser?.role === UserRole.MANAGEMENT) {
          return <ManagementOverview />;
        }
        return <AdminDashboard />;
      case 'approvals':
        return <EventApprovals />;
      case 'upcoming':
      case 'active':
        return <EventList type="upcoming" />;
      case 'completed':
        return <EventList type="completed" />;
      case 'reports':
        return <Reports />;
      case 'organizers':
        return <Organizers />;
      case 'settings':
        return <Settings />;
      case 'create':
        return <CreateEvent />;
      case 'explore':
        // Check if participant needs to complete profile
        if (currentUser?.role === UserRole.PARTICIPANT && !currentUser?.profileCompleted) {
          return <ParticipantProfile />;
        }
        return <ParticipantExplore />;
      case 'profile':
        return <ParticipantProfile />;
      case 'enrollment':
        return <ManagementEnrollment onBack={() => setActiveView('institutions')} />;
      case 'institutions':
        return <SuperAdminDashboard onEnrollClick={() => setActiveView('enrollment')} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 py-20">
            <p className="text-lg font-bold">"{activeView}" View</p>
            <p>Institutional record keeping in progress...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] transition-colors duration-300 relative">
      {currentUser && <ParticleBackground />}
      {activeView !== 'enrollment' && (
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
      )}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {activeView !== 'enrollment' && <Header />}
        <main className={`flex-1 overflow-y-auto ${activeView === 'enrollment' ? 'p-8' : 'p-6'}`}>
          <div className={`max-w-7xl mx-auto ${activeView === 'enrollment' ? 'max-w-4xl' : ''}`}>
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
