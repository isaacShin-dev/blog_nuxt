<script setup lang="ts">
import LogCard from "~/components/logs/LogCard.vue";
useHead({
    title: '데브 인사이트 | Log',
    meta:[
        {"http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests"},
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
        {name: 'description', content: '데브 인사이트 개발 블로그 | 데브 인사이트'},
        {name: 'keywords', content: '데브 인사이트, 개발 블로그, 데브 인사이트 개발 블로그, 데브 인사이트 블로그'},
        { property: 'article:author', content: 'isaac'},
        { name: 'twitter:creator', content: '@isaac' },
        { name: 'twitter:card', content: '/share-banner.png' },
        { name: 'twitter:title', content: '데브 인사이트 | Log' },
        { name: 'twitter:description', content: 'devinsight' },
        { name: 'twitter:image', content: '/share-banner.png' },
        { name: 'twitter:site', content: '@devinsight.kr' },

        { name: 'og:title', content: 'devinsight' },
        { name: 'og:description', content: '데브 인사이트 | Log' },
        { name: 'og:image', content: '/share-banner.png' },
        // { name: 'og:url', content: 'https://eclipseaddict.com' },
        { name: 'og:site_name', content: 'devinsight' },
        { name: 'og:image', content: '/share-banner.png' },
        { property: 'og:title', content: '데브 인사이트 | Log' },
        { property: 'og:image', content: '/share-banner.png' },
        { property: 'og:type', content: 'Article' },
        { property: 'og:description', content: '데브 인사이트 | Log' },
        { property: 'og:site_name', content: 'devinsight.kr' },
        { property: 'og:locale', content: 'ko_KR' },
    ]
})
</script>

<template>
  <v-container>
      <!--the page is not ready-->
      <div>
          <h1>아직 준비중인 페이지입니다.</h1>
          <div class="loading--spinner"></div>
      </div>
<!--      <div class="bookmark&#45;&#45;wrapper">-->
<!--          <div class="bookmark&#45;&#45;left">-->
<!--              <v-img width="300" class="bookmark-image" src="/share-banner.png"></v-img>-->
<!--          </div>-->
<!--          <div class="bookmark&#45;&#45;title">-->
<!--              <span class="title&#45;&#45;span">Devinsight</span>-->
<!--              <hr>-->
<!--              <span class="title&#45;&#45;span&#45;&#45;subtitle">abvcdasd</span>-->
<!--          </div>-->
<!--      </div>-->
  </v-container>


</template>

<style scoped>
.bookmark--wrapper{
    display: flex;
    justify-content: start;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 20px;
    border: 1px solid #120d0d;
    width: 80%;
    height: 150px;
}
.bookmark--title{
    display: flex;
    flex-direction: column;
    width: 350px;
    font-size: 20px;
    font-weight: bold;
    color: #120d0d;
    margin-left: 20px;

}
.title--span--subtitle{
    font-size: 15px;
    font-weight: normal;
    color: #120d0d;
}
.loading--spinner{
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #120d0d;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
    margin-left: 50%;
    margin-top: 50%;
    transform: translate(-50%, -50%);
}

</style>