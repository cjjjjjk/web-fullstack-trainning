<template>
  <div class="fixed inset-0 bg-gray-500/30 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg w-[30rem] p-8 relative top-[-6rem]">
      <h2 class="text-xl font-bold mb-3">
        {{ type === 'add' ? 'New Class' : 'Edit Class' }}
      </h2>

      <form @submit.prevent="submitForm" class="space-y-4 text-gray-700">
        <div>
          <label class="block font-medium mb-1">Class Code</label>
          <input
            v-model="form.code"
            type="text"
            class="w-full border border-gray-300 rounded-xl px-3 py-2 disabled:bg-gray-200/80"
            :disabled="type === 'edit'"
            @input="validateCode"
          />
          <span class="text-red-500">{{ fieldErr.code }}</span>
        </div>

        <div>
          <label class="block font-medium mb-1">Class Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border border-gray-300 rounded-xl px-3 py-2"
            @input="validateName"
          />
          <span class="text-red-500">{{ fieldErr.name }}</span>
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <button class="btn btn-error rounded-xl me-auto text-white"
            v-if="type == 'edit'"
            @click="handleDelete(form.code)"
          >
            Delete
          </button>
          <button
            type="button"
            @click="emitClose"
            class="px-4 py-2 font-bold bg-gray-300 rounded-xl hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="!canSubmit"
            class="px-4 py-2 font-bold bg-[#34699A]/80 text-white rounded-xl hover:bg-[#34699A] disabled:bg-gray-400"
          >
            {{ type === 'add' ? 'Create' : 'Save' }}
          </button>
        </div>
      </form>

      <button
        @click="emitClose"
        class="absolute top-4 right-4 text-gray-500 font-bold text-2xl hover:text-red-500"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { ClassEntity, createClass, deleteClassByCode, updateClass } from '../services/classService';

const props = defineProps<{
  type: 'add' | 'edit',
  data?: { name: string, code: string, id: number }
}>()

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'save', value: {id: number, name: string, code: string }): void
}>()

const emitClose = () => emit('close')

const form = reactive<ClassEntity>({
  id: props.data?.id ?? 0,
  name: props.data?.name ?? '',
  code: props.data?.code ?? ''
})

const fieldErr = reactive({
  name: '',
  code: ''
})

const validateName = () => {
  if (!form.name.trim()) {
    fieldErr.name = 'Name is required'
  } else if (form.name.length > 20) {
    fieldErr.name = 'Name must be under20 characters'
  } else {
    fieldErr.name = ''
  }
}

const validateCode = () => {
  if (!form.code.trim()) {
    fieldErr.code = 'Code is required'
  } else if (form.code.length > 6) {
    fieldErr.code = 'Code must be under 6 characters'
  } else {
    fieldErr.code = ''
  }
}

const canSubmit = computed(() => {
  return !fieldErr.name && !fieldErr.code && form.name.trim() && form.code.trim()
})

const submitForm = async () => {
  validateName()
  validateCode()

  if (!canSubmit.value) return

  try {
    let res: any

    if (props.type === 'add') {
      res = await createClass(form)
      console.log(res)
    } else {
      res = await updateClass(form)
    }

    if (res.isSuccess) {
      emit('save', { ...form })
      emitClose()
    } else {
      const fieldErrors: ('name' | 'code')[] = res.errors
      fieldErrors.forEach(key => {
        fieldErr[key] = res[key]
      })
    }
  } catch (err: any) {
    console.error(err)
  }
}

const handleDelete= async (code: string) => {
  const res = await deleteClassByCode(code)
      if (res.isSuccess) {
      emit('save', { ...form })
      emitClose() }
      else {
        console.log('DELETE CLASS FALSE! ')
      }
}
</script>
