import { Profile, Project, Skill, Company } from '@/types';
import { Mail, MapPin, Globe, Phone } from 'lucide-react';

interface CVPreviewProps {
    profile: Profile;
    skills: Skill[];
    projects: Project[];
    companies: Company[];
    settings: {
        showSalary: boolean;
        showPrivateProjects: boolean;
        fullContactInfo: boolean;
        selectedProjectIds: string[];
        selectedCompanyIds: string[];
    };
    cvRef: any; // Using any for ref forwarded from parent
}

export function CVPreview({ profile, skills, projects, companies, settings, cvRef }: CVPreviewProps) {
    // Filter by selection
    const filteredCompanies = companies.filter(c => settings.selectedCompanyIds.includes(c.id));
    const filteredProjects = projects.filter(p => settings.selectedProjectIds.includes(p.id));

    // Non-private projects come from projects table
    const publicProjects = filteredProjects.filter(p => !p.isPrivate);
    const privateProjects = filteredProjects.filter(p => p.isPrivate);

    return (
        <div className="flex-1 min-h-screen bg-[#0F1629] p-8 pl-96 overflow-y-auto flex justify-center items-start">
            {/* A4 Paper */}
            <div
                ref={cvRef}
                id="cv-capture-area"
                className="w-[210mm] min-h-[297mm] bg-white text-[#0f172a] p-12 shadow-2xl origin-top transform scale-[0.85] lg:scale-100 transition-transform duration-300"
                style={{ fontFamily: 'sans-serif' }}
            >
                {/* Header */}
                <header className="flex justify-between items-start mb-12 border-b-2 border-[#f1f5f9] pb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-[#0f172a] mb-2 tracking-tight">{profile.name}</h1>
                        <h2 className="text-sm font-bold text-[#2563eb] uppercase tracking-widest mb-6">{profile.role}</h2>

                        <div className="flex flex-wrap gap-6 text-sm text-[#475569] font-medium">
                            {profile.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-[#94a3b8]" />
                                    {profile.location}
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-[#94a3b8]" />
                                {profile.email}
                            </div>
                            {profile.phone && (
                                <div className="flex items-center gap-2">
                                    <Phone size={14} className="text-[#94a3b8]" />
                                    {profile.phone}
                                </div>
                            )}
                            {profile.website && (
                                <div className="flex items-center gap-2">
                                    <Globe size={14} className="text-[#94a3b8]" />
                                    {profile.website.replace(/^https?:\/\//, '')}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-28 h-28 rounded-2xl bg-[#f8fafc] border-4 border-white shadow-xl overflow-hidden flex items-center justify-center relative">
                        {profile.avatarUrl ? (
                            <img
                                src={profile.avatarUrl}
                                alt={profile.name}
                                className="w-full h-full object-cover"
                                crossOrigin="anonymous"
                            />
                        ) : (
                            <span className="text-3xl text-[#e2e8f0]">👤</span>
                        )}
                    </div>
                </header>

                {/* Professional Summary */}
                {profile.bio && (
                    <section className="mb-12">
                        <h3 className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-[#e2e8f0]"></span>
                            Professional Summary
                        </h3>
                        <p className="text-sm text-[#475569] leading-relaxed font-medium">
                            {profile.bio}
                        </p>
                    </section>
                )}

                <div className="grid grid-cols-3 gap-12">
                    {/* Main Content (Left 2/3) */}
                    <div className="col-span-2 space-y-12">
                        {/* Experience */}
                        {filteredCompanies.length > 0 && (
                            <section>
                                <h3 className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-[#e2e8f0]"></span>
                                    Professional Experience
                                </h3>
                                <div className="space-y-10">
                                    {filteredCompanies.map(company => (
                                        <div key={company.id} className="relative pl-6 border-l border-[#e2e8f0]">
                                            <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-[#2563eb] rounded-full border-2 border-white"></div>
                                            <div className="flex justify-between items-baseline mb-1">
                                                <h4 className="text-lg font-bold text-[#0f172a]">{company.name}</h4>
                                                <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wide">
                                                    {company.start_date ? new Date(company.start_date).getFullYear() : ''}
                                                    {company.end_date ? ` — ${new Date(company.end_date).getFullYear()}` : ' — Present'}
                                                </span>
                                            </div>
                                            <div className="text-[#64748b] font-medium text-sm">{company.location || 'Remote'}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Public Side Projects */}
                        {publicProjects.length > 0 && (
                            <section>
                                <h3 className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-[#e2e8f0]"></span>
                                    Selected Projects
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {publicProjects.map(project => (
                                        <div key={project.id} className="p-4 bg-[#f8fafc] rounded-lg border border-[#f1f5f9]">
                                            <h4 className="font-bold text-[#0f172a] text-sm mb-1">{project.title}</h4>
                                            <p className="text-xs text-[#64748b] mb-2">{project.shortDescription}</p>
                                            <div className="flex flex-wrap gap-1">
                                                {project.tags?.slice(0, 3).map(tag => (
                                                    <span key={tag} className="px-1.5 py-0.5 bg-[#e2e8f0] text-[#475569] text-[9px] font-bold rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar (Right 1/3) */}
                    <div className="col-span-1 space-y-12">
                        {/* Technical Skills */}
                        {skills && skills.length > 0 && (
                            <section>
                                <h3 className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-6 border-b border-[#e2e8f0] pb-2">Technical Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map(skill => (
                                        <span key={skill.id} className="px-2 py-1 bg-[#eff6ff] text-[#2563eb] text-[10px] font-bold rounded border border-[#dbeafe]">
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Education */}
                        <section>
                            <h3 className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-6 border-b border-[#e2e8f0] pb-2">Education</h3>
                            {profile.education?.map((edu, i) => (
                                <div key={i} className="mb-4">
                                    <div className="font-bold text-[#0f172a] text-sm mb-1">{edu.degree}</div>
                                    <div className="text-[#475569] text-xs mb-1">{edu.institution}</div>
                                    <div className="text-[#94a3b8] text-xs font-mono">{edu.period}</div>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
