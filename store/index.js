import { defineStore } from 'pinia'


export const useCommonStore = defineStore('common', () =>{
    const theme = ref('light')
    const toggleTheme = () => {
        theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    return {
        theme,
        toggleTheme
    }
})