<script setup>
import {  onMounted, ref, onBeforeMount, watch, onUpdated, computed} from 'vue'
import LoadingSpinner from "~/components/common/LoadingSpinner.vue";


import axios from "axios";
import MarkdownIt from "markdown-it";

console.error = () => {};
console.warn = () => {};
// console.log = () => {};

useHead({
    title: '',
    meta: [
        { name: 'description', content: 'My amazing site.' }
    ],
    bodyAttrs: {
        class: 'test'
    },
    script: [
        {
            src: 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?autorun=false&skin=sunburst',
            async: true,
            defer: true,
            body: true
        }


    ]
})

const markdown = new MarkdownIt();
const route = useRoute()
const id = route.params.id
const url = 'https://eclipseaddict.com/v1/'
// const url = 'http://127.0.0.1:8000/v1/'

const detail_content = ref(null)
const title = ref(null)
const cover = ref(null)
const created_at = ref(null)
const views = ref(null)
const category_list = ref(null)
const isLoaded = ref(false)
const goBack = () => {
    window.history.back();
};

onBeforeMount(() => {
    axios.get( `${url}article/${id}/` ).then((response) => {
        // console.log(response.data.content)
        detail_content.value = response.data.content
        title.value = response.data.title
        cover.value = response.data.cover
        created_at.value = response.data.created_at
        views.value = response.data.views
        category_list.value = response.data.categories
        console.log('category_list', category_list.value)

    }   ).catch((error) => {
        console.log(error)
    } )
}),

    onUpdated(() => {
        console.log('nextTick')
        //  본문 이미지 태그를 동적으로 불러와, 이미지의 크기를 반응형으로 조정합니다.
        const imgTag = document.querySelectorAll('.detailContent img');
        imgTag.forEach((img) => {
            img.style.width = '100%';
            img.style.height = 'auto';
        });

        //  코드 블럭을 prettify 합니다.
        try{
        PR.prettyPrint();
        }catch (e) {
            window.location.reload(true);
        }
        isLoaded.value = true

    });

onUnmounted(() => {
    console.log('onUnmounted')
    //  코드 블럭을 prettify 합니다.
    const codeTag = document.querySelectorAll('pre');
    console.log(codeTag)
    codeTag.forEach((code) => {
        code.classList.add('prettyprint');
    });
    PR.prettyPrint();
});
watch(detail_content, async () => {

});

const date_foramt = computed(() => {
    const date = new Date(created_at.value)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}년 ${month}월 ${day}일`
})




</script>
<template>
    <v-btn icon class="backBtn" @click="goBack">
        <v-icon>
            mdi-arrow-left
        </v-icon>
    </v-btn>
    <LoadingSpinner v-if="!isLoaded"/>
        <v-img :src="cover" class="w-100" height="300" cover></v-img>
    <div id="app" class="dark-mode">
        <v-container v-if="isLoaded">
            <h1 class="main--header">{{title}}</h1>
            <p class="created--at" >작성일 : {{date_foramt}}</p>
            <v-chip-group>
                <v-chip size="small" class="mx-1" dark v-for="(category, idx) in category_list" :key="idx">
                    {{category}}
                </v-chip>
            </v-chip-group>
                <div class="divider"></div>
                <div class="detailContent" v-html="detail_content"></div>
        </v-container>
    </div>
</template>

<style scoped>
/* Your existing styles */
#app{
    margin: 0 auto;
    width: 90%;
    padding: 20px;
}
/*media query for mobile*/
@media (max-width: 768px) {
    #app{
        width: 100%;
    }
}

.mainTitle{
    text-align: center;
    margin-bottom: 25px;
}
.divider{
    border-bottom: 3px solid #e0e0e0;
    margin-bottom: 25px;
}
.detailContent {
    overflow: scroll !important;
}

.backBtn{
    position: fixed;
    top: 50px;

    z-index: 100;
    margin: 5%;
}
.main--header{
    font-family: "BM Hanna Pro";
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 20px;
}
.created--at{
    font-family: "BM Hanna Pro";
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 20px;
}
</style>

<style scoped>

.detailContent{
    font-family: 'Fira Code', monospace;
}
.main--header{


}
.callout{
    background-color: #f5f5f5;
    padding: 0.5rem;
    border-radius: 5px;
    margin: 0.5rem 0;
    font-size: 0.9rem;
    font-family: 'Fira Code', monospace;
    color: #444;
}

blockquote{
    padding: 0.5rem;
    border-left: 2px solid black;
    margin: 0.5rem 0;
    font-size: 0.9rem;
    font-family: 'Fira Code', monospace;
    font-weight: bold;
}
.inline--code--block{
    display: inline-block;
    background-color: #e8e8e8;
    padding: 0.1rem 0.4rem;
    border-radius: 5px;
    margin: 0.5rem 0;
    font-size: 0.9rem;
    font-family: 'Fira Code', monospace;
    color: #d20a0a;
}
pre.prettyprint {
    padding: 14px;
    font-size: 1.1rem;
    line-height: 1.45;
    background-color: #f6f8fa;
    border-radius: 3px;
    border: 1px solid #fff;
    margin: 2px;
    overflow: scroll;
}
.body--image{
    width: 40% !important;
    height: auto !important;
    margin: 0.5rem 0;
}
</style>
