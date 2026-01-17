import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDark(false);
        }
    }, []);

    const toggleDark = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else {
                setError('Failed to sign in. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#F4F4F6] dark:bg-matte-black transition-colors duration-200 relative overflow-hidden flex flex-col font-sans">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-rose-100/50 dark:bg-rose-900/10 blur-3xl pointer-events-none" />
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-slate-200/50 dark:bg-slate-800/10 blur-3xl pointer-events-none" />

            {/* Header */}
            <header className="flex justify-between items-center p-6 md:p-8 relative z-10">
                <div className="flex items-center gap-3">
                    {/* Custom Red Logo */}
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                        <ellipse cx="6" cy="16" rx="5" ry="12" fill="#D30404" />
                        <ellipse cx="16" cy="16" rx="5" ry="12" fill="#D30404" />
                        <ellipse cx="26" cy="16" rx="5" ry="12" fill="#D30404" />
                    </svg>
                    <div className="flex flex-col leading-none">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#7E8299] dark:text-zinc-500">SOMBA® AI</span>
                        <span className="text-lg font-bold text-[#181C32] dark:text-white">Kickstart Coach</span>
                    </div>
                </div>

                <button
                    onClick={toggleDark}
                    className="p-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm border border-slate-100 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-all text-slate-500 dark:text-zinc-400"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        {isDark ? 'dark_mode' : 'light_mode'}
                    </span>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">

                <div className="text-center mb-8">
                    <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#A1A5B7] dark:text-zinc-500 mb-2 block">SOMBA® AI</span>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#181C32] dark:text-white tracking-tight">Kickstart Coach</h1>
                </div>

                <div className="w-full max-w-[450px] bg-white dark:bg-[#1E1E2D] rounded-2xl shadow-xl p-8 md:p-10 border border-slate-50 dark:border-zinc-800/50">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-1.5">
                            <label htmlFor="email" className="block text-sm font-medium text-[#3F4254] dark:text-zinc-300">Email Address</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-lg border-0 bg-[#F9F9F9] dark:bg-zinc-900 py-3 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-zinc-700 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-[#D30404] sm:text-sm sm:leading-6 transition-all"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="password" className="block text-sm font-medium text-[#3F4254] dark:text-zinc-300">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-lg border-0 bg-[#F9F9F9] dark:bg-zinc-900 py-3 px-4 text-slate-900 dark:text-white shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-zinc-700 placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-[#D30404] sm:text-sm sm:leading-6 transition-all"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end">
                            <button type="button" className="text-sm font-medium text-slate-500 dark:text-zinc-400 hover:text-[#D30404] dark:hover:text-[#D30404] transition-colors">
                                Forgot password?
                            </button>
                        </div>

                        {error && (
                            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-300 text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-[#D30404] py-3 text-sm font-bold text-white shadow-md hover:bg-[#B00303] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D30404] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {loading ? 'Signing in...' : 'Login'}
                        </button>
                    </form>
                </div>

                {/* Decorative Dots */}
                <div className="flex gap-2.5 mt-12">
                    <div className="w-12 h-1.5 rounded-full bg-slate-200 dark:bg-zinc-800"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-zinc-700"></div>
                    <div className="w-12 h-1.5 rounded-full bg-slate-200 dark:bg-zinc-800"></div>
                </div>
            </main>
        </div>
    );
}
