
import React from 'react';
import { 
  Building2, 
  Shield, 
  Bell, 
  Database, 
  FileText, 
  Globe,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

const Settings: React.FC = () => {
  const sections = [
    {
      title: 'Institutional Profile',
      icon: <Building2 className="text-[#3B82F6]" />,
      items: ['College Name & Logo', 'Department Hierarchy', 'Campus Locations', 'Official Domains']
    },
    {
      title: 'Accreditation Meta',
      icon: <Shield className="text-[#10B981]" />,
      items: ['NAAC/NBA Settings', 'Outcome Mapping Rules', 'Compliance Templates', 'Archive Policy']
    },
    {
      title: 'Governance & Security',
      icon: <Database className="text-[#3B82F6]" />,
      items: ['Role-Based Access', 'Audit Logs', 'Data Encryption', 'Backup Management']
    },
    {
      title: 'Communication',
      icon: <Bell className="text-[#F59E0B]" />,
      items: ['Notification Prefs', 'Email Templates', 'Student Broadcasts', 'Alert Systems']
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
        <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tight mb-2">Institutional Settings</h2>
        <p className="text-[var(--text-secondary)] text-lg">Manage global configurations for CampusSync and compliance metadata.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-base)] p-8 shadow-lg hover:shadow-xl hover:shadow-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/30 transition-all cursor-pointer group">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-[var(--bg-card-elevated)] rounded-xl border border-[var(--accent-primary)]/20 group-hover:scale-110 transition-transform duration-500 group-hover:border-[var(--accent-primary)]/40">
                {section.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{section.title}</h3>
            </div>
            
            <div className="space-y-2">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-[var(--bg-card-elevated)] transition-colors group/item">
                  <span className="text-sm font-medium text-[var(--text-secondary)]">{item}</span>
                  <ChevronRight size={16} className="text-[var(--text-muted)] group-hover/item:text-[var(--accent-primary)] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[var(--bg-card)] border border-[var(--accent-primary)]/30 rounded-xl p-10 text-[var(--text-primary)] relative overflow-hidden shadow-2xl shadow-[var(--accent-primary)]/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent-primary)] opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl font-black mb-4">IQAC Sync Enabled</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">Your campus data is currently being synchronized with the IQAC cloud for real-time accreditation tracking. Last sync: 2 hours ago.</p>
          </div>
          <button className="px-8 py-4 bg-[var(--accent-primary)] text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[var(--accent-hover)] hover:shadow-[var(--accent-primary)]/30 transition-all shadow-lg">
            Trigger Manual Sync
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
