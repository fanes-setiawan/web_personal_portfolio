import { MainLayout } from '@/components/layout/MainLayout';
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader';
import { ProblemSolution } from '@/components/case-study/ProblemSolution';
import { TechArchitecture } from '@/components/case-study/TechArchitecture';
import { Challenges } from '@/components/case-study/Challenges';
import { Gallery } from '@/components/case-study/Gallery';
import { ImpactResults } from '@/components/case-study/ImpactResults';
import { getProjectById, getProjects, isUserAuthorized } from '@/data/api';
import { createStaticClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Lock, UserCircle } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { id } = await params;
    const project = await getProjectById(id);
    const isAuthorized = await isUserAuthorized();

    if (!project) {
        return notFound();
    }

    if (!isAuthorized) {
        return (
            <MainLayout>
                <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-8 border border-blue-500/20">
                        <Lock className="text-blue-400" size={40} />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">Restricted Access</h1>
                    <p className="text-slate-400 max-w-lg mb-12 text-lg leading-relaxed">
                        To protect sensitive business logic and technical architecture details, full case studies are only visible to verified <span className="text-blue-400 font-bold">HR Personnel</span> or <span className="text-blue-400 font-bold">Collaborators</span>.
                    </p>

                    <Link
                        href="/login"
                        className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg flex items-center gap-3 transition-all shadow-lg shadow-blue-900/40 hover:scale-105 active:scale-95"
                    >
                        <UserCircle size={24} />
                        Login as HR to Continue
                    </Link>

                    <Link href="/#portfolio" className="mt-8 text-slate-500 hover:text-white transition-colors flex items-center gap-2 font-medium">
                        Back to Portfolio
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <article className="max-w-5xl mx-auto px-4">
                <CaseStudyHeader project={project} />

                {project.caseStudy ? (
                    <>
                        <ProblemSolution project={project} />
                        <TechArchitecture project={project} />
                        <Challenges project={project} />
                        <Gallery project={project} />
                        <ImpactResults project={project} />
                    </>
                ) : (
                    <div className="py-20 border-t border-white/5 mt-12 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-bold uppercase tracking-widest mb-4">
                            Feature coming soon
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Detailed Case Study</h2>
                        <p className="text-slate-500 max-w-md mx-auto">
                            The technical breakdown and full project gallery for {project.title} are currently being finalized. Check back soon for the full story.
                        </p>
                    </div>
                )}
            </article>
        </MainLayout>
    );
}

// Generate static params for all projects to enable static export if needed
export async function generateStaticParams() {
    const staticClient = createStaticClient();
    const projects = await getProjects(staticClient);
    return projects.map((project) => ({
        id: project.id,
    }));
}

