import { Profile, Project, Skill } from '@/types';
import { Mail, MapPin, Globe, Phone } from 'lucide-react';

interface CVPreviewProps {
    profile: Profile;
    skills: Skill[];
    projects: Project[];
    settings: {
        showSalary: boolean;
        showPrivateProjects: boolean;
        fullContactInfo: boolean;
    };
    cvRef: any; // Using any for ref forwarded from parent
}

export function CVPreview({ profile, skills, projects, settings, cvRef }: CVPreviewProps) {
    // Filter projects based on 'role' field existence to identify work experience vs side projects
    const workExperience = projects.filter(p => p.role && p.company);

    return (
        <div className="flex-1 min-h-screen bg-[#0F1629] p-8 pl-96 overflow-y-auto flex justify-center items-start">
            {/* A4 Paper */}
            <div
                ref={cvRef}
                className="w-[210mm] min-h-[297mm] bg-white text-slate-900 p-12 shadow-2xl origin-top transform scale-[0.85] lg:scale-100 transition-transform duration-300"
                style={{ fontFamily: 'sans-serif' }}
            >
                {/* Header */}
                <header className="flex justify-between items-start mb-12 border-b-2 border-slate-100 pb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">{profile.name}</h1>
                        <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-6">{profile.role}</h2>

                        <div className="flex flex-wrap gap-6 text-sm text-slate-600 font-medium">
                            {profile.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-slate-400" />
                                    {profile.location}
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-slate-400" />
                                {profile.email}
                            </div>
                            {settings.fullContactInfo && profile.website && (
                                <div className="flex items-center gap-2">
                                    <Globe size={14} className="text-slate-400" />
                                    {profile.website}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Avatar Placeholder */}
                    <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                    </div>
                </header>

                <div className="grid grid-cols-3 gap-12">
                    {/* Main Content (Left 2/3) */}
                    <div className="col-span-2 space-y-12">
                        {/* Experience */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-slate-200"></span>
                                Professional Experience
                            </h3>
                            <div className="space-y-10">
                                {workExperience.map(job => (
                                    <div key={job.id} className="relative pl-6 border-l border-slate-200">
                                        <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white"></div>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h4 className="text-lg font-bold text-slate-900">{job.role}</h4>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{job.period}</span>
                                        </div>
                                        <div className="text-blue-600 font-medium text-sm mb-4">{job.company}</div>
                                        <ul className="space-y-3">
                                            {job.achievements?.map((point, i) => (
                                                <li key={i} className="text-sm text-slate-600 leading-relaxed">
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Private Projects (Conditional) */}
                        {settings.showPrivateProjects && (
                            <section>
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-slate-200"></span>
                                    Private Projects
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                        <h4 className="font-bold text-slate-900 text-sm mb-1">CryptoTrack Pro</h4>
                                        <p className="text-xs text-slate-500 mb-2">Real-time crypto monitoring</p>
                                        <div className="flex gaps-2">
                                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">SwiftUI</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                                        <h4 className="font-bold text-slate-900 text-sm mb-1">EcoRide Platform</h4>
                                        <p className="text-xs text-slate-500 mb-2">Uber-like service for scooters</p>
                                        <div className="flex gap-2">
                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">Kotlin</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar (Right 1/3) */}
                    <div className="col-span-1 space-y-12">
                        {/* Expertise */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Expertise</h3>
                            <div className="space-y-5">
                                {skills.map(skill => (
                                    <div key={skill.id}>
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-bold text-slate-700">{skill.name}</span>
                                            <span className="text-[10px] font-bold text-blue-600">{skill.level}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600 rounded-full"
                                                style={{ width: `${skill.level || 50}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Core Tech Stack */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Core Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Combine', 'Unit Testing', 'CI/CD', 'Firebase', 'REST API', 'GraphQL', 'CoreData', 'Dagger'].map(tech => (
                                    <span key={tech} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded border border-slate-200">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Education</h3>
                            {profile.education?.map((edu, i) => (
                                <div key={i} className="mb-4">
                                    <div className="font-bold text-slate-900 text-sm mb-1">{edu.degree}</div>
                                    <div className="text-slate-600 text-xs mb-1">{edu.institution}</div>
                                    <div className="text-slate-400 text-xs font-mono">{edu.period}</div>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>

            </div>
        </div>
    );
}
