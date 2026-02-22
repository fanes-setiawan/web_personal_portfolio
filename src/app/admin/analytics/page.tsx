import { getProjects, getCompanies, getSkills } from '@/data/api';
import { AnalyticsClient } from '@/components/admin/AnalyticsClient';
import { fetchStorageStatsAction } from '@/app/admin/media/actions';
import { BarChart3 } from 'lucide-react';

export default async function AnalyticsPage() {
    const [projects, companies, skills, storage] = await Promise.all([
        getProjects(),
        getCompanies(),
        getSkills(),
        fetchStorageStatsAction()
    ]);

    // Calculate distributions
    const categories = ['ios', 'android', 'web', 'all'];
    const categoryColors: Record<string, string> = {
        ios: 'bg-blue-500',
        android: 'bg-emerald-500',
        web: 'bg-purple-500',
        all: 'bg-slate-500'
    };

    const categoryDist = categories.map(cat => ({
        label: cat === 'all' ? 'cross-platform' : cat,
        count: projects.filter(p => p.category === cat).length,
        color: categoryColors[cat]
    })).sort((a, b) => b.count - a.count);

    // Calculate top tags
    const tagMap: Record<string, number> = {};
    projects.forEach(p => {
        p.tags?.forEach(tag => {
            tagMap[tag] = (tagMap[tag] || 0) + 1;
        });
    });

    const topTags = Object.entries(tagMap)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

    // Top skills by level
    const topSkills = [...skills]
        .sort((a, b) => (b.level || 0) - (a.level || 0))
        .slice(0, 9)
        .map(s => ({ name: s.name, level: s.level || 0 }));

    const stats = {
        totalProjects: projects.length,
        totalCompanies: companies.length,
        totalSkills: skills.length,
        categoryDist,
        topTags,
        topSkills,
        storage
    };

    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                    <BarChart3 className="text-primary" />
                    Portfolio Analytics
                </h1>
                <p className="text-slate-400">Deep dive into your portfolio composition and performance metrics.</p>
            </div>

            <AnalyticsClient stats={stats} />
        </div>
    );
}
