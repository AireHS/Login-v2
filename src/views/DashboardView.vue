<script setup lang="ts">
import { ref } from 'vue';
import AnimatedBackground from '@/components/AnimatedBackground.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const drawer = ref(true); // Controla si el sidebar está abierto o cerrado

// --- DATOS DE LOS GRÁFICOS (Mismos que tenías) ---
const lineChartOptions = ref({
  chart: { id: 'activity-chart', toolbar: { show: false }, background: 'transparent', fontFamily: 'Roboto, sans-serif' },
  theme: { mode: 'dark' },
  stroke: { curve: 'smooth', width: 4 },
  colors: ['#00E396', '#775DD0'],
  grid: { borderColor: '#40475D', strokeDashArray: 3 },
  xaxis: { categories: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'], labels: { style: { colors: '#aaa' } } },
  fill: { type: 'gradient', gradient: { shade: 'dark', gradientToColors: ['#008FFB', '#FF4560'], shadeIntensity: 1, opacityFrom: 1, opacityTo: 1, stops: [0, 100] } }
});

const lineChartSeries = ref([
  { name: 'Usuarios Activos', data: [31, 40, 28, 51, 42, 109, 100] },
  { name: 'Consultas IA', data: [11, 32, 45, 32, 34, 52, 41] }
]);

const donutOptions = ref({
  chart: { type: 'donut', background: 'transparent' },
  labels: ['Satisfacción', 'Neutral', 'Quejas'],
  colors: ['#FF4560', '#00E396', '#775DD0'],
  plotOptions: { pie: { donut: { size: '70%', labels: { show: true, total: { show: true, label: 'Total', color: '#fff', formatter: () => '1.2k' } } } } },
  stroke: { show: false },
  legend: { position: 'bottom', labels: { colors: '#fff' } }
});

const donutSeries = ref([44, 55, 13]);

const kpiStats = ref([
  { label: 'Tiempo de Respuesta', value: 85, color: 'deep-purple-accent-3' },
  { label: 'Retención de Usuarios', value: 62, color: 'cyan-accent-3' },
  { label: 'Resolución Exitosa', value: 92, color: 'pink-accent-3' },
]);
</script>

<template>
  <AnimatedBackground>
    <v-layout class="fill-height">

      <v-navigation-drawer
        v-model="drawer"
        color="grey-darken-4"
        theme="dark"
        permanent
      >
        <div class="pa-4">
          <h3 class="text-h6 font-weight-bold text-white mb-4">Menú</h3>
          <v-btn block color="primary" variant="outlined" to="/" prepend-icon="mdi-chat">
            Volver al Chat
          </v-btn>
        </div>

        <v-list density="compact" nav>
          <v-list-item title="Dashboard" value="dashboard" active color="primary" prepend-icon="mdi-view-dashboard"></v-list-item>
          <v-list-item title="Configuración" value="settings" prepend-icon="mdi-cog"></v-list-item>
          <v-list-item title="Usuarios" value="users" prepend-icon="mdi-account-group"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block color="error" variant="text" @click="authStore.logout">
              Cerrar Sesión
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-app-bar flat color="transparent" class="px-4 mt-2" style="z-index: 10;">
        <v-app-bar-nav-icon variant="text" color="white" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-white font-weight-bold ml-2">IA Analytics Dashboard</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-avatar color="primary" size="40">
          <span class="text-white font-weight-bold">AD</span>
        </v-avatar>
      </v-app-bar>

      <v-main class="fill-height">
        <v-container fluid class="pa-6 pt-4"> 
          
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-card class="glass-widget pa-4">
                <div class="text-overline text-blue-grey-lighten-4 font-weight-bold">Total Mensajes</div>
                <div class="text-h4 font-weight-bold text-white mt-1">12,450</div>
                <v-chip size="small" color="green" class="mt-2" variant="tonal">+14% vs ayer</v-chip>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-card class="glass-widget pa-4">
                <div class="text-overline text-blue-grey-lighten-4 font-weight-bold">Usuarios Nuevos</div>
                <div class="text-h4 font-weight-bold text-white mt-1">843</div>
                <v-chip size="small" color="blue" class="mt-2" variant="tonal">+5% vs ayer</v-chip>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-card class="glass-widget pa-4">
                <div class="text-overline text-blue-grey-lighten-4 font-weight-bold">Costo de Tokens</div>
                <div class="text-h4 font-weight-bold text-white mt-1">$45.20</div>
                <v-chip size="small" color="orange" class="mt-2" variant="tonal">-2% optimizado</v-chip>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-card class="glass-widget pa-4">
                <div class="text-overline text-blue-grey-lighten-4 font-weight-bold">Uptime IA</div>
                <div class="text-h4 font-weight-bold text-white mt-1">99.9%</div>
                <v-progress-linear model-value="99" color="success" height="6" rounded class="mt-3"></v-progress-linear>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <v-col cols="12" md="8">
              <v-card class="glass-widget pa-4 fill-height">
                <div class="d-flex justify-space-between align-center mb-4">
                  <h3 class="text-h6 text-white font-weight-regular">Tráfico de Conversaciones</h3>
                  <v-btn size="small" variant="text" color="white" icon="mdi-dots-vertical"></v-btn>
                </div>
                <apexchart type="line" height="350" :options="lineChartOptions" :series="lineChartSeries"></apexchart>
              </v-card>
            </v-col>

            <v-col cols="12" md="4">
              <v-card class="glass-widget pa-4 fill-height">
                <h3 class="text-h6 text-white font-weight-regular mb-6">Métricas de Calidad</h3>
                <div v-for="(item, i) in kpiStats" :key="i" class="mb-6">
                  <div class="d-flex justify-space-between text-body-2 text-white mb-2">
                    <span>{{ item.label }}</span>
                    <span class="font-weight-bold">{{ item.value }}%</span>
                  </div>
                  <v-progress-linear :model-value="item.value" :color="item.color" height="10" rounded striped></v-progress-linear>
                </div>
                <v-divider class="my-6 border-opacity-25"></v-divider>
                <h4 class="text-subtitle-2 text-grey mb-2">Sentimiento del Usuario</h4>
                <apexchart type="donut" height="200" :options="donutOptions" :series="donutSeries"></apexchart>
              </v-card>
            </v-col>
          </v-row>

        </v-container>
      </v-main>

    </v-layout>
  </AnimatedBackground>
</template>

<style scoped>
.glass-widget {
  background: rgba(15, 23, 42, 0.85) !important;
  background-image: linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 0, 0, 0.2) 100%) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
}
</style>