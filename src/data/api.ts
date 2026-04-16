import { createClient } from '@/utils/supabase/server';
import { Profile, Project, Skill, Company } from '@/types';

export async function getProfile(): Promise<Profile | null> {
    const supabase = await createClient();
    if (!supabase) return null;

    // 1. Get current user & Role
    const { data: { user } } = await supabase.auth.getUser();
    let role = 'PUBLIC';

    if (user) {
        const { data: userRole } = await supabase.from('user_roles').select('role').eq('email', user.email).single();
        if (userRole) role = userRole.role;
    }

    // 2. Fetch Profile Data
    const { data, error } = await supabase
        .from('profile')
        .select('*')
        .single();

    if (error || !data) return null;

    return {
        name: data.name,
        role: data.role,
        roleSubtitle: data.role_subtitle,
        bio: data.bio,
        experienceYears: data.experience_years,
        avatarUrl: data.avatar_url,
        email: data.email,
        cvUrl: data.cv_url,
        location: data.location,
        website: data.website,
        socials: data.socials,
        education: data.education,
        phone: data.phone,
        coreTechStack: data.core_tech_stack
    };
}

export async function getSkills(): Promise<Skill[]> {
    const supabase = await createClient();
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('level', { ascending: false });

    if (error || !data) return [];

    return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        iconName: item.icon_name,
        level: item.level,
    }));
}

export async function getProjects(supabaseClient?: any): Promise<Project[]> {
    const supabase = supabaseClient || await createClient();
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        shortDescription: item.short_description,
        imageUrl: item.image_url,
        tags: item.tags,
        category: item.category,
        role: item.role,
        company: item.company,
        period: item.period,
        appStoreUrl: item.app_store_url,
        playStoreUrl: item.play_store_url,
        achievements: item.achievements,
        stats: item.stats,
        caseStudy: item.case_study,
        isPrivate: item.is_private,
        created_at: item.created_at,
    }));
}

export async function getProjectById(id: string, supabaseClient?: any): Promise<Project | null> {
    const supabase = supabaseClient || await createClient();
    if (!supabase) return null;
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !data) return null;

    return {
        id: data.id,
        title: data.title,
        description: data.description,
        shortDescription: data.short_description,
        imageUrl: data.image_url,
        tags: data.tags,
        category: data.category,
        role: data.role,
        company: data.company,
        period: data.period,
        appStoreUrl: data.app_store_url,
        playStoreUrl: data.play_store_url,
        achievements: data.achievements,
        stats: data.stats,
        caseStudy: data.case_study,
        isPrivate: data.is_private,
        created_at: data.created_at,
    };
}

export async function getCompanies(): Promise<Company[]> {
    const supabase = await createClient();
    if (!supabase) return [];
    const { data, error } = await supabase
        .from('companies')
        .select(`
            *,
            technology_junction:company_technologies(
                technology:technologies(*)
            )
        `)
        .order('start_date', { ascending: false });


    if (error || !data) return [];

    return data.map((item: any) => ({
        id: item.id,
        name: item.name,
        logo_url: item.logo_url,
        website: item.website,
        description: item.description,
        location: item.location,
        start_date: item.start_date,
        end_date: item.end_date,
        created_at: item.created_at,
        technologies: (item.technology_junction || []).map((tj: any) => tj.technology).filter(Boolean)
    }));
}
