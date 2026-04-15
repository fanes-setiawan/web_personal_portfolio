import { MainLayout } from '@/components/layout/MainLayout';
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader';
import { ProblemSolution } from '@/components/case-study/ProblemSolution';
import { TechArchitecture } from '@/components/case-study/TechArchitecture';
import { Challenges } from '@/components/case-study/Challenges';
import { Gallery } from '@/components/case-study/Gallery';
import { ImpactResults } from '@/components/case-study/ImpactResults';
import { getProjectById, getProjects } from '@/data/api';
import { createStaticClient, createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { id } = await params;
    const project = await getProjectById(id);

    // Check if user is logged in
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const isLoggedIn = !!user;

    if (!project) {
        return notFound();
    }

    return (
        <MainLayout>
            <article className="max-w-5xl mx-auto px-4">
                <CaseStudyHeader project={project} isLoggedIn={isLoggedIn} />

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

