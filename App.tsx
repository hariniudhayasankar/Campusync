
import React, { useState } from 'react';
import { UserRole } from './types';
import { AppProvider, useAppContext } from './store';
import Sidebar from './components/Sidebar';
import AdminDashboard from './views/AdminDashboard';
import EventApprovals from './views/EventApprovals';
import CreateEvent from './views/CreateEvent';
import ParticipantExplore from './views/ParticipantExplore';
import EventList from './views/EventList';
import Reports from './views/Reports';
import Organizers from './views/Organizers';
import Settings from './views/Settings';
import { Lock, Mail, ChevronRight, UserCircle } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  const [activeView, setActiveView] = useState('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        district: 'Chennai'
      });
      setActiveView('explore');
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
        <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-2xl max-w-lg w-full border text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
          
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl mx-auto mb-8">
            <UserCircle size={32} />
          </div>
          
          <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">CampusSync</h1>
          <p className="text-gray-500 mb-10 text-sm font-medium uppercase tracking-widest">Institutional Management Portal</p>
          
          <form onSubmit={handleLogin} className="space-y-4 text-left mb-10">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  placeholder="your.email@college.edu"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1 tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-4 mt-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              Sign In to Dashboard <ChevronRight size={20} />
            </button>
          </form>
          
          <div className="pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-black uppercase mb-6 tracking-widest flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gray-200"></span>
              Demo Access Credentials
              <span className="h-px w-8 bg-gray-200"></span>
            </p>
            <div className="grid grid-cols-1 gap-3">
              {[
                { role: 'College Admin', email: 'admin@college.edu' },
                { role: 'Event Organizer', email: 'organizer@college.edu' },
                { role: 'Student Participant', email: 'student@college.edu' }
              ].map((demo) => (
                <button 
                  key={demo.role}
                  onClick={() => {
                    setEmail(demo.email);
                    setPassword('demo123');
                  }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-indigo-50 hover:border-indigo-100 border border-transparent transition-all group"
                >
                  <div className="text-left">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-tighter mb-0.5">{demo.role}</p>
                    <p className="text-sm font-bold text-gray-700">{demo.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter mb-0.5">Password</p>
                    <p className="text-xs font-bold text-gray-500">demo123</p>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-6 text-[10px] text-gray-400 font-medium">Click on any account to auto-fill the login fields.</p>
          </div>
        </div>
      </div>
    );
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
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
        return <ParticipantExplore />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
            <p className="text-lg font-bold">"{activeView}" View</p>
            <p>Institutional record keeping in progress...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>
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
