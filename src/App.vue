<!-- este es el componente raiz de vue es el layout principal desde el cual se enrrutan las otras vistas y componentes -->
<script setup lang="ts"> //Etiqueta moderna para poner codigo Ts

import { ref, onMounted } from 'vue';
import Login from './views/Login.vue';       // Importa la pagina de login
import Register from './views/Register.vue'; // Importa la pagina de register
import { currentUser, logout, checkSession,} from './services/AuthService';   // Importa la logica de auth ya que el App.vue es el orquestador y main.ts es el arranque

// esto sirve como switch para saber si esta logueado o no
// pero inicializa la pagina de login
// esto no es un routing real es un swich/control manual de navegacion para mostrar o no cierta vista
const currentPage = ref('login');

// el usuario no pierde session si se cierra la pagina
// con el local storage y la logica del archivo auth.ts
//el onMounted hace que el componente ya exista en el dom y aca se usa para comprobar si hay sesion guardada antes de hacer el render inicial
onMounted(() => {
  checkSession();
});
</script>

<!-- en el template se suelen poner contenedores y cosas que rara vez van a cambiar como el Header/Footer y el router view remplaza el currentPage -->
 <!-- router-view es un contenedor dinamico -->
<template>
  <div>
    <h1>Login, Register & Logout</h1>
    <p>Simulacion de login, register y logout con el framework Vue</p>

    <div v-if="!currentUser">
      
      <Login 
        v-if="currentPage === 'login'" 
        @go-to-register="currentPage = 'register'" 
      />
      <Register 
        v-if="currentPage === 'register'" 
        @go-to-login="currentPage = 'login'" 
      />
      
    </div>

    <div v-else>
      <h2>Bienvenido, {{ currentUser.email }}</h2>
      <button @click="logout">Cerrar Sesión</button>
    </div>
  </div>
</template>