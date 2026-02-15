import { MainLayout } from '@/components/layout/MainLayout';
import { CaseStudyHeader } from '@/components/case-study/CaseStudyHeader';
import { ProblemSolution } from '@/components/case-study/ProblemSolution';
import { TechArchitecture } from '@/components/case-study/TechArchitecture';
import { Challenges } from '@/components/case-study/Challenges';
import { Gallery } from '@/components/case-study/Gallery';
import { ImpactResults } from '@/components/case-study/ImpactResults';
import { projectsData } from '@/data/mockData';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { id } = await params;
    const project = projectsData.find((p) => p.id === id);

    if (!project) {
        return notFound();
    }

    // If the project doesn't have detailed case study data, we might show a "Coming Soon" or default view
    if (!project.caseStudy) {
        return (
            <MainLayout>
                <div className="py-20 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
                    <p className="text-slate-400">Detailed case study coming soon.</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <article className="max-w-5xl mx-auto">
                <CaseStudyHeader project={project} />
                <ProblemSolution project={project} />
                <TechArchitecture project={project} />
                <Challenges project={project} />
                <Gallery project={project} />
                <ImpactResults project={project} />
            </article>
        </MainLayout>
    );
}

// Generate static params for all projects to enable static export if needed
export async function generateStaticParams() {
    return projectsData.map((project) => ({
        id: project.id,
    }));
}
