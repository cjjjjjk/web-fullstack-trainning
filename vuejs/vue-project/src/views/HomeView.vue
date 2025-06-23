<script lang="ts">
export default {
  data() {
    return {
      myValue: '',
      myicons: ["😕", "🫤", "👌", "😑", "😊"],
      clickedIcon: "",
      myStudents: [
        { name: "Ho Van Hai", mssv: "ABC123123" },
        { name: "Nguyen Van A", mssv: "SV001" },
        { name: "Tran Thi B", mssv: "SV002" },
        { name: "Le Van C", mssv: "SV003" },
        { name: "Pham Thi D", mssv: "SV004" },
        { name: "Do Van E", mssv: "SV005" },
        { name: "Bui Thi F", mssv: "SV006" },
        { name: "Nguyen Van G", mssv: "SV007" },
        { name: "Tran Thi H", mssv: "SV008" },
        { name: "Le Van I", mssv: "SV009" }
      ]
    }
  },
  computed: {
    numberValue() {
      return Number(this.myValue);
    }
  },
  methods: {
    handleIconClick(icon: string) {
      setTimeout(() => {
        this.clickedIcon = ""
      }, 3000);
      return this.clickedIcon = icon;
    }
  }
}
</script>

<template>
  <main class="flex flex-row">
    <div class="fixed top-12" v-if="clickedIcon != ''">{{ `You just clicked: ${clickedIcon}` }}</div>
    <div class="p-4 bg-gray-50 border border-gray-100 flex flex-col gap-4">
      <div>
        <span class="hover:cursor-pointer hover:text-2xl transition-all duration-300" v-for="(icon, index) in myicons"
          v-on:click="handleIconClick(icon)">{{ icon
          }}</span>
      </div>
      <span :class="myclass"> {{ myValue ? `${myValue} tuổi lận 😕` : "This is home content!" }}</span>

      <span v-if="numberValue > 150">Không có người nào lớn hơn 1000 tuổi</span>
      <span v-else-if="numberValue > 50">Hơn 50 tuổi, chào bác</span>
      <span v-else-if="myValue !== ''">Chào a bạn</span>

      <input v-model="myValue" class="px-3 p-2 border border-gray-300" type="number"
        placeholder="Bạn bao nhiêu tuổi ?" />
    </div>
    <div>
      <label for="">Danh sách học sinh: </label>
      <div class="flex flex-col gap-3" :key="index">
        <div v-for="(student, index) in myStudents" :key="index" class="flex flex-col gap-3">
          <template v-if="index < 5">
            <span class="bg-gray-100 rounded-2xl font-bold">{{ student.name }}</span>
            <span>{{ student.mssv }}</span>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>
