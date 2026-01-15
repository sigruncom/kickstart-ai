export type UserRole = 'Admin' | 'Student' | 'Coach';
export type UserStatus = 'Active' | 'Pending' | 'Deactivated';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    dateJoined: string; // ISO string or formatted string? Using string for now matching HTML
    expirationDate: string;
    status: UserStatus;
    photoUrl?: string; // Derived from name in HTML, but good to have
}

export interface UserUpdateParams {
    role?: UserRole;
    status?: UserStatus;
}
