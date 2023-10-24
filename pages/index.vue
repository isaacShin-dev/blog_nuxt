<template>
    <v-container  fluid>
        <div class="wrapper mx-5">


            <v-row justify="center">
                <v-col>

                    <p class="smallText">Eclipse DEV Insight.</p>
                    <p class="smallText">WELCOME. ALL</p>
                </v-col>

                <v-col cols="12" class="justify-center">

                    <p class="text-decoration-none small-menu" v-for="(menu, idx) in menu_list" :key="idx" style="z-index: 0">
          <span :class="{menuHover : menu.isHover}" @click="todestination(menu.to)">
              <span style="cursor:pointer;" @mouseover="menuMouseOver(idx)" @mouseleave="menuMouseLeave(idx)">{{menu.text}}</span>
          </span>
                    </p>
                    <v-img
                      src="/kitten-1556444_1920.png"
                      :class="{dark_img: isDark}"
                      class="mainImg small-img"
                      style="z-index: 0">
                    </v-img>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import { defineComponent, onMounted, watch } from 'vue';
import { ref } from 'vue';
import { useCommonStore } from '@/store/index';
const isDark = ref(false)
const image = ref('/assets/kitten-1556444_1920.png')
const menu_list = ref([
    {text: 'HOW I WORK.', isHover: false, to: 'Blog'},
    {text: 'TODAY\'S LOGS.', isHover: false, to: 'Log'},
    {text: 'CONTACT ME.', isHover: false, to: 'Contact'}])
const card_img = ref('/assets/share-banner.png')


// const route = useRoute()
// Componentsa
export default defineComponent({
    name: 'HomeView',
    components: {
    },
    setup(){
        const router = useRouter()
        const store = useCommonStore()
        const currentTheme = computed(() => store.theme)

        useHead({
            title: '데브 인사이트',
            meta:[
                {"http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests"},
                {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
                {name: 'description', content: '데브 인사이트 | 궁금증에 대한 무름표를 끊없이 던지고, 끊임없이 고민하며, 끊임없이 공부하고, 끊임없이 기록합니다.'},
                {name: 'keywords', content: '데브 인사이트, 개발 블로그, 데브 인사이트 개발 블로그, 데브 인사이트 블로그'},
                { property: 'article:author', content: 'isaac'},
                { name: 'twitter:creator', content: '@isaac' },
                { name: 'twitter:card', content: '/share-banner.png' },
                { name: 'twitter:title', content: 'devinsight' },
                { name: 'twitter:description', content: 'devinsight' },
                { name: 'twitter:image', content: card_img },
                { name: 'twitter:site', content: '@devinsight.kr' },

                { name: 'og:title', content: 'devinsight' },
                { name: 'og:description', content: 'devinsight' },
                { name: 'og:image', content: '/share-banner.png' },
                // { name: 'og:url', content: 'https://eclipseaddict.com' },
                { name: 'og:site_name', content: 'devinsight' },
                { name: 'og:image', content: card_img },
                { property: 'og:title', content: '데브 인사이트' },
                { property: 'og:image', content: '/share-banner.png' },
                { property: 'og:type', content: 'Article' },
                { property: 'og:description', content: 'devinsight' },
                { property: 'og:site_name', content: 'devinsight.kr' },
                { property: 'og:locale', content: 'ko_KR' },

            ]
        })


        onMounted(() => {
            const preperTheme = localStorage.getItem('theme');

            isDark.value = preperTheme === 'dark'
        })
        watch(currentTheme, (newVal) => {
            const preperTheme = localStorage.getItem('theme');
            isDark.value = preperTheme === 'dark'
        })
        return {
            menu_list,
            isDark,
            image,
            store,
            menuMouseOver: (idx) =>{
                menu_list.value[idx].isHover = true},
            menuMouseLeave: (idx) =>{
                menu_list.value[idx].isHover = false},
            //Routers
            todestination: (to) => {
                if(to == "Log"){
                    alert("준비중입니다.")
                    return
                }
                router.push({path: `/${to}`})
            },
        }

    },
});


</script>
<style scoped>

.wrapper{
//background-color: #AECDC8;
    height: 600px;
    margin-top: 80px;
    border-radius: 19px;
}
.mainImg{
    border-radius: 15px;
    margin-top: 22px;
    border-radius: 22px !important;
    z-index: 1;
    height: 400px;

}
.dark_img{
    filter: invert(100%);
}
.mainText{
    color: white;
    font-size: 60px;
    font-weight: bold;
    margin-left: 250px;
    font-family: 'Nanum Myeongjo', serif;
}
.homeMenu{
    margin-top: 79px;
    font-size: 33px;

    text-align: center;
    font-family: 'Cormorant', serif;
    list-style-type: none;
    letter-spacing: 10px;
    opacity: 0.7;
    color: black;
//color: #FCFEFD;
}

@media (max-width: 800px) {
    .small-menu {
        font-size : 13px;
        letter-spacing: 1px;
    //margin-top:65px;
    }
}
@media(max-width: 500px){
    .small-menu{
        font-size: 13px;
    //margin-top: 65px;
        letter-spacing: 1px;

    }
    .small-img{
        height: 300px;
    }
}
.menuHover{
    opacity: 0.9;
    transition: letter-spacing 0.5s ease;
}
.menuHover:hover {
    letter-spacing: 15px; /* hover 할 경우 letter-spacing 값을 변경하여 변화가 나타나도록 설정 */
}
.smallText{
    font-family: 'DM Serif Display', serif;

    font-weight: bolder;
    letter-spacing: 8px;
    margin-left: 10px;
    margin-top: 5px;
}
</style>
