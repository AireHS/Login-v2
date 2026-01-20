<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import AnimatedBackground from '@/components/AnimatedBackground.vue'; // Importamos el fondo

const form = ref<any>(null);
const email = ref('');
const password = ref('');
const rememberMe = ref(false); // Nuevo estado para "Remember me"
const loading = ref(false);
const visible = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const rules = {
  required: (value: any) => !!value || 'Este campo es requerido.',
  email: (value: any) => {
    const pattern = /.+@.+\..+/;
    return pattern.test(value) || 'E-mail inválido.';
  },
  min: (v: any) => (!v || v.length >= 6) || 'Mínimo 6 caracteres',
};

const handleLogin = async () => {
  if (!form.value) return;
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    // Aquí podrías manejar la lógica de "Remember me" si es necesario
  } catch (error) {
    alert('Error al iniciar sesión');
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <AnimatedBackground>
    <v-app-bar flat color="transparent" class="px-4 mt-2" style="position: absolute; z-index: 10; width: 100%;">
      <v-toolbar-title class="font-weight-bold text-h5 text-white">Logo</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-md-flex">
        <v-btn variant="text" class="text-white text-capitalize">Home</v-btn>
        <v-btn variant="text" class="text-white text-capitalize">About</v-btn>
        <v-btn variant="text" class="text-white text-capitalize">Services</v-btn>
        <v-btn variant="text" class="text-white text-capitalize">Contact</v-btn>
      </div>
    </v-app-bar>

    <v-container class="fill-height d-flex align-center justify-center" style="position: relative; z-index: 10;">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="5" lg="4">
          <v-card class="glass-card pa-6 rounded-xl" elevation="10">
            <div class="d-flex justify-space-between align-center mb-4">
              <v-card-title class="text-h4 font-weight-bold text-white pl-0">Login</v-card-title>
              <v-btn icon="mdi-close" variant="text" color="white" @click="router.push('/')"></v-btn>
            </div>
            
            <v-card-text class="pa-0">
              <v-form ref="form" @submit.prevent="handleLogin">
                <v-text-field
                  v-model="email"
                  label="Email"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  bg-color="rgba(255,255,255,0.05)"
                  color="white"
                  class="mb-2"
                  rounded="lg"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  label="Password"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="visible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  :type="visible ? 'text' : 'password'"
                  variant="outlined"
                  bg-color="rgba(255,255,255,0.05)"
                  color="white"
                  class="mb-2"
                  rounded="lg"
                  @click:append-inner="visible = !visible"
                  :rules="[rules.required, rules.min]"
                ></v-text-field>

                <v-row align="center" no-gutters class="mb-4">
                  <v-col cols="6">
                    <v-checkbox
                      v-model="rememberMe"
                      label="Remember me"
                      color="white"
                      hide-details
                      density="compact"
                      class="text-white ml-n2"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="6" class="text-right">
                    <a href="#" class="text-white text-decoration-none text-caption">Forget Password?</a>
                  </v-col>
                </v-row>

                <v-btn 
                  block 
                  type="submit"
                  color="#1A237E" 
                  size="large" 
                  variant="flat"
                  rounded="lg"
                  class="text-capitalize text-white font-weight-bold mb-4"
                  :loading="loading"
                >
                  Login
                </v-btn>
                <div class="text-center text-white text-caption">
                  Don't have an account? 
                  <RouterLink to="/register" class="text-white font-weight-bold text-decoration-none">
                    Register
                  </RouterLink>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </AnimatedBackground>
</template>

<style scoped>
/* Efecto Glassmorphism para la tarjeta */
.glass-card {
  background-color: rgba(20, 20, 40, 0.6) !important; /* Más oscuro para contraste */
  /* Efecto de desenfoque del fondo detrás de la tarjeta */
  backdrop-filter: blur(15px); 
  /* Borde sutil y translúcido */
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37) !important;
}

/* Ajustes adicionales para Vuetify en este contexto oscuro */
:deep(.v-label) {
  color: rgba(255, 255, 255, 0.7) !important;
}
:deep(.v-field__input) {
  color: white !important;
}
:deep(.v-checkbox .v-label) {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
}
</style>