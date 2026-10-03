import { Project } from '@/types';
import { ArrowLeft, Share2, Building2, User, Calendar, DownloadCloud, Apple, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface CaseStudyHeaderProps {
    project: Project;
    isLoggedIn?: boolean;
}

export function CaseStudyHeader({ project, isLoggedIn = false }: CaseStudyHeaderProps) {
    return (
        <header className="pt-8 pb-16">
            <div className="flex items-center justify-between mb-12">
                <Link href="/" className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                    <div className="p-2 border border-slate-200 rounded-full group-hover:bg-slate-100 transition-colors">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="text-sm font-medium">Back to Portfolio</span>
                </Link>
                {isLoggedIn && (
                    <div className="flex gap-4">
                        <button className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
                            <Share2 size={20} />
                        </button>
                        <Link
                            href={`/admin/projects`}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-lg flex items-center gap-2 transition-colors"
                        >
                            Edit Case Study
                        </Link>
                    </div>
                )}
            </div>

            {/* Hero Image Section */}
            {project.mockup_style === 'layout4' && project.imageUrl ? (
                <div className="w-full mb-12 py-12 px-6 md:px-12 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-x-auto flex items-center justify-start gap-4 sm:gap-6 lg:gap-8 no-scrollbar scroll-smooth">
                    {project.imageUrl.split(',').filter(Boolean).map((src, idx) => (
                        <div key={idx} className="flex-shrink-0 w-[200px] md:w-[260px] relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-slate-800 bg-slate-800">
                            <div className="aspect-[9/19.5] relative">
                                <Image
                                    src={src}
                                    alt={`Frame ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="relative w-full h-[300px] md:h-[500px] mb-12 rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl">
                    {project.imageUrl ? (
                        <Image
                            src={project.imageUrl.split(',')[0] || project.imageUrl}
                            alt={project.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <span className="text-8xl opacity-10">📱</span>
                        </div>
                    )}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider rounded-full">
                            {project.category}
                        </span>
                        {project.period && (
                            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                                <Calendar size={14} className="text-blue-500" />
                                <span>{project.period}</span>
                            </div>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight uppercase tracking-tight">
                        {project.title}
                    </h1>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        {project.company && (
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Client / Company</span>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-xl">
                                    <Building2 size={16} className="text-blue-500" />
                                    <span className="text-sm font-bold text-slate-700">{project.company}</span>
                                </div>
                            </div>
                        )}
                        {project.role && (
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">My Role</span>
                                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-xl">
                                    <User size={16} className="text-blue-500" />
                                    <span className="text-sm font-bold text-slate-700">{project.role}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* App Store Links */}
                    {(project.appStoreUrl || project.playStoreUrl) && (
                        <div className="flex flex-wrap gap-3 mb-10">
                            {project.appStoreUrl && (
                                <a
                                    href={project.appStoreUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-transform hover:scale-105"
                                >
                                    <img 
                                        src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                                        alt="Download on the App Store" 
                                        className="h-10 w-auto"
                                    />
                                </a>
                            )}
                            {project.playStoreUrl && (
                                <a
                                    href={project.playStoreUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-transform hover:scale-105"
                                >
                                    <img 
                                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                                        alt="Get it on Google Play" 
                                        className="h-10 w-auto"
                                    />
                                </a>
                            )}
                        </div>
                    )}

                    <p className="text-lg text-slate-500 leading-relaxed mb-8 border-l-4 border-blue-500 pl-6 whitespace-pre-line italic">
                        {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-blue-50 border border-blue-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest rounded-md">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Key Stats Grid */}
                {project.stats && project.stats.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {project.stats.map((stat, idx) => (
                            <div key={idx} className="p-6 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col items-center text-center hover:border-blue-200 hover:shadow-md transition-all group">
                                <span className="text-3xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors uppercase">{stat.value}</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-16 pt-16 border-t border-slate-200">
                <p className="text-slate-600 text-[15px] leading-relaxed max-w-3xl">
                    {project.description}
                </p>
            </div>
        </header>
    );
}
