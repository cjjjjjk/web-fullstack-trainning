<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">

    <Transition>
      <h1 class="green">{{ msg }}</h1>
    </Transition>
  </div>
</template>

<style scoped></style>
