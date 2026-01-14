//los objetos son un reflejo de los DTOs de mi backend

// Lo que recibimos del Backend al loguearnos
export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    message: string;
}

// Lo que enviamos para Login
export interface LoginDto {
    email: string;
    password: string;
}

// Lo que enviamos para Registro (Debe coincidir con UserRegisterDto del backend)
export interface RegisterDto {
    name: string;
    lastName: string;
    email: string;
    userName: string;
    password: string;
    confirmPassword: string;
    role: number; // 0 = Admin, 1 = User
}

// Usuario decodificado (opcional por ahora, para mostrar info en pantalla)
export interface User {
    email: string;
    token: string;
}

export enum UserRole {
    Admin,
    User
}