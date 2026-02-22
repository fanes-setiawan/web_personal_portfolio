'use client';

import { useState } from 'react';
import { Skill } from '@/types';
import { createSkill, updateSkill, deleteSkill } from '@/app/admin/skills/actions';
import { Save, Loader2, X, Plus, Trash2, Edit2, Code2, Award } from 'lucide-react';

export function SkillManagementClient({ initialSkills }: { initialSkills: Skill[] }) {
    const [skills, setSkills] = useState<Skill[]>(initialSkills);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setStatus(null);

        const formData = new FormData(e.currentTarget);
        try {
            if (editingSkill) {
                await updateSkill(editingSkill.id, formData);
                setStatus({ type: 'success', message: 'Skill updated successfully' });
            } else {
                await createSkill(formData);
                setStatus({ type: 'success', message: 'Skill created successfully' });
                (e.target as HTMLFormElement).reset();
            }
            window.location.reload();
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this skill?')) return;
        setIsLoading(true);
        try {
            await deleteSkill(id);
            window.location.reload();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-8">
            {/* Form Section */}
            <div className="glass p-6 rounded-2xl border border-white/5 bg-white/5 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Plus size={20} className="text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                        {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Code2 size={12} /> Skill Name
                            </label>
                            <input
                                required
                                name="name"
                                defaultValue={editingSkill?.name}
                                placeholder="e.g. React Native"
                                className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                <Code2 size={12} /> Icon Name (Lucide)
                            </label>
                            <input
                                required
                                name="icon_name"
                                defaultValue={editingSkill?.iconName}
                                placeholder="e.g. Smartphone, Code2, Layers"
                                className="w-full bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            />
                            <p className="text-[10px] text-slate-500">Check lucide.dev for icon names</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                            <Award size={12} /> Proficiency Level (1-10)
                        </label>
                        <div className="flex items-center gap-4">
                            <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                name="level"
                                defaultValue={editingSkill?.level || 1}
                                className="flex-1 accent-primary bg-slate-800 h-2 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-lg">
                                {editingSkill?.level || 'Select'}
                            </span>
                        </div>
                    </div>

                    {status && (
                        <div className={`p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                            {status.message}
                        </div>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-primary/20"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            {editingSkill ? 'Update Skill' : 'Create Skill'}
                        </button>

                        {editingSkill && (
                            <button
                                type="button"
                                onClick={() => setEditingSkill(null)}
                                className="px-6 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((skill) => (
                    <div key={skill.id} className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center justify-between group hover:border-white/10 transition-all shadow-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-slate-900 rounded-xl group-hover:bg-primary/10 transition-colors">
                                <Code2 className="text-slate-400 group-hover:text-primary transition-colors" size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">{skill.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="h-1.5 w-24 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${((skill.level || 0) / 10) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">Level {skill.level || 0}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => {
                                    setEditingSkill(skill);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(skill.id)}
                                className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
