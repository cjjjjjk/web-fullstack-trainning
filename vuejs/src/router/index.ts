import { createRouter, createWebHistory, type Router } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AuthDemoView from '../views/AuthDemoView.vue';

import AboutView from '../views/AboutView.vue';

const router: Router = createRouter({
  history: createWebHistory('/'),
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
      component: AboutView,
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
    },
    {
      path: '/auth',
      name: "Auth Demo",
      component: AuthDemoView
    }
  ],
})

export default router
