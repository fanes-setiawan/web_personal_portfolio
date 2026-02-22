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

    const projectData: any = {
        title,
        category,
        short_description,
        description: description || '',
        image_url: image_url || '/placeholder.jpg',
        tags,
        role: formData.get('role') as string,
        company: formData.get('company') as string,
        period: formData.get('period') as string,
        app_store_url: formData.get('appStoreUrl') as string,
        play_store_url: formData.get('playStoreUrl') as string,
        created_at: new Date().toISOString(),
    };

    // Only add link if it exists in the database schema
    // Since we detected it's missing, we comment it out for now to ensure functionality
    // const link = formData.get('link') as string;
    // if (link) projectData.link = link;

    const { error } = await supabase.from('projects').insert(projectData);

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

export async function updateProject(id: string, formData: FormData) {
    const supabase = await createClient();

    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const short_description = formData.get('shortDescription') as string;
    const description = formData.get('description') as string;
    const image_url = formData.get('imageUrl') as string;
    const tagsInfo = formData.get('tags') as string;

    if (!title || !category || !short_description) {
        throw new Error('Missing required fields');
    }

    const tags = tagsInfo.split(',').map(t => t.trim()).filter(Boolean);

    const projectData: any = {
        title,
        category,
        short_description,
        description: description || '',
        image_url: image_url || '/placeholder.jpg',
        tags,
        role: formData.get('role') as string,
        company: formData.get('company') as string,
        period: formData.get('period') as string,
        app_store_url: formData.get('appStoreUrl') as string,
        play_store_url: formData.get('playStoreUrl') as string,
    };

    const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id);

    if (error) {
        console.error('Update Project Error:', error);
        throw new Error(error.message);
    }

    revalidatePath('/admin/projects');
    revalidatePath('/');
    revalidatePath('/#portfolio');
}
