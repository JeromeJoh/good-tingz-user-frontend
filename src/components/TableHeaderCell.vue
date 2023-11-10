<script setup>
import { defineProps } from "vue";
const { field } = defineProps({
  field: String,
});

</script>

<template>
  <th class="py-4 text-left pl-2">
    <slot></slot>
  </th>
</template>