<script setup lang="ts">
import { CloudArrowUpIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  buttonTxt: {
    type: String,
    default: "确认",
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <button
    type="submit"
    :disabled="loading"
    class="my-4 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-bold rounded-md text-white shadow-sm bg-blatantColor hover:bg-opacity-90 focus:outline-none"
  >
    <span class="absolute left-0 inset-y-0 flex items-center pl-3">
      <CloudArrowUpIcon
        class="h-6 w-6 text-white group-hover:text-primaryColor"
        aria-hidden="true"
      />
    </span>
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <span v-else class="group-hover:text-white text-base tracking-widest">{{ buttonTxt }}</span>
  </button>
</template>
