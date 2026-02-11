
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
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2 capitalize font-display tracking-tight">{type} Events</h1>
          <p className="text-sm text-[var(--text-secondary)] font-medium">
            {type === 'upcoming'
              ? 'Schedule of approved campus activities'
              : 'Historical archive for documentation'}
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border border-[var(--border-base)] rounded-lg focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] outline-none text-sm bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)]"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 border border-[var(--border-base)] bg-[var(--bg-card)] rounded-lg hover:bg-[var(--bg-card-elevated)] hover:border-[var(--accent-primary)] transition-colors">
            <Download size={16} className="text-[var(--text-secondary)]" />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredEvents.length === 0 ? (
          <div className="bg-[var(--bg-card)] p-12 border border-[var(--border-base)] rounded-xl flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-[var(--bg-section)] rounded-lg flex items-center justify-center mb-4 border border-[var(--border-base)]">
              <Calendar size={24} className="text-[var(--text-muted)]" />
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-1">No events found</h3>
            <p className="text-xs text-[var(--text-muted)] max-w-sm">No {type} events match your search criteria</p>
          </div>
        ) : (
          filteredEvents.map(e => (
            <div key={e.id} className="bg-[var(--bg-card)] border border-[var(--border-base)] rounded-xl p-5 hover:border-[var(--accent-primary)]/50 hover:shadow-lg hover:bg-[var(--bg-card-elevated)] transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[var(--bg-card-elevated)] text-[var(--accent-primary)] rounded text-xs font-medium uppercase border border-[var(--accent-primary)]/20">
                      {e.category}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">ID: {e.id.toUpperCase()}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1">{e.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{e.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[var(--text-muted)]" />
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Date</div>
                    <div className="text-sm font-medium text-[var(--text-primary)]">{e.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-[var(--text-muted)]" />
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Venue</div>
                    <div className="text-sm font-medium text-[var(--text-primary)]">{e.venue}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[var(--text-muted)]" />
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Department</div>
                    <div className="text-sm font-medium text-[var(--text-primary)]">{e.department}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-[var(--text-muted)]" />
                  <div>
                    <div className="text-xs text-[var(--text-muted)]">Participants</div>
                    <div className="text-sm font-medium text-[var(--text-primary)]">{e.currentRegistrations}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-base)]">
                <div className="text-xs text-[var(--text-muted)]">
                  Capacity: {e.currentRegistrations} / {e.capacity}
                </div>
                <div className="flex gap-2">
                  {type === 'completed' ? (
                    <>
                      <button
                        onClick={() => setSelectedEventForModal(e)}
                        className="px-3 py-1.5 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-all text-xs font-medium shadow-lg hover:shadow-[var(--accent-primary)]/20"
                      >
                        View Results
                      </button>
                      <button className="px-3 py-1.5 border border-[var(--border-base)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--bg-card-elevated)] hover:border-[var(--accent-primary)]/50 transition-colors text-xs font-medium">
                        Export
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="px-3 py-1.5 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-all text-xs font-medium shadow-lg hover:shadow-[var(--accent-primary)]/20">
                        Manage
                      </button>
                      <button className="px-3 py-1.5 border border-[var(--border-base)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--bg-card-elevated)] hover:border-[var(--accent-primary)]/50 transition-colors text-xs font-medium">
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Winners & Outcomes Modal */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm">
          <div className="bg-[var(--bg-card)] w-full max-w-2xl rounded-xl border border-[var(--border-base)] shadow-xl">
            <div className="px-6 py-4 border-b border-[var(--border-base)] flex justify-between items-center bg-[var(--bg-section)]">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">{selectedEventForModal.title}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1">Event Results & Outcomes</p>
              </div>
              <button
                onClick={() => setSelectedEventForModal(null)}
                className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-elevated)] rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Trophy size={18} className="text-[var(--accent-primary)]" />
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">Winners</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedEventForModal.winners?.map((winner, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-[var(--bg-section)] rounded-lg border border-[var(--border-base)]">
                      <div className="w-8 h-8 bg-[var(--bg-card-elevated)] text-[var(--accent-primary)] rounded-lg flex items-center justify-center text-sm font-semibold border border-[var(--accent-primary)]/20">
                        {idx + 1}
                      </div>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{winner}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Target size={18} className="text-[var(--accent-primary)]" />
                  <h4 className="text-sm font-semibold text-[var(--text-primary)]">Outcomes</h4>
                </div>
                <ul className="space-y-2">
                  {selectedEventForModal.outcomes?.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <div className="w-1 h-1 rounded-full bg-[var(--accent-primary)] mt-2 flex-shrink-0"></div>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="px-6 py-4 bg-[var(--bg-section)] border-t border-[var(--border-base)] flex justify-between items-center">
              <div className="text-xs text-[var(--text-muted)]">Verified by IQAC</div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-all text-sm font-medium shadow-lg hover:shadow-[var(--accent-primary)]/20">
                <Download size={16} />
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventList;
