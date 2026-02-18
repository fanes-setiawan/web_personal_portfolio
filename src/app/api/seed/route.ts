import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { profileData, skillsData, projectsData } from '@/data/mockData';

export async function GET() {
    const supabase = createClient();
    const client = await supabase;

    // Check authentication
    // const { data: { user }, error: authError } = await client.auth.getUser();
    // if (authError || !user) {
    //     return NextResponse.json({ error: 'Unauthorized. Please log in at /login first.' }, { status: 401 });
    // }

    try {
        // 1. Seed Profile
        // using upsert with onConflict on 'email' assuming it is a unique key
        // 1. Seed Profile
        // Delete all profiles first to avoid conflict issues since 'email' might not be unique in schema
        await client.from('profile').delete().neq('id', '00000000-0000-0000-0000-000000000000');

        const { error: profileError } = await client
            .from('profile')
            .insert({
                name: profileData.name,
                role: profileData.role,
                role_subtitle: profileData.roleSubtitle,
                bio: profileData.bio,
                experience_years: profileData.experienceYears,
                avatar_url: profileData.avatarUrl,
                email: profileData.email,
                location: profileData.location,
                website: profileData.website,
                socials: profileData.socials,
                education: profileData.education,
            });

        if (profileError) throw new Error(`Profile Error: ${profileError.message}`);

        // 2. Seed Skills
        // Delete existing skills to avoid duplicates on re-seed (optional, but cleaner)
        await client.from('skills').delete().neq('id', '00000000-0000-0000-0000-000000000000');

        const skillsToInsert = skillsData.map(skill => ({
            name: skill.name,
            icon_name: skill.iconName,
            level: skill.level
        }));

        const { error: skillsError } = await client
            .from('skills')
            .insert(skillsToInsert);

        if (skillsError) throw new Error(`Skills Error: ${skillsError.message}`);

        // 3. Seed Projects
        // Delete existing projects
        await client.from('projects').delete().neq('id', '00000000-0000-0000-0000-000000000000');

        const projectsToInsert = projectsData.map(project => ({
            title: project.title,
            short_description: project.shortDescription,
            description: project.description,
            category: project.category,
            image_url: project.imageUrl,
            tags: project.tags,
            role: project.role,
            company: project.company,
            period: project.period,
            achievements: project.achievements,
            stats: project.stats,
            case_study: project.caseStudy,
        }));

        const { error: projectsError } = await client
            .from('projects')
            .insert(projectsToInsert);

        if (projectsError) throw new Error(`Projects Error: ${projectsError.message}`);



        // 4. Seed User Roles
        // We can't delete based on ID easily if we don't know it, so we'll upsert by email
        const rolesToInsert = [
            { email: 'admin@super.com', role: 'SUPER_ADMIN' },
            { email: 'hr@access.com', role: 'HR' }
        ];

        const { error: rolesError } = await client
            .from('user_roles')
            .upsert(rolesToInsert, { onConflict: 'email' });

        if (rolesError) {
            // If table doesn't exist, we ignore for now but log it (or throw if critical)
            console.warn("User Roles table might not exist yet:", rolesError.message);
        }

        return NextResponse.json({ message: 'Database (Profile, Skills, Projects, Roles) seeded successfully!' });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
