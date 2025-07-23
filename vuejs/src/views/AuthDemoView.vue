<!-- src/views/AuthDemoView.vue -->
<template>
    <div class="fixed top-0 left-0 min-h-screen w-screen flex gap-3 items-center justify-center bg-gray-100">
        <div 
            v-if="!isLogin"
            class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
                <div class="mb-4">
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input v-model="phone" type="tel" id="phone"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                        placeholder="phone:1234 (admin) 0123(user)" required @input="validatePhone()" 
                        :disabled="isSignUp ? true : false"
                        />
                        <p v-if="phoneError" class="text-red-500 text-sm mt-1">{{ phoneError }}</p>
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                        <input v-model="password" type="password" id="password"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-200"
                        placeholder="password: 123" required @input="validatePassword()" 
                        :disabled="isSignUp ? true : false"
                        />
                    <p v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</p>
                </div>
                <button type="submit"
                    class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 hover:cursor-pointer transition duration-200 relative overflow-hidden ripple disabled:bg-gray-400"
                    :disabled="isSignUp || !isFormValid">
                    Login
                </button>
                <span 
                    class="text-blue-500 hover:underline hover:cursor-pointer"
                    @click="handleSignUp"
                >sign up ?</span>
            </form>
        </div>
        <div 
            v-if="isSignUp"
            class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Sign up</h2>
            <form @submit.prevent="handlerSignUpSubmit" class="flex flex-col gap-3">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="name" type="text" id="name"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your name" required />
                    <p v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</p>
                </div>
                <div class="mb-4">
                    <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                    <input v-model="address" type="text" id="address"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your address" required />
                    <p v-if="addressError" class="text-red-500 text-sm mt-1">{{ addressError }}</p>
                </div>
                <div class="mb-4">
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input v-model="phoneSignUp" type="tel" id="phone"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number" required />
                    <p v-if="phoneErrorSignUp" class="text-red-500 text-sm mt-1">{{ phoneErrorSignUp }}</p>
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="passwordSignUp" type="password" id="password"
                        class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password" required />
                    <p v-if="passwordErrorSignUp" class="text-red-500 text-sm mt-1">{{ passwordErrorSignUp }}</p>
                </div>
                <button type="submit"
                    @click="handlerSignUpSubmit"
                    class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 hover:cursor-pointer transition duration-200 relative overflow-hidden ripple"
                    >
                    Sign up
                </button>
            </form>
        </div>
        <div 
        v-if="isLogin"
        class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col gap-2"
        >
            <!-- [Design AI gen] -->
            <div v-if="userInfor" class="relative p-6 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-md mx-auto">
            <!-- Top Section: Name and Role -->
            <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-semibold text-gray-900">{{ userInfor.name }}</h2>
            <span class="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-sm shadow-sm hover:bg-blue-700 transition-colors duration-200">
                {{ userInfor.role }}
            </span>
            </div>

            <!-- Divider -->
            <div class="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>

            <!-- Info Section -->
            <div class="space-y-3 py-3 flex flex-col gap-3" >
            <div class="flex items-center space-x-2" v-if="userInfor.address">
                <p class="text-gray-700"><span class="font-medium">Address:</span> {{ userInfor.address }}</p>
            </div>
            <div class="flex items-center space-x-2">
                <p class="text-gray-700"><span class="font-medium">Phone:</span> {{ userInfor.phone }}</p>
            </div>
            <button 
                @click="handleDelete"
                class="bg-red-500 rounded-sm text-white font-semibold px-3 self-start hover:bg-red-800 hover:cursor-pointer">
                Delete
            </button>
            </div>

            <!-- Decorative Element -->
            <div class="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-bl-full opacity-20"></div>
            </div>
                <div
                class="flex flex-col p-4 border border-gray-300 rounded-lg shadow-sm bg-white" 
                v-if="adminContent"
                >
                    <span class="font-bold"
                        :class="adminContent.status == 200 ? 'text-green-600' : 'text-red-600' "
                    >{{ adminContent.title ?? "Trạng thái ..." }}</span>
                    <span>{{ `Content ID: ${adminContent.id}` }}</span>
                    <span>{{ adminContent.content }}</span>
                </div>
                <button 
                    @click="handleGetAdminContent"
                    class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 hover:cursor-pointer transition duration-200 relative overflow-hidden ripple">
                    Get Admin Content
                </button>
                <button 
                    @click="handleLogout"
                    class="w-full text-red-600 py-2 rounded-md hover:underline hover:cursor-pointer transition duration-200 relative overflow-hidden ripple"
                    >
                    log out
                </button>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { onLoginAuthAPI,LoginDTO, onGetAdminContent, onGetMe, createUserDto, onCreateNewUser, onDelete } from '../services/demoNestAPI'

// login status with default value
const isLogin = ref(localStorage.getItem('access_token') !== null)
const isSignUp = ref(false)

const userInfor = ref<any | null>(null)

const phone = ref('')
const password = ref('')
const phoneError = ref('')
const passwordError = ref('')
const phoneSignUp = ref('')
const passwordSignUp = ref('')
const phoneErrorSignUp = ref('')
const passwordErrorSignUp = ref('')

const name = ref('')
const nameError = ref ('')
const address = ref('')
const addressError = ref('')

const adminContent = ref<{
    status: 200 | 403,
    title?: string,
    id: string,
    content: string
} | null>(null)

const validatePhone = (isClear?: boolean) => {
    if(isClear) {
        phoneError.value = '';
        return
    }
    if (!phone.value) {
        phoneError.value = 'Phone number is required'
    } else {
        phoneError.value = ''
    }
}
const validateName= () =>{ 

}
const validateAddress= ()=> {

}

const validatePassword = (isClear?: boolean) => {
    if(isClear) {
        passwordError.value = '';
        return
    }
    if (!password.value) {
        passwordError.value = 'Password is required'
    } else {
        passwordError.value = ''
    }
}

const clearWarning = ()=> {
    validatePhone(true);
    validatePassword(true)
}

const isFormValid = computed(() => {
    return phone.value && password.value && !phoneError.value && !passwordError.value
})

const handleSubmit = async () => {
    validatePhone()
    validatePassword()

    if (!isFormValid.value) return

    const loginDto: LoginDTO = {
        phone: phone.value,
        password: password.value
    }

    try {
        const response = await onLoginAuthAPI(loginDto)
        if(response.isSuccess == false) {
            alert('Đăng nhập thất bại');
            phone.value = '';
            password.value = ''
            return
        }

        if (response.access_token) {
            localStorage.setItem('access_token', response.access_token)
            userInfor.value = response.user
            isLogin.value = true
        }
    } catch (err: any) {
        console.error('Login error:', err)
    }
}

const handleGetAdminContent = async ()=> {
    try {
        const resData = await onGetAdminContent();
        if(resData.isSuccess === false) {
        adminContent.value = {
            id: "",
            content: "",
            title: "FORBIDEN !",
            status: 403
        }
    }
    else {
            adminContent.value = {...resData, status: 200, title: "SUCCESS !"}
        }
    } catch (err: any) {

        console.log(err)
    }
}

const handleLogout = ()=> {
    localStorage.removeItem('access_token');
    isLogin.value = false;
    userInfor.value = null
}

const handleDelete = async () => {
    const res = await onDelete(userInfor.value.name)
    alert(res);
    handleLogout()
}

// Tự động loại bỏ content khi logout
watch(isLogin, (newValue) => {
    if (newValue) {
    // handleGetAdminContent()
  } else {
    adminContent.value = null
  }
})


// Getme api
const getUserData = async ()=> {
    
    const res = await onGetMe();
    userInfor.value = res
}

const handleSignUp = ()=> {
    clearWarning()
    if(isLogin.value) {
        isSignUp.value = false;
        return
    }
    isSignUp.value = !isSignUp.value;
}

const handlerSignUpSubmit = async ()=> {
    const newUser: createUserDto = {
        name: name.value.trim(),
        phone: phoneSignUp.value.trim(),
        address: address.value,
        password: passwordSignUp.value
    }

    const resData = await onCreateNewUser(newUser);
    if(resData.isSuccess == false) {
        alert('Tạo tài khoản thất bại')
    }
    else {
        alert('Tạo tài khoàn thành công')
        isSignUp.value = false;
        phone.value = newUser.phone;
    }
}

onMounted(()=>{
    if(isLogin)
    getUserData()
})
</script>












<!-- STYLE  -->
<style>
.ripple {
    position: relative;
    overflow: hidden;
}

.ripple:active::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: inherit;
    animation: ripple-effect 0.6s ease-out;
    pointer-events: none;
}

@keyframes ripple-effect {
    0% {
        transform: scale(0);
        opacity: 1;
    }

    100% {
        transform: scale(4);
        opacity: 0;
    }
}
</style>