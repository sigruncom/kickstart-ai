import { cn } from '../../lib/utils';

export function Sidebar() {
    return (
        <aside className="w-64 bg-sidebar-light dark:bg-dark-sidebar flex flex-col shrink-0 border-r border-slate-200 dark:border-dark-border transition-colors duration-200">
            <div className="p-6 flex flex-col gap-0.5">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 dark:text-zinc-500">
                    SOMBA® AI
                </span>
                <h1 className="text-2xl font-bold tracking-tight text-matte-black dark:text-white leading-none">
                    Kickstart Coach
                </h1>
            </div>

            <nav className="flex-1 px-3 mt-4 space-y-0.5">
                <NavItem icon="dashboard" label="Dashboard" />
                <NavItem icon="group" label="User Management" active />
                <NavItem icon="bar_chart" label="Analytics" />
                <NavItem icon="settings" label="Settings" />
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-dark-border">
                <button className="flex w-full items-center gap-3 px-3 py-1.5 text-[13px] font-medium text-slate-500 dark:text-zinc-500 hover:text-matte-black dark:hover:text-white transition-all">
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    Logout
                </button>
            </div>
        </aside>
    );
}

function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
    return (
        <a
            href="#"
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded transition-colors",
                active
                    ? "active-nav"
                    : "text-slate-700 dark:text-zinc-400 hover:bg-slate-200/50 dark:hover:bg-zinc-800/50 dark:hover:text-white"
            )}
        >
            <span className={cn(
                "material-symbols-outlined text-[20px]",
                // active ? "text-primary" : "" // Handled by CSS active-nav
            )}>
                {icon}
            </span>
            <span className="text-[13px] font-medium">{label}</span>
        </a>
    );
}
