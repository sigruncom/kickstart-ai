export type UserRole = 'Admin' | 'Student' | 'Coach';
export type UserStatus = 'Active' | 'Pending' | 'Deactivated';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    name: string; // New field for full name
    email: string;
    role: UserRole;
    cohort?: string; // Optional for now
    dateJoined: string;
    expirationDate: string;
    status: UserStatus;
    photoUrl?: string;
}

export interface UserUpdateParams {
    role?: UserRole;
    status?: UserStatus;
}
