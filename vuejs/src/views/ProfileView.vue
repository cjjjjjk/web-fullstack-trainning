<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-4">
            <h1 class="text-3xl font-bold text-gray-800">Welcome!</h1>

            <p class="text-gray-600">
                Your UID is:
                <span class="font-mono font-semibold text-blue-700">{{ uid }}</span>
            </p>

            <button @click="logout"
                class="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-all">
                Logout
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const uid = ref<string>('')
const router = useRouter()

onMounted(() => {
    const saved = localStorage.getItem('uid')
    if (!saved || saved.length < 3) {
        router.push('/login') // Nếu chưa login, chuyển hướng
    } else {
        uid.value = saved
    }
})

function logout() {
    localStorage.removeItem('uid')

    // Route đến trang đăng nhập
    router.push('/login')
}
</script>
