import { useState, useEffect } from 'react';
import type { User, UserRole, UserStatus } from '../../types';
import { updateUser } from '../../lib/api';

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onSuccess: () => void;
}

export function EditUserModal({ isOpen, onClose, user, onSuccess }: EditUserModalProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [cohort, setCohort] = useState('');
    const [role, setRole] = useState<UserRole>('student');
    const [status, setStatus] = useState<UserStatus>('active');
    const [expirationDate, setExpirationDate] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setEmail(user.email || '');
            setCohort(user.cohort || '');
            setRole(user.role || 'student');
            setStatus(user.status || 'active');
            setExpirationDate(user.expirationDate || '');
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await updateUser(user.id, {
                firstName,
                lastName,
                role,
                status,
                cohort,
                expirationDate
            });
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white dark:bg-matte-black border border-slate-200 dark:border-dark-border rounded-lg shadow-xl overflow-hidden transition-colors">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-border flex items-center justify-between bg-slate-50/50 dark:bg-dark-surface">
                    <h3 className="text-lg font-medium text-slate-800 dark:text-white">Edit User</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-1.5">
                            <label className="text-[12px] font-medium text-slate-700 dark:text-zinc-300">First Name</label>
                            <input
                                type="text"
                                required
                                className="px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5">
                            <label className="text-[12px] font-medium text-slate-700 dark:text-zinc-300">Last Name</label>
                            <input
                                type="text"
                                required
                                className="px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-medium text-slate-700 dark:text-zinc-300">Email Address <span className="text-slate-400 font-normal ml-1">(Read-only)</span></label>
                        <input
                            type="email"
                            disabled
                            className="px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 cursor-not-allowed"
                            value={email}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-1.5">
                            <label className="text-[12px] font-medium text-slate-700 dark:text-zinc-300">Role</label>
                            <select
                                className="px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white capitalize"
                                value={role}
                                onChange={(e) => setRole(e.target.value as UserRole)}
                            >
                                <option value="student">Student</option>
                                <option value="coach">Coach</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5">
                            <label className="text-[12px] font-medium text-slate-700 dark:text-zinc-300">Status</label>
                            <select
                                className="px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white capitalize"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as UserStatus)}
                            >
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-1.5">
                            <label className="text-[12px] font-medium text-slate-700 dark:text-zinc-300">Cohort</label>
                            <input
                                type="text"
                                className="px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                                value={cohort}
                                onChange={(e) => setCohort(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5">
                            <label className="text-[12px] font-medium text-slate-700 dark:text-zinc-300">Expiration</label>
                            <input
                                type="text"
                                className="px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                                placeholder="MMM DD, YYYY"
                                value={expirationDate}
                                onChange={(e) => setExpirationDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md shadow-sm hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
