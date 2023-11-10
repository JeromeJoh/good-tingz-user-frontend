<script setup>
import store from "@/store";
import { get } from "@/http";
import { computed, onMounted } from "vue";
import { currency, EXAMPLE_PRODUCTS } from "@/assets/constant";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, ShoppingCartIcon } from "@heroicons/vue/24/solid";


// TODO: searchbar

const products = computed(() => store.state.products);

onMounted(() => {
  getProducts();
});

function getProducts() {
  get("/").then((res) => {
    console.log(res);
  });
}

function addToCart(quantity = 1) {

  store.commit('showToast', '此商品已加入购物车');
}

const eproducts = EXAMPLE_PRODUCTS;
</script>

<template>
  <div class="flex justify-between px-12 mt-8">
    <router-link :to="{ name: 'app.home' }">
      <button
        class="w-fit flex items-center font-bold pl-7 pr-10 py-2 rounded-full border-[1px] border-gray-300 hover:bg-gray-200"
      >
        <ChevronLeftIcon class="h-5 w-5 text-black mr-1" />
        <span class="text-lg tracking-widest"> 回到首页 </span>
      </button>
    </router-link>
    <router-link :to="{ name: 'cart' }">
      <button
        class="w-fit flex items-center font-bold pr-7 pl-10 py-2 rounded-full border-[1px] border-gray-300 hover:bg-gray-200"
      >
      <span class="text-lg tracking-widest"> 去购物车 </span>
        <ChevronRightIcon class="h-5 w-5 text-black mr-1" />
      </button>
    </router-link>
  </div>
  <div class="p-12 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-12">
    <article
      v-for="product in eproducts"
      class="flex flex-col justify-center items-center px-4 py-6 border-[.5px] rounded-lg bg-gradient-to-b from-primaryColor/10 shadow-sm to-white hover:border-blatantColor hover:from-primaryColor/50 transition-all"
    >
      <router-link :to="{ name: 'app.products.details', params: { id: product.id }}" class="w-1/2 md:w-2/3 grid place-items-center hover:scale-105 transition-all"
        ><img
          v-if="product.imageUrl"
          class=" object-contain"
          title="点击查看商品详情"
          :src="product.imageUrl"
          :alt="product.title" />
        <img v-else class="object-contain" src="../../assets/noimage.png"
      /></router-link>
      <div class="flex flex-col gap-y-4 items-center mt-4">
        <p class="text-xl">{{ product.title }}</p>
        <p class="text-2xl font-bold">{{ currency + product.price }}</p>
      </div>
      <button 
        title="立即加购"
        @click="addToCart"
        class="w-3/4 py-4 tracking-widest font-bold bg-blatantColor hover:bg-opacity-90 rounded-full text-white mt-12 mb-6 flex justify-center items-center">
        <PlusIcon class="w-4 h-4" />
        <ShoppingCartIcon class="w-6 h-6" />
      </button>
    </article>
  </div>
</template>
