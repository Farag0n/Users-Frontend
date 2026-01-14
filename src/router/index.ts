import { createRouter, createWebHistory } from "vue-router";// se importa el vue-router
//se importan las vistas, el @ se usa como un alias que apunta a la carpeta src
import LoginView from "@/views/Login.vue"; 
import RegisterView from "@/views/Register.vue"

//si hace un array de objetos con las diferentes rutas
const routes = [
    {path: "/login", component: LoginView},//el path es la url del navegador y el component es la vista que renderiza esa ruta
    {path: "/register", component: RegisterView}
];

//ejemplo de ruta dinamica
// {
//   path: '/users/:id',
//   component: UserView,
//   meta: { requiresAuth: true }
// }

//el export permite que el main.ts use las rutas
export const router = createRouter({
    //usa url mas claras, 
    history: createWebHistory(),
    routes
});