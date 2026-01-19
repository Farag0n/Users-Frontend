<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/AuthService';

const email = ref('');
const password = ref('');
const feedback = ref('');
const router = useRouter();

const handleLogin = async () => {
  const success = await authService.login({ 
      email: email.value, 
      password: password.value 
  });

  if (success) {
    feedback.value = '';
    router.push({ name: 'usersDashboard' });
  } else {
    feedback.value = 'Credenciales incorrectas o error de servidor.';
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-dark text-light login-bg">
    
    <div class="card shadow-lg p-4" style="width: 100%; max-width: 450px;" data-bs-theme="dark">
      <div class="card-body">
        
        <h2 class="card-title text-center mb-4">Iniciar Sesión</h2>
        
        <form @submit.prevent="handleLogin">
          
          <div class="mb-3">
            <label for="email" class="form-label">Correo Electrónico</label>
            <input 
              id="email"
              v-model="email" 
              type="email" 
              class="form-control form-control-lg" 
              placeholder="nombre@ejemplo.com" 
              required 
            />
          </div>

          <div class="mb-4">
            <label for="password" class="form-label">Contraseña</label>
            <input 
              id="password"
              v-model="password" 
              type="password" 
              class="form-control form-control-lg" 
              placeholder="••••••••" 
              required 
            />
          </div>
          
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary btn-lg">
              Entrar
            </button>
          </div>

        </form>
        
        <div v-if="feedback" class="alert alert-danger mt-3 text-center" role="alert">
          <i class="bi bi-exclamation-triangle-fill me-2"></i> {{ feedback }}
        </div>

        <div class="mt-4 text-center">
          <p class="mb-0 text-secondary">
            ¿No tienes cuenta? 
            <router-link to="/register" class="text-decoration-none text-info">
              Regístrate aquí
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajuste opcional para asegurar que el fondo sea realmente oscuro 
   (Por si el bg-dark de bootstrap es muy gris para tu gusto) */
.login-bg {
  background-color: #121212 !important; /* Negro suave estilo Material Dark */
}

/* Personalización sutil para que parezca más "App de PC" y menos web genérica */
.card {
  border: 1px solid #333;
  background-color: #1e1e1e; /* Fondo de tarjeta un poco más claro que el fondo principal */
}
</style>