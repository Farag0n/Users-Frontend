<script setup lang="ts">
import { ref } from 'vue';
import { register } from '../services/AuthService';
import { UserRole } from '../models/User'; // Si creaste un enum, si no usa numeros

const emit = defineEmits(['go-to-login']);

// Campos requeridos por el backend
const form = ref({
    name: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    role: 1 // Por defecto 1 (User), asumiendo que 0 es Admin
});

const feedback = ref('');

const handleRegister = async () => {
    if (form.value.password !== form.value.confirmPassword) {
        feedback.value = "Las contraseñas no coinciden";
        return;
    }

    const success = await register(form.value);
    
    if (success) {
        feedback.value = '¡Registrado! Ahora inicia sesión.';
        // Limpiar formulario...
        emit('go-to-login'); // Opcional: Redirigir automáticamente
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
        <button @click="emit('go-to-login')">Volver al Login</button>
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