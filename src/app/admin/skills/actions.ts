'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createSkill(formData: FormData) {
    const supabase = await createClient();

    const skillData = {
        name: formData.get('name') as string,
        icon_name: formData.get('icon_name') as string,
        level: parseInt(formData.get('level') as string) || 0,
    };

    const { error } = await supabase
        .from('skills')
        .insert(skillData);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/skills');
    revalidatePath('/');
}

export async function updateSkill(id: string, formData: FormData) {
    const supabase = await createClient();

    const skillData = {
        name: formData.get('name') as string,
        icon_name: formData.get('icon_name') as string,
        level: parseInt(formData.get('level') as string) || 0,
    };

    const { error } = await supabase
        .from('skills')
        .update(skillData)
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/skills');
    revalidatePath('/');
}

export async function deleteSkill(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('skills')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/skills');
    revalidatePath('/');
}
