
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isUp: boolean;
  };
  color: 'indigo' | 'emerald' | 'amber' | 'rose' | 'blue';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, trend, color }) => {
  const colorMap = {
    indigo: 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-[var(--accent-primary)]/20',
    emerald: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
    amber: 'bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20',
    rose: 'bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20',
    blue: 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border-[var(--accent-primary)]/20',
  };

  return (
    <div className="bg-[var(--bg-card)] p-5 border border-[var(--border-base)] rounded-xl shadow-md hover:shadow-lg hover:border-[var(--accent-primary)]/30 transition-all hover:bg-[var(--bg-card-elevated)]">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wide">{label}</p>
        <div className={`p-2 rounded-lg border ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-1">{value}</h3>
        {trend && (
          <p className={`text-xs flex items-center gap-1 ${trend.isUp ? 'text-[var(--success)]' : 'text-[var(--danger)]'}`}>
            <span>{trend.isUp ? '↑' : '↓'}</span>
            <span>{trend.value}% from last month</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
