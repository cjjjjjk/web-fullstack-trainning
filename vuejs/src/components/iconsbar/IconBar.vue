<template>
    <div class="taskbar-container px-3  place-items-center border border-solid border-gray-50
             backdrop-blur-sm bg-white/10 rounded-xl shadow-sm flex flex-col gap-3 select-none">
        <span class="text-xl font-bold self-start">P Component: {{ clickedIcon ? `Icon ${clickedIcon} just clicked` : ""
            }}</span>
        <div class="flex flex-row gap-3 items-center">
            <Icon v-for="(title, index) in icons" :key="index" :title="title" @icon-clicked="handleClickIcon" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from './Icon.vue'

const icons = ['🫤', '😕', '😁', '🤔', '😎', '😢', '😮', '😴', '😡']
const clickedIcon = ref("")

function handleClickIcon(icon: string) {
  clickedIcon.value = icon
  setTimeout(() => {
    clickedIcon.value = ""
  }, 3000)
}
</script>


<style scoped></style>
