<template>
    <div class="w-10 h-10 grid place-items-center text-xl hover:scale-130 transition-all cursor-pointer"
        v-on:click="handleClick">
        {{ title }}
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'


// Props
const props = defineProps<{
    title: string
}>()

// Emit
const emit = defineEmits<{
    (e: 'icon-clicked', value: string): void
}>()



const handleClick = () => {
    emit('icon-clicked', props.title)
}

</script>

<style scoped></style>