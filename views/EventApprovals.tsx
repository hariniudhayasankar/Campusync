
import React, { useState } from 'react';
import { Check, X, AlertCircle, Info, FileText } from 'lucide-react';
import { useAppContext } from '../store';
import { EventStatus } from '../types';

const EventApprovals: React.FC = () => {
  const { events, updateEventStatus } = useAppContext();
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const pendingEvents = events.filter(e => e.status === EventStatus.PENDING);
  const selectedEvent = events.find(e => e.id === selectedEventId);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2 font-display tracking-tight">Event Approvals</h1>
        <p className="text-sm text-[var(--text-secondary)] font-medium">Review and approve new event proposals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-2">
          <div className="px-3 py-2 bg-[var(--bg-section)] border-b border-[var(--border-base)] rounded-t-lg">
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Queue ({pendingEvents.length})</h3>
          </div>
          {pendingEvents.length === 0 ? (
            <div className="bg-[var(--bg-card)] p-8 border border-[var(--border-base)] rounded-lg flex flex-col items-center text-center">
              <Check className="text-[var(--success)] mb-2" size={24} />
              <p className="text-sm font-medium text-[var(--text-secondary)]">All caught up</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">No proposals pending review</p>
            </div>
          ) : (
            <div className="space-y-2 bg-[var(--bg-card)] border border-[var(--border-base)] rounded-b-lg p-2">
              {pendingEvents.map(e => (
                <button
                  key={e.id}
                  onClick={() => setSelectedEventId(e.id)}
                  className={`w-full text-left p-4 border rounded-lg transition-all ${selectedEventId === e.id
                      ? 'bg-[var(--bg-card-elevated)] border-[var(--accent-primary)] border-l-2'
                      : 'bg-[var(--bg-card)] border-[var(--border-base)] hover:border-[var(--border-elevated)] hover:bg-[var(--bg-card-elevated)]'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium text-[var(--accent-primary)] uppercase">{e.category}</span>
                    <span className="text-xs text-[var(--text-muted)]">{e.date}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{e.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] truncate">{e.department}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedEvent ? (
            <div className="bg-[var(--bg-card)] border border-[var(--border-base)] rounded-xl shadow-md">
              <div className="p-6 border-b border-[var(--border-base)]">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{selectedEvent.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{selectedEvent.description}</p>
                  </div>
                  <div className="ml-6 text-right">
                    <span className="block text-xs font-medium text-[var(--text-muted)] uppercase mb-1">Budget</span>
                    <span className="text-lg font-semibold text-[var(--text-primary)]">₹{selectedEvent.budget?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Info size={14} className="text-[var(--text-muted)]" />
                    Information
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <span className="block text-xs text-[var(--text-muted)] mb-1">Organizer</span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{selectedEvent.organizerName}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-[var(--text-muted)] mb-1">Department</span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{selectedEvent.department}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-[var(--text-muted)] mb-1">Schedule</span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{selectedEvent.date} at {selectedEvent.time}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-[var(--text-muted)] mb-1">Venue</span>
                      <span className="text-sm font-medium text-[var(--text-primary)]">{selectedEvent.venue}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertCircle size={14} className="text-[var(--text-muted)]" />
                    Objectives
                  </h4>
                  <ul className="space-y-2">
                    {selectedEvent.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <div className="w-1 h-1 rounded-full bg-[var(--accent-primary)] mt-2 flex-shrink-0"></div>
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 py-4 bg-[var(--bg-section)] border-t border-[var(--border-base)] flex justify-between items-center">
                <button className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors">
                  <FileText size={16} />
                  View PDF
                </button>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      updateEventStatus(selectedEvent.id, EventStatus.REJECTED, 'Budget exceeds departmental allowance.');
                      setSelectedEventId(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 border border-[var(--border-base)] text-[var(--text-secondary)] bg-[var(--bg-card)] rounded-lg hover:bg-[var(--bg-card-elevated)] hover:border-[var(--danger)] transition-colors text-sm font-medium"
                  >
                    <X size={16} />
                    Reject
                  </button>
                  <button
                    onClick={() => {
                      updateEventStatus(selectedEvent.id, EventStatus.APPROVED);
                      setSelectedEventId(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-primary)] text-white rounded-lg hover:bg-[var(--accent-hover)] transition-all text-sm font-medium shadow-lg hover:shadow-[var(--accent-primary)]/20"
                  >
                    <Check size={16} />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[var(--bg-card)] border border-[var(--border-base)] rounded-xl h-[600px] flex flex-col items-center justify-center text-center p-12">
              <div className="w-12 h-12 bg-[var(--bg-section)] rounded-lg flex items-center justify-center mb-4 border border-[var(--border-base)]">
                <Info size={24} className="text-[var(--text-muted)]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Select a proposal</h3>
              <p className="text-xs text-[var(--text-muted)] max-w-xs">Event details and compliance information will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventApprovals;
