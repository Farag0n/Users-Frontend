<script setup lang="ts"> //Etiqueta moderna para poner codigo Ts

import { ref, onMounted } from 'vue';
import Login from './views/Login.vue';       // Importa la pagina de login
import Register from './views/Register.vue'; // Importa la pagina de register
import { currentUser, logout, checkSession,} from './services/AuthService';   // Importa la logica de auth ya que el App.vue es el orquestador

// esto sirve como switch para saber si esta logueado o no
// pero inicializa la pagina de login
const currentPage = ref('login');

// el usuario no pierde session si se cierra la pagina
// con el local storage y la logica del archivo auth.ts
onMounted(() => {
  checkSession();
});
</script>

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