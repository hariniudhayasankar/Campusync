
import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  MoreVertical, 
  Search,
  Filter,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const Organizers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const organizers = [
    { id: '1', name: 'Dr. Sarah Wilson', email: 'sarah.cs@college.edu', dept: 'Computer Science', role: 'Professor', status: 'Active', events: 12 },
    { id: '2', name: 'Prof. James Bond', email: 'james.arts@college.edu', dept: 'Arts & Humanities', role: 'HOD', status: 'Active', events: 8 },
    { id: '3', name: 'Dr. Emily Chen', email: 'emily.it@college.edu', dept: 'Information Technology', role: 'Asst. Professor', status: 'Active', events: 5 },
    { id: '4', name: 'Coach Mike Tyson', email: 'mike.sports@college.edu', dept: 'Physical Education', role: 'Sports Director', status: 'Active', events: 15 },
    { id: '5', name: 'Prof. Robert Kiyosaki', email: 'robert.biz@college.edu', dept: 'Management Studies', role: 'Professor', status: 'Inactive', events: 3 },
    { id: '6', name: 'Dr. Jane Goodall', email: 'jane.env@college.edu', dept: 'Environmental Science', role: 'Research Head', status: 'Active', events: 6 },
  ];

  const filtered = organizers.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.dept.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Organizer Management</h2>
          <p className="text-gray-500">Authorize faculty and student bodies to host institutional events.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          <UserPlus size={20} />
          Add Organizer
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-3xl border shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or department..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 rounded-2xl text-gray-600 font-bold hover:bg-gray-50">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(org => (
          <div key={org.id} className="bg-white rounded-[32px] border p-6 hover:shadow-xl transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                <Users size={28} />
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                org.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'
              }`}>
                {org.status}
              </div>
            </div>

            <div className="space-y-1 mb-6">
              <h3 className="text-xl font-bold text-gray-900">{org.name}</h3>
              <p className="text-sm text-gray-500 font-medium">{org.role} • {org.dept}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Events Managed</p>
                <p className="text-xl font-black text-indigo-600">{org.events}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Auth Level</p>
                <p className="text-xl font-black text-gray-900">Tier 1</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-gray-50 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 border">
                <Mail size={14} /> Contact
              </button>
              <button className="px-4 py-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors border">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizers;
