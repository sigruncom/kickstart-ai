import { useState } from 'react';
import type { User, UserStatus } from '../../types';
import { getNextRole, getNextStatus, updateUser } from '../../lib/api';
import { cn } from '../../lib/utils';

interface UserRowProps {
    user: User;
    selected: boolean;
    onToggleSelect: () => void;
}

export function UserRow({ user, selected, onToggleSelect }: UserRowProps) {
    const [status, setStatus] = useState(user.status);
    const [role, setRole] = useState(user.role);
    const [loading, setLoading] = useState(false);

    const handleRoleClick = async () => {
        const next = getNextRole(role);
        setLoading(true);
        try {
            // Optimistic update
            setRole(next);
            await updateUser(user.id, { role: next });
        } catch (e) {
            console.error(e);
            setRole(role); // Revert
        } finally {
            setLoading(false);
        }
    };

    const handleStatusClick = async () => {
        const next = getNextStatus(status);
        setLoading(true);
        try {
            // Optimistic update
            setStatus(next);
            await updateUser(user.id, { status: next });
        } catch (e) {
            console.error(e);
            setStatus(status); // Revert
        } finally {
            setLoading(false);
        }
    };

    // Status Badge Styles
    // Status Badge Styles
    const getStatusStyles = (s: UserStatus) => {
        const status = (s || 'inactive').toLowerCase();
        switch (status) {
            case 'active':
                return 'text-green-700 bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400';
            case 'pending':
                return 'text-amber-700 bg-amber-50 border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400';
            case 'inactive':
            default:
                return 'text-slate-500 bg-slate-100 border border-slate-200 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400';
        }
    };

    // Calculate initials safely
    // Calculate display name and avatar letter
    // Priority: name -> email -> 'U' (Unknown)
    // Calculate display name and avatar initials
    const displayName = `${user.firstName} ${user.lastName}`.trim() || user.email;
    const initials = ((user.firstName?.[0] || '') + (user.lastName?.[0] || '')).toUpperCase() || '?';

    return (
        <tr className={cn(
            "table-row-hover transition-colors group border-b border-slate-100 dark:border-dark-border",
            selected && "selected-row"
        )}>
            <td className="px-4 py-1">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={selected}
                    onChange={onToggleSelect}
                />
            </td>
            <td className="px-2 py-1 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <div className="size-5 shrink-0 rounded bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700 uppercase">
                        {initials}
                    </div>
                    <span className="text-[12px] font-medium text-slate-800 dark:text-zinc-200 truncate">
                        {displayName}
                    </span>
                </div>
            </td>
            <td className="px-2 py-1 text-[11px] text-slate-500 dark:text-zinc-400 whitespace-nowrap truncate">
                {user?.email || ''}
            </td>
            <td className="px-2 py-1 text-[11px] text-slate-500 dark:text-zinc-400 whitespace-nowrap truncate">
                {user.role === 'admin' ? '—' : (user.cohort || '-')}
            </td>
            <td className="px-2 py-1 text-[11px] text-slate-600 dark:text-zinc-400 whitespace-nowrap font-medium">
                <button
                    onClick={handleRoleClick}
                    disabled={loading}
                    className="hover:underline focus:outline-none capitalize"
                    title="Click to toggle role"
                >
                    {role}
                </button>
            </td>
            <td className="px-2 py-1 text-[11px] text-slate-500 dark:text-zinc-400 whitespace-nowrap text-center">
                {user.dateJoined}
            </td>
            <td className="px-2 py-1 text-[11px] text-slate-500 dark:text-zinc-400 whitespace-nowrap text-center">
                {user.role === 'admin' ? 'N/A' : user.expirationDate}
            </td>
            <td className="px-2 py-1 whitespace-nowrap">
                <span
                    className={cn(
                        "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium capitalization",
                        getStatusStyles(status)
                    )}
                >
                    {status}
                </span>
            </td>
            <td className="px-4 py-1 text-right whitespace-nowrap">
                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleStatusClick}
                        disabled={loading}
                        className="px-2 py-0.5 rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-[10px] font-medium text-slate-600 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-colors"
                        title="Toggle Status"
                    >
                        {status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="p-1 text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[16px]">more_horiz</span>
                    </button>
                </div>
            </td>
        </tr>
    );
}
