import { useEffect, useState } from 'react';
import type { User } from '../types';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { mockUsers } from '../lib/mockData';
import { UserRow } from './UserTable/UserRow';
import { seedUsers } from '../lib/seed';
import { CreateUserModal } from './Modals/CreateUserModal';

export function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            if (snapshot.empty) {
                console.log("No users found in Firestore, using mock data.");
                setUsers(mockUsers);
                return;
            }
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as User[];
            setUsers(data);
        }, (error) => {
            console.error("Error fetching users:", error);
            // Fallback to mock data on error (e.g. permission denied or no config)
            setUsers(mockUsers);
        });

        return () => unsubscribe();
    }, []);

    const toggleSelectAll = () => {
        if (selectedUsers.size === users.length) {
            setSelectedUsers(new Set());
        } else {
            setSelectedUsers(new Set(users.map(u => u.id)));
        }
    };

    const toggleSelectUser = (id: string) => {
        const newSelected = new Set(selectedUsers);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedUsers(newSelected);
    };

    // Safe data handling: Check if users is populated
    if (!users || users.length === 0) {
        return <div className="p-8 text-center text-slate-500 dark:text-zinc-400">Loading students...</div>;
    }

    return (
        <>
            <div className="px-6 py-4 bg-white dark:bg-matte-black border-b border-slate-200 dark:border-dark-border shrink-0 transition-colors duration-200">
                {/* ... header content ... */}
                <div className="flex flex-col gap-1 mb-4">
                    <nav className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-medium">
                        <a className="hover:text-primary transition-colors" href="#">Home</a>
                        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                        <span className="text-slate-600 dark:text-zinc-300">User Management</span>
                    </nav>
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-medium text-matte-black dark:text-white tracking-tight">User Management</h2>
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 rounded-full text-[10px] font-medium uppercase tracking-tight border border-transparent dark:border-dark-border">
                            {users?.length} Students
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="relative w-72 dark:w-80">
                            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 text-[16px]">search</span>
                            <input
                                className="w-full pl-8 pr-3 py-1.5 text-[12px] border-slate-200 dark:border-zinc-700 dark:bg-zinc-900 rounded-md focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-slate-400 dark:placeholder:text-zinc-500 text-slate-900 dark:text-zinc-100 transition-all"
                                placeholder="Search users..."
                                type="text"
                            />
                        </div>
                        <div className="h-4 w-px bg-slate-200 dark:bg-dark-border mx-1"></div>
                        <button className="px-3 py-1.5 rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-[11px] font-medium hover:bg-slate-50 dark:hover:bg-zinc-800 transition-all flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[16px]">download</span>
                            Export {selectedUsers.size > 0 ? selectedUsers.size : ''} Selected
                        </button>
                        <button
                            className="text-[11px] text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 font-medium transition-colors"
                            onClick={() => setSelectedUsers(new Set())}
                        >
                            Clear Selection
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3.5 py-1.5 rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-[11px] font-medium hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center gap-1.5 transition-all">
                            <span className="material-symbols-outlined text-[16px]">upload</span>
                            Upload CSV
                        </button>
                        <button
                            onClick={() => { if (confirm('Run data seeding? This will update existing users.')) seedUsers(); }}
                            className="px-3.5 py-1.5 rounded-md border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-[11px] font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 flex items-center gap-1.5 transition-all"
                        >
                            <span className="material-symbols-outlined text-[16px]">database</span>
                            Seed Data
                        </button>
                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="px-3.5 py-1.5 rounded-md bg-primary text-white text-[11px] font-medium hover:opacity-90 dark:hover:bg-red-700 flex items-center gap-1.5 transition-all shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[16px]">person_add</span>
                            Create User
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative bg-white dark:bg-matte-black transition-colors duration-200">
                <div className="absolute inset-0 overflow-y-auto">
                    <table className="w-full text-left border-collapse table-fixed">
                        <thead className="sticky top-0 z-30">
                            <tr className="bg-slate-50 dark:bg-dark-surface border-b border-slate-200 dark:border-dark-border">
                                <th className="w-10 px-4 py-2 dark:w-12 dark:px-6 dark:py-2.5">
                                    <input
                                        type="checkbox"
                                        className="cursor-pointer"
                                        checked={users?.length > 0 && selectedUsers.size === users?.length}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="w-[20%] dark:w-[25%] px-2 py-2 dark:py-2.5 text-xxs dark:text-[10px] font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Student Name</th>
                                <th className="w-[20%] dark:w-[20%] px-2 py-2 dark:px-6 dark:py-2.5 text-xxs dark:text-[10px] font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Email Address</th>
                                <th className="w-[10%] px-2 py-2 text-xxs dark:text-[10px] font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Cohort</th>
                                <th className="w-[10%] px-2 py-2 text-xxs dark:text-[10px] font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Role</th>
                                <th className="w-[12%] dark:w-[15%] px-2 py-2 dark:px-6 dark:py-2.5 text-xxs dark:text-[10px] font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-wider text-center">Date Joined</th>
                                <th className="w-[12%] dark:w-[15%] px-2 py-2 dark:px-6 dark:py-2.5 text-xxs dark:text-[10px] font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-wider text-center">Expiration</th>
                                <th className="w-[12%] px-2 py-2 text-xxs dark:text-[10px] font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-wider">Status</th>
                                <th className="w-[8%] dark:w-[10%] px-4 py-2 dark:px-6 dark:py-2.5 text-xxs dark:text-[10px] font-semibold text-slate-500 dark:text-zinc-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-dark-border">
                            {users?.map(user => (
                                <UserRow
                                    key={user.id}
                                    user={user}
                                    selected={selectedUsers.has(user.id)}
                                    onToggleSelect={() => toggleSelectUser(user.id)}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <footer className="h-9 flex items-center justify-between px-6 bg-slate-50 dark:bg-dark-surface border-t border-slate-200 dark:border-dark-border shrink-0 z-40 transition-colors duration-200">
                <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium uppercase tracking-wider">
                    Showing 1-{Math.min(30, users.length)} of {users.length} members
                </span>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <button className="size-6 flex items-center justify-center rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-400 dark:text-zinc-500 disabled:opacity-30 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors" disabled>
                            <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                        </button>
                        <div className="flex items-center gap-1 text-[11px] font-medium">
                            <span className="text-slate-900 dark:text-zinc-200">1</span>
                            <span className="text-slate-300 dark:text-zinc-600">/</span>
                            <span className="text-slate-500 dark:text-zinc-500">{Math.ceil(users.length / 30)}</span>
                        </div>
                        <button className="size-6 flex items-center justify-center rounded border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-400 dark:text-zinc-500 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors">
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </footer>

            <CreateUserModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSuccess={() => {
                    // Refresh data or show toast - for now standard firestore listener handles update
                    console.log("User created!");
                }}
            />
        </>
    );
}
