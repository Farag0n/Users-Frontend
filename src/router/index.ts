import { createRouter, createWebHistory } from "vue-router";// se importa el vue-router
//se importan las vistas, el @ se usa como un alias que apunta a la carpeta src
import LoginView from "@/views/LoginView.vue"; 
import RegisterView from "@/views/RegisterView.vue"
import HomeView from "@/views/HomeView.vue";
import DashboardView from "@/views/DashboardView.vue";

//si hace un array de objetos con las diferentes rutas
//el path es la url del navegador y el component es la vista que renderiza esa ruta
//el name es para navegacion por name asi si se cambia el path no se tinen que refactorizar todo
const routes = [
    {
        path: "/home",
        name: "home",
        component: HomeView
    },
    {
        path: "/login",
        name: "login",
        component: LoginView
    },
    {
        path: "/register",
        name: "register",
        component: RegisterView
    },
    {
        path: "/dasboard",
        name: "dashboard",
        component: DashboardView,
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
];

//el export permite que el main.ts use las rutas
export const router = createRouter({
    //usa url mas claras, 
    history: createWebHistory(),
    routes
});