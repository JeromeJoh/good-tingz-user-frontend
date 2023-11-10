<script setup>

import { get } from "@/http";

import { ref } from "vue";
import { ArrowRightIcon, ArrowDownIcon } from "@heroicons/vue/24/outline";

import { EXAMPLE_PRODUCTS, currency } from "@/assets/constant";

const datePicker = new Date().toString().split(" ").slice(1, 3).reverse();
const editorChoice = ref(EXAMPLE_PRODUCTS[0]);
</script>

<template>
  <div id="banner" class="relative flex-1 px-4 py-8 text-center">
    <!-- Title -->
    <section
      class="inline-flex flex-col justify-center items-center select-none"
    >
      <p class="text-2xl md:text-3xl font-bold font-jost">
        <em class="text-5xl">{{ datePicker[0] }}</em> {{ datePicker[1] + "." }}
      </p>
      <h1
        class="w-full text-xl md:text-2xl font-bold tracking-widest text-center mt-2 mb-8"
      >
        本日推荐
      </h1>

      <!-- Editor Choice -->
      <div class="grid grid-cols-1 md:grid-cols-3">
        <!-- Intro -->
        <article
          class="flex flex-col md:items-start items-center justify-center md:pl-20 py-6 gap-y-6"
        >
          <p class="text-3xl font-light tracking-wider whitespace-nowrap">
            {{ editorChoice.title }}
          </p>
          <p class="text-4xl md:text-5xl font-light">
            {{ currency + editorChoice.price }}<span class="line-through text-2xl ml-4 text-gray-500">{{ currency + Math.round(editorChoice.price / 0.8)}}</span>
          </p>
          <div class="flex gap-x-2">
            <span
              v-for="label in editorChoice.labels"
              class="text-sm font-light border-[.5px] bg-lighterColor shadow-sm border-darkerColor py-1 px-3 rounded-full"
              >{{ label }}</span
            >
          </div>
        </article>

        <!-- Image -->
        <div id="recommand" class="p-2 flex relative cursor-pointer">
          <img
            :src="editorChoice.imageUrl"
            alt="TODAY RECOMMANDED"
            class="m-auto w-1/2 md:w-2/3 hover:scale-110 transition-all"
          />
        </div>

        <!-- Description -->
        <article
          class="inline-flex flex-col items-center md:items-end justify-center md:pr-20 px-2 py-6 gap-y-6 mt-24 md:mt-0"
        >
          <li
            v-for="item in editorChoice.description"
            class="inline-block text-2xl font-light tracking-wider"
          >
            {{ item }}
          </li>
        </article>
      </div>
    </section>
    <aside
      class="absolute left-[10%] bottom-[10%] hover:text-blatantColor hidden md:block"
    >
      <router-link
        :to="{ name: 'app.products' }"
        class="flex items-center pb-2 border-black border-b-[.5px]"
      >
        更多商品 <ArrowRightIcon class="w-4 h-4" />
      </router-link>
    </aside>
    <router-link
      :to="{ name: 'app.products' }"
      class="items-center flex md:hidden flex-col py-8 hover:text-blatantColor gap-y-2 mt-8 w-fit mx-auto"
    >
      <span class="pb-2 border-b-[.5px] border-black">更多商品</span>
      <ArrowDownIcon class="w-4 h-4" />
    </router-link>
  </div>
</template>

<style scoped>
#recommand::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 100%;

  width: 50%;
  height: 20%;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.4);

  transform: translateY(5px) translateX(-50%);
  filter: blur(10px);
}
</style>
