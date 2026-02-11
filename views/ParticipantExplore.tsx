

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
      <div className="relative h-72 rounded-[40px] overflow-hidden bg-indigo-900 flex items-center justify-center text-center p-8 shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1541339906194-e1620f94411b?auto=format&fit=crop&w=1200&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          alt="Campus Background"
        />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Tamil Nadu Student Hub</h1>
          <p className="text-indigo-100 text-xl font-medium">Discover technical, cultural, and academic excellence across 38 districts.</p>
        </div>
      </div>

      {/* Advanced Filter Panel */}
      <div className="bg-white p-6 rounded-[32px] border shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-[2] relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search events, workshops, or colleges..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          {/* District Dropdown */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18} />
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedCollege('All Colleges');
              }}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold appearance-none text-gray-700"
            >
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* College Dropdown (Dependent on District) */}
          <div className={`flex-1 relative transition-all ${selectedDistrict === 'All Districts' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <School className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border bg-gray-50 focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-bold appearance-none text-gray-700"
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
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center px-4">
        <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
          {filteredEvents.length} Events Found
          {selectedDistrict !== 'All Districts' && <span className="text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded text-sm font-bold">in {selectedDistrict}</span>}
        </h2>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length === 0 ? (
          <div className="col-span-full py-20 bg-white rounded-[40px] border-2 border-dashed flex flex-col items-center justify-center text-center">
            <Building2 size={64} className="text-gray-200 mb-6" />
            <h3 className="text-2xl font-black text-gray-400 uppercase tracking-widest">No Events Found</h3>
            <p className="text-gray-400 mt-2 max-w-sm">We couldn't find any events matching your selected district and college criteria.</p>
          </div>
        ) : (
          filteredEvents.map(e => (
            <div key={e.id} className="group bg-white rounded-[32px] border overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
              <div className="h-56 overflow-hidden relative">
                <img
                  src={`https://picsum.photos/seed/${e.id}/800/600`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt={e.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-white/95 backdrop-blur text-indigo-700 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                    {e.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-1.5 text-xs font-bold mb-1 opacity-90">
                    <MapPin size={12} className="text-indigo-400" />
                    {e.district}
                  </div>
                  <h4 className="font-black text-sm truncate max-w-[200px]">{e.college}</h4>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-tight">{e.title}</h3>
                <p className="text-gray-500 text-sm font-medium line-clamp-2 mb-8 leading-relaxed">{e.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Timing</span>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                      <Calendar size={14} className="text-indigo-500" />
                      {e.date}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Capacity</span>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                      <Users size={14} className="text-emerald-500" />
                      {e.currentRegistrations} / {e.capacity}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-9 h-9 rounded-2xl border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-black text-indigo-400 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleRegister(e.id)}
                    disabled={registeredEvents.includes(e.id)}
                    className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${registeredEvents.includes(e.id)
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 cursor-default'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 active:scale-95'
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
