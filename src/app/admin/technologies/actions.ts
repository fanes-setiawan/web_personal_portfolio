'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createTechnology(name: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('technologies')
        .insert({ name });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/technologies');
    revalidatePath('/admin/companies');
}

export async function updateTechnology(id: string, name: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('technologies')
        .update({ name })
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/technologies');
    revalidatePath('/admin/companies');
}

export async function deleteTechnology(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('technologies')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/technologies');
    revalidatePath('/admin/companies');
}
