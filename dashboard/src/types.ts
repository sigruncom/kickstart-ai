export type UserRole = 'admin' | 'student' | 'coach';
export type UserStatus = 'active' | 'pending' | 'inactive';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
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
