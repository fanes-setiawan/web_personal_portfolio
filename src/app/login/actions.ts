'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { SupabaseClient } from '@supabase/supabase-js'

export async function login(formData: FormData) {
    const supabase: SupabaseClient = (await createClient())!;

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase!.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error("Login Error:", error.message)
        return redirect(`/login?message=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/')
}
