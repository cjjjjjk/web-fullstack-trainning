<template>
    <div class="login-box min-h-screen flex items-center justify-center">
        <div class="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4">
            <h2 class="text-2xl font-bold text-center text-gray-800">LOGIN</h2>

            <input v-model="uid" type="text" placeholder="Enter your UID"
                class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400" />

            <button @click="save"
                class="bg-purple-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-600 transition-all">
                Save UID
            </button>

            <p v-if="errorMsg" class="text-red-500 text-sm text-center">{{ errorMsg }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const uid = ref<string>('')
const errorMsg = ref<string>('')

const router = useRouter()

const countdown = ref(3)

function save() {
    if (uid.value.length >= 3) {
        localStorage.setItem('uid', uid.value)

        countdown.value = 3
        errorMsg.value = `Thành công, chuyển hướng trong ${countdown.value}s`

        const interval = setInterval(() => {
            countdown.value--
            if (countdown.value > 0) {
                errorMsg.value = `Thành công, chuyển hướng trong ${countdown.value}s`
            } else {
                clearInterval(interval)
                router.push('/profile')
            }
        }, 1000)
    } else {
        errorMsg.value = 'UID phải dài tối thiểu 3 ký tự'
    }
}

</script>

<style scoped>
.login-box {
    min-width: 20rem !important;
}
</style>
