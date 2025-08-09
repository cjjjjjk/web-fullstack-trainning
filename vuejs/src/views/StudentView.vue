<template>
  <div class="demo-container self-start  flex gap-2 rounded-xl">
    <div class="p-4 h-full pb-6 flex flex-col bg-[var(--bg-card)] rounded-sm shadow-sm w-80 transition-all duration-300">
      <div class="flex items-center justify-between mb-5 mt-5">
        <div class="w-12 h-2 bg-[var(--accent-primary)] rounded-full"></div>
      </div>
      <form @submit.prevent="handleFilter" class="flex flex-col gap-5">
        <div class="relative">
          <label for="student-filter-name" class="block text-sm font-semibold text-[var(--text-label)] mb-1.5">Name</label>
          <div class="relative">
            <input 
              id="student-filter-name" 
              type="text" 
              v-model="filter.name" 
              placeholder="Enter name" 
              class="w-full pl-10 pr-4 py-2 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] transition-all duration-200"
            />
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div class="relative">
          <label for="student-filter-mssv" class="block text-sm font-semibold text-[var(--text-label)] mb-1.5">MSSV</label>
          <input 
            id="student-filter-mssv" 
            type="text" 
            v-model="filter.mssv" 
            placeholder="Enter MSSV" 
            class="w-full pl-4 pr-4 py-2 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] transition-all duration-200"
          />
        </div>
        <div class="relative">
          <label for="student-filter-class" class="block text-sm font-semibold text-[var(--text-label)] mb-1.5">Class</label>
          <select 
            id="student-filter-class" 
            v-model="filter.class"
            class="w-full pl-4 pr-8 py-2 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:rin g-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] appearance-none transition-all duration-200"
          >
            <option :value="undefined" class="text-[var(--text-button-secondary)]">-- All Classes --</option>
            <option 
              v-for="cls in allClasses" 
              :key="cls.code" 
              :value="cls"
              class="text-[var(--text-button-secondary)]"
            >
              {{ cls.name }}
            </option>
          </select>
          <svg class="absolute right-3 top-10 w-5 h-5 text-[var(--text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <div class="relative">
          <label for="student-filter-address" class="block text-sm font-semibold text-[var(--text-label)] mb-1.5">Address</label>
          <input 
            id="student-filter-address" 
            type="text" 
            v-model="filter.address" 
            placeholder="Enter address" 
            class="w-full pl-4 pr-4 py-2 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] transition-all duration-200"
          />
        </div>
        <div class="relative">
          <label for="student-filter-email" class="block text-sm font-semibold text-[var(--text-label)] mb-1.5">Email</label>
          <input 
            id="student-filter-email" 
            type="text" 
            v-model="filter.email" 
            placeholder="Enter email" 
            class="w-full pl-4 pr-4 py-2 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] transition-all duration-200"
          />
        </div>
        <span class="text-[var(--text-subtle)] italic text-sm">{{ filterRsMes }}</span>
        <div class="flex justify-end items-center gap-4 mt-4">
          <button 
            class="px-4 py-2 rounded-xl border-[1.5px] border-[var(--border-button)] text-[var(--text-button-secondary)] hover:bg-[var(--hover-button-secondary)] hover:text-[var(--text-button-primary)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
            type="button" 
            @click="clearFilter"
          >Clear</button>
          <button 
            class="px-4 py-2 rounded-xl bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] hover:bg-[var(--hover-button-primary)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
            type="submit"
          >Apply</button>
        </div>
      </form>
    </div>

    <div class="data-container h-[100%] rounded-sm px-4 py-6 grow flex flex-col bg-[var(--bg-card)]/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div class="flex w-full items-center mb-6">
        <h2 class="font-extrabold text-2xl text-[var(--text-main)] flex items-center gap-3">
          <span class="p-3 rounded-xl bg-[var(--bg-card-accent)]/60 tracking-tight">{{ title }}</span>
        </h2>
        <button 
          class="ml-auto btn rounded-xl bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] hover:bg-[var(--hover-button-primary)] transition-all duration-300 px-4 py-2 font-semibold flex items-center gap-2"
          @click="handleAddNewStudent"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          New Student
        </button>
      </div>

      <div class="overflow-x-auto rounded-xl border-[1.5px] border-[var(--border-table)] bg-[var(--bg-table)]/30">
        <table class="table w-full">
          <thead>
            <tr class="text-[var(--text-main)] bg-[var(--bg-card-accent)]/50">
              <th class="w-12"></th>
              <th class="w-[12rem]">
                <div class="flex items-center gap-2 font-semibold">
                  <label v-if="sortOption.sortField == 'name'" class="swap swap-flip text-md cursor-pointer">
                    <input type="checkbox" />
                    <div class="swap-off text-[var(--accent-primary)]" @click="setSortType('desc')">▲</div>
                    <div class="swap-on text-[var(--accent-primary)]" @click="setSortType('asc')">▼</div>
                  </label>
                  <span class="hover:cursor-pointer hover:text-[var(--accent-primary)] transition duration-200" @click="setSortField('name')">Name</span>
                </div>
              </th>
              <th class="w-[4rem]">
                <div class="flex items-center gap-2 font-semibold">
                  <label v-if="sortOption.sortField == 'mssv'" class="swap swap-flip text-md cursor-pointer">
                    <input type="checkbox" />
                    <div class="swap-off text-[var(--accent-primary)]" @click="setSortType('desc')">▲</div>
                    <div class="swap-on text-[var(--accent-primary)]" @click="setSortType('asc')">▼</div>
                  </label>
                  <span class="hover:cursor-pointer hover:text-[var(--accent-primary)] transition duration-200" @click="setSortField('mssv')">MSSV</span>
                </div>
              </th>
              <th class="w-[10rem] font-semibold">Class</th>
              <th class="w-[8rem]">
                <div class="flex items-center gap-2 font-semibold">
                  <label v-if="sortOption.sortField == 'address'" class="swap swap-flip text-md cursor-pointer">
                    <input type="checkbox" />
                    <div class="swap-off text-[var(--accent-primary)]" @click="setSortType('desc')">▲</div>
                    <div class="swap-on text-[var(--accent-primary)]" @click="setSortType('asc')">▼</div>
                  </label>
                  <span class="hover:cursor-pointer hover:text-[var(--accent-primary)] transition duration-200" @click="setSortField('address')">Address</span>
                </div>
              </th>
              <th class="w-[8rem]">
                <div class="flex items-center gap-2 font-semibold">
                  <label v-if="sortOption.sortField == 'email'" class="swap swap-flip text-md cursor-pointer">
                    <input type="checkbox" />
                    <div class="swap-off text-[var(--accent-primary)]" @click="setSortType('desc')">▲</div>
                    <div class="swap-on text-[var(--accent-primary)]" @click="setSortType('asc')">▼</div>
                  </label>
                  <span class="hover:cursor-pointer hover:text-[var(--accent-primary)] transition duration-200" @click="setSortField('email')">Email</span>
                </div>
              </th>
              <th class="w-[5rem] font-semibold">Action</th>
            </tr>
          </thead>

          <TransitionGroup name="list"
          >
            <tbody v-if="isLoading">
                <tr  class="fade">
                <td colspan="7" class="text-center py-12 text-[var(--text-loading)]">
                  <span class="loading loading-bars loading-xl text-[var(--text-loading)]"></span>
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="!studentList.length">
                <tr  class="text-[var(--text-subtle)]">
                <td colspan="7" class="text-center py-12 font-medium">No results found</td>
              </tr>
            </tbody>
            <tbody 
              v-else
            >
              
            <tr 
              v-for="(student, index) in studentList" 
              :key="student.mssv"  
              class="hover:bg-[var(--bg-table-hover)] transition-all duration-200"
            >
              <td class="text-[var(--text-secondary)]">{{ ((pagination.page - 1) * pagination.limit) + index + 1 }}</td>
              <td class="font-semibold text-[var(--text-main)]">
                <span class="p-2 rounded-lg bg-[var(--bg-card-accent)]/50">{{ student.name }}</span>
              </td>
              <td class="text-[var(--text-main)]">
                <span class="p-2 rounded-lg bg-[var(--bg-card-accent)]/50">{{ student.mssv }}</span>
              </td>
              <td class="hover:cursor-pointer text-[var(--text-main)] hover:text-[var(--accent-primary)] hover:underline transition duration-200" 
                @click="filterByClass(student.class)"
              >
                {{ student.class?.name ?? 'N/A' }}
              </td>
              <td class="text-[var(--text-secondary)]">{{ student.address }}</td>
              <td class="text-[var(--text-secondary)]">{{ student.email }}</td>
              <td class="p-0">
                <div class="ms-3 h-full">
                  <button
                    @click="handleEditStudent(student)" 
                    class="p-2 rounded-lg hover:bg-[var(--hover-button-secondary)] text-[var(--accent-secondary)] hover:text-[var(--text-button-primary)] transition-all duration-200"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
            </tbody>

          </TransitionGroup>
        </table>
      </div>
      <div class="w-full flex justify-between items-center gap-4 mt-1 bg-[var(--bg-card)]/90 backdrop-blur-md p-4 transition-all duration-300">
        <span class="text-[var(--text-secondary)] font-semibold text-sm flex items-center gap-2">
          <svg class="w-5 h-5 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Total: {{ pageInfor.totalStudent }}
        </span>

        <div class="flex items-center gap-3">
          <!-- Select + icon dropdown -->
          <div class="relative">
            <select
              id="limit-select"
              v-model="pagination.limit"
              @change="onLimitChange"
              class="px-3 py-2 pr-10 rounded-lg border-[1.5px] border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--text-button-secondary)] focus:ring-2 focus:ring-[var(--input-focus)] focus:border-[var(--input-focus)] transition-all duration-200 text-sm appearance-none w-full"
            >
              <option :value="10">10</option>
              <option :value="15">15</option>
              <option :value="20">20</option>
            </select>
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-subtle)] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- Prev button -->
          <button
            class="p-2 rounded-lg bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] hover:bg-[var(--hover-button-primary)] transition-all duration-300 disabled:bg-[var(--bg-button-secondary)] disabled:text-[var(--text-subtle)] disabled:cursor-not-allowed"
            :disabled="pagination.page <= 1"
            @click="pagination.page--"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <span class="px-4 py-2 text-sm rounded-lg text-[var(--text-button-secondary)] font-semibold flex items-center gap-2">
            {{ pagination.page }} / {{ pageInfor.totalPage }}
          </span>

          <!-- Next button -->
          <button
            class="p-2 rounded-lg bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] hover:bg-[var(--hover-button-primary)] transition-all duration-300 disabled:bg-[var(--bg-button-secondary)] disabled:text-[var(--text-subtle)] disabled:cursor-not-allowed"
            :disabled="pagination.page >= pageInfor.totalPage"
            @click="pagination.page++"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
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
  <RedirectModal v-if="isShowLoginDirectModal" />
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, watch} from 'vue';
import {filterStudents, PaginationConfig, SortConfig, StudentEntity } from '../services/studentService';
import StudentModal from '../components/StudentModal.vue';
import RedirectModal from '../components/RedirectModal.vue';
import { ClassEntity, getAllClassAPI } from '../services/classService';
import { useRoute, useRouter } from 'vue-router';
const studentList = ref<StudentEntity[]>([]);

const isLoading = ref<boolean>(false)
// route
const route = useRoute();
const classCode = route.query.class; 

// ui config
const title = ref<string>('STUDENTS')

// datas
const allClasses = ref<ClassEntity[]>([])

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
const filter = ref<Partial<StudentEntity>>({});

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

const filterByClass = async (classSelected : ClassEntity |null )=> {
    pagination.value.page = 1
    sortOption.sortField = 'name',
    sortOption.sortType = 'asc'

    filter.value.class = classSelected

    await handleFilter()
}

const clearFilter = ()=>{
  title.value = 'STUDENTS'
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
        }
        if(result.isSuccess === false) {
           isShowLoginDirectModal.value = true
        }
    } catch (error) {
        console.error('Filter error:', error);
    } finally {
        setTimeout(()=>{
          isLoading.value = false
          }, 800)
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
const getAllClasses = async ()=> {
  const res = await getAllClassAPI()
  if(res.isSuccess) {
    allClasses.value = res.classes ?? [];
  }
}
// all students, classes
onMounted(async ()=>{
    await getAllClasses()
    if(classCode) {
      const selectedClass = allClasses.value.find(
        (c) => {
          title.value = `STUDENTS IN CLASS: ${c.name.toUpperCase()}`
          return c.code === classCode
        }
      );
      if(selectedClass){
        filter.value.class = selectedClass
        filterByClass(selectedClass)
      }
    } else {
      getStudents()
    }
})
</script>

<style lang="css" scoped>
.demo-container {
    height: 60rem;
    max-height: 85vh;
    width: 100rem;
    max-width: 90vw;
}
.list-leave-active {
  position: absolute;
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