<script setup>
import { defineProps } from 'vue';

defineProps({
  text: String
})
</script>

<template>
  <div class="group relative cursor-pointer p-2">
    <slot></slot>
    <div class="absolute top-full -left-4 opacity-0 pointer-events-none group-hover:opacity-100 bg-black bg-opacity-60 px-4 py-2 text-white break-keep rounded select-none z-50">{{ text }}</div>
  </div>
</template>