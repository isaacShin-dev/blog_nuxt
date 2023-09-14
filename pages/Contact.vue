<script setup lang="ts">
useHead({
    title: '데브 인사이트 | Contact',
    meta:[
        {"http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests"},
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
        {name: 'description', content: '데브 인사이트 개발 블로그 | 데브 인사이트'},
        {name: 'keywords', content: '데브 인사이트, 개발 블로그, 데브 인사이트 개발 블로그, 데브 인사이트 블로그'},
        { property: 'article:author', content: 'isaac'},
        { name: 'twitter:creator', content: '@isaac' },
        { name: 'twitter:card', content: '/share-banner.png' },
        { name: 'twitter:title', content: '데브 인사이트 | 안녕하세요. 이삭입니다.' },
        { name: 'twitter:description', content: 'devinsight' },
        { name: 'twitter:image', content: '/share-banner.png' },
        { name: 'twitter:site', content: '@devinsight.kr' },

        { name: 'og:title', content: 'devinsight' },
        { name: 'og:description', content: '데브 인사이트 | 안녕하세요. 이삭입니다.' },
        { name: 'og:image', content: '/share-banner.png' },
        // { name: 'og:url', content: 'https://eclipseaddict.com' },
        { name: 'og:site_name', content: 'devinsight' },
        { name: 'og:image', content: '/share-banner.png' },
        { property: 'og:title', content: '데브 인사이트 | Contact' },
        { property: 'og:image', content: '/share-banner.png' },
        { property: 'og:type', content: 'Article' },
        { property: 'og:description', content: '데브 인사이트 | 안녕하세요. 이삭입니다.' },
        { property: 'og:site_name', content: 'devinsight.kr' },
        { property: 'og:locale', content: 'ko_KR' },

    ]
})
</script>

<template>
<v-container>
    <div class="grid--parent">
        <div class="grid--child">
            <div class="mt-15">
                <h1>Say Hello</h1>
                <h2>
                    <v-icon  icon="mdi-arrow-right"></v-icon>
                    I'm isaac
                </h2>

                <v-img width="250" class="profile-img-border" src="/contack_profile.png"></v-img>
            </div>
        </div>
        <div class="horizontal--hr"></div>
        <div class="grid--child--col">
            <div class="flex--child--col border--top">
                <div class="contact--card--flex">
                   <div class="mt-4">
                       <span class="">
                           Feel free to contact me. <br>
                           Why not. <br>
                           Truly
                       </span>
                   </div>
                    <div class="mt-4">
                        <h4 class="emailAddress">
                            <a href="mailto:isaacshin92@gmail.com">isaacshin92@gmail.com</a>
                            <v-icon  icon="mdi-arrow-top-right-thick"></v-icon>
                        </h4>
                    </div>
                </div>
                <div class="contact--card--flex border--top" style="margin-top: 10px;">
                   <div class="mt-4">
                       <span class="" >
                           Wanna see my work? <br>
                           this is my github. <br>
                           Why not. <br>
                           Truly
                       </span>
                   </div>
                    <div class="mt-4">
                        <h4 class="emailAddress">
                            <a href="https://github.com/isaacShin-dev">isaacShin-dev</a>
                            <v-icon  icon="mdi-arrow-top-right-thick"></v-icon>
                        </h4>
                    </div>
                </div>
            </div>
        </div>


    </div>
</v-container>
</template>

<style scoped>
*{
    font-family: 'Noto Sans KR', sans-serif;
}
a{
    text-decoration: none;
    color: #5d7471;
}
.grid--parent{
    display: grid;
    grid-template-columns: 5fr 1fr 6fr;

}
.grid--child{
    height: 80vh;
    margin: 0px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.flex--child{
    height: 40vh;
    width: 100%;
    margin: 0px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    align-self: center;
}
.flex--child--col{
    height: 80vh;
    width: 100%;
    margin: 0px 20px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    align-self: center;
}
.grid--child--col{
    height: 80vh;
    margin: 0px 20px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
}
.flex--child--img{
    width: 30%;
    margin: 40px 20px 20px 10px;
}

.horizontal--hr{
    height: 80vh;
    width: 1px;
    background-color: #AECDC8;
    align-self: center;
}
.border--top{
    border-top: 1px solid #AECDC8;
    margin-top: 250px;
}
.contact--card--flex{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100%;
}
.profile-img-border{
    margin-top: 50px;
    border-radius: 50%;
    border: 1px solid #AECDC8;
    shadow: 1px 1px 1px 1px #AECDC8;
}
.emailAddress{
    cursor: pointer;
}
.emailAddress:hover{
    color: #4f625f;
    text-shadow: rgba(145, 208, 185, 0.63) 1px 1px 1px;
}

@media screen and (max-width: 850px){
    .grid--parent{
        grid-template-columns: 1fr;
    }
    .horizontal--hr{
        display: none !important;
    }
    .grid--child{
        height: 40vh;
        margin: 0px 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .flex--child--col{
        height: 70vh;
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        align-self: center;
    }
    .contact--card--flex{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }

}
</style>