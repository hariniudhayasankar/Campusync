
import React from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  PieChart as PieChartIcon, 
  Users, 
  Calendar,
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '../store';
import { EventStatus } from '../types';

const Reports: React.FC = () => {
  const { events } = useAppContext();
  const completedEvents = events.filter(e => e.status === EventStatus.COMPLETED);

  const reportTypes = [
    { title: 'IQAC Annual Report', desc: 'Comprehensive summary of all campus events, participation trends, and institutional outcomes.', icon: <ShieldCheck className="text-indigo-600" /> },
    { title: 'NAAC Documentation', desc: 'Structured evidence files including brochures, winner lists, and outcome summaries per department.', icon: <FileText className="text-emerald-600" /> },
    { title: 'NBA Compliance Pack', desc: 'Technical event mapping to Program Outcomes (POs) and Course Outcomes (COs).', icon: <PieChartIcon className="text-amber-600" /> },
    { title: 'Participation Census', desc: 'Detailed breakdown of student involvement by year, gender, and department.', icon: <Users className="text-rose-600" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reports & Accreditation</h2>
          <p className="text-gray-500">Generate compliance-ready documentation for institutional bodies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex gap-4 items-start">
              <div className="p-4 bg-gray-50 rounded-2xl border group-hover:scale-110 transition-transform">
                {report.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{report.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{report.desc}</p>
                <button className="flex items-center gap-2 text-indigo-600 text-sm font-black uppercase tracking-wider hover:underline">
                  Download PDF <Download size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold">Event Audit Trail (Ready for Export)</h3>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700 transition-all">
            Export All to Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Event</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">IQAC Meta</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Participants</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Compliance</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {completedEvents.map((e) => (
                <tr key={e.id} className="hover:bg-indigo-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{e.title}</div>
                    <div className="text-xs text-gray-400">{e.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {e.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-700">{e.currentRegistrations}</div>
                    <div className="text-[10px] text-gray-400">Total Valid Entry</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs uppercase">
                      <ShieldCheck size={14} /> Verified
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-400 hover:text-indigo-600">
                      <ChevronRight size={18} />
                    </button>
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

export default Reports;
