import { login, signup } from './actions'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string }>
}) {
    // Await searchParams in Next.js 15+
    const { message } = await searchParams

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background elements for premium feel */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-primary/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 shadow-2xl">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Welcome Back
                </h1>
                <p className="mt-2 text-sm text-foreground/60">
                    Sign in to manage your portfolio
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="glass p-8 shadow-2xl rounded-2xl border border-white/5">
                    {message && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-200">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="space-y-5">
                        <div className="space-y-1">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-foreground/80 ml-1"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="name@example.com"
                                className="block w-full px-4 py-3 bg-navy-800/50 border border-white/10 rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                            />
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-foreground/80 ml-1"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="••••••••"
                                className="block w-full px-4 py-3 bg-navy-800/50 border border-white/10 rounded-xl text-foreground placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                            />
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                formAction={login}
                                className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all duration-200 active:scale-[0.98]"
                            >
                                Sign In
                            </button>
                            <button
                                formAction={signup}
                                className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-foreground bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 active:scale-[0.98]"
                            >
                                Create an account
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-8 text-center text-xs text-foreground/40">
                    &copy; {new Date().getFullYear()} Fanes Setiawan. All rights reserved.
                </p>
            </div>
        </div>
    )
}

