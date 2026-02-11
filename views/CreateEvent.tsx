
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
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Proposal Submitted!</h2>
        <p className="text-gray-500 text-lg">Your event proposal for "{formData.title}" has been sent to the Admin for approval. You'll receive a notification once it's reviewed.</p>
        <div className="pt-8">
          <button 
            onClick={() => setStep(1)}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition-all"
          >
            Go to My Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Event Proposal</h2>
        <p className="text-gray-500">Standardized workflow for event governance and compliance.</p>
      </div>

      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center bg-gray-50 px-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= s.id ? 'bg-indigo-600 text-white ring-4 ring-indigo-50' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > s.id ? <CheckCircle2 size={20} /> : s.id}
            </div>
            <span className={`text-xs mt-2 font-semibold uppercase tracking-wider ${
              step >= s.id ? 'text-indigo-600' : 'text-gray-400'
            }`}>{s.name}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border shadow-xl p-8 animate-in slide-in-from-bottom-4 duration-500">
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-full">
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. National Level Code-A-Thon"
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Description</label>
                <textarea 
                  rows={4}
                  placeholder="Describe the purpose and target audience..."
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event Category</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none appearance-none bg-white"
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
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
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar size={16} /> Date
                </label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Clock size={16} /> Time
                </label>
                <input 
                  type="time" 
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin size={16} /> Venue
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Auditorium"
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.venue}
                  onChange={e => setFormData({...formData, venue: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Budget Requested (₹)</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: e.target.value})}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <Target size={16} /> Key Objectives
              </label>
              <textarea 
                rows={5}
                placeholder="List event objectives (one per line)..."
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.objectives}
                onChange={e => setFormData({...formData, objectives: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Expected Participants</label>
              <input 
                type="number" 
                placeholder="e.g. 100"
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.expectedParticipants}
                onChange={e => setFormData({...formData, expectedParticipants: e.target.value})}
                required
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          {step > 1 ? (
            <button 
              type="button" 
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 px-6 py-3 text-gray-600 font-bold hover:text-gray-900 transition-colors"
            >
              <ChevronLeft size={20} /> Back
            </button>
          ) : <div></div>}
          
          {step < 3 ? (
            <button 
              type="button" 
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
            >
              Continue <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              type="submit"
              className="flex items-center gap-2 px-10 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
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
