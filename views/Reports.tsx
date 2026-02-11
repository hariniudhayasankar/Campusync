
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
    { title: 'IQAC Annual Report', desc: 'Comprehensive summary of all campus events, participation trends, and institutional outcomes.', icon: <ShieldCheck className="text-[#3B82F6]" /> },
    { title: 'NAAC Documentation', desc: 'Structured evidence files including brochures, winner lists, and outcome summaries per department.', icon: <FileText className="text-[#10B981]" /> },
    { title: 'NBA Compliance Pack', desc: 'Technical event mapping to Program Outcomes (POs) and Course Outcomes (COs).', icon: <PieChartIcon className="text-[#3B82F6]" /> },
    { title: 'Participation Census', desc: 'Detailed breakdown of student involvement by year, gender, and department.', icon: <Users className="text-[#06B6D4]" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-[var(--text-primary)]">Reports & Accreditation</h2>
          <p className="text-[var(--text-secondary)] mt-1">Generate compliance-ready documentation for institutional bodies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report, idx) => (
          <div key={idx} className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-base)] hover:shadow-lg hover:shadow-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/30 transition-all cursor-pointer group">
            <div className="flex gap-4 items-start">
              <div className="p-4 bg-[var(--bg-card-elevated)] rounded-xl border border-[var(--accent-primary)]/20 group-hover:scale-110 transition-transform group-hover:border-[var(--accent-primary)]/40">
                {report.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1">{report.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{report.desc}</p>
                <button className="flex items-center gap-2 text-[var(--accent-primary)] text-sm font-black uppercase tracking-wider hover:text-[var(--accent-hover)] transition-colors">
                  Download PDF <Download size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-base)] shadow-lg overflow-hidden">
        <div className="p-6 border-b border-[var(--border-base)] flex justify-between items-center bg-[var(--bg-section)]">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Event Audit Trail (Ready for Export)</h3>
          <button className="px-6 py-3 bg-[var(--accent-primary)] text-white rounded-lg text-xs font-bold shadow-md hover:bg-[var(--accent-hover)] hover:shadow-[var(--accent-primary)]/30 transition-all">
            Export All to Excel
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[var(--bg-section)] border-b border-[var(--border-base)]">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">Event</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">IQAC Meta</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">Participants</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">Compliance</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-base)]">
              {completedEvents.map((e) => (
                <tr key={e.id} className="hover:bg-[var(--bg-card-elevated)] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[var(--text-primary)]">{e.title}</div>
                    <div className="text-xs text-[var(--text-muted)]">{e.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-card-elevated)] px-3 py-1 rounded-lg border border-[var(--border-base)]">
                      {e.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-[var(--text-primary)]">{e.currentRegistrations}</div>
                    <div className="text-[10px] text-[var(--text-muted)]">Total Valid Entry</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-[var(--success)] font-bold text-xs uppercase">
                      <ShieldCheck size={14} /> Verified
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
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
