<template>
  <div class="fixed inset-0 bg-gray-500/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg w-[40rem] p-8 relative top-[-10rem]">
      <h2 class="text-xl font-bold mb-6">
        {{ type === 'add' ? 'New Student' : 'Edit Student' }}
      </h2>

      <form @submit.prevent="submitForm" class="space-y-4 text-gray-700">

        <div>
          <label class="block font-medium mb-1">MSSV</label>
          <input 
            v-model="form.mssv" 
            type="text" 
            class="w-full border border-gray-300 rounded-xl px-3 py-2 disabled:bg-gray-200/80"  
            @input="validatemssv"
            :disabled="type == 'edit'"/>
            <span class="text-red-500">{{ fieldsErrMes.mssv }}</span>
        </div>

        <div>
          <label class="block font-medium mb-1">Name</label>
          <input v-model="form.name" type="text" class="w-full border border-gray-300 rounded-xl px-3 py-2" @input="validateName"/>
          <span class="text-red-500">{{ fieldsErrMes.name }}</span>
        </div>

        <div>
          <label class="block font-medium mb-1">Address</label>
          <input v-model="form.address" type="text" class="w-full border border-gray-300 rounded-xl px-3 py-2" />
        </div>

        <div>
          <label class="block font-medium mb-1">Email</label>
          <input v-model="form.email" type="email" class="w-full border border-gray-300 rounded-xl px-3 py-2" @input="validateEmail"/>
          <span class="text-red-500">{{ fieldsErrMes.email }}</span>
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <button
            v-if="type==='edit'"
            class="me-auto px-4 py-2 font-bold hover:cursor-pointer bg-red-500/80 rounded-xl hover:bg-gray-400 text-white"
            @click="handleDelete"
          >
            Delete
          </button>
          <button type="button" @click="emitClose" class="px-4 py-2 font-bold hover:cursor-pointer bg-gray-300 rounded-xl hover:bg-gray-400">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 font-bold hover:cursor-pointer bg-[#34699A]/80 text-white rounded-xl hover:bg-[#34699A] disabled:bg-gray-400"
            :disabled="!canSubmit"
          >
            {{ type === 'add' ? 'Create' : 'Save' }}
          </button>
        </div>
      </form>

      <button
        @click="emitClose"
        class="absolute top-4 right-4 text-gray-500 font-bold text-2xl hover:text-red-500 hover:cursor-pointer"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { createStudent, deleteStudent, StudentEntity, updateStudent } from '../services/studentService'


const props = defineProps<{
  type: 'add' | 'edit'
  data?: StudentEntity
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', value: StudentEntity): void
}>()

const emitClose = () => emit('close')

const form = reactive<StudentEntity>({
  name: props.data?.name ?? '',
  mssv: props.data?.mssv ?? '',
  address: props.data?.address ?? '',
  email: props.data?.email ?? '',
})

// validations
const canSubmit = computed<boolean>(() => {
  const hasError = Object.values(fieldsErrMes).some(mes => mes.trim() !== '');
  const isEmptyForm = Object.values(form).every(val => val.trim() === '');

  return !hasError && !isEmptyForm;
});

const fieldsErrMes = reactive<StudentEntity>({
  name: "", 
  mssv: "",
  address: "",
  email: ""
})
const validateName = ()=>{
  if(!form.name) {
    fieldsErrMes.name = "name required !"
    return
  }
  fieldsErrMes.name = ''
}
const validatemssv = ()=>{
  if(!form.mssv) {
    fieldsErrMes.mssv = "mssv required !"
    return
  }
  fieldsErrMes.mssv = ''
}
const validateEmail = ()=>{
  if(!form.email) {
    fieldsErrMes.email = "email required !"
    return
  }
  // mail rex
  const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  if(!regexp.test(form.email)){
    fieldsErrMes.email = "invalid format !"
    return
  }
  fieldsErrMes.email = ''
}

const handleDelete = async ()=>{
  try {
    const res = await deleteStudent(form.mssv)
    console.log(res)
    if(res.data.isSuccess == true) {
      emitClose()
    }
  } catch(err:any) {
    console.log(err)
  }
}

const handleSave =async function () {
    if(props.type == 'edit'){
    // edit student
        try {
            const res = await updateStudent(form.mssv, form)
            if(res.isSuccess == true) {
                // getStudents()
                    emit('save', { ...form })
                emitClose()
            } else {
                const fieldErrors: ('mssv' | 'name' | 'address' | 'email')[] = res.errors
                fieldErrors.forEach(element => {
                  fieldsErrMes[element] = res[element]
                });
            }
        } catch(err: any){
            console.log(err)
        }
    } else {
    // add student
        try {
            const res = await createStudent(form)
            
            if(res.isSuccess == true) {
                // getStudents()
                    emit('save', { ...form })
    emitClose()
            } else 
            {
                const fieldErrors: ('mssv' | 'name' | 'address' | 'email')[] = res.errors

                fieldErrors.forEach(element => {
                  fieldsErrMes[element] = res[element]
                });
            }
        } catch(err: any){
            console.log(err)
        }
    }
}


const submitForm = () => {
  validateEmail()
  validateName()
  validatemssv()
  
  if(canSubmit.value){
    handleSave()
  }
}


</script>
