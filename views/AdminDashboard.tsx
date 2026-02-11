
import React from 'react';
import {
  Calendar,
  Clock,
  Users,
  Award,
  CreditCard,
  ChevronRight,
  Download,
  // Fix: Import CheckCircle to be used in the Stats section
  CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import { useAppContext } from '../store';
import { EventStatus } from '../types';

const data = [
  { name: 'Jan', count: 12 },
  { name: 'Feb', count: 19 },
  { name: 'Mar', count: 32 },
  { name: 'Apr', count: 25 },
  { name: 'May', count: 45 },
];

const categoryData = [
  { name: 'Technical', value: 40 },
  { name: 'Cultural', value: 30 },
  { name: 'Academic', value: 20 },
  { name: 'Sports', value: 10 },
];

const COLORS = ['#475569', '#64748B', '#94A3B8', '#CBD5E1'];

const AdminDashboard: React.FC = () => {
  const { events } = useAppContext();

  const pendingCount = events.filter(e => e.status === EventStatus.PENDING).length;
  const approvedCount = events.filter(e => e.status === EventStatus.APPROVED).length;
  const completedCount = events.filter(e => e.status === EventStatus.COMPLETED).length;

  return (
    <div className="space-y-6 bg-transparent">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2 font-display tracking-tight">Command Center</h1>
          <p className="text-sm text-[var(--text-secondary)] font-medium">Institutional oversight and analytics dashboard</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-primary-hover)] transition-all text-sm font-medium glow-effect-hover">
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Live Events" value={approvedCount} icon={<Calendar size={18} />} color="indigo" />
        <StatCard label="Pending Approval" value={pendingCount} icon={<Clock size={18} />} color="amber" />
        <StatCard label="Completed" value={completedCount} icon={<CheckCircle size={18} />} color="emerald" />
        <StatCard label="Participants" value="4,290" icon={<Users size={18} />} color="blue" trend={{ value: 12, isUp: true }} />
        <StatCard label="Budget" value="₹1.2M" icon={<CreditCard size={18} />} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[var(--bg-card)] p-5 border border-[var(--border-base)] rounded-xl shadow-md">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Participation Trends</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-base)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-card)', 
                    border: `1px solid var(--border-base)`, 
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: 'var(--text-primary)'
                  }} 
                />
                <Bar dataKey="count" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[var(--bg-card)] p-5 border border-[var(--border-base)] rounded-xl shadow-md">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Event Distribution</h3>
          <div className="h-64 w-full flex items-center justify-center gap-8">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-card)', 
                    border: `1px solid var(--border-base)`, 
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: 'var(--text-primary)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm text-[var(--text-primary)]">{entry.name}</span>
                  <span className="text-sm text-[var(--text-muted)]">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--border-base)] rounded-xl overflow-hidden shadow-md">
        <div className="px-5 py-4 border-b border-[var(--border-base)] flex justify-between items-center bg-[var(--bg-section)]">
          <h3 className="text-sm font-semibold text-[var(--text-primary)]">Recent Activity</h3>
          <button className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] flex items-center gap-1 transition-colors">
            View All <ChevronRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--bg-section)] border-b border-[var(--border-base)]">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Event</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Department</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-base)]">
              {events.slice(0, 5).map((e) => (
                <tr key={e.id} className="hover:bg-[var(--bg-card-elevated)] transition-colors">
                  <td className="px-5 py-4">
                    <div className="text-sm font-medium text-[var(--text-primary)]">{e.title}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-[var(--text-secondary)]">{e.department}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      e.status === EventStatus.APPROVED 
                        ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20' 
                        : e.status === EventStatus.PENDING 
                        ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20'
                        : 'bg-[var(--bg-card-elevated)] text-[var(--text-secondary)] border border-[var(--border-base)]'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm text-[var(--text-muted)]">{e.date}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
