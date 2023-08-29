<script setup lang="ts">
import axios from "axios";
import {ref, onMounted, watch} from 'vue'

const board_list = ref([
])
const page = ref(1)
const pageCount = ref(0)
const url = 'https://eclipseaddict.com/v1/'
// const url = 'http://127.0.0.1:8000/v1/'
const isHover = ref(false)
const router = useRouter()
useHead({
    meta:[
    ]
})
const fetchData = async () => {
    axios({
        url: `${url}list/?page=${page.value}`,
        method: 'GET',
    }).then((res) => {
        board_list.value = res.data.results
        // total page count 계산 반올림
        pageCount.value = Math.ceil(res.data.count / 8)
    }).catch((err) => {
        console.log(err)
    })
}

const detail = (id :string) => {
    //router push
    // router.push({path: `/posts/${id}`})
    router.push({path:'/Detail',  query:{id: id}})
}
onMounted(async () => {
    console.log('mounted', import.meta.env.VITE_API_URL)
    await fetchData()


});

watch(page, async () => {
    try {
        // axios 요청 등을 이용하여 데이터를 가져오는 로직을 작성합니다.
        const response = await axios.get(`${url}list/?page=${page.value}`);
        board_list.value = response.data.results;
    }catch (error) {
        console.error(error);
    }
})


</script>

<template>
    <v-container fluid class="container--bottom">
        <v-row dense>
            <v-col v-for="(board, idx) in board_list" :key="idx" sm="6" md="4" lg="3" xl="2" xxl="3">
                <v-card class="mx-auto article--card" max-width="344" elevation="3" v-ripple @click="detail(board.id)">
                    <v-img :src="board.cover" lazy-src="/loading.gif" height="200px" cover>
                    </v-img>
                    <v-card-title class="cardTitle">{{board.title}}</v-card-title>
                    <v-card-subtitle>
                        {{board.created_time.substring(0, 10)}}
                        <v-spacer></v-spacer>
                        <v-icon icon="mdi-eye" size="x-small"></v-icon>
                        <span class="viewcount--small">{{board.views}}</span>
                    </v-card-subtitle>
                    <v-card-subtitle>
                        <v-chip-group>
                            <v-chip size="small" class="mx-1" dark v-for="(category, idx) in board.categories_data" :key="idx">
                                {{category.category}}
                            </v-chip>
                        </v-chip-group>

                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>

        <v-pagination
                v-model="page"
                :length="pageCount"
                :total-visible="5"
                color="grey-darken-1"
                variant="elevated"
                class="paginator"
                @mouseover="isHover = true"
                @mouseleave="isHover = false"
                :class="{ 'paginator--hover': isHover}"
                style=""
        ></v-pagination>
    </v-container>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@300&display=swap');
.addBtn{
    margin-right: 15px;
    margin-top: 80px;
}
.detailModal{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index : 9999;
    background-color: rgba(0,0,0,0.5);
}

.cardTitle{
    font-size: 1rem;
    font-weight: bold;
    padding: 10px;
    margin: 0;
    font-family: 'Cormorant', serif;
}
.paginator {
    display: inline-flex;
    list-style-type: none;
    justify-content: center;
    position: fixed ;
    bottom: 15%;
    right: 0;
    left: 0;
    margin: 0 auto;
    width: 100%;
    opacity: 0.4;
}

.paginator--hover{
    opacity: 1;
}
.article--card{
    cursor: pointer;
}
.viewcount--small{
    font-size: 12px;
    margin-left: 5px;
    margin-top: 5px;
}
.container--bottom{
    margin-bottom: 4rem;
}
@media (max-width: 500px) {
    .paginator{
        bottom: 17%;
    }
    .container--bottom{
        margin-bottom: 3rem;
    }
}
</style>