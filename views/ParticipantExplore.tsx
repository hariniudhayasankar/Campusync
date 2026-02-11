

import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Users, ChevronRight, Check, School, Building2 } from 'lucide-react';
import { useAppContext } from '../store';
import { EventStatus } from '../types';
import collegesData from '../data/colleges.json';

const ParticipantExplore: React.FC = () => {
  const { events } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [selectedCollege, setSelectedCollege] = useState('All Colleges');
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);

  const districts = useMemo(() => ['All Districts', ...collegesData.districts], []);

  const collegesInDistrict = useMemo(() => {
    if (selectedDistrict === 'All Districts') return [];

    // Filter colleges by selected district
    const colleges = collegesData.colleges
      .filter(c => c.district === selectedDistrict)
      .map(c => c.college_name);

    // Sort alphabetically
    colleges.sort();

    return ['All Colleges', ...colleges];
  }, [selectedDistrict]);

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.college.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
    const matchesDistrict = selectedDistrict === 'All Districts' || e.district === selectedDistrict;
    const matchesCollege = selectedCollege === 'All Colleges' || e.college === selectedCollege;

    return matchesSearch && matchesCategory && matchesDistrict && matchesCollege && e.status === EventStatus.APPROVED;
  });

  const categories = ['All', 'Technical', 'Cultural', 'Academic', 'Sports', 'Workshop'];

  const handleRegister = (id: string) => {
    if (!registeredEvents.includes(id)) {
      setRegisteredEvents([...registeredEvents, id]);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative h-72 rounded-xl overflow-hidden bg-[var(--bg-section)] border border-[var(--border-base)] flex items-center justify-center text-center p-8 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/10 via-[var(--accent-glow)]/10 to-[var(--accent-primary)]/10"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-black text-[var(--text-primary)] mb-4 tracking-tight drop-shadow-lg">Tamil Nadu Student Hub</h1>
          <p className="text-[var(--text-secondary)] text-xl font-medium drop-shadow-md">Discover technical, cultural, and academic excellence across 38 districts.</p>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-[var(--border-base)] shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-[2] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
            <input
              type="text"
              placeholder="Search events, workshops, or colleges..."
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* District Dropdown */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedCollege('All Colleges');
              }}
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-bold appearance-none"
            >
              {districts.map(d => <option key={d} value={d} className="bg-[var(--bg-input)]">{d}</option>)}
            </select>
          </div>

          {/* College Dropdown (Dependent on District) */}
          <div className={`flex-1 relative transition-all ${selectedDistrict === 'All Districts' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <School className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--success)]" size={18} />
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-bold appearance-none"
            >
              {collegesInDistrict.length > 0 ? (
                collegesInDistrict.map(c => <option key={c} value={c}>{c}</option>)
              ) : (
                <option>Select District First</option>
              )}
            </select>
          </div>
        </div>

        {/* Category Horizontal Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${categoryFilter === cat
                ? 'bg-[var(--accent-primary)] text-white shadow-lg shadow-[var(--accent-primary)]/30'
                : 'bg-[var(--bg-card-elevated)] text-[var(--text-muted)] hover:bg-[var(--bg-section)] border border-[var(--border-base)]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center px-4">
        <h2 className="text-xl font-black text-[var(--text-primary)] flex items-center gap-2">
          {filteredEvents.length} Events Found
          {selectedDistrict !== 'All Districts' && <span className="text-[var(--accent-primary)] px-3 py-1 bg-[var(--bg-card-elevated)] rounded-lg text-sm font-bold border border-[var(--accent-primary)]/30">in {selectedDistrict}</span>}
        </h2>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full py-20 bg-[var(--bg-card)] rounded-xl border-2 border-dashed border-[var(--border-base)] flex flex-col items-center justify-center text-center">
            <Building2 size={64} className="text-[var(--text-muted)] mb-6" />
            <h3 className="text-2xl font-black text-[var(--text-muted)] uppercase tracking-widest">No Events Found</h3>
            <p className="text-[var(--text-secondary)] mt-2 max-w-sm">We couldn't find any events matching your selected district and college criteria.</p>
          </div>
        ) : (
          filteredEvents.map(e => (
            <div key={e.id} className="group bg-[var(--bg-card)] rounded-xl border border-[var(--border-base)] overflow-hidden hover:shadow-2xl hover:shadow-[var(--accent-primary)]/10 hover:border-[var(--accent-primary)]/30 transition-all duration-500 flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <img
                  src={`https://picsum.photos/seed/${e.id}/800/600`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt={e.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-[#1F2937]/95 backdrop-blur-sm text-[#3B82F6] rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl border border-[#3B82F6]/30">
                    {e.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold mb-1 opacity-90">
                    <MapPin size={12} className="text-[#06B6D4]" />
                    {e.district}
                  </div>
                  <h4 className="font-black text-sm truncate max-w-[200px]">{e.college}</h4>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-[#F9FAFB] mb-2 group-hover:text-[#3B82F6] transition-colors leading-tight">{e.title}</h3>
                <p className="text-[#CBD5E1] text-sm font-medium line-clamp-2 mb-8 leading-relaxed">{e.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Timing</span>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#F9FAFB]">
                      <Calendar size={14} className="text-[#3B82F6]" />
                      {e.date}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-widest">Capacity</span>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#F9FAFB]">
                      <Users size={14} className="text-[#10B981]" />
                      {e.currentRegistrations} / {e.capacity}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-[#2D3748] flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-9 h-9 rounded-lg border-2 border-[#1F2937] bg-[#243044] flex items-center justify-center text-[10px] font-black text-[#3B82F6] overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleRegister(e.id)}
                    disabled={registeredEvents.includes(e.id)}
                    className={`flex items-center gap-2 px-8 py-4 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${registeredEvents.includes(e.id)
                      ? 'bg-[var(--bg-card-elevated)] text-[var(--success)] border border-[var(--success)]/30 cursor-default'
                      : 'bg-[#3B82F6] text-white hover:bg-[#60A5FA] hover:shadow-[#3B82F6]/30 shadow-xl active:scale-95'
                      }`}
                  >
                    {registeredEvents.includes(e.id) ? (
                      <>
                        <Check size={16} /> Confirmed
                      </>
                    ) : (
                      <>
                        Book Seat <ChevronRight size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ParticipantExplore;
