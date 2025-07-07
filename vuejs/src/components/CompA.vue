<template>
    <div @click="value++">
        Component A [click here] - value: {{ value }}
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref<number>(0)

</script>
<style lang="ts">

</style>