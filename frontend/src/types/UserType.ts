// src/types/addressTypes.ts
export interface Address {
    id?: number;
    name: string;
    mobile: string;
    pincode: string;
    address: string;
    locality: string;
    city: string;
    state: string;
}

export enum UserRole {
    ROLE_CUSTOMER = 'ROLE_CUSTOMER',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_VENDOR = 'ROLE_VENDOR',
}

export interface User {
    id?: number;
    password?: string;
    email: string;
    fullName: string;
    mobile?: string;
    role: UserRole;
    addresses?: Address[];
}

// export interface UserState {
//     user: User | null;
//     loading: boolean;
//     error: string | null;
//     profileUpdated: boolean;
// }