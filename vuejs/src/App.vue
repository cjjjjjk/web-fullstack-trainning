<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

const flex_column = ref('flex flex-column')
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="nav-links">
        <RouterLink to="/home">[Vue]</RouterLink>
        <RouterLink to="/about">[Vue]Components</RouterLink>
        <RouterLink to="/profile">[Vue] CallAPI</RouterLink>
        <RouterLink to="/login">[Vue] Routing</RouterLink>
        <RouterLink to="/auth">[Nest] Auth Demo</RouterLink>
        <RouterLink to="/student_management">[DEMO] Student Management</RouterLink>
      </nav>
    </div>
  </header>

  <div :class="flex_column">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: white;
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
