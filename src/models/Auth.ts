import { UserRole } from "./enums/UserRole";

export interface RefreshTokenDto {
    accessToken: string;
    refreshToken: string;
};

export interface LoginDto {
    email: string;
    password: string;
};

export interface RegisterDto {
    name: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
};

export interface AuthResponseDto{
    accessToken:  string | null;
    refreshToken: string | null;
    message: string | null;
};