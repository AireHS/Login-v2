<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import Navbar from '@/components/Navbar.vue';
import AnimatedBackground from '@/components/AnimatedBackground.vue';

const authStore = useAuthStore();

const form = ref<any>(null);
// Variables del formulario
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const showPass = ref(false);
const showConfirmPass = ref(false);

// Reglas de validación
const rules = {
  required: (v: any) => !!v || 'Este campo es requerido.',
  email: (v: any) => /.+@.+\..+/.test(v) || 'E-mail inválido.',
  min: (v: any) => (!v || v.length >= 6) || 'Mínimo 6 caracteres.',
  // Regla especial: Compara con la contraseña actual
  matchPassword: (v: any) => v === password.value || 'Las contraseñas no coinciden.'
};

const handleRegister = async () => {
  if (!form.value) return;
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    await authStore.register(name.value, email.value, password.value);
  } catch (error) {
    console.error(error);
    alert('Error al registrar usuario');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <AnimatedBackground>
    <Navbar style="position: absolute; z-index: 10; width: 100%;">
      <v-btn variant="text" color="white" to="/login" prepend-icon="mdi-arrow-left">Volver al Login</v-btn>
    </Navbar>

    <v-container class="fill-height d-flex align-center justify-center" style="position: relative; z-index: 10;">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="5">
          
          <v-card class="glass-card pa-6 rounded-xl" elevation="10">
            <v-card-title class="text-h4 font-weight-bold text-white text-center mb-6">
              Crear Cuenta
            </v-card-title>
            
            <v-card-text>
              <v-form ref="form" @submit.prevent="handleRegister">
                
                <v-text-field
                  v-model="name"
                  label="Nombre Completo"
                  prepend-inner-icon="mdi-account-outline"
                  variant="outlined"
                  bg-color="rgba(255,255,255,0.05)"
                  color="white"
                  class="mb-2"
                  rounded="lg"
                  :rules="[rules.required]"
                ></v-text-field>

                <v-text-field
                  v-model="email"
                  label="Correo Electrónico"
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
                  label="Contraseña"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="showPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  :type="showPass ? 'text' : 'password'"
                  variant="outlined"
                  bg-color="rgba(255,255,255,0.05)"
                  color="white"
                  class="mb-2"
                  rounded="lg"
                  @click:append-inner="showPass = !showPass"
                  :rules="[rules.required, rules.min]"
                ></v-text-field>

                <v-text-field
                  v-model="confirmPassword"
                  label="Confirmar Contraseña"
                  prepend-inner-icon="mdi-lock-check-outline"
                  :append-inner-icon="showConfirmPass ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                  :type="showConfirmPass ? 'text' : 'password'"
                  variant="outlined"
                  bg-color="rgba(255,255,255,0.05)"
                  color="white"
                  class="mb-4"
                  rounded="lg"
                  @click:append-inner="showConfirmPass = !showConfirmPass"
                  :rules="[rules.required, rules.matchPassword]"
                ></v-text-field>

                <v-btn 
                  block 
                  color="teal-accent-4" 
                  size="large" 
                  variant="flat"
                  rounded="lg"
                  class="text-capitalize text-white font-weight-bold mb-4"
                  :loading="loading" 
                  type="submit"
                >
                  Registrarse
                </v-btn>

                <div class="text-center text-white text-caption">
                  ¿Ya tienes cuenta? 
                  <RouterLink to="/login" class="text-white font-weight-bold text-decoration-none">
                    Inicia Sesión aquí
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
.glass-card {
  background-color: rgba(25, 35, 75, 0.5) !important; 
  backdrop-filter: blur(10px); 
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37) !important;
}

:deep(.v-field__input), :deep(.v-label) {
  color: white !important;
}
</style>