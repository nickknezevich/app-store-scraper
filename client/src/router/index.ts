import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import LoginView from '../views/LoginView.vue'
import { useAuthStore } from '../stores/auth.store';
import AdminLayout from '@/layouts/AdminLayout.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: AdminLayout,
      redirect: '/',
      children: [
        {
          path: '/',
          name: 'Home',
          component: HomeView
        }
      ]
    },
    {
      path: '/login',
      name: 'SignIn',
      component: PublicLayout,
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'Login',
          component: LoginView
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login',''];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();
  
  if (authRequired && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return '/login';
  }
});

export default router
