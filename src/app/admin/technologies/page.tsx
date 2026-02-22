import { createClient } from '@/utils/supabase/server';
import { TechnologyManagementClient } from '@/components/admin/TechnologyManagementClient';
import { Code2 } from 'lucide-react';

export default async function ManageTechnologiesPage() {
    const supabase = await createClient();
    const { data: technologies } = await supabase
        .from('technologies')
        .select('*')
        .order('name', { ascending: true });

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Code2 className="text-primary" />
                    Manage Technologies
                </h1>
                <p className="text-slate-400">Add, edit, or remove technologies used in your projects and career.</p>
            </div>

            <TechnologyManagementClient initialTechnologies={technologies || []} />
        </div>
    );
}
