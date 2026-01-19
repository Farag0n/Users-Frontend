<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue';
import { userService } from '@/services/UserService';
import type { UserResponseDto, UserCreateDto } from '@/models/User';
import { UserRole } from '@/models/enums/UserRole';

const users = ref<UserResponseDto[]>([]);
const loading = ref(false);

const filter = reactive({
  name: '',
  email: '',
  id: '',
  isDeleted: false
});

// Modal State
const showModal = ref(false);
const isEditing = ref(false);
const currentUser = reactive<Partial<UserCreateDto>>({
    name: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    userRole: UserRole.User // Default role
});
const currentUserId = ref<string | null>(null);

const loadUsers = async () => {
  loading.value = true;
  try {
    users.value = await userService.getAll({
        name: filter.name || undefined,
        email: filter.email || undefined,
        id: filter.id || undefined,
        isDeleted: filter.isDeleted
    });
  } catch (error) {
    console.error("Error cargando usuarios", error);
  } finally {
    loading.value = false;
  }
};

const openCreateModal = () => {
    isEditing.value = false;
    currentUserId.value = null;
    resetForm();
    showModal.value = true;
};

const openEditModal = (user: UserResponseDto) => {
    isEditing.value = true;
    currentUserId.value = user.id;
    // Populate form
    currentUser.name = user.name;
    currentUser.lastName = user.lastName;
    currentUser.email = user.email;
    currentUser.userName = user.userName;
    currentUser.userRole = user.userRole;
    currentUser.password = ''; // Don't show password
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    resetForm();
};

const resetForm = () => {
    currentUser.name = '';
    currentUser.lastName = '';
    currentUser.email = '';
    currentUser.userName = '';
    currentUser.password = '';
    currentUser.userRole = UserRole.User;
};

const saveUser = async () => {
    try {
        if (isEditing.value && currentUserId.value) {
            // Update
             await userService.update(currentUserId.value, {
                name: currentUser.name!,
                lastName: currentUser.lastName!,
                email: currentUser.email!,
                userName: currentUser.userName!,
                password: currentUser.password! // Password might be empty, backend should handle
            });
        } else {
            // Create
            await userService.create(currentUser as UserCreateDto);
        }
        closeModal();
        loadUsers();
    } catch (error) {
        console.error("Error guardando usuario", error);
        alert("Error al guardar el usuario");
    }
};

const softDeleteUser = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
        await userService.delete(id);
        loadUsers();
    } catch (error) {
        console.error(error);
    }
};

const hardDeleteUser = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar DEFINITIVAMENTE este usuario? No se puede deshacer.")) return;
    try {
        await userService.hardDelete(id);
        loadUsers();
    } catch (error) {
         console.error(error);
    }
};

// Restore user functionality could be added if API supports it, 
// for now, showing deleted users is enough as per request.

watch(filter, () => {
    loadUsers();
}, { deep: true });

onMounted(() => {
  loadUsers();
});
</script>

<template>
  <div class="dashboard-container">
    <header class="dashboard-header">
      <h1>Panel de Usuarios</h1>
      <button @click="openCreateModal" class="btn-primary">+ Nuevo Usuario</button>
    </header>

    <div class="filters-bar">
      <input v-model="filter.name" placeholder="Buscar por Nombre" class="search-input" />
      <input v-model="filter.email" placeholder="Buscar por Email" class="search-input" />
      <input v-model="filter.id" placeholder="Buscar por ID" class="search-input" />
      
      <label class="checkbox-container">
        <input type="checkbox" v-model="filter.isDeleted" />
        <span class="checkmark"></span>
        Mostrar Eliminados
      </label>
    </div>

    <div class="table-container">
      <table v-if="users.length > 0">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <transition-group name="list">
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.name }} {{ user.lastName }}</td>
              <td>{{ user.userName }}</td>
              <td>{{ user.email }}</td>
              <td>
                  <span class="badge role-badge">{{ user.userRole === 1 ? 'Admin' : 'User' }}</span> 
                  <!-- Adjust role mapping based on logic -->
              </td>
              <td>
                  <span v-if="user.isDeleted" class="badge deleted-badge">Eliminado</span>
                  <span v-else class="badge active-badge">Activo</span>
              </td>
              <td class="actions-cell">
                <button @click="openEditModal(user)" class="btn-icon edit" title="Editar">✏️</button>
                <button v-if="!user.isDeleted" @click="softDeleteUser(user.id)" class="btn-icon delete" title="Eliminar (Soft)">🗑️</button>
                <button @click="hardDeleteUser(user.id)" class="btn-icon hard-delete" title="Eliminar Definitivamente">🔥</button>
              </td>
            </tr>
          </transition-group>
        </tbody>
      </table>
      <div v-else class="empty-state">
        <p>No se encontraron usuarios.</p>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>
        <form @submit.prevent="saveUser">
           <div class="form-group">
            <label>Nombre</label>
            <input v-model="currentUser.name" required />
          </div>
          <div class="form-group">
            <label>Apellido</label>
            <input v-model="currentUser.lastName" required />
          </div>
           <div class="form-group">
            <label>Nombre de Usuario</label>
            <input v-model="currentUser.userName" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input v-model="currentUser.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Contraseña</label>
             <input v-model="currentUser.password" type="password" :required="!isEditing" placeholder="Dejar vacio para no cambiar" />
          </div>
          
           <div class="form-actions">
            <button type="button" @click="closeModal" class="btn-secondary">Cancelar</button>
            <button type="submit" class="btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  font-weight: 600;
}

.filters-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.search-input {
  padding: 0.6rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  flex: 1;
  min-width: 150px;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.9rem;
  color: #4b5563;
}

/* Table Styles */
.table-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #f3f4f6;
}

th {
  background-color: #f9fafb;
  font-weight: 600;
  color: #4b5563;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

tr:hover {
  background-color: #f9fafb;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0.4rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.btn-icon:hover {
  background-color: #e5e7eb;
}

.btn-icon.hard-delete:hover {
    background-color: #fee2e2;
    color: #dc2626;
}

/* Badges */
.badge {
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.active-badge {
  background-color: #d1fae5;
  color: #059669;
}

.deleted-badge {
  background-color: #fee2e2;
  color: #dc2626;
}

.role-badge {
    background-color: #e0f2fe;
    color: #0284c7;
}

/* Buttons */
.btn-primary {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.1s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.btn-secondary {
    background: #f3f4f6;
    color: #4b5563;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}

.btn-secondary:hover {
    background: #e5e7eb;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0; 
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  transform: scale(1);
  animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalPop {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}

.form-group {
    margin-bottom: 1rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.4rem;
    color: #374151;
    font-weight: 500;
}

.form-group input {
    width: 100%;
    padding: 0.7rem;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>