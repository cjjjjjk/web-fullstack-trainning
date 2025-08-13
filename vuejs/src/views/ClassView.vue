  <template>
    <div class="demo-container grid gap-2 rounded-xl ">
      <div class="data-container rounded-sm px-4 py-6 grow flex flex-col bg-[var(--bg-card)]/90 backdrop-blur-md shadow-sm transition-all duration-300">
        <div class="flex w-full items-center mb-6">
          <h2 class="font-extrabold text-2xl text-[var(--text-main)] flex items-center gap-3">
            <span class="p-3 rounded-xl bg-[var(--bg-card-accent)]/60 tracking-tight">CLASSES</span>
            <div class="w-16 h-2 bg-[var(--accent-primary)] rounded-full"></div>
          </h2>
          <button 
            class="ml-auto btn rounded-xl bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] hover:bg-[var(--hover-button-primary)] transition-all duration-300 px-4 py-2 font-semibold flex items-center gap-2"
            @click="showModal = !showModal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New Class
          </button>
        </div>

        <div class="overflow-x-auto rounded-xl border-[1.5px] border-[var(--border-table)] bg-[var(--bg-table)]/30">
          <table class="table w-full">
            <thead>
              <tr class="text-[var(--text-main)] bg-[var(--bg-card-accent)]/50">
                <th class="w-[4rem] font-semibold">#</th>
                <th class="font-semibold">Code</th>
                <th class="font-semibold">Name</th>
                <th class="font-semibold">Students</th>
                <th class="font-semibold text-center">Actions</th>
              </tr>
            </thead>

            <TransitionGroup name="list">
            <tbody v-if="isLoading">
              <tr  class="fade">
                <td colspan="5" class="text-center py-30 text-[var(--text-loading)]">
                  <span class="loading loading-bars loading-xl text-[var(--text-loading)]"></span>
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="!classList.length">
              <tr  class="text-[var(--text-subtle)]">
                <td colspan="5" class="text-center py-12 font-medium">No results found</td>
              </tr>
            </tbody>
            <tbody 
              v-else
            >

              <tr 
                v-for="(clas, index) in classList" 
                :key="clas.code"  
                class="hover:bg-[var(--bg-table-hover)] transition-all duration-200"
                @click="showModalHandle(clas)"
              >
                <td class="text-[var(--text-secondary)]">{{ index + 1 }}</td>
                <td class="font-semibold text-[var(--text-main)]">
                  <span class="p-2 rounded-lg bg-[var(--bg-card-accent)]/50">{{ clas.code }}</span>
                </td>
                <td class="font-semibold text-[var(--text-main)]">
                  <span class="p-2 rounded-lg bg-[var(--bg-card-accent)]/50">{{ clas.name }}</span>
                </td>
                <td class="text-[var(--text-secondary)]">
                  <div class="flex items-center gap-2 whitespace-nowrap">
                    <span class="text-sm font-medium text-[var(--text-main)]">
                      {{ clas.totalStudent ?? 0 }} / {{ appConfigREf?.maximumClassNumber || 'N/A' }}
                    </span>
                    <progress 
                      class="progress progress-info w-[10rem]" 
                      :value="((clas.totalStudent ?? 0) / (appConfigREf?.maximumClassNumber || 1)) * 100" 
                      max="100">
                    </progress>
                  </div>
                </td>
                <td class="p-0">
                  <div class="flex justify-center items-center w-full h-full">
                    <button
                      @click.stop="(event) => handleNavigate(event, clas)"
                      class="p-2 rounded-lg hover:bg-[var(--hover-button-secondary)] text-[var(--accent-secondary)] hover:text-[var(--text-button-primary)] transition-all duration-200 tooltip"
                      data-tip="View Students"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
            Total: {{ pageInfor.totalClass }}
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

            <span class="px-4 py-2 text-sm text-[var(--text-button-secondary)] rounded-lg font-semibold flex items-center gap-2">
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
        <div tag="div" name="chart" class="min-h-90 flex flex-row justify-between">
          <canvas id="studentsChart" class="max-h-[100%] max-w-[65%]"></canvas>
          <canvas id="studentsChart2"></canvas>
        </div>
      </div>
      <div class="h-12 bg-[var(--bg-card)]/90 rounded-t-sm shadow-sm">
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
  import { onMounted, reactive, ref, watch, nextTick } from 'vue';
  import { PaginationConfig, SortConfig } from '../services/studentService';
  import { ClassEntity, filterClasses,getAllClassesSortedByTotalStudent } from '../services/classService';
  import ClassModal from '../components/ClassModal.vue';
  import { useRouter } from 'vue-router';
  import RedirectModal from '../components/RedirectModal.vue';
  import { AppConfig, onGetAppConfig } from '../services/demoNestAPI';

  // virsualization
  import { Chart, registerables } from 'chart.js'
  Chart.register(...registerables)

  const chartInstance = ref<Chart | null>(null)
  const chartInstance2 = ref<Chart | null>(null)

    // data
  const allClass = ref<any[]>([])


  const updateChart = () => {
    const ctx = (document.getElementById('studentsChart') as HTMLCanvasElement)?.getContext('2d');
    if (!ctx) return;

    if (chartInstance.value) {
      chartInstance.value.destroy();
    }

    const sortedList = [...allClass.value].sort(
      (a, b) => (b.totalStudent || 0) - (a.totalStudent || 0)
    );

    chartInstance.value = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedList.map(clas => clas.name || clas.code || 'Unknown'),
        datasets: [{
          label: 'Number of Students',
          data: sortedList.map(clas => clas.totalStudent || 0),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Students' },
            ticks: { stepSize: 1 }
          }
        },
        plugins: {
          legend: { display: true, position: 'top' }
        }
      }
    });
  };

  const updateChart2 = () => {
    const ctx = (document.getElementById('studentsChart2') as HTMLCanvasElement)?.getContext('2d');
    if (!ctx) return;

    if (chartInstance2.value) {
      chartInstance2.value.destroy();
    }

    const sortedList = [...allClass.value].sort(
      (a, b) => (b.totalStudent || 0) - (a.totalStudent || 0)
    );

    chartInstance2.value = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: sortedList.map(clas => clas.name || clas.code || 'Unknown'),
        datasets: [{
          label: 'Number of Students',
          data: sortedList.map(clas => clas.totalStudent || 0),
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)'
          ],
          borderColor: 'white',
          borderWidth: 2
        }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: { boxWidth: 12, padding: 8 }
          }
        }
      }
    });
  };

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
  const appConfigREf = ref<AppConfig| null>(null)

  const getDataConfig = async function () {
    return await onGetAppConfig() as AppConfig
  }

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
          }, 700)
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
  onMounted(async ()=> {
    const appConfig: AppConfig | null = await getDataConfig()  
    appConfigREf.value = appConfig

    getClassListByFilter()

    const res = await getAllClassesSortedByTotalStudent()
    allClass.value = res.classes ?? []
    setTimeout(() => {
      updateChart();
      updateChart2()
    }, 1000);
  })
  </script>


<style scoped>
  #studentsChart2 {
    width: 30%;
    min-width: 360px;
    aspect-ratio: 1 !important;
  }

  .demo-container {
      width: 100rem;
      max-width: 90vw;
  }

  .list-leave-active{
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