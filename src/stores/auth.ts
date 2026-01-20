import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const user = ref<{ email: string; name?: string } | null>(null);
  const isAuthenticated = ref(false);

  async function login(email: string, password: string) {
    // Aquí deberías implementar la lógica real de autenticación contra tu API
    if (email && password) {
      user.value = { email };
      isAuthenticated.value = true;
      localStorage.setItem('token', 'token-simulado'); // Guarda el token real aquí
      router.push('/'); // Redirige al home o dashboard
    } else {
      throw new Error('Credenciales inválidas');
    }
  }

  // NUEVA FUNCIÓN: Registro
  async function register(name: string, email: string, password: string) {
    // Aquí iría tu llamada a la API (ej. axios.post('/api/register', ...))
    
    // Simulamos éxito
    if (email && password && name) {
      // Auto-login después del registro
      user.value = { email, name };
      isAuthenticated.value = true;
      localStorage.setItem('token', 'token-nuevo-usuario');
      
      // Redirigir al chat
      router.push('/'); 
    } else {
      throw new Error('Faltan datos para el registro');
    }
  }

  function logout() {
    user.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('token');
    router.push('/login');
  }

  return { user, isAuthenticated, login, register, logout };
});