import { createClient } from '@/utils/supabase/server';
import { ProjectManagementClient } from '@/components/admin/ProjectManagementClient';
import { getCompanies } from '@/data/api';
import { FolderPlus } from 'lucide-react';

export default async function ManageProjectsPage() {
    const supabase = await createClient();
    const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    const companies = await getCompanies();

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <FolderPlus className="text-primary" />
                    Manage Projects
                </h1>
                <p className="text-slate-400">Add, edit, or remove projects from your portfolio showcase.</p>
            </div>

            <ProjectManagementClient
                initialProjects={projects || []}
                companies={companies}
            />
        </div>
    );
}

