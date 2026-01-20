<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const vantaRef = ref<HTMLElement | null>(null);
let vantaEffect: any = null;


onMounted(() => {
  // Verificamos si los scripts cargaron
  // @ts-ignore
  if (window.VANTA) {
    // @ts-ignore
    vantaEffect = window.VANTA.WAVES({
      el: vantaRef.value,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 424242,     // Tu color morado
      shininess: 45.00,    // Brillo para que destaque
      waveHeight: 20.00,   // Altura de las ondas
      waveSpeed: 1.00,     // Velocidad de movimiento
      zoom: 0.8
    });
  } else {
    console.error("Vanta.js no se ha cargado correctamente en index.html");
  }
});

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy();
});
</script>

<template>
  <div ref="vantaRef" class="vanta-bg">
    <slot></slot>
  </div>
</template>

<style scoped>
.vanta-bg {
  width: 100vw;
  height: 100vh;
  position: fixed; /* Ocupa toda la pantalla */
  top: 0;
  left: 0;
  z-index: 0;      /* Se queda al fondo */
  overflow: hidden;
}
</style>