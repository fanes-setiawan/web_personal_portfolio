'use client';

import { useState } from 'react';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { ProjectTable } from '@/components/admin/ProjectTable';
import { FolderPlus, Table as TableIcon, Folder } from 'lucide-react';
import { Project, Company } from '@/types';

export function ProjectManagementClient({
    initialProjects,
    companies
}: {
    initialProjects: any[],
    companies: Company[]
}) {
    const [editingProject, setEditingProject] = useState<any | null>(null);

    return (
        <div className="space-y-8">
            {/* Form Section */}
            <div className="glass p-1 rounded-2xl border border-white/5 overflow-hidden">
                <ProjectForm
                    key={editingProject?.id || 'new'}
                    project={editingProject}
                    companies={companies}
                    onCancel={() => setEditingProject(null)}
                />
            </div>

            {/* List Section */}
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-8">
                <div className="p-6 md:p-8 border-b border-slate-100 bg-white flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Folder size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Existing Projects ({initialProjects.length})
                        </h2>
                    </div>
                </div>

                <ProjectTable
                    projects={initialProjects}
                    onEdit={(project) => {
                        setEditingProject(project);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                />
            </div>
        </div>
    );
}
