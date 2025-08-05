import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
    state: () => ({
        isDarkTheme: false as boolean
    }),

    getters: {
        getTheme: (state) => state.isDarkTheme
    },

    actions: {
        setDarkTheme(isDark: boolean) {
            this.isDarkTheme = isDark
            document.documentElement.classList.toggle('dark', isDark)
            localStorage.setItem('isDarkTheme', isDark ? '1' : '0')
        },

        loadTheme() {
            const saved = localStorage.getItem('isDarkTheme')
            const isDark = saved === '1'
            this.isDarkTheme = isDark
            document.documentElement.classList.toggle('dark', isDark)
        }
    }
})