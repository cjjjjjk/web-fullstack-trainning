<template>
  <div class="about">
    <IconBar />
  </div>
</template>

<script>
import IconBar from '@/components/iconsbar/IconBar.vue'

export default {
  name: 'AboutView',
  components: {
    IconBar
  }
}
</script>

<style>
.about {
  height: 50%;
}
</style>
