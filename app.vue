<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer">
            <NuxtLink to="/">
            <v-list-item
                    prepend-avatar="https://cdn.pixabay.com/photo/2017/08/30/01/55/eclipse-2695630_1280.jpg"
                    title="Dev Insight"
            ></v-list-item>
            </NuxtLink>
            <v-divider></v-divider>
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-dev-to" title="HOW I WORK" value="HOW I WORK" @click="goTo('Blog')"></v-list-item>
                <v-list-item prepend-icon="mdi-notebook" title="TODAY'S LOG" value="TODAY'S LOG" @click="goTo('Log')"></v-list-item>
                <v-list-item prepend-icon="mdi-card-account-phone-outline" title="CONTACT ME" value="CONTACT ME" @click="goTo('Contact')"></v-list-item>
            </v-list>
            <v-divider></v-divider>
            <div class="">
                <p class="rank--title">조회수 순</p>
                <ul v-for="(item, idx) in article_rank" :key="idx">
                    <li class="rank--item item--hover" @click="detail(item.id)">{{ item.title }}</li>
                </ul>
            </div>

            <div class="tag--list--container">
                <p class="rank--title">태그</p>
                 <div class="tag--group">
                     <span class="tag--chip" v-for="(tag, idx) in tags" :key="idx" @click="tagSearch(tag.id)">
                         {{tag.category}}
                     </span>

                 </div>

            </div>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer" append-icon>
                <v-icon  icon="mdi-microsoft-xbox-controller-menu"></v-icon>
            </v-app-bar-nav-icon>

            <NuxtLink to="/">
            <v-toolbar-title class="appbar--title" >데브 인사이트</v-toolbar-title>
            </NuxtLink>
            <v-spacer></v-spacer>

            <v-btn icon @click="toggleTheme">
                <v-icon>mdi-theme-light-dark</v-icon>
            </v-btn>

            <v-btn icon @click="isActive = !showModal">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon @click="toGit">
                <v-icon>mdi-github</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
          <NuxtPage />
        </v-main>
        <v-dialog
                v-model="isActive"
                width="auto"
                location="top"
        >
            <v-card width="700">
                <v-card-text>
                        <v-text-field
                            :loading="loading"
                            density="compact"
                            variant="solo"
                            label="블로그 검색"
                            append-inner-icon="mdi-magnify"
                            single-line
                            hide-details
                            @click:append-inner="onClick"
                        ></v-text-field>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-footer app elevation="4">
            <span class="white--text w-100 text-center" @click="fetchData">Dev insight - by isaac</span>
        </v-footer>
    </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify';
import { ref, watch, onMounted, onBeforeUnmount, } from 'vue';
import { useCommonStore} from "~/store";
import http from '@/assets/js/http-common.js';

const router = useRouter()
const store = useCommonStore();
const theme = useTheme();
const colorMode = useColorMode()
const loading = ref(false);
const drawer = ref(false);
const isActive = ref(false);
const article_rank = ref([]);
const tags = ref([]);


useHead({
    link: [{rel: 'icon', href: '/favicon.ico'}]
})

onMounted(() => {
    rank()
    fetch_tags()

    const preperTheme = localStorage.getItem('theme');
    if (preperTheme) {
        theme.global.name.value = preperTheme;
        store.theme = preperTheme;
    }
});

onBeforeUnmount(() => {

});
const detail = (id :string) => {
    router.push({path:'/Detail',  query:{id: id}})
}


const toggleTheme = () => {
    const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    localStorage.setItem('theme', newTheme);
    store.theme = newTheme;
};

const toGit = () => window.open('https://github.com/isaacShin-dev');
const goTo = (to: string) => {
    if(to === 'Log'){
        alert("준비중입니다.")
        return
    }
    router.push({path: `/${to}`})
}

const fetchData = () => {
    http.get("/fetch_new_data/").then((res) => {
        if (res.data.count > 0){
            window.location.reload()
        }else{
            console.log("all up to date")
        }
    }).catch((err) => {
        console.log(err)
    })
}

const fetch_tags = () => {
    http.get("/tags/").then((res) => {
        tags.value = res.data
    }).catch((err) => {
        console.log(err)
    })
}
const rank = () => {
    http.get("/rank/").then((res) => {
        article_rank.value = res.data.results
    }).catch((err) => {
        console.log(err)
    })
}

const onClick = () => {
    // 검색 기능 구현 필요
    loading.value = true;
    setTimeout(() => (loading.value = false), 2000);
};

const tagSearch = (tag: string) => {
    router.push({path: '/Blog', query: {tag: tag}})
}



</script>


<style scoped>
.dark-mode body {
    background-color: #091a28;
    color: #ebf4f1;
}
.sepia-mode body {
    background-color: #f1e7d0;
    color: #433422;
}
.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: rgba(0,0,0,0.5);
    /*display: none;*/
}
.modal-area{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 450px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
}

.userModal{
    position: fixed;
    top: 60px;
    right: 0;
    z-index: 999;
    width: 15%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    /*background-color: rgba(0,0,0,0.5);*/
}

@keyframes slideIn {
    0% {
        transform: translateY(-20%);
    }
    100% {
        transform: translateY(0);
    }
}

.userModal {
    /* 기존 스타일 속성들 */
    animation: slideIn 0.01s ease-in-out;
}
.appbar--title{
    font-family: "BM Hanna Pro";
    cursor: pointer;
}
.appbar--title:hover{

}
a{
    text-decoration: none;
    color: inherit;
}
.rank--title{
    font-family: "BM Hanna Pro";
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-left: 25px;
    margin-top: 15px;
}
.rank--item{
    font-family: "BM Hanna Pro";
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    list-style: none;
    border-bottom: 1px solid #e0e0e0;
    margin: 7px 5px 20px 25px;

}
item--hover{
    opacity: 0.9;
    transition: border-bottom-color 0.5s ease;
}
.item--hover:hover {
    border-bottom-color: #000; /* hover 할 경우 letter-spacing 값을 변경하여 변화가 나타나도록 설정 */
}
.search--modal{

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 450px;
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
}
.tag--group{
    display: flex;
    flex-wrap: wrap;
    margin-left: 10px;
    margin-top: 15px;
    margin-bottom: 15px;
}

.tag--chip{
    font-family: sans-serif;
    font-size: 11px;
    padding: 4px 10px !important;
    cursor: pointer;
    list-style: none;
    border: 1px solid #120d0d;
    margin: 7px 5px 20px 4px;
    padding: 7px;
    border-radius: 15px;

}
.tag--chip:hover{
    background-color: rgba(255, 255, 255, 0.17);
    color: #ccc8c8;
}
.tag--list--container{
    margin-top: 20px;
}
</style>

