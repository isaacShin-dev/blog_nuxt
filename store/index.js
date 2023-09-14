import { defineStore } from 'pinia'


export const useCommonStore = defineStore('common', () =>{
    // only reactive when user changes theme for dark at the first time, so the default theme is dark
    const theme = ref('light')
    const detail_title = ref('')
    const detail_description = ref('')
    const detail_cover = ref('')

    const toggleTheme = (theme) => {
        console.log('toggleTheme', theme)
        theme.value = theme
    }

    const setDetail = (title, description, cover) => {
        detail_title.value = title
        detail_description.value = description
        detail_cover.value = cover
    }

    return {
        theme,
        toggleTheme,
        detail_title,
        detail_description,
        detail_cover,
        setDetail,
    }
})