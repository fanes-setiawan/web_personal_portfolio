import { Project } from '@/types';
import { TrendingUp } from 'lucide-react';

interface ImpactResultsProps {
    project: Project;
}

export function ImpactResults({ project }: ImpactResultsProps) {
    if (!project.caseStudy?.results) return null;
    const { results } = project.caseStudy;

    return (
        <section className="py-12 mt-12 bg-blue-600 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                <TrendingUp size={200} className="text-white" />
            </div>

            <div className="relative px-8 md:px-12 py-8 z-10">
                <h2 className="text-3xl font-bold text-white mb-12">Impact & Measurable Results</h2>
                <div className="grid md:grid-cols-3 gap-12">
                    {results.map((result, idx) => (
                        <div key={idx}>
                            <div className="text-5xl font-bold text-white mb-4">{result.metric}</div>
                            <p className="text-blue-100 text-sm leading-relaxed font-medium opacity-90">
                                {result.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
