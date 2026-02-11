
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
    indigo: 'bg-[#243044] text-[#3B82F6] border-[#3B82F6]/20',
    emerald: 'bg-[#1A2E1A] text-[#10B981] border-[#10B981]/20',
    amber: 'bg-[#2E2419] text-[#F59E0B] border-[#F59E0B]/20',
    rose: 'bg-[#2E1A1A] text-[#EF4444] border-[#EF4444]/20',
    blue: 'bg-[#1E293B] text-[#60A5FA] border-[#60A5FA]/20',
  };

  return (
    <div className="bg-[#1F2937] p-5 border border-[#2D3748] rounded-xl shadow-md hover:shadow-lg hover:border-[#3B82F6]/30 transition-all hover:bg-[#243044]">
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium text-[#94A3B8] uppercase tracking-wide">{label}</p>
        <div className={`p-2 rounded-lg border ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-[#F9FAFB] mb-1">{value}</h3>
        {trend && (
          <p className={`text-xs flex items-center gap-1 ${trend.isUp ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
            <span>{trend.isUp ? '↑' : '↓'}</span>
            <span>{trend.value}% from last month</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
