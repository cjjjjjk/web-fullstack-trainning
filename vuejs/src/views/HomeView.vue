<script setup lang="ts">
import { ref, computed } from 'vue'

import CompA from "@/components/CompA.vue"
import CompB from "@/components/CompB.vue"

// reactive state
const myValue = ref<string>('')
const show = ref<boolean>(false)

const myIcons = ['😕', '🫤', '👌', '😑', '😊'] as const

const clickedIcon = ref<string>('')

// student list
interface Student {
  name: string
  mssv: string
}
const myStudents = ref<Student[]>([
  { name: 'Ho Van Hai', mssv: 'ABC123123' },
  { name: 'Nguyen Van A', mssv: 'SV001' },
  { name: 'Tran Thi B', mssv: 'SV002' },
  { name: 'Le Van C', mssv: 'SV003' },
  { name: 'Pham Thi D', mssv: 'SV004' },
  { name: 'Do Van E', mssv: 'SV005' },
  { name: 'Bui Thi F', mssv: 'SV006' },
  { name: 'Nguyen Van G', mssv: 'SV007' },
  { name: 'Tran Thi H', mssv: 'SV008' },
  { name: 'Le Van I', mssv: 'SV009' }
])

const comps = { CompA, CompB }
const current = ref<typeof CompA | typeof CompB>(CompA)

// computed value
const numberValue = computed(() => Number(myValue.value))

// class binding demo
const myclass = computed(() => {
  return myValue.value ? 'text-red-500' : 'text-gray-600'
})

// methods
function handleIconClick(icon: string) {
  clickedIcon.value = icon
  setTimeout(() => {
    clickedIcon.value = ''
  }, 3000)
}
</script>

<template>
  <main class="flex flex-row gap-10 p-4">
    <!-- Left panel -->
    <div class="p-4 bg-gray-50 border border-gray-100 flex flex-col gap-4">
      <!-- Icon click feedback -->
      <div class="fixed top-12 left-4 text-lg font-semibold text-blue-600" v-if="clickedIcon !== ''">
        {{ `You just clicked: ${clickedIcon}` }}
      </div>

      <!-- Icon buttons -->
      <div>
        <span class="hover:cursor-pointer hover:text-2xl transition-all duration-300 text-xl mx-1"
          v-for="(icon, index) in myIcons" :key="index" @click="handleIconClick(icon)">
          {{ icon }}
        </span>
      </div>



      <!-- Text response -->
      <span :class="myclass">
        {{ myValue ? `${myValue} tuổi lận 😕` : "This is home content!" }}
      </span>

      <!-- Conditional content -->
      <span v-if="numberValue > 150">Không có người nào lớn hơn 1000 tuổi</span>
      <span v-else-if="numberValue > 50">Hơn 50 tuổi, chào bác</span>
      <span v-else-if="myValue !== ''">Chào anh bạn</span>

      <!-- Input -->
      <input v-model="myValue" class="px-3 p-2 border border-gray-300 rounded" type="number"
        placeholder="Bạn bao nhiêu tuổi ?" />

      <label class="pt-5 border-t-2" for="">
        Keepalive components
      </label>
      <div>
        <button class="p-4 bg-gray-400 hover:cursor-pointer hover:bg-white hover:text-black"
          @click="current = CompA">A</button>
        <button class="p-4 ml-2! bg-gray-400 hover:cursor-pointer hover:bg-white hover:text-black"
          @click="current = CompB">B</button>

        <transition name="fade">
          <!-- <component> kich hoạt được trasition -->
          <KeepAlive>
            <component :is="current" />
          </KeepAlive>
        </transition>

      </div>
    </div>

    <!-- Right panel -->
    <div class="flex flex-col gap-4">
      <button class="px-4 py-2 bg-blue-500 text-white rounded" @click="show = !show">
        Toggle Danh sách học sinh
      </button>

      <Transition name="fade">
        <div v-if="show">
          <label class="text-lg font-semibold mb-2 block">Danh sách học sinh:</label>
          <div class="flex flex-col gap-3">
            <div v-for="student in myStudents.slice(0, 5)" :key="student.mssv"
              class="bg-gray-100 p-3 rounded-xl shadow-sm">
              <span class="font-bold">{{ student.name }}</span><br />
              <span>{{ student.mssv }}</span>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </main>
</template>

<style scoped>
/* Transition component class */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* */
</style>
