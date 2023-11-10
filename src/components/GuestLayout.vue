<script setup>
import Header from "./Header.vue";
const { title } = defineProps({
  title: String,
});
</script>

<template>
  <div class="flex-1 flex flex-col w-full bg-white">
    <main class="flex-1 pt-20">
      <h2 class="mt-8 text-center text-2xl font-extrabold mb-4">
        {{ title?.split("").join(" ") }}
      </h2>
      <slot></slot>
    </main>
  </div>
</template>
