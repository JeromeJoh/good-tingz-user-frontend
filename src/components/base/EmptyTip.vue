<script setup>
import { defineProps } from "vue";

import { ArchiveBoxXMarkIcon } from "@heroicons/vue/24/solid";

const { layout } = defineProps({
  text: {
    type: String,
    default: "暂无数据",
  }
});

</script>

<template>
  <div class="w-fit px-4 border-l-4 border-black text-gray-00 font-medium my-8">
    <p class="text-xl tracking-widest">{{ text }}</p>
  </div>
</template>
