import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { profileData, skillsData, projectsData, companiesData } from '@/data/mockData';

export async function GET() {
    const supabase = createClient();
    const client = await supabase;

    try {
        // 1. Seed Profile
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

        // 4. Seed Companies
        try {
            await client.from('companies').delete().neq('id', '00000000-0000-0000-0000-000000000000');
            const companiesToInsert = companiesData.map(c => ({
                name: c.name,
                logo_url: c.logo_url,
                website: c.website,
                description: c.description,
                location: c.location,
                start_date: c.start_date,
                end_date: c.end_date
            }));


            const { error: companiesError } = await client
                .from('companies')
                .insert(companiesToInsert);

            if (companiesError) {
                console.warn("Companies table might not exist yet:", companiesError.message);
            }
        } catch (e) {
            console.warn("Companies seeding skipped (table likely missing)");
        }

        // 5. Seed User Roles
        const rolesToInsert = [
            { email: 'admin@super.com', role: 'SUPER_ADMIN' },
            { email: 'hr@access.com', role: 'HR' }
        ];

        const { error: rolesError } = await client
            .from('user_roles')
            .upsert(rolesToInsert, { onConflict: 'email' });

        if (rolesError) {
            console.warn("User Roles table might not exist yet:", rolesError.message);
        }

        return NextResponse.json({ message: 'Database (Profile, Skills, Projects, Companies, Roles) seeded successfully!' });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
