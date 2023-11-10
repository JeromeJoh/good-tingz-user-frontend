<script setup>
import { onMounted, computed, ref } from "vue";
import EmptyTip from "@/components/base/EmptyTip.vue";
import {
  ChevronLeftIcon,
  XMarkIcon,
  CalculatorIcon,
} from "@heroicons/vue/24/solid";

import { get } from "@/http";
import store from "@/store";
import TableHeaderCell from "@/components/TableHeaderCell.vue";
import { currency, EXAMPLE_PRODUCTS } from "@/assets/constant";


const shippingFee = ref(0);

const total = computed(() => 0);
const count = computed(() => 0);

const eproducts = EXAMPLE_PRODUCTS;
const products = computed(() => store.state.products);


onMounted(() => {
  getCartItems();
});

function getCartItems() {
  get("/cart").then((res) => {
    console.log(res);
  });
}

// TODO: checkout functionality
function checkout() {
  console.log('checkout');
}

function upadateQuantity(val) {}
</script>

<template>
  <div class="flex-1 px-12 py-6 flex flex-col justify-center">
    <router-link :to="{ name: 'app.products' }" class="mt-2 mb-8">
      <button
        class="w-fit flex items-center font-bold pl-7 pr-10 py-2 rounded-full border-[1px] border-gray-300 hover:bg-gray-200"
      >
        <ChevronLeftIcon class="h-5 w-5 text-black mr-1" />
        <span class="text-lg tracking-widest"> 继续购物 </span>
      </button>
    </router-link>

    <section
      class="flex-1 max-h-full gap-x-8 grid md:grid-cols-3 grid-cols-1 px-4"
    >
      <!-- Cart Table -->
      <table class="mt-3 mb-6 col-span-2 h-fit">
        <thead class="border-b-[.5px] border-gray-300 text-gray-600">
          <tr class="tracking-widest px-4 whitespace-nowrap">
            <TableHeaderCell field="title"> 商品 </TableHeaderCell>
            <TableHeaderCell field="price"> 数量 </TableHeaderCell>
            <TableHeaderCell field="quantity" class="hidden md:table-cell">
              小计
            </TableHeaderCell>
            <TableHeaderCell field="actions"></TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          <template v-if="eproducts.length">
            <tr
              v-for="product in eproducts"
              :product="product"
              class="border-b-[.5px]"
            >
              <td class="py-8 flex justify-start items-center">
                <router-link to="" class="flex-shrink-0"
                  ><img
                    v-if="product.imageUrl"
                    class="w-28 h-28 object-contain"
                    :src="product.imageUrl"
                    :alt="product.title" />
                  <img
                    v-else
                    class="w-20 h-20 object-contain"
                    src="../../assets/noimage.png"
                /></router-link>
                <p class="flex flex-col ml-4 max-w-[300px] truncate">
                  <span class="text-lg font-bold tracking-wider">
                    {{ product.title }}
                  </span>
                  <span
                    class="flex items-center text-gray-500 text-base mt-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    $ {{ product.price }} each
                    <em class="text-blatantColor mx-2">
                      &times; {{ product.quantity }}</em
                    >
                  </span>
                </p>
              </td>
              <td class="p-2">
                <input
                  type="number"
                  min="1"
                  @change="upadateQuantity($event.target.value)"
                  step="1"
                  v-model="product.quantity"
                  class="w-24 pl-6 pr-2 py-1 rounded-full border-[.5px] shadow-sm text-lg font-medium tracking-wider bg-transparent text-center"
                />
              </td>
              <td class="p-2 text-lg font-medium hidden md:table-cell">
                {{ currency + product.price * product.quantity }}
              </td>
              <td
                class="text-gray-300 hover:text-black cursor-pointer transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </td>
            </tr>
          </template>
          <EmptyTip v-else text="您的购物车目前为空。"/>
        </tbody>
      </table>

      <!-- Checkout -->
      <div
        v-if="eproducts.length"
        class="flex font-jost h-fit tracking-widest flex-col gap-y-8 p-8 mt-16 shadow-sm text-white border-[.5px] rounded-xl bg-gradient-to-t from-[#191f2b] to-[#303c51]"
      >
        <h2
          class="tracking-widest text-3xl font-bold border-white/20 pb-4 border-b-[.5px]"
        >
          账单信息
        </h2>
        <div class="flex flex-col gap-y-2">
          <p class="flex justify-between">
            已购总数<span>{{ count }}</span>
          </p>
          <p class="flex justify-between">
            商品总价<span>{{ currency + total }}</span>
          </p>
          <p class="flex justify-between">
            配送费<span>{{ currency + shippingFee }}</span>
          </p>
        </div>
        <p class="flex justify-between items-end">
          <span class="flex items-center"
            ><CalculatorIcon class="h-5 w-5 mr-1" />总金额</span
          >
          <span class="text-4xl font-bold">{{
            currency + (total + shippingFee)
          }}</span>
        </p>
        <button
          @click="checkout"
          class="mt-8 py-4 font-bold tracking-widest rounded-full bg-[#3e88eb] text-white text-xl hover:bg-opacity-80"
        >
          结 算
        </button>
      </div>
    </section>
  </div>
</template>
