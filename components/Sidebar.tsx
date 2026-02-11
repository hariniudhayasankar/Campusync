
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
  UserCircle,
  Building2
} from 'lucide-react';
import { UserRole } from '../types';
import { useAppContext } from '../store';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  view: string;
}

const Sidebar: React.FC<{ activeView: string, setActiveView: (view: string) => void }> = ({ activeView, setActiveView }) => {
  const { currentUser } = useAppContext();

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
      case UserRole.MANAGEMENT:
        return [
          { label: 'Overview', icon: <LayoutDashboard size={20} />, view: 'dashboard' },
          { label: 'Institutions', icon: <Building2 size={20} />, view: 'institutions' },
        ];
      default:
        return [];
    }
  };

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col border-r border-[var(--border-base)] backdrop-blur-xl bg-[var(--bg-sidebar)]/80 relative z-20 transition-colors duration-300">
      <div className="p-4 border-b border-[var(--border-base)] relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-glow)] rounded-lg flex items-center justify-center shadow-lg shadow-[var(--accent-primary)]/20">
            <span className="text-white font-bold text-sm">CS</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-[var(--text-primary)] tracking-tight font-display">CampusSync</h1>
            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Command Center</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto relative z-10">
        {getNavItems().map((item) => (
          <button
            key={item.view}
            onClick={() => setActiveView(item.view)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all relative group ${activeView === item.view
                ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-sidebar-hover)] hover:text-[var(--text-primary)]'
              }`}
          >
            <div className={`transition-colors ${activeView === item.view ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--accent-primary)]'}`}>
              {item.icon}
            </div>
            <span className="tracking-wide">{item.label}</span>
            {activeView === item.view && (
              <div className="absolute left-0 w-1 h-6 bg-[var(--accent-primary)] rounded-full -ml-3"></div>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
