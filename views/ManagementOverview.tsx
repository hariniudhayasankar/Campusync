
import React from 'react';
import { Building2, Users } from 'lucide-react';

const ManagementOverview: React.FC = () => {
  // Calculate totals from institutions data
  const totalInstitutions = 5; // Active + Pending
  const totalStudents = 40500; // Sum of all stats

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)] mb-2">Super Admin Dashboard</h1>
        <p className="text-[var(--text-secondary)]">Overview of registered institutions and students</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Institutions Card */}
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-base)] p-8 hover:shadow-lg hover:shadow-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/30 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="p-4 bg-[var(--bg-card-elevated)] rounded-xl border border-[var(--accent-primary)]/20">
              <Building2 className="text-[var(--accent-primary)]" size={32} />
            </div>
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider mb-2">Total Enrolled Institutions</p>
            <p className="text-4xl font-black text-[var(--text-primary)] mb-1">{totalInstitutions}</p>
            <p className="text-xs text-[var(--text-secondary)]">Active and pending institutions</p>
          </div>
        </div>

        {/* Total Students Card */}
        <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-base)] p-8 hover:shadow-lg hover:shadow-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/30 transition-all">
          <div className="flex items-center justify-between mb-6">
            <div className="p-4 bg-[var(--bg-card-elevated)] rounded-xl border border-[var(--accent-primary)]/20">
              <Users className="text-[var(--accent-glow)]" size={32} />
            </div>
          </div>
          <div>
            <p className="text-sm text-[var(--text-muted)] font-medium uppercase tracking-wider mb-2">Total Students Enrolled</p>
            <p className="text-4xl font-black text-[var(--text-primary)] mb-1">{totalStudents.toLocaleString()}</p>
            <p className="text-xs text-[var(--text-secondary)]">Across all institutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementOverview;
