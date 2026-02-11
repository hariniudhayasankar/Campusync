
import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Send,
  Calendar,
  MapPin,
  Clock,
  Target
} from 'lucide-react';
import { useAppContext } from '../store';

const CreateEvent: React.FC = () => {
  const { addEvent, currentUser } = useAppContext();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technical',
    date: '',
    time: '',
    venue: '',
    budget: '',
    expectedParticipants: '',
    objectives: ''
  });

  const steps = [
    { id: 1, name: 'Basic Details' },
    { id: 2, name: 'Logistic & Budget' },
    { id: 3, name: 'Objectives' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fix: Added college and district from currentUser to satisfy EventProposal interface
    addEvent({
      ...formData,
      budget: parseInt(formData.budget) || 0,
      expectedParticipants: parseInt(formData.expectedParticipants) || 0,
      objectives: formData.objectives.split('\n').filter(o => o.trim() !== ''),
      organizerId: currentUser?.id || 'unknown',
      organizerName: currentUser?.name || 'Anonymous',
      department: currentUser?.department || 'General',
      capacity: parseInt(formData.expectedParticipants) || 0,
      college: currentUser?.college || 'Institutional',
      district: currentUser?.district || 'General'
    });
    setStep(4); // Success state
  };

  if (step === 4) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
        <div className="w-20 h-20 bg-[var(--bg-card-elevated)] text-[var(--success)] rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--success)]/30">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Proposal Submitted!</h2>
        <p className="text-[var(--text-secondary)] text-lg">Your event proposal for "{formData.title}" has been sent to the Admin for approval. You'll receive a notification once it's reviewed.</p>
        <div className="pt-8">
          <button
            onClick={() => setStep(1)}
            className="px-8 py-3 bg-[var(--accent-primary)] text-white rounded-xl font-bold hover:bg-[var(--accent-hover)] hover:shadow-[var(--accent-primary)]/30 shadow-lg transition-all"
          >
            Go to My Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 bg-transparent">
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Create Event Proposal</h2>
        <p className="text-[var(--text-secondary)]">Standardized workflow for event governance and compliance.</p>
      </div>

      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[var(--border-base)] -z-10 -translate-y-1/2"></div>
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center bg-[var(--bg-app)] px-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s.id ? 'bg-[var(--accent-primary)] text-white ring-4 ring-[var(--accent-primary)]/20 shadow-[var(--accent-primary)]/30' : 'bg-[var(--bg-card-elevated)] text-[var(--text-muted)] border border-[var(--border-base)]'
              }`}>
              {step > s.id ? <CheckCircle2 size={20} /> : s.id}
            </div>
            <span className={`text-xs mt-2 font-semibold uppercase tracking-wider ${step >= s.id ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)]'
              }`}>{s.name}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-base)] shadow-xl p-8 animate-in slide-in-from-bottom-4 duration-500">
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">Event Title</label>
                <input
                  type="text"
                  placeholder="e.g. National Level Code-A-Thon"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">Event Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe the purpose and target audience..."
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">Event Category</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none appearance-none"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>Technical</option>
                  <option>Cultural</option>
                  <option>Workshop</option>
                  <option>Sports</option>
                  <option>Seminar</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <Calendar size={16} /> Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <Clock size={16} /> Time
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none"
                  value={formData.time}
                  onChange={e => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <MapPin size={16} /> Venue
                </label>
                <input
                  type="text"
                  placeholder="e.g. Auditorium"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none"
                  value={formData.venue}
                  onChange={e => setFormData({ ...formData, venue: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">Budget Requested (₹)</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none"
                  value={formData.budget}
                  onChange={e => setFormData({ ...formData, budget: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <Target size={16} /> Key Objectives
              </label>
              <textarea
                rows={5}
                placeholder="List event objectives (one per line)..."
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all"
                value={formData.objectives}
                onChange={e => setFormData({ ...formData, objectives: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-[var(--text-primary)] mb-2">Expected Participants</label>
              <input
                type="number"
                placeholder="e.g. 100"
                className="w-full px-4 py-3 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none"
                value={formData.expectedParticipants}
                onChange={e => setFormData({ ...formData, expectedParticipants: e.target.value })}
                required
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-12 pt-8 border-t border-[#2D3748]">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-6 py-3 text-[#CBD5E1] font-bold hover:text-[#F9FAFB] transition-colors"
            >
              <ChevronLeft size={20} /> Back
            </button>
          ) : <div></div>}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-8 py-3 bg-[#3B82F6] text-white rounded-lg font-bold hover:bg-[#60A5FA] hover:shadow-[#3B82F6]/30 shadow-lg transition-all"
            >
              Continue <ChevronRight size={20} />
            </button>
          ) : (
            <button
              type="submit"
              className="flex items-center gap-2 px-10 py-3 bg-[#3B82F6] text-white rounded-lg font-bold hover:bg-[#60A5FA] hover:shadow-[#3B82F6]/30 shadow-lg transition-all"
            >
              Submit Proposal <Send size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
