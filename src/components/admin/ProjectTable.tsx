'use client';

import { useState } from 'react';
import { deleteProject } from '@/app/admin/projects/actions';
import { Trash2, Edit2, ExternalLink, AlertTriangle, Loader2 } from 'lucide-react';

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
    link?: string;
}

export function ProjectTable({ projects, onEdit }: { projects: Project[], onEdit: (project: Project) => void }) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    async function handleDelete(id: string) {
        setIsDeleting(id);
        try {
            await deleteProject(id);
            setConfirmDelete(null);
            window.location.reload();
        } catch (error) {
            console.error('Failed to delete:', error);
            alert('Failed to delete project');
        } finally {
            setIsDeleting(null);
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-white/5 text-slate-200 uppercase text-xs font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Title & Details</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Role & Company</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white group-hover:text-primary transition-colors">
                                        {project.title}
                                    </span>
                                    <span className="text-xs text-slate-500 mt-1 line-clamp-1">
                                        {project.short_description}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase border border-primary/20">
                                    {project.category}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-slate-300">{project.role || '-'}</span>
                                    <span className="text-xs text-slate-500">{project.company || '-'}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end items-center gap-2">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 text-slate-500 hover:text-white transition-colors"
                                            title="View Project"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                    <button
                                        onClick={() => onEdit(project)}
                                        className="p-2 text-blue-400/50 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                                        title="Edit Project"
                                    >
                                        <Edit2 size={16} />
                                    </button>

                                    {confirmDelete === project.id ? (
                                        <div className="flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-200">
                                            <button
                                                disabled={isDeleting === project.id}
                                                onClick={() => handleDelete(project.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold py-1 px-3 rounded-md transition-all flex items-center gap-1"
                                            >
                                                {isDeleting === project.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => setConfirmDelete(null)}
                                                className="text-slate-400 hover:text-white text-[10px] font-bold py-1 px-2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setConfirmDelete(project.id)}
                                            className="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                            title="Delete Project"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {projects.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">
                                No projects found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
