<script setup lang="ts">
import { ref, nextTick, watch } from 'vue';
import { useChatStore } from '@/stores/chat';
import { useAuthStore } from '@/stores/auth'; // Para el botón de salir

const chatStore = useChatStore();
const authStore = useAuthStore();
const userInput = ref('');
const chatContainer = ref<HTMLElement | null>(null);

// Función para enviar
const send = async () => {
  if (!userInput.value) return;
  await chatStore.sendMessage(userInput.value);
  userInput.value = ''; // Limpiar input
};

// Auto-scroll al fondo cuando cambian los mensajes
watch(
  () => chatStore.messages.length,
  async () => {
    await nextTick();
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  }
);
</script>

<template>
  <v-layout class="fill-height rounded rounded-md">
    
    <v-navigation-drawer color="grey-darken-4" theme="dark" permanent width="250">
      <div class="pa-4">
        <v-btn block color="primary" prepend-icon="mdi-plus" variant="outlined">
          Nuevo Chat
        </v-btn>
      </div>
      
      <v-list density="compact" nav>
        <v-list-item 
        title="Dashboard KPIs" 
        value="dashboard" 
        to="/dashboard" 
        prepend-icon="mdi-view-dashboard-outline" 
        color="primary"
        rounded="lg"
        ></v-list-item>
        <v-list-subheader class="text-uppercase font-weight-bold text-caption">Hoy</v-list-subheader>
        <v-list-item title="Análisis de ciberseguridad" value="chat1" prepend-icon="mdi-message-text-outline" rounded="lg"></v-list-item>
        <v-list-item title="Idea de Login Vue" value="chat2" prepend-icon="mdi-message-text-outline" rounded="lg"></v-list-item>
      </v-list>
      
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" variant="text" @click="authStore.logout">
            Cerrar Sesión
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar title="Asistente Virtual" flat border class="bg-surface">
      <template v-slot:append>
        <v-btn icon="mdi-cog-outline"></v-btn>
      </template>
    </v-app-bar>

    <v-main class="d-flex flex-column bg-grey-lighten-4">
      
      <div ref="chatContainer" class="flex-grow-1 overflow-y-auto pa-4" style="max-height: calc(100vh - 140px);">
        <v-container style="max-width: 900px;">
          
          <template v-for="msg in chatStore.messages" :key="msg.id">
            <div v-if="msg.sender === 'ai'" class="d-flex align-start mb-6">
              <v-avatar color="primary" size="40" class="mr-3 elevation-2">
                <v-icon icon="mdi-robot" color="white"></v-icon>
              </v-avatar>
              <v-card color="white" elevation="1" class="rounded-lg rounded-tl-0 pa-3" max-width="80%">
                <div class="text-body-1">{{ msg.text }}</div>
              </v-card>
            </div>

            <div v-else class="d-flex align-start justify-end mb-6">
              <v-card color="blue-darken-3" theme="dark" elevation="1" class="rounded-lg rounded-tr-0 pa-3 mr-3" max-width="80%">
                <div class="text-body-1">{{ msg.text }}</div>
              </v-card>
              <v-avatar color="grey-darken-1" size="40" class="elevation-2">
                <v-icon icon="mdi-account" color="white"></v-icon>
              </v-avatar>
            </div>
          </template>

          <div v-if="chatStore.isLoading" class="d-flex align-center ml-12 text-grey">
            <v-progress-circular indeterminate size="20" width="2" color="primary" class="mr-2"></v-progress-circular>
            <span class="text-caption">La IA está escribiendo...</span>
          </div>

        </v-container>
      </div>

      <div class="bg-surface px-4 py-3 border-t">
        <v-container style="max-width: 900px;" class="pa-0">
          <v-text-field
            v-model="userInput"
            placeholder="Escribe tu mensaje aquí..."
            variant="outlined"
            density="comfortable"
            rounded="xl"
            hide-details
            bg-color="white"
            @keydown.enter="send"
          >
            <template v-slot:append-inner>
              <v-btn 
                icon="mdi-send" 
                variant="text" 
                color="primary" 
                :disabled="!userInput || chatStore.isLoading"
                @click="send"
              ></v-btn>
            </template>
          </v-text-field>
          <div class="text-center text-caption text-grey mt-2">
            La IA puede cometer errores. Verifica la información importante.
          </div>
        </v-container>
      </div>

    </v-main>
  </v-layout>
</template>

<style scoped>
/* Opcional: Personalizar la barra de scroll */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #bdbdbd;
  border-radius: 4px;
}
</style>