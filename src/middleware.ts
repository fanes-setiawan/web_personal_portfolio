import { NextRequest, NextFetchEvent } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { getVisitorInfo, sendDiscordNotification } from '@/utils/discord'

export async function middleware(request: NextRequest, event: NextFetchEvent) {
    // 1. Update Supabase Session (Existing logic)
    const { supabaseResponse, user } = await updateSession(request)

    // 2. Track Visitor (Asynchronously)
    const pathname = request.nextUrl.pathname
    
    // Only track main pages, not API routes or static files
    if (
        !pathname.startsWith('/api') && 
        !pathname.includes('.')
    ) {
        // Use event.waitUntil so the request isn't blocked by the Discord notification
        event.waitUntil(
            (async () => {
                const info = await getVisitorInfo(request, 'PAGE_VIEW')
                info.email = user?.email // Capture logged-in email
                await sendDiscordNotification(info)
            })()
        )
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
