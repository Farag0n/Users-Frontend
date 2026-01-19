import { createRouter, createWebHistory } from "vue-router";// se importa el vue-router
//se importan las vistas, el @ se usa como un alias que apunta a la carpeta src
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue"

import UsersDashboardView from "@/views/UsersDashboardView.vue";

//si hace un array de objetos con las diferentes rutas
//el path es la url del navegador y el component es la vista que renderiza esa ruta
//el name es para navegacion por name asi si se cambia el path no se tinen que refactorizar todo
const routes = [
    { path: '/', redirect: '/login' },
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
        path: "/dashboard",
        name: "dashboard",
        component: UsersDashboardView,
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