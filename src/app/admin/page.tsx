export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="text-slate-400">Welcome back, Super Admin.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-medium text-slate-300">Total Visits</h3>
                    <p className="text-3xl font-bold text-white mt-2">1,234</p>
                    <span className="text-green-500 text-sm">↑ 12% from last week</span>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-medium text-slate-300">CV Downloads</h3>
                    <p className="text-3xl font-bold text-white mt-2">56</p>
                    <span className="text-blue-500 text-sm">New feature</span>
                </div>
                <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                    <h3 className="text-lg font-medium text-slate-300">Contact Requests</h3>
                    <p className="text-3xl font-bold text-white mt-2">8</p>
                    <span className="text-yellow-500 text-sm">2 Pending</span>
                </div>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200">
                🚧 This dashboard is a placeholder. Real statistics integration coming soon.
            </div>
        </div>
    );
}
