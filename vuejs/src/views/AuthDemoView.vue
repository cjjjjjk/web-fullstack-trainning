<template>
  <div class="demo-container flex flex-row-reverse">
    <!-- Left: Forms -->
    <div class="w-1/3 flex items-center justify-center ">
      <div class="w-full max-w-md">
        <Transition 
            v-if="!isLogin && !isSignUp"
        >
          <div 
            class="bg-[var(--bg-card)]/90 backdrop-blur-md p-8 rounded-2xl shadow-sm w-full transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-extrabold text-[var(--text-main)] tracking-tight">Login</h2>
              <div class="w-16 h-2 bg-[var(--accent-primary)] rounded-full"></div>
            </div>
            <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
              <div class="relative">
                <label for="phone" class="block text-sm font-semibold text-[var(--text-label)] mb-1.5">Phone Number</label>
                <input 
                  v-model="phone" 
                  type="tel" 
                  id="phone"
                  class="w-full pl-10 pr-4 py-2.5 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] transition-all duration-200"
                  placeholder="Enter phone number (e.g., 1234 for admin)"
                  required 
                  @input="validatePhone()"
                  :disabled="isSignUp"
                />
                <svg class="absolute left-3 top-9 w-5 h-5 text-[var(--text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m-3 2h12M9 9v2m-3 2h12M9 15v2m-6 4h12a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p v-if="phoneError" class="text-[var(--error)] text-sm mt-1">{{ phoneError }}</p>
              </div>
              <div class="relative">
                <label for="password" class="block text-sm font-semibold text-[var(--text-label)] mb-1.5">Password</label>
                <input 
                  v-model="password" 
                  type="password" 
                  id="password"
                  class="w-full pl-10 pr-4 py-2.5 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] transition-all duration-200"
                  placeholder="Enter password (e.g., 123)"
                  required 
                  @input="validatePassword()"
                  :disabled="isSignUp"
                />
                <svg class="absolute left-3 top-9 w-5 h-5 text-[var(--text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2zM16 20H8v-2c0-2.206 1.794-4 4-4s4 1.794 4 4v2z" />
                </svg>
                <p v-if="passwordError" class="text-[var(--error)] text-sm mt-1">{{ passwordError }}</p>
              </div>
              <button 
                type="submit"
                class="w-full bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] py-2.5 rounded-xl hover:bg-[var(--hover-button-primary)] transition-all duration-300 font-semibold disabled:bg-[var(--bg-button-secondary)] disabled:text-[var(--text-subtle)] disabled:cursor-not-allowed"
                :disabled="isSignUp || !isFormValid"
              >
                Login
              </button>
              <span 
                class="text-[var(--accent-primary)] hover:text-[var(--hover-button-primary)] hover:underline hover:cursor-pointer text-sm text-center"
                @click="handleSignUp"
              >
                Don't have an account? Sign up
              </span>
            </form>
          </div>
        </Transition>

        <Transition v-if="isSignUp" >
          <div
            
            class="bg-[var(--bg-card)]/90 backdrop-blur-md p-8 rounded-2xl shadow-sm w-full transition-all duration-300"
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-extrabold text-[var(--text-main)] tracking-tight">Sign Up</h2>
              <div class="w-16 h-2 bg-[var(--accent-primary)] rounded-full"></div>
            </div>
            <form @submit.prevent="handlerSignUpSubmit" class="flex flex-col gap-4">
              <div class="relative">
                <label for="name" class="block text-sm font-semibold text-[var(--text-label)] mb-1.5">Name</label>
                <input 
                  v-model="name" 
                  type="text" 
                  id="name"
                  class="w-full pl-10 pr-4 py-2.5 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] transition-all duration-200"
                  placeholder="Enter your name"
                  required 
                  @input="validateName"
                />
                <svg class="absolute left-3 top-9 w-5 h-5 text-[var(--text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p v-if="nameError" class="text-[var(--error)] text-sm mt-1">{{ nameError }}</p>
              </div>
              <div class="relative">
                <label for="address" class="block text-sm font-semibold text-[var(--text-label)] mb-1.5">Address</label>
                <input 
                  v-model="address" 
                  type="text" 
                  id="address"
                  class="w-full pl-10 pr-4 py-2.5 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] transition-all duration-200"
                  placeholder="Enter your address"
                  required 
                  @input="validateAddress"
                />
                <svg class="absolute left-3 top-9 w-5 h-5 text-[var(--text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <p v-if="addressError" class="text-[var(--error)] text-sm mt-1">{{ addressError }}</p>
              </div>
              <div class="relative">
                <label for="phone" class="block text-sm font-semibold text-[var(--text-label)] mb-1.5">Phone Number</label>
                <input 
                  v-model="phoneSignUp" 
                  type="tel" 
                  id="phone"
                  class="w-full pl-10 pr-4 py-2.5 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] transition-all duration-200"
                  placeholder="Enter your phone number"
                  required 
                />
                <svg class="absolute left-3 top-9 w-5 h-5 text-[var(--text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m-3 2h12M9 9v2m-3 2h12M9 15v2m-6 4h12a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p v-if="phoneErrorSignUp" class="text-[var(--error)] text-sm mt-1">{{ phoneErrorSignUp }}</p>
              </div>
              <div class="relative">
                <label for="password" class="block text-sm font-semibold text-[var(--text-label)] mb-1.5">Password</label>
                <input 
                  v-model="passwordSignUp" 
                  type="password" 
                  id="password"
                  class="w-full pl-10 pr-4 py-2.5 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] transition-all duration-200"
                  placeholder="Enter your password"
                  required 
                />
                <svg class="absolute left-3 top-9 w-5 h-5 text-[var(--text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-4 2-4 2 .896 2 2zM16 20H8v-2c0-2.206 1.794-4 4-4s4 1.794 4 4v2z" />
                </svg>
                <p v-if="passwordErrorSignUp" class="text-[var(--error)] text-sm mt-1">{{ passwordErrorSignUp }}</p>
              </div>
              <button 
                type="submit"
                class="w-full bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] py-2.5 rounded-xl hover:bg-[var(--hover-button-primary)] transition-all duration-300 font-semibold disabled:bg-[var(--bg-button-secondary)] disabled:text-[var(--text-subtle)] disabled:cursor-not-allowed flex items-center justify-center gap-2"
                :disabled="!isSignUpFormValid || isSignUpLoading"
                @click="handlerSignUpSubmit"
              >
                <span v-if="isSignUpLoading" class="loading loading-spinner text-[var(--text-button-primary)]"></span>
                Sign Up
              </button>
              <span 
                class="text-[var(--accent-primary)] hover:text-[var(--hover-button-primary)] hover:underline hover:cursor-pointer text-sm text-center"
                @click="handleSignUp"
              >
                Already have an account? Login
              </span>
            </form>
          </div>
        </Transition>

        <Transition name="movein">
          <div 
            v-if="isLogin "
            class="w-full max-w-md p-8 bg-[var(--bg-card)]/90 backdrop-blur-md rounded-2xl shadow-sm space-y-6 transition-all duration-300 "
          >
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-extrabold text-[var(--text-main)] tracking-tight">User Profile</h2>
              <div class="w-16 h-2 bg-[var(--accent-primary)] rounded-full"></div>
            </div>

            <!-- Card User Info -->
            <div 
              v-if="userInfor && !isLoading"
              class="card bg-[var(--bg-card-accent)]/50 border-[1.5px] border-[var(--border-table)] shadow-md transition-all duration-300 relative"
            >
              <div class="card-body relative">
                <!-- Decorative corner -->
                <div class="absolute top-0 right-0 w-24 h-24 bg-[var(--accent-primary)] opacity-10 rounded-bl-full pointer-events-none"></div>

                <!-- Header: Name + Role -->
                <div class="flex items-center justify-between mb-4">
                  <h2 class="card-title text-[var(--text-main)] text-xl font-semibold">
                    {{ userInfor.name }}
                  </h2>
                  <div class="badge bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] px-4 py-1 text-sm font-semibold rounded-lg">
                    {{ userInfor.role }}
                  </div>
                </div>

                <!-- Divider -->
                <div class="divider my-2 border-[var(--border-table)]"></div>

                <!-- Info -->
                <div class="flex flex-col gap-3 text-[var(--text-secondary)]">
                  <p v-if="userInfor.address">
                    <span class="font-semibold text-[var(--text-main)]">Address:</span> {{ userInfor.address }}
                  </p>
                  <p>
                    <span class="font-semibold text-[var(--text-main)]">Phone:</span> {{ userInfor.phone }}
                  </p>
                  <button
                    @click="handleDelete"
                    class="btn w-fit mt-3 bg-[var(--error)] text-[var(--text-button-primary)] hover:bg-[var(--error)]/80 transition-all duration-300 rounded-lg px-4 py-2 font-semibold"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="py-10 grid items-center justify-center">
              <span class="loading loading-bars loading-xl text-[var(--text-loading)]"></span>
            </div>

            <!-- Admin content section -->
            <div 
              v-if="adminContent"
              class="alert shadow-sm border-[1.5px] border-[var(--border-table)]"
              :class="adminContent.status == 200 ? 'bg-[var(--accent-primary)]/20 text-[var(--text-main)]' : 'bg-[var(--error)]/20 text-[var(--text-main)]'"
            >
              <div class="flex flex-col gap-1">
                <span class="font-semibold text-[var(--text-main)]">{{ adminContent.title ?? 'Status...' }}</span>
                <div class="text-sm">
                  <span v-if="adminContent.status == 200">Content ID: {{ adminContent.id }}</span><br>
                  <span>{{ adminContent.content }}</span>
                </div>
              </div>
            </div>

            <!-- Logout button -->
            <button
              @click="handleLogout"
              class="btn w-full bg-[var(--bg-button-secondary)] text-[var(--text-button-secondary)] border-[1.5px] border-[var(--border-button)] hover:bg-[var(--hover-button-secondary)] hover:text-[var(--text-button-primary)] transition-all duration-300 rounded-xl font-semibold"
            >
              Log Out
            </button>
          </div>
        </Transition>
      </div>
    </div>
    <!-- Right: Image -->
    <div class="grow screen bg-cover bg-center">
      <div class="w-full h-full flex items-center justify-center">
        <div class="text-center text-[var(--text-main)] p-8">
          <h1 class="text-4xl font-extrabold tracking-tight mb-4">Welcome to DEMO</h1>
          <p class="text-lg text-[var(--text-subtle)]">Join aus to assege ynar cl ithnd stuousma w ease!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { onLoginAuthAPI,LoginDTO, onGetAdminContent, onGetMe, createUserDto, onCreateNewUser, onDelete } from '../services/demoNestAPI'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
// login status with default value
const isLogin = ref(localStorage.getItem('access_token') !== null)
const isSignUp = ref(false)

const isLoading = ref<boolean>(false)

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
    if(!name.value) {
        nameError.value = "Name is require !"
        return
    } 

    if(name.value.length < 3) {
        nameError.value = "too short !"
        return
    }
    
    nameError.value = ""
}
const validateAddress= ()=> {
    if(!address.value) {
        addressError.value = 'address require !'
        return
    }
    addressError.value = ""
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

const isSignUpFormValid = computed(()=>{
    const rs:boolean = Boolean(name.value && address.value && !nameError.value && !addressError.value && phoneSignUp.value && passwordSignUp.value)
    return rs
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
            alert(`Đăng nhập thất bại ${response.message}`);
            phone.value = '';
            password.value = ''
            return
        }

        if (response.access_token) {
            localStorage.setItem('access_token', response.access_token)
            userInfor.value = response.user
            isLogin.value = true
            
            const redirectPath = route.query.redirect as string | undefined
            console.log("OKE",redirectPath)
            if (redirectPath) {
                router.push(redirectPath)
            }
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
    isLoading.value = true 
    try {

      const res = await onGetMe();
      userInfor.value = res
    } catch(err: any) {
      console.log('err:', err)
    } finally {
      setTimeout(() => {
        isLoading.value = false
      }, 500);
    }
}

const handleSignUp = ()=> {
    clearWarning()
    if(isLogin.value) {
        isSignUp.value = false;
        return
    }
    isSignUp.value = !isSignUp.value;
}

const isSignUpLoading = ref<boolean>(false)
const handlerSignUpSubmit = async () => {
    isSignUpLoading.value = true
    // Reset all error messages
    nameError.value = ''
    phoneErrorSignUp.value = ''
    passwordErrorSignUp.value = ''

    const newUser: createUserDto = {
        name: name.value.trim(),
        phone: phoneSignUp.value.trim(),
        address: address.value.trim(),
        password: passwordSignUp.value
    }

    const resData = await onCreateNewUser(newUser)

    if (resData.isSuccess === true) {
        alert('Tạo tài khoản thành công')
        isSignUp.value = false
        phone.value = newUser.phone
    } else {
        if (resData.fieldErrors) {
            if (resData.fieldErrors.name) {
                nameError.value = resData.fieldErrors.name
            }
            if (resData.fieldErrors.phone) {
                phoneErrorSignUp.value = resData.fieldErrors.phone
            }
            if (resData.fieldErrors.password) {
                passwordErrorSignUp.value = resData.fieldErrors.password
            }

        } else {
            alert(`Tạo tài khoản thất bại: ${resData.message}`)
        }
    }
    isSignUpLoading.value = false
}


onMounted(()=>{
    if(isLogin)
    getUserData()
})
</script>


<!-- STYLE  -->
<style scoped>

.demo-container {
    height: 60rem;
    max-height: 85vh;
    width: 100rem;
    max-width: 90vw;
}
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


.movein-enter-active {
    transition:  all 0.4s ease-in-out;
}

.movein-enter-from,
.movein-leave-to {
    opacity: 0;
    transform: translateX(10px);
}
</style>