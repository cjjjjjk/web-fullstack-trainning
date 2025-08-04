<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import IconUser from './components/IconUser.vue';

const flex_column = ref('flex flex-column')
</script>

<template>

    <header class="flex justify-center items-center">
    <div class="navbar w-[90rem] max-w-[80vw] bg-base-100 shadow-sm rounded-xl">
      <div class="flex-1">
        <h3 class="btn btn-outline-primary text-xl font-bold hover:cursor-default">DEMO</h3>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <RouterLink class="px-2 btn btn-outline-primary me-2 rounded-xl" tag="li" to="/class">Classes</RouterLink>
          <RouterLink class="px-2 btn btn-outline-primary me-2 rounded-xl" tag="li" to="/students">Students</RouterLink>
          <RouterLink class="px-2 btn btn-outline-primary me-2 rounded-xl" tag="li" to="/auth">
          <IconUser/>
          </RouterLink>
        </ul>
      </div>
    </div>
  </header>
  <div :class="flex_column" class="mt-15">
    <RouterView />
  </div>
</template>

<script setup lang="ts">

</script>

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
