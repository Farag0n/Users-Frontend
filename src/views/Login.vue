<script setup lang="ts">
import { ref } from 'vue';
import { login } from '../services/AuthService';

const email = ref('');
const password = ref(''); // Agregamos password
const feedback = ref('');
const emit = defineEmits(['go-to-register']);

const handleLogin = async () => {
  // Ahora login es asíncrono, usamos await
  const success = await login({ 
      email: email.value, 
      password: password.value 
  });

  if (success) {
    feedback.value = '';
  } else {
    feedback.value = 'Credenciales incorrectas o error de servidor.';
  }
};
</script>

<template>
  <div class="login-page">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      
      <button type="submit">Entrar</button>
    </form>
    
    <p class="error">{{ feedback }}</p>

    <p>
      ¿No tienes cuenta? 
      <a href="#" @click.prevent="emit('go-to-register')">Regístrate aquí</a>
    </p>
  </div>
</template>

<style scoped>
.error { color: red; }
</style>