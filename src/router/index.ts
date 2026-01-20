import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
// Asumo que tienes un HomeView, si no, crea uno básico
// import HomeView from '../views/HomeView.vue'; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // Ahora la ruta raíz es el chat
      name: 'chat',
      component: () => import('../views/ChatView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView, // Lazy loading recomendado
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
    path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    }
  ],
});

// Navigation Guard (Protección de rutas)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Verificación simple
  
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else if (to.name === 'login' && token) {
    next('/');
  } else {
    next();
  }
});

export default router;