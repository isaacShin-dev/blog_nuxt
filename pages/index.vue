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
                      style="z-index: 0" @click="checkTheme" >
                    </v-img>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { ref, watch } from 'vue';
const isDark = ref(false)
const image = ref('/assets/kitten-1556444_1920.png')
const menu_list = ref([
    {text: 'HOW I WORK.', isHover: false, to: 'Blog'},
    {text: 'TODAY\'S LOGS.', isHover: false, to: 'Log'},
    {text: 'CONTACT ME.', isHover: false, to: 'ContactMe'}])


// const route = useRoute()
// Componentsa
export default defineComponent({
    name: 'HomeView',

    components: {
    },
    setup(){

        const router = useRouter()

        return {
            menu_list,
            isDark,
            image,
            menuMouseOver: (idx) =>{
                menu_list.value[idx].isHover = true},
            menuMouseLeave: (idx) =>{
                menu_list.value[idx].isHover = false},
            //Routers
            todestination: (to) => {
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
