<template>
  <div class="fixed inset-0 bg-[#212121]/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-2xl w-[30rem] p-8 text-center animate-fade-in">
      <h2 class="text-2xl font-semibold text-[#212121] mb-4">Authentication Required</h2>
      <p class="text-[#212121]/70 mb-6 text-base">You need to be logged in to access this page.</p>
      <button
        @click="directToLogin"
        class="btn btn-primary rounded-xl hover:shadow-md transition-all duration-200 font-semibold hover:cursor-pointer"
      >
        Go to Login
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const directToLogin = () => {
  router.push({
    path: '/auth',
    query: route.meta.redirectAfterLogin ? { redirect: route.fullPath } : {}
  })
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>