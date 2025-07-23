<template>
    <div class="profile-container min-h-screen flex items-center justify-center gap-3">
        <div class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-6">
            <h1 class="text-3xl font-bold text-gray-800">Welcome!</h1>

            <p class="text-gray-600">
                Your UID is:
                <span class="font-mono font-semibold text-blue-700">{{ uid }}</span>
            </p>

            <!-- loading / error / profile -->
            <div v-if="loading" class="text-gray-500">Loading profile…</div>
            <div v-else-if="error" class="text-red-600">{{ error }}</div>

            <div v-else-if="profile" class="flex flex-col items-center text-center gap-3">
                <img :src="profile.avatar" alt="avatar" class="w-28 h-28 rounded-full border shadow" />
                <p class="text-xl font-semibold text-gray-800">
                    {{ profile.fullName }}
                </p>
                <p class="text-sm text-gray-600">{{ profile.email }}</p>
                <p class="text-sm text-gray-600">Phone: {{ profile.phone }}</p>
                <p class="text-sm text-gray-600">
                    {{ profile.location }}
                </p>
            </div>

            <button @click="logout"
                class="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-all">
                Logout
            </button>
        </div>
        <div v-if="yesNoAnswer && !loading"
            class="h-100 w-xl bg-white shadow-xl rounded-2xl p-8 max-w-md flex flex-col items-center gap-6">
            <span>Is {{ profile.gender == "male" ? "he" : "she" }} like you ?</span>
            <span><strong class="font-bold">{{ yesNoAnswer.answer.toUpperCase() }}</strong></span>
            <img :src="yesNoAnswer.image" alt="">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore';
import axios from 'axios'

/* state & router */
const uid = ref<string>('')
// const profile = ref<any>(null)
const yesNoAnswer = ref<any>(null)
const loading = ref<boolean>(true)
const error = ref<string>('')
const router = useRouter()

const profile = useUserStore();
/* API */
// promise all - call api: get user profile + yesno question  
async function getData() {
    loading.value = true;
    try {
        const [
            profileRes,
            yesNoRes] = await Promise.all([
                profile.fetchProfile(),
                // axios.get('https://randomuser.me/api/'),
                axios.get('https://yesno.wtf/api')
            ])
        // profile.value = profileRes.data.results[0];
        yesNoAnswer.value = yesNoRes.data;
    } catch (err: unknown) {
        const erorr = err as { message?: string };
        error.value = erorr.message ?? "Loix"
    } finally {
        loading.value = false
    }
}
// async function getRandomProfile() {
//     try {
//         const res = await axios.get('https://randomuser.me/api/')
//         profile.value = res.data.results[0]
//     } catch (e: any) {
//         error.value = e?.message || 'Không thể tải profile'
//     } finally {
//         loading.value = false
//     }
// }

// async function getYesNo() {
//     try {
//         const res = await axios.get('https://yesno.wtf/api')
//         yesNoAnswer.value = res.data
//     } catch (e: any) {
//         console.log(e);
//         return;
//     }
// }


/* lifecycle */
onMounted(async () => {
    const saved = localStorage.getItem('uid')
    if (!saved || saved.length < 3) {
        router.push('/login')
        return
    }
    uid.value = saved
    // await getRandomProfile()
    // await getYesNo()
    await getData();

})

/* methods */
function logout() {
    localStorage.removeItem('uid')
    // call clear profile
    profile.clearProfile()
    router.push('/login')
}
</script>





<style scoped>
.profile-container {
    min-width: 40rem;
}
</style>
