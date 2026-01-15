import { useEffect, useState } from 'react';

export function Header() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check system preference or localStorage
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

    return (
        <header className="h-12 flex items-center justify-end px-6 bg-white dark:bg-dark-surface shrink-0 border-b border-slate-100 dark:border-dark-border transition-colors duration-200">
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-zinc-700 bg-white dark:bg-transparent text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white transition-all group">
                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                    <span className="text-[11px] font-medium">Switch to Student View</span>
                </button>

                <div className="h-4 w-px bg-slate-200 dark:bg-zinc-700"></div>

                <button
                    onClick={toggleDark}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        {isDark ? 'dark_mode' : 'light_mode'}
                    </span>
                </button>

                <div className="h-4 w-px bg-slate-200 dark:bg-zinc-700"></div>

                <div className="flex items-center gap-2 cursor-pointer group">
                    <span className="text-[11px] font-medium text-slate-600 dark:text-zinc-400 group-hover:text-primary dark:group-hover:text-white transition-colors">
                        Admin User
                    </span>
                    <div
                        className="size-6 rounded-full bg-slate-200 dark:bg-zinc-800 bg-cover bg-center border border-slate-200 dark:border-zinc-700"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6qauwly108pmRcJezZzLLEk1JhdZm7WGnHaKwiYGL-Vb_8bvWGYRD1uzad4t3I-jXfy3PjQy_nxOvB-0vbaQvpGwuM6qlNcjvKN7YP8iyRwBghK8mOgtg3hAEzJAHzYli9U413WQ-6FKMhih1Gk-jPC25EJkUaWa0aayGCgY5tanO5f6IR9yPHXPlvnDJJ1M8nknhMzXX2IUDLo9fxNpsiy7L49gb3TlQBHu5pOV5iBLy5kYlnCiZ9w3dPV0YCwl_rHnbglIhNKvm')" }}
                    ></div>
                    <span className="material-symbols-outlined text-slate-400 dark:text-zinc-500 text-[16px]">expand_more</span>
                </div>
            </div>
        </header>
    );
}
