'use client';

import { useState } from 'react';
import { Technology } from '@/types';
import { createTechnology, updateTechnology, deleteTechnology } from '@/app/admin/technologies/actions';
import { Plus, Trash2, Edit2, Save, X, Loader2, Code2 } from 'lucide-react';

export function TechnologyManagementClient({ initialTechnologies }: { initialTechnologies: Technology[] }) {
    const [technologies, setTechnologies] = useState<Technology[]>(initialTechnologies);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [newName, setNewName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    async function handleAddTech(e: React.FormEvent) {
        e.preventDefault();
        if (!newName.trim()) return;
        setIsLoading(true);
        try {
            await createTechnology(newName);
            window.location.reload();
        } catch (error) {
            alert('Failed to add technology');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleUpdateTech(id: string) {
        if (!editName.trim()) return;
        setIsLoading(true);
        try {
            await updateTechnology(id, editName);
            window.location.reload();
        } catch (error) {
            alert('Failed to update technology');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDeleteTech(id: string) {
        if (!confirm('Are you sure you want to delete this technology?')) return;
        setIsDeleting(id);
        try {
            await deleteTechnology(id);
            window.location.reload();
        } catch (error) {
            alert('Failed to delete technology');
        } finally {
            setIsDeleting(null);
        }
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleAddTech} className="flex gap-4 bg-white/5 p-6 rounded-2xl border border-white/5 shadow-xl">
                <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="New technology (e.g. Next.js)"
                    className="flex-1 bg-black/40 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <button
                    disabled={isLoading || !newName.trim()}
                    type="submit"
                    className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg"
                >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
                    Add Tech
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technologies.map((tech) => (
                    <div key={tech.id} className="bg-white/5 border border-white/5 rounded-xl p-4 flex items-center justify-between group hover:border-white/10 transition-all">
                        {isEditing === tech.id ? (
                            <div className="flex-1 flex gap-2">
                                <input
                                    autoFocus
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="flex-1 bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-primary"
                                />
                                <button onClick={() => handleUpdateTech(tech.id)} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg">
                                    <Save size={18} />
                                </button>
                                <button onClick={() => setIsEditing(null)} className="p-2 text-slate-400 hover:bg-white/10 rounded-lg">
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-3">
                                    <Code2 className="text-primary/70" size={18} />
                                    <span className="text-white font-medium">{tech.name}</span>
                                </div>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => {
                                            setIsEditing(tech.id);
                                            setEditName(tech.name);
                                        }}
                                        className="p-2 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTech(tech.id)}
                                        disabled={isDeleting === tech.id}
                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                    >
                                        {isDeleting === tech.id ? <Loader2 className="animate-spin" size={16} /> : <Trash2 size={16} />}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
