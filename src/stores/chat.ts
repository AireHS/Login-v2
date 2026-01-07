import { defineStore } from 'pinia';
import { ref } from 'vue';

// Definimos la estructura de un mensaje
export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([
    {
      id: 1,
      text: '¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte hoy?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const isLoading = ref(false);

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    // 1. Agregar mensaje del usuario
    const userMsg: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };
    messages.value.push(userMsg);
    isLoading.value = true;

    // 2. Simular respuesta de IA (Aquí conectarías tu API real)
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        const aiMsg: Message = {
          id: Date.now() + 1,
          text: `Interesante... Me has dicho: "${text}". Como soy una demo, solo repito cosas, ¡pero pronto seré más lista!`,
          sender: 'ai',
          timestamp: new Date()
        };
        messages.value.push(aiMsg);
        isLoading.value = false;
        resolve();
      }, 1500); // Retraso artificial de 1.5s
    });
  }

  return { messages, isLoading, sendMessage };
});