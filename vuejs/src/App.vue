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
        <RouterLink to="/">Demo</RouterLink>
        <RouterLink to="/about">Components</RouterLink>
        <RouterLink to="/profile">CallAPI</RouterLink>
        <RouterLink to="/login">Routing</RouterLink>
        <RouterLink to="/auth">Nest Auth Demo</RouterLink>
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
