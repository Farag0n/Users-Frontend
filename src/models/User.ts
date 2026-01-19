import type { UserRole } from "./enums/UserRole";

export interface UserResponseDto {
    id: string;
    name: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    userRole: UserRole;
    isDeleted: boolean;
};

export interface UserUpdateDto {
    name: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
}

export interface UserCreateDto {
    name: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    userRole: UserRole;
}