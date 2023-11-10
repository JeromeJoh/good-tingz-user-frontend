<script setup>
import { defineProps } from "vue";

defineProps({
  disabled: Boolean,
  labelTxt: String,
});

const emit = defineEmits(["change"]);

const inputValue = "";
</script>

<template>
  <div>
    <label class="block text-lg font-medium text-gray-500 mb-2 px-1 tracking-wider">{{ labelTxt }}</label>
    <input
      type="text"
      v-model="inputValue"
      @change="emit('change', inputValue)"
      required="true"
      :disabled="disabled"
      class="block w-full text-base rounded-md border-0 py-2 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-blatantColor/70 outline-none"
    />
  </div>
</template>
