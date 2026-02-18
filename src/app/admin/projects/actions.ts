'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
    const supabase = await createClient();

    // Basic validation
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const short_description = formData.get('shortDescription') as string;
    const description = formData.get('description') as string;
    const image_url = formData.get('imageUrl') as string;
    const tagsInfo = formData.get('tags') as string; // expecting comma separated string

    if (!title || !category || !short_description) {
        throw new Error('Missing required fields');
    }

    const tags = tagsInfo.split(',').map(t => t.trim()).filter(Boolean);

    const { error } = await supabase.from('projects').insert({
        title,
        category,
        short_description,
        description: description || '',
        image_url: image_url || '/placeholder.jpg',
        tags,
        // Optional fields - we can add more if needed
        link: formData.get('link') as string,
        role: formData.get('role') as string,
        company: formData.get('company') as string,
        period: formData.get('period') as string,
        created_at: new Date().toISOString(),
    });

    if (error) {
        console.error('Create Project Error:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/projects');
    revalidatePath('/'); // Update public homepage
    revalidatePath('/#portfolio');
}

export async function deleteProject(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Delete Project Error:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/projects');
    revalidatePath('/');
}
