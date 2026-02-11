
import React, { useState } from 'react';
import { Search, MoreVertical, Building2, Users, Plus } from 'lucide-react';

interface Institution {
  id: string;
  name: string;
  admin: string;
  district: string;
  type: string;
  status: 'ACTIVE' | 'PENDING';
  stats: number;
}

interface SuperAdminDashboardProps {
  onEnrollClick?: () => void;
}

const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onEnrollClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const institutions: Institution[] = [
    {
      id: 'TN-1001',
      name: 'Anna University',
      admin: 'admin@annauniv.edu',
      district: 'Chennai',
      type: 'UNIVERSITY',
      status: 'ACTIVE',
      stats: 12500
    },
    {
      id: 'TN-1002',
      name: 'PSG College of Technology',
      admin: 'principal@psgtech.edu',
      district: 'Coimbatore',
      type: 'ENGINEERING',
      status: 'ACTIVE',
      stats: 8500
    },
    {
      id: 'TN-1003',
      name: 'Madras Christian College',
      admin: 'admin@mcc.edu',
      district: 'Chennai',
      type: 'ARTS & SCIENCE',
      status: 'ACTIVE',
      stats: 6200
    },
    {
      id: 'TN-1004',
      name: 'NIT Trichy',
      admin: 'director@nitt.edu',
      district: 'Trichy',
      type: 'ENGINEERING',
      status: 'ACTIVE',
      stats: 7800
    },
    {
      id: 'TN-1005',
      name: 'Loyola College',
      admin: 'principal@loyola.edu',
      district: 'Chennai',
      type: 'ARTS & SCIENCE',
      status: 'PENDING',
      stats: 5400
    }
  ];

  const filteredInstitutions = institutions.filter(inst =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inst.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 bg-transparent">
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">Super Admin Dashboard</h1>
        <p className="text-[var(--text-secondary)]">Manage registered institutions</p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Registered Institutions</h2>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
              <input
                type="text"
                placeholder="Search colleges..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all text-sm"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            {onEnrollClick && (
              <button
                onClick={onEnrollClick}
                className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent-primary)] text-white rounded-lg text-sm font-bold hover:bg-[var(--accent-hover)] transition-all shadow-lg shadow-[var(--accent-primary)]/20"
              >
                <Plus size={16} />
                Enroll Institution
              </button>
            )}
          </div>
        </div>

        <div className="bg-[var(--bg-section)] rounded-xl border border-[var(--border-base)] overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--bg-card)] border-b border-[var(--border-base)]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">Institution Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">Admin</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">District</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">Stats</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-base)]">
                {filteredInstitutions.map((inst) => (
                  <tr key={inst.id} className="hover:bg-[var(--bg-card)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--accent-primary)]/30 flex items-center justify-center text-[var(--accent-primary)] font-bold text-sm">
                          {getInitials(inst.name)}
                        </div>
                        <div>
                          <div className="font-bold text-[var(--text-primary)] text-sm">{inst.name}</div>
                          <div className="text-xs text-[var(--text-muted)] font-medium">{inst.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[var(--text-secondary)] font-medium">{inst.admin}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[var(--text-secondary)] font-medium">{inst.district}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold text-[var(--text-secondary)] bg-[var(--bg-card-elevated)] border border-[var(--border-base)]">
                        {inst.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase border ${inst.status === 'ACTIVE'
                        ? 'text-[var(--success)] bg-[var(--success)]/10 border-[var(--success)]/30'
                        : 'text-[var(--warning)] bg-[var(--warning)]/10 border-[var(--warning)]/30'
                        }`}>
                        {inst.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-[var(--text-muted)]" />
                        <span className="text-sm font-bold text-[var(--text-primary)]">{inst.stats.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] hover:bg-[var(--bg-card-elevated)] rounded-lg transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
