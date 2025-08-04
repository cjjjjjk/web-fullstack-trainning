<template>
    <div class="demo-container flex gap-2 rounded-xl">

    <div class=" rounded-xl px-2 grow flex flex-col">
      <h2 class="font-bold mb-4 flex w-full items-center text-lg">
        CLASSES
        <button class="ml-auto btn btn-soft btn-primary rounded-xl"
          @click="showModal = !showModal"
        >
          New Class
        </button>
      </h2>

      <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ">
        <table class="table bg-base-200/40">
          <thead >
            <tr>
                <td class="w-[4rem]">#</td>
                <td>Code</td>
                <td>Name</td>
                <td>Students</td>
                <td>Actions</td>
            </tr>
          </thead>
          
          <TransitionGroup name="list" tag="tbody">
              <Transition v-if="isLoading" tag="tr" name="fade">
                <td colspan="6" class="text-center py-30">
                  <span class="loading loading-bars loading-xl"></span>
                </td>
              </Transition>
              <tr v-else-if="!classList.length">
                <td colspan="6" class="text-center py-30">
                  No results
                </td>
              </tr>
              <tr 
                v-else
                v-for="(clas,index) in classList" 
                @click="showModalHandle(clas)"
                :key="clas.code"  
                class="hover:bg-base-300"
              > 
                <td>{{ index + 1 }}</td>
                <td>{{ clas.code }}</td>
                <td>{{ clas.name }}</td>
                <td>{{ clas.totalStudent }}</td>
                <td class="tooltip text-center" data-tip="view students" @click="(event)=> {handleNavigate(event, clas)}">
                  <IconNavigate class="hover:cursor-pointer" />
                </td>
              </tr>
          </TransitionGroup>
        </table>
      </div>
      <div class="w-full flex justify-between items-center gap-2 mt-1">
        <span class="text-[#212121] font-medium">
          Total: {{ pageInfor.totalClass }}
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
  <RedirectModal v-if="isShowLoginDirectModal"/>
  <ClassModal
    v-if="showModal"
    :type="editMode ? 'edit' : 'add'"
    :data="editMode ? selectedClass : undefined"
    @save="handleSave"
    @close="handleClose"
  />
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { PaginationConfig, SortConfig } from '../services/studentService';
import { ClassEntity, filterClasses } from '../services/classService';
import ClassModal from '../components/ClassModal.vue';
import IconNavigate from '../components/IconNavigate.vue';
import { useRouter } from 'vue-router';
import RedirectModal from '../components/RedirectModal.vue';

// ui control
const isLoading = ref<boolean>(false)
const showModal = ref<boolean>(false)
const isShowLoginDirectModal = ref<boolean>(false)
// modal
const editMode = ref<boolean>(false)
const selectedClass = ref<ClassEntity|undefined>(undefined)
// filter
const filter = reactive<Partial<ClassEntity>>({})
    
// sort config
const sortOption = reactive<SortConfig>({sortField: 'name', sortType: 'asc'})
const setSortField = (field: 'name'| 'address' | 'mssv' | 'email') => {
  if(field !== sortOption.sortField) {
    sortOption.sortField = field
    sortOption.sortType = 'asc'
  } else
  sortOption.sortField = field
}
const setSortType = (type: 'asc' | 'desc' ) =>{
  sortOption.sortType = type
}
// Paginations
const pagination = reactive<PaginationConfig>({
    page: 1,
    limit: 10,
})
const pageInfor = reactive({
  totalClass: 0,
  totalPage: 1
})

const onLimitChange=()=>{
  pagination.page = 1
  getClassListByFilter()
}

// data
const classList = ref<ClassEntity[]>([])

// data handler
const getClassListByFilter = async function() {
    isLoading.value = true
    try {       
        const res = await filterClasses(filter, pagination,sortOption);
        
        if(res.isSuccess) {
            classList.value = res.classes
            pageInfor.totalClass = res.pagination.totalClass
            pageInfor.totalPage = res.pagination.totalPage
        } else {
          isShowLoginDirectModal.value = true
        }
    } catch(error: any) {

    } finally {
        setTimeout(()=>{
          isLoading.value = false
        }, 300)
    }
}
const router = useRouter()

const handleNavigate = (event: any, clas: ClassEntity)=> {
  event.stopPropagation()
  router.push({
    path: '/students',
    query: { class: clas.code }
  })
}

// modal call
const handleClose = ()=>{
  editMode.value = false
  selectedClass.value = undefined
  showModal.value = false
  getClassListByFilter()
}
const handleSave = async (value: ClassEntity)=> {
  console.log(value)
}
const showModalHandle = (classSelected : ClassEntity) => {
  selectedClass.value = classSelected
  showModal.value = true
  editMode.value = true
}
watch(pagination, () => {
  getClassListByFilter();
}, { deep: true });

// Mount
onMounted(()=> {
    getClassListByFilter()
})

</script>

<style>
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