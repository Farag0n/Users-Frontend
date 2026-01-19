import { ref } from 'vue';
import http from './http';
import type { LoginDto, RegisterDto } from '@/models/Auth';

class AuthService {
    // Estado reactivo del usuario actual (persistido)
    currentUser = ref<string | null>(localStorage.getItem('userEmail'));
    isAuthenticated = ref(!!localStorage.getItem('token'));

    async login(credentials: LoginDto): Promise<boolean> {
        try {
            // Usa la instancia http configurada (usa .env VITE_API_URL)
            const response = await http.post('/Auth/login', credentials);

            const { accessToken, refreshToken } = response.data;

            if (accessToken) {
                localStorage.setItem('token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('userEmail', credentials.email);

                this.currentUser.value = credentials.email;
                this.isAuthenticated.value = true;
                return true;
            }
            return false;
        } catch (error: any) {
            console.error("Error login:", error);
            return false;
        }
    }

    async register(data: RegisterDto): Promise<boolean> {
        try {
            await http.post('/Auth/register', data);
            return true;
        } catch (error) {
            console.error("Error registro:", error);
            return false;
        }
    }

    // Check session simple
    checkSession() {
        const token = localStorage.getItem('token');
        if (token) {
            this.isAuthenticated.value = true;
            this.currentUser.value = localStorage.getItem('userEmail');
        } else {
            this.logout();
        }
    }

    logout() {
        localStorage.clear();
        this.currentUser.value = null;
        this.isAuthenticated.value = false;
        // La redirección se debe manejar en el componente o router, 
        // pero para logout global a veces es útil tenerlo aqui o usar un bus.
        window.location.href = '/login';
    }
}

// Exportamos una única instancia (Singleton)
const authService = new AuthService();
export default authService;