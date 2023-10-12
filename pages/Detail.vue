<script setup>
import {useCommonStore} from "~/store";
import {  onMounted, ref, onBeforeMount, watch, onUpdated, computed} from 'vue'
import LoadingSpinner from "~/components/common/LoadingSpinner.vue";
import axios from "axios";
// import MarkdownIt from "markdown-it";
import http from '@/assets/js/http-common.js';
console.error = () => {};
console.warn = () => {};
// console.log = () => {};
const store = useCommonStore()
// const markdown = new MarkdownIt();
const route = useRoute()
const id = route.query.id
const metaTitle = route.query.title
// const url = 'https://eclipseaddict.com/v1/'
const url = 'http://127.0.0.1:8000/v1/'
const colorList = [
    'red-lighten-1',
    'indigo-lighten-1',
    'purple-lighten-1',
    'blue-lighten-1',
    'deep-purple-lighten-1',
    'cyan-lighten-1',
    'teal-lighten-1',
    'pink-lighten-1',
]

defineProps({
    article_id: String,
    article_title: String,
})


const detail_content = ref(null)
const title = ref(null)
const cover = ref(null)
const created_at = ref(null)
const views = ref(null)
const category_list = ref(null)
const isLoaded = ref(false)
const router = useRouter()
// const CurrentUrl = window.location.href
// const urlParams = new URLSearchParams(CurrentUrl);
// const metaTitle = urlParams.get('title');
console.log('metaTitle',metaTitle)

useHead({
    title: `데브 인사이트 | 블로그`,
    meta:[
        {"http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests"},
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
        {name: 'description', content: '데브 인사이트 개발 블로그 | 데브 인사이트'},
        {name: 'keywords', content: '데브 인사이트, 개발 블로그, 데브 인사이트 개발 블로그, 데브 인사이트 블로그'},
        { property: 'article:author', content: 'isaac'},
        { name: 'twitter:creator', content: '@isaac' },
        { name: 'twitter:card', content: '/share-banner.png' },
        { name: 'twitter:title', content: 'devinsight' },
        { name: 'twitter:description', content: 'devinsight' },
        { name: 'twitter:image', content: '/share-banner.png' },
        { name: 'twitter:site', content: '@devinsight.kr' },

        { name: 'og:title', content: 'devinsight' },
        { name: 'og:description', content: '데브 인사이트 개발 블로그 | 데브 인사이트' },
        { name: 'og:image', content: '/share-banner.png' },
        { name: 'og:site_name', content: 'devinsight' },
        { name: 'og:image', content: '/share-banner.png' },
        { property: 'og:title', content: `데브 인사이트 | 블로그`  },
        { property: 'og:image', content: '/share-banner.png' },
        { property: 'og:type', content: 'Article' },
        { property: 'og:description', content: '데브 인사이트 개발 블로그 | 데브 인사이트' },
        { property: 'og:site_name', content: 'devinsight.kr' },
        { property: 'og:locale', content: 'ko_KR'},
        {property: 'og:url', content: `https://devinsight.kr/Detail?id=${id}&title=${metaTitle}`},

    ],    script: [
        {
            src: 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?autorun=false&skin=sunburst',
            async: true,
            defer: true,
            body: true
        }
    ]
})
const tagSearch = (tag) => {
    router.push({path: '/Blog', query: {tag: tag}})
}


const goBack = () => {
    window.history.back();
};


onBeforeMount(() => {
    console.log('onBeforeMount')
    window.scroll(0,0)
    http.get( `/article/${id}/` ).then((response) => {
        // console.log(response.data.content)
        detail_content.value = response.data.content
        title.value = response.data.title
        cover.value = response.data.cover
        created_at.value = response.data.created_at
        views.value = response.data.views
        category_list.value = response.data.categories
        console.log('category_list', category_list.value)

        useHead({
            title: `데브 인사이트 | ${title.value}`,
            meta:[
                {"http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests"},
                {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
                {name: 'description', content: detail_content.value},
                {name: 'keywords', content: category_list.value.join(',')},
                { property: 'article:author', content: 'isaac'},
                { name: 'twitter:creator', content: '@isaac' },
                { name: 'twitter:card', content: '/share-banner.png' },
                { name: 'twitter:title', content: `devinsight | ${title.value}` },
                { name: 'twitter:description', content: 'devinsight' },
                { name: 'twitter:image', content: '/share-banner.png' },
                { name: 'twitter:site', content: '@devinsight.kr' },

                { name: 'og:title', content: `devinsight | ${title.value}`},
                { name: 'og:description', content: `devinsight | ${title.value}` },
                { name: 'og:image', content: '/share-banner.png' },
                { name: 'og:site_name', content: 'devinsight' },
                { name: 'og:image', content: '/share-banner.png' },
                { property: 'og:title', content: `devinsight | ${title.value}`  },
                { property: 'og:image', content: '/share-banner.png' },
                { property: 'og:type', content: 'Article' },
                { property: 'og:description', content: metaTitle },
                { property: 'og:site_name', content: 'devinsight.kr' },
                { property: 'og:locale', content: 'ko_KR' },

            ]
        })

    }   ).catch((error) => {
        console.log(error)
    } )
}),

    onMounted(()=> {
        console.log('onMounted')


        // utterances 댓글 기능
        const scriptTag = document.createElement('SCRIPT')
        scriptTag.setAttribute('src', 'https://utteranc.es/client.js')
        scriptTag.setAttribute('repo', 'danielkellyio/blog-comments')
        scriptTag.setAttribute('issue-term', 'pathname')
        scriptTag.setAttribute('label', 'Comment')
        scriptTag.setAttribute('theme', 'github-light')
        scriptTag.setAttribute('crossorigin', 'anonymous')
        scriptTag.setAttribute('async', 'async')

        const commentSection = document.getElementById('commentSection')
        console.log(commentSection)
        commentSection.appendChild(scriptTag)


    })

    onUpdated(() => {

        if(route.query.id != id){
            window.location.reload();
        }
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
    codeTag.forEach((code) => {
        code.classList.add('prettyprint');
    });
    PR.prettyPrint();
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
    <v-btn icon class="backBtn" @click="goBack" elevation="7">
        <v-icon>
            mdi-arrow-left
        </v-icon>
    </v-btn>
    <LoadingSpinner v-if="!isLoaded"/>
    <v-img :src="cover" class="w-100" height="300" cover></v-img>
    <div id="app" class="dark-mode">
        <v-container v-if="isLoaded">
            <v-chip-group>
                <v-chip size="small" class="mx-1" variant="outlined" dark v-for="(category, idx) in category_list" :key="idx" @click="tagSearch(category.id)">
                    {{category}}
                </v-chip>
            </v-chip-group>
            <h1 class="main--header">{{title}}</h1>
            <p class="created--at" >작성일 : {{date_foramt}}</p>
            <p class="view--count">
                <v-icon icon="mdi-eye" size="x-small"></v-icon>
                <span class="ml-2">{{ views }}</span>
            </p>

            <div class="divider"></div>
            <div class="detailContent" v-html="detail_content"></div>
        </v-container>
    </div>
    <div id="commentSection"></div>

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
    padding: 0 15px;
}

.backBtn{
    position: fixed;
    top: 50px;

    z-index: 100;
    margin: 3%;
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
<style>

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
.img--w90{
    width: 90% !important;
    height: auto !important;
    margin: 0.5rem 0;
}
#commentSection{
    margin-top: 50px;

    padding-left: 3%;
    padding-right: 3%;
    text-align: center;
}
.utterances {
    width: 100%;
    //margin: 0 !important;
    max-width: 100%;
    margin-bottom: 15rem;

}
ol{
    list-style-type: decimal;
    margin-left: 2rem;
}
ol{
    list-style-type: disc;
    margin-left: 2rem;
}

.bookmark--wrapper{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    width: 80%;
    height: 150px;
    margin-top: 20px;
    margin-left: 5px;
    box-shadow: 8px 0px 9px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    flex-grow: 1
}

.bookmark--title{
    display: flex;
    flex-direction: column;
    width: 350px;
    font-size: 15px;
    font-weight: bold;
    color: #120d0d;
    margin-left: 20px;

}
.title--span--subtitle{
    font-size: 8px;
    font-weight: normal;
    color: #120d0d;
}
.bookmark--left{
    display: flex;
    align-content: flex-start;
    flex-direction: row;
    //width: inherit;
}
.bookmark-image{
    width: 100%;
    height: 100%;
    max-width: 270px !important;
    border-radius: 10px;
    box-shadow: #4f625f 0px 0px 5px;
}

.image--container{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
}
</style>
