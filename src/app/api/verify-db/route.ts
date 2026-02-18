import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = createClient();
    const client = await supabase;

    const results: Record<string, any> = {};

    try {
        // Check Profile Table
        const { data: profile, error: profileError } = await client
            .from('profile')
            .select('count', { count: 'exact', head: true });

        results.profile = {
            exists: !profileError,
            count: profile || 0,
            error: profileError ? profileError.message : null
        };

        // Check Skills Table
        const { data: skills, error: skillsError } = await client
            .from('skills')
            .select('count', { count: 'exact', head: true });

        results.skills = {
            exists: !skillsError,
            count: skills || 0,
            error: skillsError ? skillsError.message : null
        };

        // Check Projects Table
        const { data: projects, error: projectsError } = await client
            .from('projects')
            .select('count', { count: 'exact', head: true });

        results.projects = {
            exists: !projectsError,
            count: projects || 0,
            error: projectsError ? projectsError.message : null
        };

        // Check Auth User (Current Session)
        const { data: { user }, error: authError } = await client.auth.getUser();

        results.session = {
            isAuthenticated: !!user,
            userId: user?.id || null,
            email: user?.email || null,
            authError: authError ? authError.message : null
        };

        return NextResponse.json({
            status: 'Database Verification Complete',
            timestamp: new Date().toISOString(),
            tables: results
        }, { status: 200 });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
