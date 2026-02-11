
import React, { useState } from 'react';
import { Building2, MapPin, School, GraduationCap, ShieldCheck, Mail, Globe, CheckCircle2, ArrowLeft, ArrowRight, FileText, CheckCircle, Eye } from 'lucide-react';
import collegesData from '../data/colleges.json';
import Stepper, { Step } from '../components/Stepper';
import '../components/Stepper.css';

interface ManagementEnrollmentProps {
    onBack?: () => void;
}

const ManagementEnrollment: React.FC<ManagementEnrollmentProps> = ({ onBack }) => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        collegeName: '',
        district: 'Chennai',
        type: 'Engineering',
        isAutonomous: false,
        naacGrade: 'A',
        nbaAccredited: false,
        contactEmail: '',
        website: ''
    });

    const handleFinalStepCompleted = () => {
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 800);
    };

    if (submitted) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
                <div className="bg-[var(--bg-card)] p-10 rounded-xl shadow-2xl border border-[var(--border-base)] max-w-lg w-full text-center">
                    {onBack && (
                        <div className="flex justify-start mb-6">
                            <button
                                onClick={onBack}
                                className="flex items-center gap-2 px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-elevated)] rounded-lg transition-all border border-[var(--border-base)] hover:border-[var(--accent-primary)]/30"
                            >
                                <ArrowLeft size={18} />
                                <span className="font-semibold text-sm">Back</span>
                            </button>
                        </div>
                    )}
                    <div className="w-24 h-24 bg-[var(--bg-card-elevated)] rounded-full flex items-center justify-center text-[var(--success)] mx-auto mb-8 animate-bounce border border-[var(--success)]/30 shadow-lg shadow-[var(--success)]/20">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-4xl font-black text-[var(--text-primary)] mb-4 tracking-tight">Enrollment Success!</h2>
                    <p className="text-[var(--text-secondary)] text-lg font-medium leading-relaxed mb-10">
                        Your college details have been successfully registered in the CampusSync network. Our administrative team will verify the information within 48 hours.
                    </p>
                    <div className="flex gap-4 justify-center">
                        {onBack && (
                            <button
                                onClick={onBack}
                                className="px-6 py-3 border border-[var(--border-base)] text-[var(--text-secondary)] rounded-lg font-semibold hover:bg-[var(--bg-card-elevated)] hover:border-[var(--accent-primary)]/30 transition-all flex items-center gap-2"
                            >
                                <ArrowLeft size={18} />
                                Back to Institutions
                            </button>
                        )}
                        <button
                            onClick={() => setSubmitted(false)}
                            className="px-8 py-3 bg-[var(--accent-primary)] text-white rounded-lg font-bold hover:bg-[var(--accent-hover)] hover:shadow-[var(--accent-primary)]/30 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                        >
                            Update More Details <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] pb-20">
            {/* Header with Back Button */}
            <div className="w-full max-w-3xl mb-6">
                <div className="flex items-center gap-4">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 px-4 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-elevated)] rounded-lg transition-all border border-[var(--border-base)] hover:border-[var(--accent-primary)]/30"
                        >
                            <ArrowLeft size={18} />
                            <span className="font-semibold text-sm">Back</span>
                        </button>
                    )}
                    <div className="flex-1">
                        <h1 className="text-2xl font-black text-[var(--text-primary)] mb-1">Institutional Enrollment</h1>
                        <p className="text-[var(--text-secondary)] text-sm">Register your college and sync with the Tamil Nadu Student Network</p>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-3xl">
                <Stepper
                    initialStep={1}
                    onStepChange={(step) => {
                        console.log('Current step:', step);
                    }}
                    onFinalStepCompleted={handleFinalStepCompleted}
                    backButtonText="Previous"
                    nextButtonText="Next"
                >
                    {/* Step 1: Basic Information */}
                    <Step>
                        <div className="space-y-5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--accent-primary)]/30 flex items-center justify-center">
                                    <FileText className="text-[var(--accent-primary)]" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-[var(--text-primary)]">Basic Information</h2>
                                    <p className="text-[var(--text-secondary)] text-sm">Provide the fundamental details about your institution</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">College Official Name <span className="text-[var(--danger)]">*</span></label>
                                    <div className="relative">
                                        <School className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g., Coimbatore Institute of Technology"
                                            className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium"
                                            value={formData.collegeName}
                                            onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">District <span className="text-[var(--danger)]">*</span></label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                                            <select
                                                className="w-full pl-12 pr-10 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium appearance-none cursor-pointer"
                                                value={formData.district}
                                                onChange={e => setFormData({ ...formData, district: e.target.value })}
                                            >
                                                {collegesData.districts.map(d => <option key={d} value={d} className="bg-[var(--bg-section)]">{d}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Institution Type <span className="text-[var(--danger)]">*</span></label>
                                        <div className="relative">
                                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                                            <select
                                                className="w-full pl-12 pr-10 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium appearance-none cursor-pointer"
                                                value={formData.type}
                                                onChange={e => setFormData({ ...formData, type: e.target.value })}
                                            >
                                                <option value="Engineering">Engineering</option>
                                                <option value="Arts & Science">Arts & Science</option>
                                                <option value="Medical">Medical</option>
                                                <option value="Agriculture">Agriculture</option>
                                                <option value="Polytechnic">Polytechnic</option>
                                                <option value="University">University</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Step>

                    {/* Step 2: Accreditation Details */}
                    <Step>
                        <div className="space-y-5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--success)]/30 flex items-center justify-center">
                                    <ShieldCheck className="text-[var(--success)]" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-[var(--text-primary)]">Accreditation Details</h2>
                                    <p className="text-[var(--text-secondary)] text-sm">Specify your institution's accreditation status</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-4">
                                    <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-3">Accreditation Status</label>
                                    <div className="flex flex-wrap gap-4">
                                        <label className="flex items-center gap-3 cursor-pointer group p-4 rounded-lg border border-[var(--border-base)] hover:border-[var(--accent-primary)]/30 hover:bg-[var(--bg-card-elevated)]/50 transition-all flex-1 min-w-[200px]">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded-md text-[var(--accent-primary)] border-[var(--border-base)] bg-[var(--bg-input)] focus:ring-[var(--accent-primary)] transition-all cursor-pointer"
                                                checked={formData.isAutonomous}
                                                onChange={e => setFormData({ ...formData, isAutonomous: e.target.checked })}
                                            />
                                            <span className="font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">Autonomous</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group p-4 rounded-lg border border-[var(--border-base)] hover:border-[var(--accent-primary)]/30 hover:bg-[var(--bg-card-elevated)]/50 transition-all flex-1 min-w-[200px]">
                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded-md text-[var(--accent-primary)] border-[var(--border-base)] bg-[var(--bg-input)] focus:ring-[var(--accent-primary)] transition-all cursor-pointer"
                                                checked={formData.nbaAccredited}
                                                onChange={e => setFormData({ ...formData, nbaAccredited: e.target.checked })}
                                            />
                                            <span className="font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">NBA Accredited</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-3">NAAC Grade</label>
                                    <div className="grid grid-cols-4 gap-3">
                                        {['A++', 'A+', 'A', 'B++'].map(grade => (
                                            <button
                                                key={grade}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, naacGrade: grade })}
                                                className={`py-4 rounded-lg text-sm font-bold transition-all ${formData.naacGrade === grade
                                                    ? 'bg-[var(--accent-primary)] text-white shadow-lg shadow-[var(--accent-primary)]/30 border border-[var(--accent-primary)]'
                                                    : 'bg-[var(--bg-card-elevated)] text-[var(--text-muted)] hover:bg-[var(--border-base)] hover:text-[var(--text-secondary)] border border-[var(--border-base)]'
                                                    }`}
                                            >
                                                {grade}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Step>

                    {/* Step 3: Contact Information */}
                    <Step>
                        <div className="space-y-5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--accent-glow)]/30 flex items-center justify-center">
                                    <Mail className="text-[var(--accent-glow)]" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-[var(--text-primary)]">Contact Information</h2>
                                    <p className="text-[var(--text-secondary)] text-sm">Provide official contact details for your institution</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Administration Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                                        <input
                                            type="email"
                                            placeholder="admin@college.edu"
                                            className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium"
                                            value={formData.contactEmail}
                                            onChange={e => setFormData({ ...formData, contactEmail: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">Official Website</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--accent-primary)]" size={18} />
                                        <input
                                            type="url"
                                            placeholder="https://www.college.edu"
                                            className="w-full pl-12 pr-4 py-3.5 rounded-lg border border-[var(--border-base)] bg-[var(--bg-input)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]/50 focus:border-[var(--accent-primary)] outline-none transition-all font-medium"
                                            value={formData.website}
                                            onChange={e => setFormData({ ...formData, website: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Step>

                    {/* Step 4: Review & Submit */}
                    <Step>
                        <div className="space-y-5">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-lg bg-[var(--bg-card-elevated)] border border-[var(--accent-primary)]/30 flex items-center justify-center">
                                    <Eye className="text-[var(--accent-primary)]" size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-[var(--text-primary)]">Review & Submit</h2>
                                    <p className="text-[var(--text-secondary)] text-sm">Review your information before submitting</p>
                                </div>
                            </div>

                            <div className="space-y-4 bg-[var(--bg-section)] rounded-lg border border-[var(--border-base)] p-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">College Name</p>
                                        <p className="text-[var(--text-primary)] font-semibold">{formData.collegeName || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">District</p>
                                        <p className="text-[var(--text-primary)] font-semibold">{formData.district}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Institution Type</p>
                                        <p className="text-[var(--text-primary)] font-semibold">{formData.type}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">NAAC Grade</p>
                                        <p className="text-[var(--text-primary)] font-semibold">{formData.naacGrade}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Autonomous</p>
                                        <p className="text-[var(--text-primary)] font-semibold">{formData.isAutonomous ? 'Yes' : 'No'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">NBA Accredited</p>
                                        <p className="text-[var(--text-primary)] font-semibold">{formData.nbaAccredited ? 'Yes' : 'No'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Email</p>
                                        <p className="text-[var(--text-primary)] font-semibold">{formData.contactEmail || 'Not provided'}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Website</p>
                                        <p className="text-[var(--text-primary)] font-semibold">{formData.website || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-[var(--bg-card-elevated)]/50 rounded-lg border border-[var(--border-base)]">
                                <CheckCircle className="text-[var(--success)] mt-0.5 flex-shrink-0" size={18} />
                                <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                                    By completing this enrollment, you confirm the accuracy of information as per NIRF/UGC guidelines. Your submission will be reviewed by our administrative team within 48 hours.
                                </p>
                            </div>
                        </div>
                    </Step>
                </Stepper>
            </div>
        </div>
    );
};

export default ManagementEnrollment;
