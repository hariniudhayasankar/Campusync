
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

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444'];

const AdminDashboard: React.FC = () => {
  const { events } = useAppContext();
  
  const pendingCount = events.filter(e => e.status === EventStatus.PENDING).length;
  const approvedCount = events.filter(e => e.status === EventStatus.APPROVED).length;
  const completedCount = events.filter(e => e.status === EventStatus.COMPLETED).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Institutional Oversight</h2>
          <p className="text-gray-500">Welcome back, Admin. Here is the campus activity overview.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">
          <Download size={18} />
          Export IQAC Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard label="Live Events" value={approvedCount} icon={<Calendar size={22} />} color="indigo" />
        <StatCard label="Awaiting Approval" value={pendingCount} icon={<Clock size={22} />} color="amber" />
        <StatCard label="Completed Events" value={completedCount} icon={<CheckCircle size={22} />} color="emerald" />
        <StatCard label="Total Participants" value="4,290" icon={<Users size={22} />} color="blue" trend={{ value: 12, isUp: true }} />
        <StatCard label="Budget Utilized" value="₹1.2M" icon={<CreditCard size={22} />} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-lg font-bold mb-6">Participation Trends</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="text-lg font-bold mb-6">Event Distribution</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-gray-600">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">Recent Approvals</h3>
          <button className="text-indigo-600 font-medium text-sm flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Event Title</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {events.slice(0, 5).map((e) => (
                <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{e.title}</td>
                  <td className="px-6 py-4 text-gray-600">{e.department}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      e.status === EventStatus.APPROVED ? 'bg-emerald-100 text-emerald-700' :
                      e.status === EventStatus.PENDING ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{e.date}</td>
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
