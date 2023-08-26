import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PublicLayout from '@/layouts/PublicLayout.vue'
import SocialLayout from '@/layouts/SocialLayout.vue';
import LoginView from '../views/LoginView.vue'
import PostsView from '../views/PostsView.vue'
import { useAuthStore } from '../stores/auth.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
    },
    {
      path: '/posts',
      name: 'Posts',
      component: SocialLayout,
      redirect: '/posts',
      children: [
        {
          path: '/posts',
          name: 'Posts',
          component: PostsView
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login',''];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return '/login';
  }
});

export default router
