'use client';

import { useState } from 'react';
import { Company, Technology } from '@/types';
import { createCompany, updateCompany } from '@/app/admin/companies/actions';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Save, Loader2, X, Building2, Globe, MapPin, Image as ImageIcon, AlignLeft, Calendar, Code2 } from 'lucide-react';

export function CompanyForm({ company, technologies, onCancel }: { company?: Company | null, technologies: Technology[], onCancel?: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [logoUrl, setLogoUrl] = useState(company?.logo_url || '');

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setStatus(null);

        try {
            if (company) {
                await updateCompany(company.id, formData);
                setStatus({ type: 'success', message: 'Company updated successfully!' });
            } else {
                await createCompany(formData);
                setStatus({ type: 'success', message: 'Company added successfully!' });
                (document.getElementById('company-form') as HTMLFormElement).reset();
            }
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message || 'Something went wrong' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form id="company-form" action={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl relative border border-white/5 shadow-xl">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Building2 className="text-primary" size={24} />
                    {company ? 'Edit Company' : 'Add New Company'}
                </h2>
                {company && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-all border border-slate-700"
                    >
                        <X size={14} />
                        Cancel Edit
                    </button>
                )}
            </div>

            {status && (
                <div className={`p-4 rounded-xl text-sm font-medium animate-in fade-in slide-in-from-top-2 ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {status.message}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Building2 size={12} /> Company Name
                    </label>
                    <input
                        name="name"
                        defaultValue={company?.name}
                        placeholder="e.g. Apple Inc."
                        required
                        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Globe size={12} /> Website URL
                    </label>
                    <input
                        name="website"
                        defaultValue={company?.website}
                        placeholder="https://..."
                        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>

                <div className="space-y-2 md:col-span-2">
                    <input type="hidden" name="logo_url" value={logoUrl} />
                    <ImageUpload
                        label="Company Logo"
                        path={`companies/${company?.id || 'new'}_logo.png`}
                        currentImageUrl={company?.logo_url}
                        onUploadComplete={setLogoUrl}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <MapPin size={12} /> Location
                    </label>
                    <input
                        name="location"
                        defaultValue={company?.location}
                        placeholder="Cupertino, CA"
                        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Calendar size={12} /> Start Join
                    </label>
                    <input
                        type="date"
                        name="start_date"
                        defaultValue={company?.start_date}
                        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all [color-scheme:dark]"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Calendar size={12} /> End Join
                    </label>
                    <input
                        type="date"
                        name="end_date"
                        defaultValue={company?.end_date}
                        className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all [color-scheme:dark]"
                    />
                    <p className="text-[10px] text-slate-500 mt-1">Leave empty for &quot;Present&quot;</p>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Code2 size={12} /> Technologies
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-4 bg-black/40 border border-slate-800 rounded-xl max-h-48 overflow-y-auto custom-scrollbar">
                        {technologies.map((tech) => (
                            <label key={tech.id} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    name="technologies"
                                    value={tech.id}
                                    defaultChecked={company?.technologies?.some(t => t.id === tech.id)}
                                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary/50 transition-all"
                                />
                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{tech.name}</span>
                            </label>
                        ))}
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">Select the tech stack used</p>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <AlignLeft size={12} /> Description
                </label>
                <textarea
                    name="description"
                    defaultValue={company?.description}
                    placeholder="Brief description of the company..."
                    rows={4}
                    className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
            >
                {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                ) : (
                    <Save size={20} />
                )}
                {company ? 'Update Company' : 'Add Company'}
            </button>
        </form>
    );
}
