
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Event Approvals</h2>
          <p className="text-gray-500">Review and approve new event proposals from departments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-semibold text-gray-700 uppercase text-xs tracking-wider">Queue ({pendingEvents.length})</h3>
          {pendingEvents.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border flex flex-col items-center text-center">
              <Check className="text-emerald-500 mb-2" size={32} />
              <p className="text-gray-600 font-medium">All caught up!</p>
              <p className="text-xs text-gray-400">No new proposals pending review.</p>
            </div>
          ) : (
            pendingEvents.map(e => (
              <button
                key={e.id}
                onClick={() => setSelectedEventId(e.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all ${
                  selectedEventId === e.id ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-100' : 'bg-white hover:border-indigo-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-indigo-600 uppercase">{e.category}</span>
                  <span className="text-xs text-gray-400">{e.date}</span>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{e.title}</h4>
                <p className="text-xs text-gray-500 truncate">{e.department}</p>
              </button>
            ))
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedEvent ? (
            <div className="bg-white rounded-2xl border shadow-sm animate-in slide-in-from-right-4 duration-300">
              <div className="p-8 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedEvent.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Proposed Budget</span>
                    <span className="text-xl font-bold text-indigo-600">₹{selectedEvent.budget?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-8 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info size={16} className="text-indigo-600" />
                    General Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <span className="block text-xs text-gray-500">Organizer</span>
                      <span className="font-medium">{selectedEvent.organizerName}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">Department</span>
                      <span className="font-medium">{selectedEvent.department}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">Schedule</span>
                      <span className="font-medium">{selectedEvent.date} at {selectedEvent.time}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-gray-500">Venue</span>
                      <span className="font-medium">{selectedEvent.venue}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertCircle size={16} className="text-indigo-600" />
                    Event Objectives
                  </h4>
                  <ul className="space-y-2">
                    {selectedEvent.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0"></div>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-8 bg-gray-50 border-t flex justify-between items-center">
                <button className="flex items-center gap-2 text-gray-600 font-medium hover:text-gray-900">
                  <FileText size={20} />
                  View Full Proposal PDF
                </button>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      updateEventStatus(selectedEvent.id, EventStatus.REJECTED, 'Budget exceeds departmental allowance.');
                      setSelectedEventId(null);
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 border border-rose-200 text-rose-600 bg-white rounded-xl font-semibold hover:bg-rose-50 transition-colors"
                  >
                    <X size={18} />
                    Reject
                  </button>
                  <button 
                    onClick={() => {
                      updateEventStatus(selectedEvent.id, EventStatus.APPROVED);
                      setSelectedEventId(null);
                    }}
                    className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-shadow shadow-md"
                  >
                    <Check size={18} />
                    Approve Event
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-dashed h-[600px] flex flex-col items-center justify-center text-center p-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Info size={32} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-400">Select a proposal to review</h3>
              <p className="text-gray-400 max-w-xs">Detailed event information, budget breakdowns, and compliance checks will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventApprovals;
