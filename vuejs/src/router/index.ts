import { createRouter, createWebHistory, type Router } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // Lazy loading 
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import('../views/ProfileView.vue'),
      beforeEnter: (to, from) => {
        const uid = localStorage.getItem('uid');
        console.log(uid)
        if (uid != null) return true;
        else {
          alert("Chưa đăng nhập, chuyển hướng đang nhập")
          return {
            path: 'login'
          }
        };
      }
    },
    {
      path: '/login',
      name: "Login",
      component: LoginView
    }
  ],
})

export default router
