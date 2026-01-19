import http from './http';
import type { UserResponseDto, UserUpdateDto, UserCreateDto } from '@/models/User';

export const userService = {

    // Obtener todos los usuarios con filtros
    async getAll(filter?: { name?: string, email?: string, id?: string, isDeleted?: boolean }): Promise<UserResponseDto[]> {
        const params = new URLSearchParams();
        if (filter) {
            if (filter.name) params.append('name', filter.name);
            if (filter.email) params.append('email', filter.email);
            if (filter.id) params.append('id', filter.id);
            if (filter.isDeleted !== undefined) params.append('isDeleted', filter.isDeleted.toString());
        }
        const response = await http.get<UserResponseDto[]>('/User', { params });
        return response.data;
    },

    // Obtener por ID
    async getById(id: string): Promise<UserResponseDto> {
        const response = await http.get<UserResponseDto>(`/User/${id}`);
        return response.data;
    },

    // Crear usuario
    async create(data: UserCreateDto): Promise<UserResponseDto> {
        const response = await http.post<UserResponseDto>('/User', data);
        return response.data;
    },

    // Actualizar
    async update(id: string, data: UserUpdateDto): Promise<boolean> {
        await http.put(`/User/${id}`, data);
        return true;
    },

    // Eliminar (Soft Delete)
    async delete(id: string): Promise<boolean> {
        await http.delete(`/User/SoftDete/${id}`);
        return true;
    },

    // Eliminar Definitivamente (Hard Delete)
    async hardDelete(id: string): Promise<boolean> {
        await http.delete(`/User/${id}`);
        return true;
    }
};