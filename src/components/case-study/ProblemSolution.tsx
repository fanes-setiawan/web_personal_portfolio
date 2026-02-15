import { Project } from '@/types';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ProblemSolutionProps {
    project: Project;
}

export function ProblemSolution({ project }: ProblemSolutionProps) {
    if (!project.caseStudy) return null;
    const { problem, solution } = project.caseStudy;

    return (
        <section className="grid md:grid-cols-2 gap-12 py-12 border-t border-slate-800/50">
            {/* The Problem */}
            <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                    <ShieldAlert className="text-red-400" size={24} />
                    The Problem
                </h3>
                <p className="text-slate-400 leading-relaxed">
                    {problem}
                </p>
            </div>

            {/* The Solution */}
            <div className="space-y-4">
                <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                    <CheckCircle2 className="text-green-400" size={24} />
                    The Solution
                </h3>
                <p className="text-slate-400 leading-relaxed">
                    {solution}
                </p>

                <ul className="grid grid-cols-1 gap-2 mt-4">
                    {project.caseStudy.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
