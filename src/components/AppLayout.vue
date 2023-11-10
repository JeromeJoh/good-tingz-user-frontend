<script setup lang="ts">
import { onMounted } from "vue";
import { get } from '@/http';


import Header from "./Header.vue";
import Toast from "./Toast.vue";
import store from "@/store";



onMounted(() => {
  getProducts();
});

function getProducts() {
  get('/').then(res => {
    store.commit('setProducts',res);
  })
}

</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <Header />
    <router-view></router-view>
  </div>
  <Toast />
</template>
