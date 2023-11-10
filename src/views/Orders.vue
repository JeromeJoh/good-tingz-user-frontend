<script setup>
import EmptyTip from "@/components/base/EmptyTip.vue";
import TableHeaderCell from "@/components/TableHeaderCell.vue";
import { currency } from "@/assets/constant";

import { CreditCardIcon, ArrowDownRightIcon } from "@heroicons/vue/24/solid";

const orders = [
  {
    id: 1,
    date: "2012-10-10",
    status: "未支付",
    subtotal: 235,
    itemcount: 3,
  },
  {
    id: 2,
    date: "2018-09-10",
    status: "已支付",
    subtotal: 65,
    itemcount: 1,
  },
];
</script>

<template>
  <div class="px-12 py-8 flex flex-col items-center">
    <table class="mt-3 mb-6 col-span-2 h-fit w-full sm:w-4/5">
      <thead class="border-b-[.5px] border-gray-300 text-gray-600">
        <tr class="tracking-widest px-4 whitespace-nowrap">
          <TableHeaderCell field="id"> 编号 </TableHeaderCell>
          <TableHeaderCell field="date"> 时间 </TableHeaderCell>
          <TableHeaderCell field="status"> 状态 </TableHeaderCell>
          <TableHeaderCell field="subtotal"> 总价 </TableHeaderCell>
          <TableHeaderCell field="itemcount"> 商品数 </TableHeaderCell>
          <TableHeaderCell field="action"> 操作 </TableHeaderCell>
        </tr>
      </thead>
      <tbody class="">
        <template v-if="orders.length">
          <tr
            v-for="order in orders"
            :order="order"
            class="border-b-[.5px] my-24"
          >
            <td class="p-4 text-lg font-medium">
              <router-link title="查看订单详情" to="" class="px-2 py-1 flex-shrink-0 hover:text-blatantColor hover:bg-gray-300/60 rounded-md">{{
                "# " + order.id
              }}</router-link>
            </td>
            <td class="p-4 text-lg font-medium">
              {{ order.date }}
            </td>
            <td class="p-4 text-base font-medium">
              <span
                :class="[
                  'px-3 py-1 rounded-full shadow-sm border-[.5px] border-darkerColor',
                  order.status === '已支付' ? 'bg-lighterColor' : 'bg-gray-200',
                ]"
              >
              {{ order.status }}
            </span>
            </td>
            <td class="p-4 text-lg font-medium">
              {{ currency + order.subtotal }}
            </td>
            <td class="p-4 text-lg font-medium">
              {{ order.itemcount }}
            </td>
            <td v-if="!(order.status === '已支付')" class="py-2 text-lg font-medium">
              <form action="/" method="POST">
                <button
                  class="flex justify-center items-center rounded-md text-base px-3 py-2 tracking-wider font-bold hover:bg-gray-300/60 whitespace-nowrap"
                >
                  <CreditCardIcon class="h-5 w-5 mr-2" />
                  立即支付
                </button>
              </form>
            </td>
          </tr>
        </template>
        <EmptyTip v-else text="您暂无任何交易记录。" />
      </tbody>
    </table>
  </div>
</template>
