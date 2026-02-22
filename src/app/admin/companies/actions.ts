'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createCompany(formData: FormData) {
    const supabase = await createClient();

    const companyData = {
        name: formData.get('name') as string,
        logo_url: formData.get('logo_url') as string,
        website: formData.get('website') as string,
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        start_date: (formData.get('start_date') as string) || null,
        end_date: (formData.get('end_date') as string) || null,
        technologies: (formData.get('technologies') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
    };

    const { data: newCompany, error } = await supabase
        .from('companies')
        .insert(companyData)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    // Handle technologies junction table
    const techIds = formData.getAll('technologies') as string[];
    if (techIds.length > 0) {
        const junctionData = techIds.map(techId => ({
            company_id: newCompany.id,
            technology_id: techId
        }));
        const { error: techError } = await supabase
            .from('company_technologies')
            .insert(junctionData);

        if (techError) {
            console.error('Error adding technologies:', techError);
        }
    }

    revalidatePath('/admin/companies');
}

export async function updateCompany(id: string, formData: FormData) {
    const supabase = await createClient();

    const companyData = {
        name: formData.get('name') as string,
        logo_url: formData.get('logo_url') as string,
        website: formData.get('website') as string,
        description: formData.get('description') as string,
        location: formData.get('location') as string,
        start_date: (formData.get('start_date') as string) || null,
        end_date: (formData.get('end_date') as string) || null,
        technologies: (formData.get('technologies') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
    };

    const { error } = await supabase
        .from('companies')
        .update(companyData)
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    // Update technologies junction table
    const techIds = formData.getAll('technologies') as string[];

    // Delete existing
    await supabase
        .from('company_technologies')
        .delete()
        .eq('company_id', id);

    // Insert new
    if (techIds.length > 0) {
        const junctionData = techIds.map(techId => ({
            company_id: id,
            technology_id: techId
        }));
        const { error: techError } = await supabase
            .from('company_technologies')
            .insert(junctionData);

        if (techError) {
            console.error('Error updating technologies:', techError);
        }
    }

    revalidatePath('/admin/companies');
}

export async function deleteCompany(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/companies');
}
