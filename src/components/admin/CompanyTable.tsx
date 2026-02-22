'use client';

import { useState } from 'react';
import { Company } from '@/types';
import { deleteCompany } from '@/app/admin/companies/actions';
import { Trash2, Edit2, Globe, MapPin, Loader2, ExternalLink } from 'lucide-react';

export function CompanyTable({ companies, onEdit }: { companies: Company[], onEdit: (company: Company) => void }) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    async function handleDelete(id: string) {
        setIsDeleting(id);
        try {
            await deleteCompany(id);
            setConfirmDelete(null);
            // Revalidation should handle the list update, but if not:
            // window.location.reload();
        } catch (error) {
            console.error('Failed to delete:', error);
            alert('Failed to delete company');
        } finally {
            setIsDeleting(null);
        }
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-400">
                <thead className="bg-white/5 text-slate-200 uppercase text-xs font-bold tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Company & Info</th>
                        <th className="px-6 py-4">Location</th>
                        <th className="px-6 py-4">Website</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {companies.map((company) => (
                        <tr key={company.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center p-1 overflow-hidden">
                                        {company.logo_url ? (
                                            <img src={company.logo_url} alt={company.name} className="w-full h-full object-contain" />
                                        ) : (
                                            <span className="text-xl">🏢</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-white group-hover:text-primary transition-colors">
                                            {company.name}
                                        </span>
                                        <span className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                            {company.description || 'No description provided'}
                                        </span>
                                        {company.technologies && company.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1.5 line-clamp-1">
                                                {company.technologies.map((tech) => (
                                                    <span key={tech.id} className="px-1.5 py-0.5 text-[9px] font-bold text-slate-400 bg-white/5 border border-white/10 rounded">
                                                        {tech.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 text-slate-300">
                                    <MapPin size={14} className="text-slate-500" />
                                    <span>{company.location || '-'}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {company.website ? (
                                    <a
                                        href={company.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        <Globe size={14} />
                                        <span className="truncate max-w-[150px]">{new URL(company.website).hostname}</span>
                                        <ExternalLink size={10} />
                                    </a>
                                ) : (
                                    <span className="text-slate-600">-</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end items-center gap-2">
                                    <button
                                        onClick={() => onEdit(company)}
                                        className="p-2 text-blue-400/50 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-all"
                                        title="Edit Company"
                                    >
                                        <Edit2 size={16} />
                                    </button>

                                    {confirmDelete === company.id ? (
                                        <div className="flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-200">
                                            <button
                                                disabled={isDeleting === company.id}
                                                onClick={() => handleDelete(company.id)}
                                                className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold py-1 px-3 rounded-md transition-all flex items-center gap-1"
                                            >
                                                {isDeleting === company.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
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
                                            onClick={() => setConfirmDelete(company.id)}
                                            className="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                            title="Delete Company"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {companies.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">
                                No companies found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
