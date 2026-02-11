
import React from 'react';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Calendar, 
  CheckCircle, 
  FileBarChart, 
  Users, 
  Settings,
  PlusCircle,
  Award,
  LogOut,
  UserCircle
} from 'lucide-react';
import { UserRole } from '../types';
import { useAppContext } from '../store';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  view: string;
}

const Sidebar: React.FC<{ activeView: string, setActiveView: (view: string) => void }> = ({ activeView, setActiveView }) => {
  const { currentUser, setCurrentUser } = useAppContext();

  const getNavItems = (): NavItem[] => {
    switch (currentUser?.role) {
      case UserRole.ADMIN:
        return [
          { label: 'Dashboard', icon: <LayoutDashboard size={20} />, view: 'dashboard' },
          { label: 'Event Approvals', icon: <CalendarCheck size={20} />, view: 'approvals' },
          { label: 'Upcoming Events', icon: <Calendar size={20} />, view: 'upcoming' },
          { label: 'Completed Events', icon: <CheckCircle size={20} />, view: 'completed' },
          { label: 'Reports & Exports', icon: <FileBarChart size={20} />, view: 'reports' },
          { label: 'Organizers', icon: <Users size={20} />, view: 'organizers' },
          { label: 'Settings', icon: <Settings size={20} />, view: 'settings' },
        ];
      case UserRole.ORGANIZER:
        return [
          { label: 'My Dashboard', icon: <LayoutDashboard size={20} />, view: 'dashboard' },
          { label: 'Create Event', icon: <PlusCircle size={20} />, view: 'create' },
          { label: 'Active Events', icon: <Calendar size={20} />, view: 'active' },
          { label: 'Completed', icon: <CheckCircle size={20} />, view: 'completed' },
          { label: 'Certificates', icon: <Award size={20} />, view: 'certificates' },
          { label: 'Accreditation Reports', icon: <FileBarChart size={20} />, view: 'reports' },
        ];
      case UserRole.PARTICIPANT:
        return [
          { label: 'Explore Events', icon: <Calendar size={20} />, view: 'explore' },
          { label: 'My Registered', icon: <CalendarCheck size={20} />, view: 'registered' },
          { label: 'My Certificates', icon: <Award size={20} />, view: 'certificates' },
          { label: 'Profile', icon: <UserCircle size={20} />, view: 'profile' },
        ];
      default:
        return [];
    }
  };

  return (
    <aside className="w-64 bg-white border-r h-screen sticky top-0 flex flex-col shadow-sm">
      <div className="p-6 border-b flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
        <h1 className="text-xl font-bold text-gray-800 tracking-tight">CampusSync</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {getNavItems().map((item) => (
          <button
            key={item.view}
            onClick={() => setActiveView(item.view)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeView === item.view
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t space-y-4">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border text-gray-500">
            <UserCircle size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{currentUser?.name}</p>
            <p className="text-xs text-gray-500 truncate">{currentUser?.role}</p>
          </div>
        </div>
        <button 
          onClick={() => setCurrentUser(null)}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
