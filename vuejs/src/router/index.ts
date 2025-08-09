import { createRouter, createWebHistory, type Router } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AuthDemoView from '../views/AuthDemoView.vue';

import AboutView from '../views/AboutView.vue';
import StudentView from '../views/StudentView.vue';
import ClassView from '../views/ClassView.vue';

const router: Router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      redirect: 'students'
    },
    {
      path: '/home',
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
    },
    {
      path: '/students',
      name: 'Final Demo',
      component: StudentView,
      meta: { requiresAuth: true, redirectAfterLogin: true },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('access_token')
        if (!token) {
          next({
            path: '/auth',
            query: { redirect: to.fullPath }
          })
        } else {
          next()
        }
      }
    },
    {
      path: '/class',
      name: 'Class',
      component: ClassView,
      meta: { requiresAuth: true, redirectAfterLogin: true }
    }
  ],
})

export default router
