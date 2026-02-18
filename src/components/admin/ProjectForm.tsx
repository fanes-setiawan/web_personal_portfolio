'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/app/admin/projects/actions';

export function ProjectForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        setMessage('');

        try {
            await createProject(formData);
            setMessage('✅ Project created successfully!');
            // Reset form (optional mechanism needed if not navigating away)
            // For now, we might just reload or clear
            window.location.reload();
        } catch (error: any) {
            setMessage(`❌ Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6 bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Add New Project</h2>

            {message && (
                <div className={`p-3 rounded text-sm font-medium ${message.includes('Error') ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Project Title *</label>
                    <input name="title" required className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" placeholder="e.g. E-Commerce App" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Category *</label>
                    <select name="category" required className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none">
                        <option value="ios">iOS</option>
                        <option value="android">Android</option>
                        <option value="web">Web</option>
                        <option value="all">All / Other</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Short Description *</label>
                <input name="shortDescription" required className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" placeholder="Brief summary for card view" />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Full Description</label>
                <textarea name="description" rows={4} className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" placeholder="Detailed case study or description..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Image URL</label>
                    <input name="imageUrl" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" placeholder="https://..." defaultValue="/placeholder.jpg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Tags (comma separated)</label>
                    <input name="tags" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" placeholder="Swift, Kotlin, React Native" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Role</label>
                    <input name="role" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" placeholder="e.g. Lead Engineer" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Company</label>
                    <input name="company" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" placeholder="e.g. Tech Corp" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Link (Optional)</label>
                    <input name="link" className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white focus:border-blue-500 outline-none" placeholder="https://..." />
                </div>
            </div>

            <button disabled={isLoading} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50">
                {isLoading ? 'Saving...' : 'Create Project'}
            </button>
        </form>
    );
}
