<script setup lang="ts">
import authService from './services/AuthService';
</script>

<template>
  <div class="app-container">
    <header v-if="authService.isAuthenticated.value" class="navbar">
      <nav>
        <span class="welcome">Hola, {{ authService.currentUser.value }}</span>
        <div class="menu">
          <router-link to="/dashboard" class="nav-link">Panel</router-link>
          <button @click="authService.logout()" class="btn-logout">Salir</button>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  color: white;
}
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-link {
  color: white;
  margin-right: 15px;
  text-decoration: none;
  font-weight: bold;
}
.btn-logout {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.btn-logout:hover { background-color: #c0392b; }
</style>