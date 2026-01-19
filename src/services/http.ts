import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Creamos una instancia de axios para reutilizar la configuración
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

//Interceptor: inyecta el token automaticamente en cada peticion
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;