import { createClient } from '@/utils/supabase/server';
import { SkillManagementClient } from '@/components/admin/SkillManagementClient';
import { Award } from 'lucide-react';

export default async function ManageSkillsPage() {
    const supabase = await createClient();
    const { data: skills } = await supabase
        .from('skills')
        .select('*')
        .order('level', { ascending: false });

    // Transform level to match the API and DB expectations if needed
    // The Skill interface uses level: number, and the DB uses level INTEGER
    const formattedSkills = (skills || []).map(s => ({
        id: s.id,
        name: s.name,
        iconName: s.icon_name,
        level: s.level
    }));

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <Award className="text-primary" />
                    Manage Skills
                </h1>
                <p className="text-slate-400">Add, edit, or remove technical skills displayed on your landing page.</p>
            </div>

            <SkillManagementClient initialSkills={formattedSkills} />
        </div>
    );
}
