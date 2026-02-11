
import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Mail,
  Shield,
  MoreVertical,
  Search,
  Filter,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const Organizers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const organizers = [
    { id: '1', name: 'Dr. Sarah Wilson', email: 'sarah.cs@college.edu', dept: 'Computer Science', role: 'Professor', status: 'Active', events: 12 },
    { id: '2', name: 'Prof. James Bond', email: 'james.arts@college.edu', dept: 'Arts & Humanities', role: 'HOD', status: 'Active', events: 8 },
    { id: '3', name: 'Dr. Emily Chen', email: 'emily.it@college.edu', dept: 'Information Technology', role: 'Asst. Professor', status: 'Active', events: 5 },
    { id: '4', name: 'Coach Mike Tyson', email: 'mike.sports@college.edu', dept: 'Physical Education', role: 'Sports Director', status: 'Active', events: 15 },
    { id: '5', name: 'Prof. Robert Kiyosaki', email: 'robert.biz@college.edu', dept: 'Management Studies', role: 'Professor', status: 'Inactive', events: 3 },
    { id: '6', name: 'Dr. Jane Goodall', email: 'jane.env@college.edu', dept: 'Environmental Science', role: 'Research Head', status: 'Active', events: 6 },
  ];

  const filtered = organizers.filter(o =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Organizer Management</h2>
          <p className="text-[var(--text-secondary)]">Authorize faculty and student bodies to host institutional events.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-white rounded-xl font-bold hover:bg-[var(--accent-hover)] hover:shadow-[var(--accent-primary)]/30 transition-all shadow-lg">
          <UserPlus size={20} />
          Add Organizer
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-base)] shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input
            type="text"
            placeholder="Search by name or department..."
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-[var(--border-base)] rounded-lg text-[var(--text-secondary)] font-bold hover:bg-[var(--bg-card-elevated)]">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(org => (
          <div key={org.id} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-base)] p-6 hover:shadow-xl hover:shadow-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/30 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-xl bg-[var(--bg-card-elevated)] flex items-center justify-center text-[var(--accent-primary)] border border-[var(--accent-primary)]/20 group-hover:bg-[var(--accent-primary)] group-hover:text-white transition-all duration-500">
                <Users size={28} />
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${org.status === 'Active' ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30' : 'bg-[var(--bg-card-elevated)] text-[var(--text-muted)] border border-[var(--border-base)]'
                }`}>
                {org.status}
              </div>
            </div>

            <div className="space-y-1 mb-6">
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{org.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] font-medium">{org.role} • {org.dept}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-3 bg-[var(--bg-card-elevated)] rounded-xl border border-[var(--border-base)]">
                <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-tighter">Events Managed</p>
                <p className="text-xl font-black text-[var(--accent-primary)]">{org.events}</p>
              </div>
              <div className="p-3 bg-[var(--bg-card-elevated)] rounded-xl border border-[var(--border-base)]">
                <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-tighter">Auth Level</p>
                <p className="text-xl font-black text-[var(--text-primary)]">Tier 1</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-[var(--bg-card-elevated)] text-[var(--text-secondary)] rounded-lg text-xs font-bold hover:bg-[var(--bg-section)] transition-colors flex items-center justify-center gap-2 border border-[var(--border-base)]">
                <Mail size={14} /> Contact
              </button>
              <button className="px-4 py-3 bg-[var(--bg-card-elevated)] text-[var(--text-muted)] rounded-lg hover:bg-[var(--bg-section)] hover:text-[var(--danger)] transition-colors border border-[var(--border-base)]">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizers;
