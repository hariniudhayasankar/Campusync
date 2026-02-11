import React, { useState } from 'react';
import { User, MapPin, School, GraduationCap, Phone, Mail, Save } from 'lucide-react';
import { useAppContext } from '../store';
import collegesData from '../data/colleges.json';

const ParticipantProfile: React.FC = () => {
  const { currentUser, setCurrentUser } = useAppContext();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    college: '',
    district: 'Chennai',
    department: '',
    year: '',
    rollNumber: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        name: formData.name,
        email: formData.email,
        college: formData.college,
        district: formData.district,
        department: formData.department,
        year: formData.year,
        rollNumber: formData.rollNumber,
        phone: formData.phone,
        profileCompleted: true
      });
    }
  };

  const collegesInDistrict = formData.district 
    ? collegesData.colleges
        .filter(c => c.district === formData.district)
        .map(c => c.college_name)
        .sort()
    : [];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-base)] shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-[var(--border-base)] bg-[var(--bg-section)]">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-[var(--bg-card-elevated)] rounded-xl flex items-center justify-center border border-[var(--accent-primary)]/30 shadow-lg shadow-[var(--accent-primary)]/10">
              <User className="text-[var(--accent-primary)]" size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tight mb-2">Complete Your Profile</h2>
              <p className="text-[var(--text-secondary)] font-medium">Please provide your details to continue exploring events</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Personal Information */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-[#F9FAFB] mb-4 flex items-center gap-2">
              <User className="text-[#3B82F6]" size={20} />
              Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Full Name <span className="text-[var(--danger)]">*</span></label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Email <span className="text-[var(--danger)]">*</span></label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                  <input
                    type="email"
                    required
                    placeholder="your.email@college.edu"
                    className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Roll Number</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                  <input
                    type="text"
                    placeholder="e.g., 21CS001"
                    className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium"
                    value={formData.rollNumber}
                    onChange={e => setFormData({ ...formData, rollNumber: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-[var(--border-base)]"></div>

          {/* Academic Information */}
          <div className="space-y-5">
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <School className="text-[var(--success)]" size={20} />
              Academic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">District <span className="text-[var(--danger)]">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                  <select
                    required
                    className="w-full pl-12 pr-10 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium appearance-none cursor-pointer"
                    value={formData.district}
                    onChange={e => setFormData({ ...formData, district: e.target.value, college: '' })}
                  >
                    {collegesData.districts.map(d => <option key={d} value={d} className="bg-[var(--bg-input)]">{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">College <span className="text-[var(--danger)]">*</span></label>
                <div className="relative">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                  <select
                    required
                    className="w-full pl-12 pr-10 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium appearance-none cursor-pointer"
                    value={formData.college}
                    onChange={e => setFormData({ ...formData, college: e.target.value })}
                    disabled={!formData.district || collegesInDistrict.length === 0}
                  >
                    <option value="" className="bg-[var(--bg-input)]">
                      {formData.district ? 'Select College' : 'Select District First'}
                    </option>
                    {collegesInDistrict.map(college => (
                      <option key={college} value={college} className="bg-[var(--bg-input)]">{college}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Department</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                  <input
                    type="text"
                    placeholder="e.g., Computer Science"
                    className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium"
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Year</label>
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                  <select
                    className="w-full pl-12 pr-10 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium appearance-none cursor-pointer"
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                  >
                    <option value="" className="bg-[var(--bg-input)]">Select Year</option>
                    <option value="1st Year" className="bg-[var(--bg-input)]">1st Year</option>
                    <option value="2nd Year" className="bg-[var(--bg-input)]">2nd Year</option>
                    <option value="3rd Year" className="bg-[var(--bg-input)]">3rd Year</option>
                    <option value="4th Year" className="bg-[var(--bg-input)]">4th Year</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-[var(--border-base)] flex justify-end">
            <button
              type="submit"
              className="px-8 py-3.5 bg-[var(--accent-primary)] text-white rounded-lg font-bold hover:bg-[var(--accent-hover)] hover:shadow-[var(--accent-primary)]/30 transition-all shadow-lg active:scale-95 flex items-center gap-2"
            >
              <Save size={18} />
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParticipantProfile;
