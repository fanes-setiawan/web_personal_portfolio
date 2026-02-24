'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfileAction(formData: FormData) {
    const supabase = await createClient();

    const profileData = {
        name: formData.get('name') as string,
        role: formData.get('role') as string,
        role_subtitle: formData.get('roleSubtitle') as string,
        bio: formData.get('bio') as string,
        experience_years: parseInt(formData.get('experienceYears') as string) || 0,
        avatar_url: formData.get('avatarUrl') as string,
        email: formData.get('email') as string,
        location: formData.get('location') as string,
        socials: {
            github: formData.get('github') as string,
            linkedin: formData.get('linkedin') as string,
            twitter: formData.get('twitter') as string,
            whatsapp: formData.get('whatsapp') as string,
        },
        education: JSON.parse(formData.get('education') as string || '[]'),
        core_tech_stack: (formData.get('coreTechStack') as string || '').split(',').map(s => s.trim()).filter(Boolean)
    };

    const { error } = await supabase
        .from('profile')
        .update(profileData)
        .eq('id', formData.get('id') as string);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin');
    revalidatePath('/');
}
