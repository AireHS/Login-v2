import { defineStore } from 'pinia';
import { ref } from 'vue';
import router from '@/router';

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const user = ref<{ email: string } | null>(null);
  const isAuthenticated = ref(false);

  // Acciones
  async function login(email: string, password: string) {
    // AQUÍ iría tu llamada real a la API (axios/fetch)
    // Simulamos una validación exitosa:
    if (email && password) {
      user.value = { email };
      isAuthenticated.value = true;
      
      // Guardar token en localStorage (opcional pero recomendado)
      localStorage.setItem('token', 'token-falso-123');
      
      // Redirigir al home
      await router.push('/');
    } else {
      throw new Error('Credenciales inválidas');
    }
  }

  async function logout() {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('token');
    await router.push('/login');
  }

  return { user, isAuthenticated, login, logout };
});