import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createClient as createSupabaseClient, SupabaseClient } from '@supabase/supabase-js'

export async function createClient(): Promise<SupabaseClient> {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        throw new Error('Supabase environment variables (URL/KEY) are missing. Please check your dashboard settings.');
    }

    const cookieStore = await cookies()

    const client = createServerClient(url, key, {
        cookies: {
            getAll() {
                return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    )
                } catch {
                    // The `setAll` method was called from a Server Component.
                }
            },
        },
    });

    return client;
}

/**
 * Creates a Supabase client that doesn't rely on cookies.
 * Safe to use in generateStaticParams or other static contexts.
 */
export function createStaticClient(): SupabaseClient {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        throw new Error('Supabase environment variables (URL/KEY) are missing. Static generation failed.');
    }

    return createSupabaseClient(url, key);
}
