import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';
import type { UserRole, UserStatus } from '../types';

interface ManageUserRoleResponse {
    message: string;
}

export const updateUser = async (userId: string, updates: { role?: UserRole; status?: UserStatus }) => {
    const manageUserRole = httpsCallable<{ targetUserId: string, updates: typeof updates }, ManageUserRoleResponse>(functions, 'manageUserRole');

    try {
        const result = await manageUserRole({ targetUserId: userId, updates });
        return result.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const createUser = async (userData: { name: string; email: string; cohort: string; role: UserRole }) => {
    const createUserFunc = httpsCallable<{ userData: typeof userData }, { id: string }>(functions, 'createUser');
    try {
        const result = await createUserFunc({ userData });
        return result.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

// Helper to cycle roles for the demo
export const getNextRole = (current: UserRole): UserRole => {
    switch (current) {
        case 'Student': return 'Coach';
        case 'Coach': return 'Admin';
        case 'Admin': return 'Student';
        default: return 'Student';
    }
};

export const getNextStatus = (current: UserStatus): UserStatus => {
    switch (current) {
        case 'Active': return 'Deactivated';
        case 'Deactivated': return 'Active'; // Pending -> Active?
        case 'Pending': return 'Active';
        default: return 'Active';
    }
};
