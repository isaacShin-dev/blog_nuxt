<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer">
            <v-list-item
                    prepend-avatar="https://cdn.pixabay.com/photo/2017/08/30/01/55/eclipse-2695630_1280.jpg"
                    title="By Isaac Giwook Shin"
            ></v-list-item>
            <v-divider></v-divider>
            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-dev-to" title="HOW I WORK" value="HOW I WORK" @click="toBlog"></v-list-item>
                <v-list-item prepend-icon="mdi-notebook" title="TODAY'S LOG" value="TODAY'S LOG" ></v-list-item>
                <v-list-item prepend-icon="mdi-card-account-phone-outline" title="CONTACT ME" value="CONTACT ME" ></v-list-item>
            </v-list>
            <v-divider></v-divider>
            <div class="">
                <p class="rank--title">조회수 순</p>
                <ul v-for="(item, idx) in article_rank" :key="idx">
                    <li class="rank--item item--hover" @click="detail(item.id)">{{ item.title }}</li>
                </ul>
            </div>



        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer" append-icon>
                <v-icon  icon="mdi-microsoft-xbox-controller-menu"></v-icon>
            </v-app-bar-nav-icon>

            <NuxtLink to="/">
            <v-toolbar-title class="appbar--title" >이클립스 데브 인사이트</v-toolbar-title>
            </NuxtLink>
            <v-spacer></v-spacer>

            <v-btn icon @click="toggleTheme">
                <v-icon>mdi-theme-light-dark</v-icon>
            </v-btn>

            <v-btn icon @click="isActive = !showModal">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn icon >
                <v-icon>mdi-github</v-icon>
            </v-btn>
            <!--            <v-btn @click="loginModal" v-if="!loginStatus">-->
            <!--                <v-icon >mdi-login</v-icon>-->

            <!--            </v-btn>-->
            <!--                <v-btn v-else @click="showUserModal">hello {{id}}</v-btn>-->
        </v-app-bar>



        <v-main>
          <NuxtPage />
        </v-main>
        <v-footer
                class="bg-indigo-lighten-1 text-center d-flex flex-column"
                padless


        >
            <div>
                <v-btn
                        v-for="icon in icons"
                        :key="icon"
                        class="mx-4"
                        :icon="icon"
                        variant="text"
                ></v-btn>
            </div>

            <div class="pt-0">
                Every try counts. Every try matters.
            </div>

            <v-divider></v-divider>

            <div @click="fetchData">
                {{ new Date().getFullYear() }} — <strong>isaac</strong>
            </div>
        </v-footer>

        <v-dialog
                v-model="isActive"
                width="auto"
        >
            <v-card>
                <v-card-text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="isActive = false">Close Dialog</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script setup lang="ts">
// import { useTheme } from 'vuetify';
import { ref, watch, onMounted, onBeforeUnmount, onBeforeMount } from 'vue';
import axios from "axios";
import { useCommonStore} from "~/store";



useHead({
    title: '이클립스 데브 인사이트',
    description: '이클립스 데브 인사이트 블로그입니다. 재미로 쓰는 개발 블로그입니다.',
    meta:[
        {"http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests"}
    ]
})
const router = useRouter()
// const theme = useTheme();
const store = useCommonStore();
const colorMode = useColorMode()

const drawer = ref(false);
const isActive = ref(false);
const password = ref();
const rememberMe = ref(false);
const userModal = ref(false);
// const userStore = useUserStore();
const article_rank = ref([]);
const icons = ref([
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
])
// const url = 'http://127.0.0.1:8000/v1/'
const url = 'https://eclipseaddict.com/v1/'


// onBeforeMount(() => {
//     console.log('onBeforeMount');
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme) {
//         theme.global.name.value = savedTheme;
//         if (savedTheme === 'dark') {
//             document.body.classList.add('dark-mode');
//         }
//     }
// });

onMounted(() => {
    axios({
        method: 'GET',
        url: `${url}rank/`
    }).then((res) => {
        console.log(res.data)
        article_rank.value = res.data.results
    }).catch((err) => {
        console.log(err)
    })
});

onBeforeUnmount(() => {
    console.log('onBeforeUnmount')

});
const detail = (id :string) => {
    router.push({path:'/Detail',  query:{id: id}})
}


const toggleTheme = () => {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
    // const newTheme = theme.global.name.value === 'dark' ? 'light' : 'dark';
    // theme.global.name.value = newTheme;
    // localStorage.setItem('theme', newTheme);


    store.toggleTheme(); // store에 저장
};

const toGit = () => window.open('https://github.com/isaacShin-dev');
const toBlog = () => {router.push({path: '/Blog'})}
const fetchData = () => {
    axios({
        method: 'GET',
        url: `${url}fetch_new_data/`
    }).then((res) => {
        if (res.data.count > 0){
            alert('블로그에 새로운 글이 있습니다. 새로고침을 해주세요.')
        }else{
            alert('블로그에 새로운 글이 없습니다. 최신 상태입니다.')
        }

    }).catch((err) => {
        console.log(err)
    })
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
    margin-bottom: 20px;
    margin-top: 7px;
    margin-left: 25px;
    cursor: pointer;
    list-style: none;
    border-bottom: 1px solid #e0e0e0;
    margin-right: 5px;

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
</style>

