import { NextRequest, NextResponse } from 'next/server';
import { getVisitorInfo, sendDiscordNotification } from '@/utils/discord';

export async function POST(req: NextRequest) {
    try {
        const { eventType, details } = await req.json();
        const visitorInfo = await getVisitorInfo(req, eventType === 'CV_DOWNLOAD' ? 'CV_DOWNLOAD' : 'PAGE_VIEW');
        
        // Try to get user email if logged in
        const supabase = await (await import('@/utils/supabase/server')).createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) visitorInfo.email = user.email;

        // Add custom details if provided
        if (details) {
            visitorInfo.page = `${visitorInfo.page} (${details})`;
        }

        await sendDiscordNotification(visitorInfo);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error tracking custom event:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
