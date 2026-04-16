import { NextRequest, NextResponse } from 'next/server';
import { getProfile } from '@/data/api';
import { getVisitorInfo, sendDiscordNotification } from '@/utils/discord';

export async function GET(req: NextRequest) {
    try {
        // 1. Get Profile to find CV URL
        const profile = await getProfile();
        
        if (!profile || !profile.cvUrl) {
            return NextResponse.json({ error: 'CV not found' }, { status: 404 });
        }

        // 2. Log tracking info (send to discord)
        const visitorInfo = await getVisitorInfo(req, 'CV_DOWNLOAD');
        
        // Try to get user email if logged in
        const supabase = await (await import('@/utils/supabase/server')).createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) visitorInfo.email = user.email;

        await sendDiscordNotification(visitorInfo);

        // 3. Redirect to the actual CV
        return NextResponse.redirect(profile.cvUrl);
    } catch (error) {
        console.error('Error tracking CV download:', error);
        // Fallback: still try to redirect if possible or show error
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
