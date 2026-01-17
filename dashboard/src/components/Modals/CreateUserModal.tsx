import { useState } from 'react';
import type { UserRole } from '../../types';
import { createUser } from '../../lib/api';

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function CreateUserModal({ isOpen, onClose, onSuccess }: CreateUserModalProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [cohort, setCohort] = useState('');
    const [role, setRole] = useState<UserRole>('Student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await createUser({ firstName, lastName, email, cohort, role });
            onSuccess();
            onClose();
            // Reset form
            setFirstName('');
            setLastName('');
            setEmail('');
            setCohort('');
            setRole('Student');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white dark:bg-matte-black border border-slate-200 dark:border-dark-border rounded-lg shadow-xl overflow-hidden transition-colors">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-dark-border flex items-center justify-between bg-slate-50/50 dark:bg-dark-surface">
                    <h3 className="text-lg font-medium text-slate-800 dark:text-white">Create New User</h3>
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
                                placeholder="e.g. John"
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
                                placeholder="e.g. Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] font-medium text-slate-700 dark:text-zinc-300">Email Address</label>
                        <input
                            type="email"
                            required
                            className="px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                            placeholder="e.g. john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-1.5">
                            <label className="text-[12px] font-medium text-slate-700 dark:text-zinc-300">Cohort</label>
                            <input
                                type="text"
                                className="px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                                placeholder="e.g. Spring 2024"
                                value={cohort}
                                onChange={(e) => setCohort(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 flex flex-col gap-1.5">
                            <label className="text-[12px] font-medium text-slate-700 dark:text-zinc-300">Role</label>
                            <select
                                className="px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white"
                                value={role}
                                onChange={(e) => setRole(e.target.value as UserRole)}
                            >
                                <option value="Student">Student</option>
                                <option value="Coach">Coach</option>
                                <option value="Admin">Admin</option>
                            </select>
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
                            {loading ? 'Creating...' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
