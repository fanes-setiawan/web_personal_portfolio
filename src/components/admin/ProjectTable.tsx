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
            <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Title & Details</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Role & Company</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {projects.map((project) => (
                        <tr key={project.id} className="hover:bg-slate-50/80 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex flex-col gap-1">
                                    <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </span>
                                    <span className="text-xs text-slate-500 line-clamp-1 max-w-[400px]">
                                        {project.short_description}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-2">
                                    {project.category.split(',').map(c => (
                                        <span key={c} className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase border border-blue-100">
                                            {c.trim()}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-slate-700">{project.role || '-'}</span>
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
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            title="View Project"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    )}
                                    <button
                                        onClick={() => onEdit(project)}
                                        className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                        title="Edit Project"
                                    >
                                        <Edit2 size={16} />
                                    </button>

                                    {confirmDelete === project.id ? (
                                        <div className="flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-200">
                                            <button
                                                disabled={isDeleting === project.id}
                                                onClick={() => handleDelete(project.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold py-1.5 px-3 rounded-md transition-all flex items-center gap-1"
                                            >
                                                {isDeleting === project.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                                                Confirm
                                            </button>
                                            <button
                                                onClick={() => setConfirmDelete(null)}
                                                className="text-slate-500 hover:text-slate-700 hover:bg-slate-100 text-[10px] font-bold py-1.5 px-2 rounded-md transition-all"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setConfirmDelete(project.id)}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-500 font-medium">
                                No projects found. Start by adding a new one!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
