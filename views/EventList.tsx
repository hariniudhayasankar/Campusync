
import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Tag, 
  CheckCircle2, 
  Clock, 
  FileText,
  Search,
  Download,
  X,
  Trophy,
  Target
} from 'lucide-react';
import { useAppContext } from '../store';
import { EventStatus, EventProposal } from '../types';

interface EventListProps {
  type: 'upcoming' | 'completed';
}

const EventList: React.FC<EventListProps> = ({ type }) => {
  const { events } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventForModal, setSelectedEventForModal] = useState<EventProposal | null>(null);

  const filteredEvents = events.filter(e => {
    const isCorrectType = type === 'upcoming' 
      ? (e.status === EventStatus.APPROVED || e.status === EventStatus.ACTIVE)
      : e.status === EventStatus.COMPLETED;
    
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return isCorrectType && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight capitalize">{type} Events</h2>
          <p className="text-gray-500">
            {type === 'upcoming' 
              ? 'Institutional schedule of approved campus activities.' 
              : 'Historical archive for NAAC/NBA documentation.'}
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Filter by title or department..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl border-gray-100 bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-3 border bg-white rounded-2xl hover:bg-gray-50 transition-colors shadow-sm">
            <Download size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredEvents.length === 0 ? (
          <div className="bg-white p-20 rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
              <Calendar size={40} className="text-gray-200" />
            </div>
            <h3 className="text-2xl font-black text-gray-300">No records found</h3>
            <p className="text-gray-400 max-w-sm mt-2">There are currently no {type} events matching your criteria in the institutional database.</p>
          </div>
        ) : (
          filteredEvents.map(e => (
            <div key={e.id} className="bg-white rounded-[32px] border p-8 flex flex-col md:flex-row gap-8 hover:shadow-2xl transition-all duration-500 group">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                    {e.category}
                  </span>
                  <span className="text-xs text-gray-400 font-bold tracking-tighter">REF: {e.id.toUpperCase()}</span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{e.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-3xl">{e.description}</p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date & Time</span>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <Calendar size={14} className="text-indigo-500" />
                      {e.date} @ {e.time}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Venue</span>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <MapPin size={14} className="text-rose-500" />
                      {e.venue}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Department</span>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-tighter">
                      <Tag size={14} className="text-amber-500" />
                      {e.department}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Participation</span>
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                      <Users size={14} className="text-emerald-500" />
                      {e.currentRegistrations} Validated Entries
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row md:flex-col justify-end md:justify-center items-center gap-4 border-t md:border-t-0 md:border-l pt-6 md:pt-0 md:pl-10 min-w-[200px]">
                {type === 'completed' ? (
                  <>
                    <button 
                      onClick={() => setSelectedEventForModal(e)}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                      <Trophy size={16} /> Winners
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-100 text-gray-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                      <FileText size={16} /> IQAC Report
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                      Manage Portal
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 px-6 py-4 border-2 border-gray-100 text-gray-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                      Edit Prop
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Winners & Outcomes Modal */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-indigo-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl border overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-10 border-b flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-2">{selectedEventForModal.title}</h3>
                <p className="text-gray-500 font-bold uppercase text-xs tracking-widest">Event Conclusion & Outcomes</p>
              </div>
              <button 
                onClick={() => setSelectedEventForModal(null)}
                className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-colors border"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-10 space-y-10">
              <section>
                <div className="flex items-center gap-3 mb-6 text-indigo-600">
                  <Trophy size={24} />
                  <h4 className="text-xl font-black">Official Winners List</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedEventForModal.winners?.map((winner, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-5 bg-indigo-50 rounded-3xl border border-indigo-100">
                      <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-indigo-600 font-black shadow-sm border">
                        {idx + 1}
                      </div>
                      <span className="font-black text-indigo-900">{winner}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-6 text-emerald-600">
                  <Target size={24} />
                  <h4 className="text-xl font-black">Institutional Outcomes</h4>
                </div>
                <ul className="space-y-4">
                  {selectedEventForModal.outcomes?.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                      <p className="text-gray-600 font-medium leading-relaxed">{outcome}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="p-10 bg-gray-50 border-t flex justify-between items-center">
              <div className="text-xs text-gray-400 font-bold uppercase">Compliance Verified by IQAC</div>
              <button className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
                <Download size={18} /> Download Certificate Set
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
