import React from 'react';
import { Bell, Search, UserCircle, LogOut } from 'lucide-react';
import { useAppContext } from '../store';
import { ThemeToggle } from './ui/theme-toggle';

const Header: React.FC = () => {
  const { currentUser, setCurrentUser } = useAppContext();

  return (
    <header className="h-16 sticky top-0 z-40 flex items-center justify-between px-6 backdrop-blur-xl bg-[var(--glass-bg)] border-b border-[var(--glass-border)] relative">
      <div className="flex items-center gap-4 flex-1 relative z-10">
        <div className="text-sm font-bold text-[var(--text-primary)] tracking-wide">
          {currentUser?.role || 'Dashboard'}
        </div>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <ThemeToggle className="mr-2 h-7 w-14" />

        <button className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-sidebar-hover)] rounded-lg transition-all">
          <Search size={18} />
        </button>
        <button className="relative p-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-sidebar-hover)] rounded-lg transition-all">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--danger)] rounded-full border-2 border-[var(--bg-app)] animate-pulse"></span>
        </button>
        <div className="h-6 w-px bg-[var(--border-base)]"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-[var(--text-primary)]">{currentUser?.name}</p>
            <p className="text-xs text-[var(--text-muted)] font-medium">{currentUser?.email}</p>
          </div>
          <div className="w-8 h-8 bg-[var(--bg-card-elevated)] rounded-lg flex items-center justify-center border border-[var(--border-base)] backdrop-blur-sm">
            <UserCircle size={18} className="text-[var(--text-secondary)]" />
          </div>
        </div>
        <button
          onClick={() => setCurrentUser(null)}
          className="p-2 text-[var(--text-muted)] hover:text-[var(--danger)] hover:bg-[var(--bg-sidebar-hover)] rounded-lg transition-all"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
