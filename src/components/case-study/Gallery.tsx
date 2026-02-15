import { Project } from '@/types';

interface GalleryProps {
    project: Project;
}

export function Gallery({ project }: GalleryProps) {
    if (!project.caseStudy?.screenshots) return null;
    const { screenshots } = project.caseStudy;

    return (
        <section className="py-16">
            <h2 className="text-3xl font-bold text-white mb-8">Application Interface</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {screenshots.map((src, idx) => (
                    <div key={idx} className="relative group overflow-hidden rounded-2xl border-4 border-slate-800 bg-slate-900 shadow-2xl">
                        {/* Aspect Ratio Container for Phone Screenshot */}
                        <div className="aspect-[9/19.5] relative bg-slate-800">
                            {/* Placeholder since we don't have real images */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-700 to-slate-900 text-slate-500 text-xs font-mono">
                                Screenshot {idx + 1}
                            </div>
                            {/* Real implementation would use Next.js Image:
                <Image src={src} alt="App Interface" fill className="object-cover" />
                */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
