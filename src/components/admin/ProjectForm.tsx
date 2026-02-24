import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject, updateProject } from '@/app/admin/projects/actions';
import { Save, AlertCircle, CheckCircle2, Loader2, X, ChevronDown, Image as ImageIcon } from 'lucide-react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Company } from '@/types';

interface Project {
    id: string;
    title: string;
    category: string;
    short_description: string;
    description?: string;
    image_url?: string;
    tags?: string[];
    role?: string;
    company?: string;
    period?: string;
    appStoreUrl?: string;
    playStoreUrl?: string;
    isPrivate?: boolean;
    link?: string;
    achievements?: string[];
}

export function ProjectForm({
    project,
    companies = [],
    onCancel
}: {
    project?: Project | null,
    companies?: Company[],
    onCancel?: () => void
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const [imageUrl, setImageUrl] = useState(project?.image_url || '');
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setStatus({ type: null, message: '' });

        try {
            if (project) {
                await updateProject(project.id, formData);
                setStatus({ type: 'success', message: 'Project updated successfully!' });
            } else {
                await createProject(formData);
                setStatus({ type: 'success', message: 'Project created successfully!' });
            }

            setTimeout(() => {
                if (onCancel) onCancel();
                window.location.reload();
            }, 1500);
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message || 'Something went wrong' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl relative">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">
                    {project ? 'Edit Project' : 'Add New Project'}
                </h2>
                {project && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all flex items-center gap-2 text-sm"
                    >
                        <X size={16} />
                        Cancel
                    </button>
                )}
            </div>

            {status.type && (
                <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300 ${status.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'
                    }`}>
                    {status.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                    <p className="text-sm font-medium">{status.message}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Project Title *</label>
                    <input
                        name="title"
                        required
                        defaultValue={project?.title}
                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        placeholder="e.g. E-Commerce App"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Category *</label>
                    <div className="relative">
                        <select
                            name="category"
                            required
                            defaultValue={project?.category}
                            className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all appearance-none"
                        >
                            <option value="ios" className="bg-navy-900">iOS Development</option>
                            <option value="android" className="bg-navy-900">Android Development</option>
                            <option value="web" className="bg-navy-900">Web Application</option>
                            <option value="all" className="bg-navy-900">Cross-Platform / Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Short Description *</label>
                <input
                    name="shortDescription"
                    required
                    defaultValue={project?.short_description}
                    className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="One-line summary for the project card"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">Full Description (Public Case Study)</label>
                <textarea
                    name="description"
                    rows={4}
                    defaultValue={project?.description}
                    className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="Detailed project case study, technologies used, and outcomes..."
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400 ml-1">CV Achievements / Bullet Points (One per line)</label>
                <textarea
                    name="achievements"
                    rows={4}
                    defaultValue={project?.achievements?.join('\n')}
                    className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="• Developed new features for X&#10;• Optimized performance by Y%&#10;• Led a team of Z..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                    <input type="hidden" name="imageUrl" value={imageUrl} />
                    <ImageUpload
                        label="Project Showcase Image"
                        path={`projects/${project?.id || 'new'}_image.png`}
                        currentImageUrl={project?.image_url}
                        onUploadComplete={setImageUrl}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Tags (comma separated)</label>
                    <input
                        name="tags"
                        defaultValue={project?.tags?.join(', ')}
                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        placeholder="Swift, Kotlin, Next.js, Tailwind"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Role</label>
                    <input
                        name="role"
                        defaultValue={project?.role}
                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        placeholder="e.g. Lead Mobile Developer"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Company</label>
                    <div className="relative">
                        <select
                            name="company"
                            defaultValue={project?.company}
                            className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all appearance-none"
                        >
                            <option value="" className="bg-navy-900 text-slate-500">Freelance / No Company</option>
                            {companies.map((c) => (
                                <option key={c.id} value={c.name} className="bg-navy-900">
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Period</label>
                    <input
                        name="period"
                        defaultValue={project?.period}
                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        placeholder="e.g. 2023 - 2024"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Project Link</label>
                    <input
                        name="link"
                        defaultValue={project?.link}
                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        placeholder="https://github.com/..."
                    />
                </div>
                <div className="flex items-center gap-3 pt-6">
                    <input
                        type="checkbox"
                        name="isPrivate"
                        value="true"
                        defaultChecked={project?.isPrivate}
                        className="w-5 h-5 rounded border-white/10 bg-navy-900/50 text-primary focus:ring-primary/50 transition-all"
                    />
                    <label className="text-sm font-medium text-slate-200">Private Project (Hide from public portfolio)</label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">App Store URL</label>
                    <input
                        name="appStoreUrl"
                        defaultValue={project?.appStoreUrl}
                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        placeholder="https://apps.apple.com/..."
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Play Store URL</label>
                    <input
                        name="playStoreUrl"
                        defaultValue={project?.playStoreUrl}
                        className="w-full bg-navy-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                        placeholder="https://play.google.com/store/..."
                    />
                </div>
            </div>

            <button
                disabled={isLoading}
                type="submit"
                className={`w-full ${project ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20' : 'bg-primary hover:bg-primary-dark shadow-primary/20'} text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed mt-4`}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                    </>
                ) : (
                    <>
                        <Save size={20} />
                        {project ? 'Update Project' : 'Publish Project'}
                    </>
                )}
            </button>
        </form>
    );
}
