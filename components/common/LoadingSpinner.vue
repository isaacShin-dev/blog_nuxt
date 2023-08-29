<script setup>
import {  onMounted, ref, onBeforeMount, watch, onUpdated, computed} from 'vue'

</script>

<template>
    <div class="spinner--container">
      <v-img class="spinner" src="/eclipse-dev-icon.png"></v-img>
    </div>

</template>

<style scoped>
.spinner--container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.spinner {
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite; /* 스핀 애니메이션 적용 */
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>