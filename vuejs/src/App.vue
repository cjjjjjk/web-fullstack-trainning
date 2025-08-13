<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import IconUser from './components/IconUser.vue';
import { useUiStore } from './stores/uiStore';


const router = useRouter()
const uiStore = useUiStore()
const flex_column = ref('flex flex-column')


const toggleTheme = (isDarkTheme: boolean) =>{
  uiStore.setDarkTheme(isDarkTheme)
}

onMounted(()=>{
    uiStore.loadTheme()
})

const direct = (url: string)=>{
  router.push(url)
}
</script>

<template>
  <header class="flex justify-center items-center py-2 bg-gradient-to-r from-[var(--bg-card)] via-[var(--bg-card-accent)] to-[var(--bg-card)]">
    <div class="navbar w-[100rem] max-w-[90vw] bg-[var(--bg-card)]/90 backdrop-blur-md transition-colors duration-500 shadow-sm rounded-sm px-2 py-2">
      <div class="flex-1 flex items-center gap-3 hover:cursor-pointer"
        @click="direct('/')"
      >
        <h3 class="text-2xl font-extrabold text-[var(--text-main)] tracking-tight ms-2">DEMO</h3>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal items-center gap-2 px-1">
          <li>
            <RouterLink 
              class="px-4 py-2 btn border-none shadow-none rounded-xl text-[var(--text-button-secondary)] bg-[var(--bg-button-secondary)] hover:bg-[var(--hover-button-secondary)] hover:text-[var(--text-button-primary)] transition-all duration-300" 
              to="/class"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
              Classes
            </RouterLink>
          </li>
          <li>
            <RouterLink 
              class="px-4 py-2 btn border-none shadow-none rounded-xl text-[var(--text-button-secondary)] bg-[var(--bg-button-secondary)] hover:bg-[var(--hover-button-secondary)] hover:text-[var(--text-button-primary)] transition-all duration-300" 
              to="/students"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Students
            </RouterLink>
          </li>
          <li>
            <RouterLink 
              class="px-4 py-2 btn border-none shadow-none rounded-xl text-[var(--text-button-secondary)] bg-[var(--bg-button-secondary)] hover:bg-[var(--hover-button-secondary)] hover:text-[var(--text-button-primary)] transition-all duration-300" 
              to="/auth"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
              Profile
            </RouterLink>
          </li>
          <li>
            <label class="swap swap-rotate p-2 rounded-xl hover:bg-[var(--hover-button-secondary)] transition-all duration-300">
              <input 
                type="checkbox" 
                :checked="uiStore.getTheme"
                @change="toggleTheme(($event.target as HTMLInputElement).checked)" 
              />
              <!-- Dark mode icon -->
              <svg
                class="swap-on h-6 w-6 fill-[var(--text-main)]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
                />
              </svg>
              <!-- Light mode icon -->
              <svg
                class="swap-off h-6 w-6 fill-[var(--text-main)]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
                />
              </svg>
            </label>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <div :class="flex_column" class="mt-[5rem] self-start pt-1">
    <RouterView />
  </div>
</template>

<style>

header {
  position: fixed;
  height: 5rem;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  z-index: 10;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
