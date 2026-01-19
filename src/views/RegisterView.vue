<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '../services/AuthService';

const router = useRouter();

// Campos requeridos por el backend
const form = ref({
    name: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    role: 1 // Por defecto 1 (User)
});

const feedback = ref('');

const handleRegister = async () => {
    if (form.value.password !== form.value.confirmPassword) {
        feedback.value = "Las contraseñas no coinciden";
        return;
    }

    const success = await authService.register(form.value);
    
    if (success) {
        feedback.value = '¡Registrado! Ahora inicia sesión.';
        // Redirigir al login después de un registro exitoso
        setTimeout(() => {
            router.push({ name: 'login' });
        }, 1500);
    } else {
        feedback.value = 'Error al registrar. Revisa la consola.';
    }
};
</script>

<template>
    <div class="register-page">
        <h2>Registro Nuevo</h2>
        <form @submit.prevent="handleRegister" class="form-grid">
            <input v-model="form.name" placeholder="Nombre" required />
            <input v-model="form.lastName" placeholder="Apellido" required />
            <input v-model="form.email" type="email" placeholder="Email" required />
            <input v-model="form.userName" placeholder="Nombre de Usuario" required />
            <input v-model="form.password" type="password" placeholder="Contraseña" required />
            <input v-model="form.confirmPassword" type="password" placeholder="Confirmar Contraseña" required />
            
            <select v-model="form.role">
                <option :value="1">Usuario</option>
                <option :value="0">Administrador</option>
            </select>

            <button type="submit">Registrar</button>
        </form>
        
        <p class="msg">{{ feedback }}</p>
        <router-link to="/login">Volver al Login</router-link>
    </div>
</template>

<style scoped>
.form-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 300px;
    margin: 0 auto;
}
</style>