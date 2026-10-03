import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject, updateProject } from '@/app/admin/projects/actions';
import { Save, AlertCircle, CheckCircle2, Loader2, X, ChevronDown, Image as ImageIcon, FileText, MessageSquare, Briefcase, Calendar, Link as LinkIcon, Tag, Folder, User, Send, Smartphone, Eye } from 'lucide-react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { DeviceMockup } from '@/components/ui/DeviceMockup';
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
    mockup_style?: 'layout1' | 'layout2' | 'layout3' | 'layout4';
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
        <form action={handleSubmit} className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 relative p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        {project ? 'Edit Project' : 'Add New Project'}
                    </h2>
                </div>
                {project && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-800 transition-all flex items-center gap-2 text-sm font-medium"
                    >
                        <X size={18} />
                        Cancel
                    </button>
                )}
            </div>

            {status.type && (
                <div className={`p-4 rounded-xl flex items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2 duration-300 ${status.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                    {status.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                    <p className="text-sm font-medium">{status.message}</p>
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                {/* Left Side: Form Fields (col-span-8) */}
                <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Left Column of Form */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">Project Title <span className="text-red-500">*</span></label>
                            <div className="relative group">
                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input name="title" required defaultValue={project?.title} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="e.g. E-Commerce App" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">Short Description <span className="text-red-500">*</span></label>
                            <div className="relative group">
                                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input name="shortDescription" required defaultValue={project?.short_description} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="One-line summary for the project card" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">Full Description (Public Case Study)</label>
                            <div className="relative group">
                                <FileText className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <textarea name="description" rows={5} defaultValue={project?.description} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none" placeholder="Detailed project case study, technologies used, and outcomes..." />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">CV Achievements / Bullet Points</label>
                            <div className="relative group">
                                <FileText className="absolute left-4 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <textarea name="achievements" rows={4} defaultValue={project?.achievements?.join('\n')} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none" placeholder="- Developed new features for X&#10;- Optimized performance by Y%&#10;- Led a team of Z..." />
                            </div>
                        </div>
                    </div>

                    {/* Right Column of Form */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">Category <span className="text-red-500">*</span></label>
                            <div className="relative group">
                                <Folder className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors z-10" size={18} />
                                <select name="category" required defaultValue={project?.category} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-10 py-3.5 text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none relative z-0">
                                    <option value="ios">iOS Development</option>
                                    <option value="android">Android Development</option>
                                    <option value="web">Web Application</option>
                                    <option value="all">Cross-Platform / Other</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">Tags (comma separated)</label>
                            <div className="relative group">
                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input name="tags" defaultValue={project?.tags?.join(', ')} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="e.g. flutter, firebase, api, ..." />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">Role</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input name="role" defaultValue={project?.role} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="Select role" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">Company</label>
                            <div className="relative group">
                                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors z-10" size={18} />
                                <select name="company" defaultValue={project?.company} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-10 py-3.5 text-slate-800 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all appearance-none relative z-0">
                                    <option value="" className="text-slate-500">Select company</option>
                                    {companies.map((c) => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">Period</label>
                            <div className="flex gap-4">
                                <div className="relative group flex-1">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                    <input name="period" defaultValue={project?.period} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="Start - End date" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">Project Link</label>
                            <div className="relative group">
                                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <input name="link" defaultValue={project?.link} className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-800 placeholder-slate-400 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" placeholder="https://example.com" />
                            </div>
                        </div>

                        {/* Extra URLs & Private Checkbox */}
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" name="isPrivate" value="true" defaultChecked={project?.isPrivate} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/30 transition-all cursor-pointer" />
                                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Private Project (Hide)</span>
                            </label>
                            <div className="flex-1 min-w-[140px]">
                                <input name="appStoreUrl" defaultValue={project?.appStoreUrl} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="App Store URL" />
                            </div>
                            <div className="flex-1 min-w-[140px]">
                                <input name="playStoreUrl" defaultValue={project?.playStoreUrl} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" placeholder="Play Store URL" />
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            type="submit"
                            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Send size={18} />
                                    Publish Project
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Right Side: Presentation Style & Live Preview (col-span-5) */}
                <div className="xl:col-span-5 space-y-6">
                    <div className="bg-slate-50/50 rounded-2xl border border-slate-200 p-6 flex flex-col gap-6">
                        
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-1">
                                <Smartphone size={18} className="text-blue-500" />
                                Presentation Style & Live Preview
                            </h3>
                            <p className="text-xs text-slate-500">Choose how the uploaded screenshots will be framed on the portfolio.</p>
                        </div>
                        
                        {/* Layout Selectors */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                            {/* Layout 1 */}
                            <label className="group relative flex flex-col items-center justify-center p-3 border-2 border-slate-200 bg-white rounded-xl cursor-pointer hover:border-blue-300 transition-all duration-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50">
                                <input type="radio" name="mockupStyle" value="layout1" checked={project?.mockup_style === 'layout1' || !project?.mockup_style} onChange={(e) => { if (project) project.mockup_style = e.target.value as "layout1" | "layout2" | "layout3"; setStatus({...status}) }} className="sr-only" />
                                <div className="h-12 w-full flex items-center justify-center gap-1 mb-2 opacity-50 group-has-[:checked]:opacity-100 transition-opacity">
                                    <div className="w-5 h-10 border-2 border-slate-300 group-has-[:checked]:border-blue-500 rounded -rotate-12 translate-y-1 transition-all"></div>
                                    <div className="w-7 h-12 border-2 border-slate-400 group-has-[:checked]:border-blue-600 rounded rotate-6 transition-all"></div>
                                </div>
                                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 group-has-[:checked]:text-blue-700 transition-colors text-center leading-tight">Two Tilted Phones</span>
                                <div className="absolute top-2 left-2 w-3 h-3 rounded-full border border-slate-300 group-has-[:checked]:border-4 group-has-[:checked]:border-blue-500 transition-all"></div>
                            </label>

                            {/* Layout 2 */}
                            <label className="group relative flex flex-col items-center justify-center p-3 border-2 border-slate-200 bg-white rounded-xl cursor-pointer hover:border-blue-300 transition-all duration-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50">
                                <input type="radio" name="mockupStyle" value="layout2" checked={project?.mockup_style === 'layout2'} onChange={(e) => { if (project) project.mockup_style = e.target.value as "layout1" | "layout2" | "layout3"; setStatus({...status}) }} className="sr-only" />
                                <div className="h-12 w-full flex items-center justify-center gap-1 mb-2 opacity-50 group-has-[:checked]:opacity-100 transition-opacity">
                                    <div className="w-12 h-9 border-2 border-slate-400 group-has-[:checked]:border-blue-600 rounded transition-all"></div>
                                    <div className="w-5 h-10 border-2 border-slate-300 group-has-[:checked]:border-blue-500 rounded translate-y-2 -ml-4 bg-white transition-all"></div>
                                </div>
                                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 group-has-[:checked]:text-blue-700 transition-colors text-center leading-tight">Tablet + Phone</span>
                                <div className="absolute top-2 left-2 w-3 h-3 rounded-full border border-slate-300 group-has-[:checked]:border-4 group-has-[:checked]:border-blue-500 transition-all"></div>
                            </label>

                            {/* Layout 3 */}
                            <label className="group relative flex flex-col items-center justify-center p-3 border-2 border-slate-200 bg-white rounded-xl cursor-pointer hover:border-blue-300 transition-all duration-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50">
                                <input type="radio" name="mockupStyle" value="layout3" checked={project?.mockup_style === 'layout3'} onChange={(e) => { if (project) project.mockup_style = e.target.value as any; setStatus({...status}) }} className="sr-only" />
                                <div className="h-12 w-full flex items-center justify-center mb-2 opacity-50 group-has-[:checked]:opacity-100 transition-opacity">
                                    <div className="w-7 h-12 border-2 border-slate-400 group-has-[:checked]:border-blue-600 rounded transition-all"></div>
                                </div>
                                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 group-has-[:checked]:text-blue-700 transition-colors text-center leading-tight">Single Phone</span>
                                <div className="absolute top-2 left-2 w-3 h-3 rounded-full border border-slate-300 group-has-[:checked]:border-4 group-has-[:checked]:border-blue-500 transition-all"></div>
                            </label>

                            {/* Layout 4 */}
                            <label className="group relative flex flex-col items-center justify-center p-3 border-2 border-slate-200 bg-white rounded-xl cursor-pointer hover:border-blue-300 transition-all duration-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50">
                                <input type="radio" name="mockupStyle" value="layout4" checked={project?.mockup_style === 'layout4'} onChange={(e) => { if (project) project.mockup_style = e.target.value as any; setStatus({...status}) }} className="sr-only" />
                                <div className="h-12 w-full flex items-center justify-center gap-1 mb-2 opacity-50 group-has-[:checked]:opacity-100 transition-opacity">
                                    <div className="w-4 h-9 border-2 border-slate-400 group-has-[:checked]:border-blue-600 rounded transition-all"></div>
                                    <div className="w-4 h-9 border-2 border-slate-400 group-has-[:checked]:border-blue-600 rounded transition-all"></div>
                                    <div className="w-4 h-9 border-2 border-slate-400 group-has-[:checked]:border-blue-600 rounded transition-all"></div>
                                </div>
                                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 group-has-[:checked]:text-blue-700 transition-colors text-center leading-tight">Multi Phones</span>
                                <div className="absolute top-2 left-2 w-3 h-3 rounded-full border border-slate-300 group-has-[:checked]:border-4 group-has-[:checked]:border-blue-500 transition-all"></div>
                            </label>
                        </div>

                        {/* Uploaders */}
                        <div className="pt-4 border-t border-slate-200">
                            <h4 className="text-xs font-bold text-slate-600 mb-3 flex items-center gap-2">
                                <ImageIcon size={14} /> Upload Screenshots
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="hidden" name="imageUrl" value={imageUrl} />
                                {project?.mockup_style === 'layout4' ? (
                                    <>
                                        {Array.from({ length: Math.min((imageUrl ? imageUrl.split(',').length : 0) + 1, 8) }).map((_, idx) => (
                                            <ImageUpload
                                                key={`multi_${idx}`}
                                                label={`Frame ${idx + 1}`}
                                                path={`projects/${project?.id || 'new'}_image_${idx + 1}.png`}
                                                currentImageUrl={imageUrl.split(',')[idx] || ''}
                                                onUploadComplete={(url) => {
                                                    const urls = imageUrl ? imageUrl.split(',') : [];
                                                    urls[idx] = url;
                                                    setImageUrl(urls.join(','));
                                                }}
                                            />
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <ImageUpload
                                            label={(!project?.mockup_style || project?.mockup_style === 'layout1') ? "Left Phone Image" : project?.mockup_style === 'layout2' ? "Tablet Image" : "Phone Image"}
                                            path={`projects/${project?.id || 'new'}_image_1.png`}
                                            currentImageUrl={imageUrl.split(',')[0] || ''}
                                            onUploadComplete={(url) => {
                                                const urls = imageUrl.split(',');
                                                urls[0] = url;
                                                setImageUrl(urls.join(','));
                                            }}
                                        />
                                        {(!project?.mockup_style || project?.mockup_style === 'layout1' || project?.mockup_style === 'layout2') && (
                                            <ImageUpload
                                                label={project?.mockup_style === 'layout2' ? "Right Phone Image" : "Right Phone Image"}
                                                path={`projects/${project?.id || 'new'}_image_2.png`}
                                                currentImageUrl={imageUrl.split(',')[1] || ''}
                                                onUploadComplete={(url) => {
                                                    const urls = imageUrl.split(',');
                                                    urls[1] = url;
                                                    if (!urls[0]) urls[0] = '';
                                                    setImageUrl(urls.join(','));
                                                }}
                                            />
                                        )}
                                    </>
                                )}
                            </div>
                        </div>

                        {/* LIVE PREVIEW BOX */}
                        <div className="mt-2 relative w-full h-[260px] bg-blue-50/50 rounded-xl overflow-hidden flex items-center justify-center border border-blue-100">
                            <div className="absolute top-3 left-3 bg-white/80 px-3 py-1 rounded-full text-[10px] font-bold text-blue-600 shadow-sm uppercase tracking-wider backdrop-blur-md z-20 flex items-center gap-1">
                                <Eye size={12}/> Live Preview
                            </div>
                            
                            <div className="relative w-full h-full flex items-center justify-center scale-[0.7] md:scale-90 lg:scale-[0.8] xl:scale-90">
                                {/* LAYOUT 1: Two Tilted Phones */}
                                {(!project?.mockup_style || project?.mockup_style === 'layout1') && (
                                    <>
                                        <DeviceMockup 
                                            src={imageUrl.split(',')[0] || ''} 
                                            alt="Left Screen" 
                                            className="w-[120px] absolute -ml-[90px] rotate-[-12deg] opacity-90 shadow-xl" 
                                        />
                                        <DeviceMockup 
                                            src={imageUrl.split(',')[1] || ''} 
                                            alt="Right Screen" 
                                            className="w-[140px] absolute ml-[70px] mt-8 rotate-[8deg] shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10" 
                                        />
                                    </>
                                )}

                                {/* LAYOUT 2: Tablet + Phone */}
                                {project?.mockup_style === 'layout2' && (
                                    <>
                                        <DeviceMockup 
                                            type="tablet"
                                            src={imageUrl.split(',')[0] || ''} 
                                            alt="Tablet Screen" 
                                            className="w-[240px] absolute -ml-16 shadow-xl" 
                                        />
                                        <DeviceMockup 
                                            src={imageUrl.split(',')[1] || ''} 
                                            alt="Phone Screen" 
                                            className="w-[90px] absolute ml-[140px] mt-16 rotate-[6deg] shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-10" 
                                        />
                                    </>
                                )}

                                {/* LAYOUT 3: Single Phone */}
                                {project?.mockup_style === 'layout3' && (
                                    <>
                                        <DeviceMockup 
                                            src={imageUrl.split(',')[0] || ''} 
                                            alt="Single Screen" 
                                            className="w-[160px] absolute shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10" 
                                        />
                                    </>
                                )}

                                {/* LAYOUT 4: Multi Phones */}
                                {project?.mockup_style === 'layout4' && (
                                    <div className="flex items-center justify-center gap-2 px-4 h-full w-full overflow-x-auto no-scrollbar">
                                        {imageUrl.split(',').filter(Boolean).map((src, idx) => (
                                            <DeviceMockup 
                                                key={idx}
                                                src={src} 
                                                alt={`Frame ${idx + 1}`} 
                                                className="w-[80px] flex-shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.2)]" 
                                            />
                                        ))}
                                        {imageUrl.split(',').filter(Boolean).length === 0 && (
                                            <span className="text-xs text-slate-400">Upload images to preview</span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </form>
    );
}
