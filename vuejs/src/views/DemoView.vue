<template>
  <div class="demo-container flex gap-2 bg-base-300/40 p-4 rounded-xl">
   <div class="p-6 flex flex-col bg-white rounded-xl shadow-sm w-72">
    <span class="font-bold text-lg text-[#212121] mb-4">Filter</span>
    <form @submit.prevent="handleFilter" class="flex flex-col gap-4">
      <div class="mb-2">
        <label for="student-filter-name" class="block text-sm font-medium text-[#212121] mb-1">Name</label>
        <input 
          id="student-filter-name" 
          type="text" 
          v-model="filter.name" 
          placeholder=" name" 
          class="input" 
        />
      </div>
      <div class="mb-2">
        <label for="student-filter-mssv" class="block text-sm font-medium text-[#212121] mb-1">MSSV</label>
        <input 
          id="student-filter-mssv" 
          type="text" 
          v-model="filter.mssv" 
          placeholder=" MSSV" 
          class="input" 
        />
      </div>
      <div class="mb-2">
        <label for="student-filter-address" class="block text-sm font-medium text-[#212121] mb-1">Address</label>
        <input 
          id="student-filter-address" 
          type="text" 
          v-model="filter.address" 
          placeholder=" address" 
          class="input" 
        />
      </div>
      <div>
        <label for="student-filter-email" class="block text-sm font-medium text-[#212121] mb-1">Email</label>
        <input 
          id="student-filter-email" 
          type="text" 
          v-model="filter.email" 
          placeholder=" email" 
          class="input" 
        />
      </div>

      <span class="text-[#212121]/60 italic text-sm">{{ filterRsMes }}</span>
      <div class="flex justify-end items-center gap-3 mt-2">
        <button 
          class="btn btn-outline btn-primary rounded-xl disabled:opacity-50 disabled:cursor-not-allowed" 
          type="button" 
          @click="clearFilter"
        >Clear</button>
        <button 
          class="btn btn-primary rounded-xl disabled:opacity-50 disabled:cursor-not-allowed" 
          type="submit" 
        >GO</button>

      </div>
    </form>
  </div>

<div class="bg-base-100 rounded-xl p-4 grow flex flex-col">
  <h2 class="font-bold mb-4 flex w-full items-center text-lg">
    STUDENTS
    <button class="ml-auto btn btn-soft btn-primary rounded-xl"
        @click="handleAddNewStudent"
    >
      New Student
    </button>
  </h2>

  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
    <thead >
    <tr>
          <th></th>
      <th>
        <div class="flex items-center gap-2 w-[8rem]">
          <label
            v-if="sortOption.sortField == 'name'" 
            class="swap swap-flip text-md" >
            <input type="checkbox" />
            <div class="swap-off" @click="setSortType('desc')">▲</div>
            <div class="swap-on" @click="setSortType('asc')">▼</div>
          </label>
          <span class="hover:cursor-pointer hover:text-black" @click="setSortField('name')">Name</span>
        </div>
      </th>
      <th>
        <div class="flex items-center gap-2 w-[6rem]">
          <label 
            v-if="sortOption.sortField == 'mssv'" 
            class="swap swap-flip text-md">
            <input type="checkbox" />
            <div class="swap-off" @click="setSortType('desc')">▲</div>
            <div class="swap-on" @click="setSortType('asc')">▼</div>
          </label>
          <span class="hover:cursor-pointer hover:text-black" @click="setSortField('mssv')">MSSV</span>
        </div>
      </th>
      <th>
        <div class="flex items-center gap-2  w-[8rem]">
          <label 
            v-if="sortOption.sortField == 'address'" 
            class="swap swap-flip text-md">
            <input type="checkbox" />
            <div class="swap-off" @click="setSortType('desc')">▲</div>
            <div class="swap-on" @click="setSortType('asc')">▼</div>
          </label>
          <span class="hover:cursor-pointer hover:text-black" @click="setSortField('address')">Address</span>
        </div>
      </th>
      <th>
        <div class="flex items-center gap-2 w-[8rem]">
          <label 
            v-if="sortOption.sortField == 'email'" 
            class="swap swap-flip text-md">
            <input type="checkbox" />
            <div class="swap-off" @click="setSortType('desc')">▲</div>
            <div class="swap-on" @click="setSortType('asc')">▼</div>
          </label>
          <span class="hover:cursor-pointer hover:text-black" @click="setSortField('email')">Email</span>
        </div>
      </th>
      <th>Action
      </th>
    </tr>
    </thead>
    
    <TransitionGroup name="list" tag="tbody">
        <Transition v-if="isLoading" tag="tr" name="fade">
          <td colspan="6" class="text-center py-30">
            <span class="loading loading-bars loading-xl"></span>
          </td>
        </Transition>
        <tr 
          v-else
          v-for="(student, index) in studentList" 
          :key="student.mssv"  
          class="hover:bg-base-300"
        >
          <td>{{ ((pagination.page - 1) * pagination.limit) + index + 1 }}</td>
          <td class="font-semibold">{{ student.name }}</td>
          <td>{{ student.mssv }}</td>
          <td>{{ student.address }}</td>
          <td>{{ student.email }}</td>
          <td>
            <IconAction
                @click="handleEditStudent(student)" 
                class="hover:cursor-pointer"
            />
          </td>
        </tr>
    </TransitionGroup>

    </table>
  </div>
  <div class="w-full flex justify-between items-center gap-2 mt-1">
  <span class="text-[#212121] font-medium">
    Total: {{ pageInfor.totalStudent }}
  </span>

  <div class="flex items-center gap-2 mt-1">
    <select
      id="limit-select"
      v-model="pagination.limit"
      @change="onLimitChange"
      class="px-2 py-1 border rounded-xl text-sm border-none me-1"
    >
    <option :value="10">10</option>
    <option :value="15">15</option>
    <option :value="20">20</option>
    </select>
    <button
      class="px-3 py-1 text-primary-content bg-primary rounded-xl font-semibold hover:bg-base-content hover:cursor-pointer disabled:bg-gray-400/60 disabled:text-white   disabled:cursor-not-allowed"
      :disabled="pagination.page <= 1"
      @click="pagination.page--"
    >
      pre
    </button>

    <span class="px-3 py-1 text-sm text-[#212121] bg-primary-content rounded-xl font-bold">
      {{ pagination.page + "/" + pageInfor.totalPage }}
    </span>

    <button
      class="px-3 py-1 text-primary-content bg-primary rounded-xl font-semibold hover:bg-base-content hover:cursor-pointer disabled:bg-gray-400/60 disabled:text-white   disabled:cursor-not-allowed"
      :disabled="pagination.page >= pageInfor.totalPage"
      @click="pagination.page++"
    >
      next
    </button>
  </div>
</div>


</div>
</div>
<StudentModal
  v-if="showModal"
  :type="editMode ? 'edit' : 'add'"
  :data="editMode ? selectedStudent : undefined"
  @save="handleSave"
  @close="handleClose"
/>
<RedirectModal
  v-if="isShowLoginDirectModal"
/>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from 'vue';
import {filterStudents, PaginationConfig, SortConfig, StudentEntity } from '../services/studentService';
import StudentModal from '../components/StudentModal.vue';
import IconAction from '../components/IconAction.vue';
import RedirectModal from '../components/RedirectModal.vue';
const studentList = ref<StudentEntity[]>([]);

const isLoading = ref<boolean>(false)

// sort config
const sortOption = reactive<SortConfig>({sortField: 'name', sortType: 'asc'})
const setSortField = (field: 'name'| 'address' | 'mssv' | 'email') => {
  if(field !== sortOption.sortField) {
    sortOption.sortField = field
    sortOption.sortType = 'asc'
    getStudents()
  } else
  sortOption.sortField = field
}
const setSortType = (type: 'asc' | 'desc' ) =>{
  sortOption.sortType = type
  getStudents()
}
// Pagination
const pagination = ref<PaginationConfig>({
    page: 1,
    limit: 10,
})
const pageInfor = reactive({
  totalStudent: 0,
  totalPage: 1
})

watch(pagination, () => {
  getStudents();
}, { deep: true });
const onLimitChange=()=>{
  pagination.value.page = 1
}

// Filter 
const filter = ref<Partial<StudentEntity>>({name: '',mssv: '',address: '',email: ''});

const filterRsMes = ref<string>("")

const handleFilter = async () => {
  pagination.value.page = 1
  sortOption.sortField = 'name',
  sortOption.sortType = 'asc'
  try {
    filterRsMes.value = ""

    const result = await filterStudents(filter.value,pagination.value, sortOption);
    if (result.isSuccess) {
      studentList.value = result.data;
      filterRsMes.value = `found ${result.totalStudent} ${result.totalStudent > 1 ? 'students' :'student'}`
      pageInfor.totalPage = Math.ceil(result.totalStudent / pagination.value.limit)
      pageInfor.totalStudent = result.totalStudent
    }
  } catch (error) {
    console.error('Filter error:', error);
  }
};
const clearFilter = ()=>{
  filter.value = {}
  getStudents()
}

const isShowLoginDirectModal = ref<boolean>(false)

const getStudents = async ()=>{
  isLoading.value = true
    try {
        const result = await filterStudents(filter.value,pagination.value,sortOption);

        if (result.isSuccess === true) {
              studentList.value = result.data;
              pageInfor.totalPage = Math.ceil(result.totalStudent / pagination.value.limit)
              pageInfor.totalStudent = result.totalStudent
              setTimeout(()=>{
                isLoading.value = false
              }, 300)
        }
        if(result.isSuccess === false) {
           isShowLoginDirectModal.value = true
        }
    } catch (error) {
        console.error('Filter error:', error);
    }
}

// Modal
const showModal = ref<boolean>(false)
const editMode = ref<boolean>(true)
const selectedStudent = ref<StudentEntity|undefined>(undefined)
const handleClose = ()=>{
  showModal.value = false
  getStudents()
}
const handleSave = async (value: StudentEntity)=> {
  console.log(value)
}
const handleAddNewStudent = ()=>{
    editMode.value = false;
    selectedStudent.value = undefined
    showModal.value = true 
}
const handleEditStudent = (student: StudentEntity)=>{
    editMode.value = true;
    selectedStudent.value = student
    showModal.value = true 
}
// all students
onMounted(()=>{
    getStudents()
})
</script>

<style lang="css" scoped>
.demo-container {
    height: 60rem;
    max-height: 85vh;
    width: 90rem;
    max-width: 80vw;
}

.list-enter-active{
  transition: all 0.5s ease-in-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-enter-active{
  transition: all 0.1s ease-in-out;
}
.fade-leave-active {
  transition: all 0.4s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>