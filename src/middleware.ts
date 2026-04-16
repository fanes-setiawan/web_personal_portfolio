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
        // Use await instead of waitUntil to ensure log is sent before request finishes (for debugging)
        try {
            const info = await getVisitorInfo(request, 'PAGE_VIEW')
            info.email = user?.email
            await sendDiscordNotification(info)
        } catch (err) {
            console.error('Middleware logging failed:', err)
        }
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
