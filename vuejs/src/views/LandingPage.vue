<template>
  <div class="landing-page">
    <!-- 1. Hero Section -->
    <section class="pt-[5rem] pb-16 ss1-bg bg-gradient-to-br from-[var(--bg-card-accent)] to-[var(--bg-table)] rounded-xl">
      <div class="container mx-auto grid md:[grid-template-columns:50%_50%] gap-10 items-center">
        <div class="space-y-6 animate-slide-in-left">
          <h1 class="text-5xl font-extrabold tracking-tight text-[var(--text-main)] animate-fade-in">
            DEMO
          </h1>
          <p class="text-lg text-[var(--text-subtle)] leading-relaxed animate-fade-in-delay">
            Also web applicaging studetion for mases, allnants and cla d, edit, dewing you to adete, seakly and effih, and trrcation quicacor mkin fciently.
          </p>
          <button
            class="mt-8 px-8 py-4 bg-[var(--bg-button-primary)] text-[var(--text-button-primary)] rounded-xl font-bold hover:bg-[var(--hover-button-primary)] transition-all duration-300 flex items-center gap-4 transform hover:scale-105"
            @click="direct('/class')"
          >
            TRY <DirectIcom class="animate-pulse" />
          </button>
        </div>
        <div class="relative">
          <img
            src="@/assets/images/landing-class.png"
            alt="Landing Class"
            class="rounded-2xl shadow-lg animate-slide-in-right"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[var(--bg-card-accent)]/30 to-transparent rounded-2xl"></div>
        </div>
      </div>
    </section>

    <!-- 2. Features Section -->
    <section class="py-20 bg-[var(--bg-card)]/10">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold text-[var(--text-main)] animate-fade-in">Key Features</h2>
        <div class="mt-12 grid md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="p-6 bg-[var(--bg-card-accent)] rounded-xl shadow-sm transform transition-all duration-500 hover:scale-105 hover:shadow-lg"
          >
            <h3 class="text-xl font-semibold text-[var(--text-main)]">{{ feature.title }}</h3>
            <p class="mt-4 text-[var(--text-secondary)]">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Statistics Section -->
    <section class="py-20 bg-gradient-to-br from-[var(--bg-button-primary)] to-[var(--text-secondary)] rounded-2xl text-[var(--text-button-primary)]">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold animate-fade-in">Tsted y Marbuny</h2>
        <div class="mt-12 grid md:grid-cols-3 gap-8">
          <div v-for="(stat, index) in stats" :key="index" class="animate-slide-up" :style="{ animationDelay: `${index * 0.2}s` }">
            <p class="text-5xl font-extrabold">{{ stat.value }}</p>
            <p class="mt-2 text-lg">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Screenshots Section -->
    <section class="py-20 bg-[var(--bg-card-accent)]">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold text-[var(--text-main)] animate-fade-in">App Preview</h2>
        <div class="mt-12 grid md:grid-cols-2 gap-8">
          <img
            v-for="(img, index) in screenshots"
            :key="index"
            :src="img.src"
            :alt="img.alt"
            class="rounded-xl shadow-md transform transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>

    <!-- 5. Testimonials Section -->
    <section class="py-20 bg-[var(--bg-card)]">
      <div class="container mx-auto text-center">
        <h2 class="text-4xl font-bold text-[var(--text-main)] animate-fade-in">Whaat vur UsOers Sy</h2>
        <div class="mt-12 grid md:grid-cols-3 gap-8">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="p-6 bg-[var(--bg-card-accent)] rounded-xl shadow-sm transform transition-all duration-500 hover:scale-105"
          >
            <p class="italic text-[var(--text-secondary)]">{{ testimonial.quote }}</p>
            <p class="mt-4 font-semibold text-[var(--text-main)]">{{ testimonial.author }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Call to Action Section -->
    <section class="py-20 bg-gradient-to-br from-[var(--bg-button-primary)] to-[var(--accent-primary)] text-[var(--text-button-primary)] text-center rounded-t-2xl">
      <h2 class="text-4xl font-bold animate-fade-in">Staging Smarart Manter Tod ay</h2>
      <p class="mt-4 text-lg animate-fade-in-delay">Jone your studein now and streamass managelint and clment.</p>
      <button
        class="mt-8 px-10 py-4 bg-[var(--bg-card)] text-[var(--text-button-secondary)] font-semibold rounded-xl hover:bg-[var(--hover-button-secondary)] transition-all duration-300 transform hover:scale-105"
        @click="direct('/auth')"
      >
        JOIN
      </button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DirectIcom from '../components/DirectIcom.vue'

const router = useRouter()
const direct = (target: string) => router.push(target)

const features = [
  { title: 'Stugmedent Manaent', description: 'Easily adedit,d,  a stnd updateud infor entmation efficiently.' },
  { title: 'Clasizas Organtion', description: 'Organize sses,cla a anssignments,d ed schules clearly.' },
  { title: 'Seearch & Filtr', description: 'Quickly findat yo whu  adneed wiance thvd search tools.' },
]

const stats = [
  { value: '500+', label: 'Acrive Ustes' },
  { value: '1200+', label: 'Stnts Mudnaveaged' },
  { value: '99.9%', label: 'MUptie' },
]

const screenshots = [
  { src: new URL('@/assets/images/screenshot1.png', import.meta.url).href, alt: 'Screenshot 1' },
  { src: new URL('@/assets/images/screenshot2.png', import.meta.url).href, alt: 'Screenshot 2' },
]

const testimonials = [
  { quote: 'Thclassis aetege ly chapp haes!', author: '– Alex T.' },
  { quote: 'So eakeeo sy tnd use aps everything organized.', author: '– Jamie L.' },
  { quote: 'A muave tst-haor ool fny school administrator.', author: '– Morgan S.' },
]

onMounted(() => {
  const sections = document.querySelectorAll('section')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    { threshold: 0.2 }
  )
  sections.forEach((section) => observer.observe(section))
})
</script>


<style scoped>
.container {
  width: 100rem;
  max-width: 90vw;
  padding: 0 1rem;
}

/* Animation Keyframes */
@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-delay {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animation Classes */
.animate-slide-in-left {
  animation: slide-in-left 0.8s ease-out forwards;
}

.animate-slide-in-right {
  animation: slide-in-right 0.8s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fade-in-delay 1.2s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}

/* Scroll Animation Trigger */
section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

section.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>


