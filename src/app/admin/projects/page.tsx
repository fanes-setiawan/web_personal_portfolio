import { createClient } from '@/utils/supabase/server';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { deleteProject } from './actions';

export default async function ManageProjectsPage() {
    const supabase = await createClient();
    const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Manage Projects</h1>

            {/* Add Project Section */}
            <ProjectForm />

            {/* List Projects Section */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-700">
                    <h2 className="text-xl font-bold text-white">Existing Projects ({projects?.length || 0})</h2>
                </div>

                <div className="p-4 overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-900/50 text-slate-200 uppercase font-bold">
                            <tr>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {projects?.map((project: any) => (
                                <tr key={project.id} className="hover:bg-slate-700/30 transition-colors">
                                    <td className="px-4 py-3 font-medium text-white">{project.title}</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 bg-slate-800 rounded text-xs border border-slate-600 uppercase">
                                            {project.category}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{project.role || '-'}</td>
                                    <td className="px-4 py-3 text-right">
                                        <form action={async () => {
                                            'use server';
                                            await deleteProject(project.id);
                                        }}>
                                            <button className="text-red-400 hover:text-red-300 font-medium hover:underline text-xs">
                                                Delete
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                            {(!projects || projects.length === 0) && (
                                <tr>
                                    <td colSpan={4} className="px-4 py-6 text-center text-slate-500 italic">
                                        No projects found. Add one above.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
