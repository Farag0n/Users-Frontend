import { ref } from 'vue';//para es una funcion de vue que permite usar una logica reactiva
import axios from 'axios';//biblioteca para peticiones http para permitir la comunicacion con APIs RESTful
import type { LoginDto, RegisterDto, User } from '../models/User';

//configuración base de Axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api/Auth', // La URL base de tu controlador Auth
    headers: {
        'Content-Type': 'application/json'//el headers es para los metadatos de las peticiones HTTP, 
        // esta el Content-Type(para el tipo de contenido de la peticion)
        //el User-Agent (quien lo envia)
        //como debe responder (Accept)
        //si esta autorizado (Authorization)
    }
});

// Estado reactivo del usuario actual
export const currentUser = ref<User | null>(null);

// --- LOGIN ---
export async function login(credentials: LoginDto): Promise<boolean> {
    try {
        // Hacemos la petición POST al backend
        const response = await api.post('/login', credentials);
        
        // Si llegamos aquí, la respuesta fue 200 OK
        const { accessToken, refreshToken } = response.data;

        // Guardamos sesión
        const user: User = { email: credentials.email, token: accessToken };
        currentUser.value = user;

        // Guardamos en LocalStorage para persistencia
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('refreshToken', refreshToken); // Importante para después

        console.log("Login exitoso:", response.data.message);
        return true;

    } catch (error: any) {
        console.error("Error en login:", error.response?.data?.message || error.message);
        return false;
    }
}
const u = "hola"

// --- REGISTER ---
export async function register(data: RegisterDto): Promise<boolean> {
    try {
        await api.post('/register', data);
        console.log("Registro exitoso, ahora puedes loguearte.");
        return true;
    } catch (error: any) {
        console.error("Error en registro:", error.response?.data?.message || error.message);
        return false;
    }
}

// --- LOGOUT ---
export const logout = () => {
    currentUser.value = null;
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
};

// --- CHECK SESSION ---
export const checkSession = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        currentUser.value = JSON.parse(storedUser);
    }
};