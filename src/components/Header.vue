<script setup lang="ts">
import store from "@/store";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

// TODO: 点击后关闭(active?) | Cart Itemcount 

import {
  UserIcon as UserSolid,
  ShoppingCartIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
  XMarkIcon,
  UserIcon,
  ClipboardIcon,
  ArrowLeftCircleIcon,
  HomeIcon,
} from "@heroicons/vue/24/solid";

import {
  UserIcon as UserOutline,
  ArrowLeftOnRectangleIcon,
  RectangleStackIcon,
  Bars3BottomLeftIcon,
} from "@heroicons/vue/24/outline";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import Tooltip from "./Tooltip.vue";

const sidebarOpened = ref<boolean>(false);
const sidebarNeeded = ref<boolean>(false);

const updateSidebarState = () => {
  sidebarNeeded.value = window.innerWidth < 668;
};

const handleSidebarClick = () => (sidebarOpened.value = !sidebarOpened.value);

onMounted(() => {
  updateSidebarState();
  window.addEventListener("resize", updateSidebarState);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSidebarState);
});

const currentUser = computed(() => store.state.user.data);

function logout() {
  sidebarOpened.value = false;
  store.dispatch("logout");
  store.commit("showToast", "您已退出登录。");
}

watch(currentUser, () => {
  console.log(store.state.user.data);
});
</script>

<template>
  <header
    id="header"
    class="w-full flex justify-between items-center py-3 px-8"
  >
    <!-- Logo -->
    <router-link :to="{ name: 'app.home' }">
      <div class="font-jost flex items-center cursor-pointer">
        <div class="leading-8 tracking-wide text-xl font-bold">
          <p>GOOD</p>
          <p>TINGZ</p>
        </div>
      </div>
    </router-link>

    <!-- Navigation-->
    <div
      v-if="!sidebarNeeded"
      class="flex items-center gap-x-4 px-2 py-1 tracking-widest"
    >
      <nav class="flex gap-x-4 items-center">
        <Tooltip text="商城">
          <router-link :to="{ name: 'app.products' }">
            <ShoppingBagIcon class="h-7" />
          </router-link>
        </Tooltip>
        <Tooltip text="购物车">
          <router-link :to="{ name: 'cart' }">
            <ShoppingCartIcon class="h-7" />
          </router-link>
        </Tooltip>

        <!-- Account -->
        <Menu
          v-if="currentUser?.id"
          as="div"
          class="relative inline-block pl-4 border-l-[.5px] z-10"
        >
          <MenuButton class="flex items-center">
            <small class="text-lg font-medium">{{ currentUser?.name }}</small>
            <ChevronDownIcon class="h-4 w-4 ml-1 mt-[1px]" aria-hidden="true" />
          </MenuButton>

          <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              @click=""
              class="absolute right-0 mt-2 w-36 p-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <MenuItem v-slot="{ active }">
                <router-link :to="{ name: 'app.profile', params: { id: 1 } }">
                  <button
                    :class="[
                      active ? 'bg-blatantColor text-white' : '',
                      'group flex w-full items-center rounded-md p-2 text-base tracking-wider',
                    ]"
                  >
                    <UserOutline
                      :active="active"
                      class="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    账号详情
                  </button>
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{ name: 'app.orders' }">
                  <button
                    :class="[
                      active ? 'bg-blatantColor text-white' : '',
                      'group flex w-full items-center rounded-md p-2 text-base tracking-wider',
                    ]"
                  >
                    <RectangleStackIcon
                      :active="active"
                      class="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    订单记录
                  </button>
                </router-link>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <router-link :to="{ name: 'app.home' }">
                  <button
                    @click="logout"
                    :class="[
                      active ? 'bg-blatantColor text-white' : '',
                      'group flex w-full items-center rounded-md p-2 text-base tracking-wider',
                    ]"
                  >
                    <ArrowLeftOnRectangleIcon
                      :active="active"
                      class="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    退出登录
                  </button>
                </router-link>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>

        <!-- Guest -->
        <Tooltip v-else text="登录">
          <router-link :to="{ name: 'login' }">
            <UserSolid class="h-7" />
          </router-link>
        </Tooltip>
      </nav>
    </div>

    <!-- Sidebar-->
    <template v-else>
      <Bars3BottomLeftIcon
        @click="handleSidebarClick"
        class="w-10 h-10 p-1 rounded transition-all hover:bg-gray-200"
      />
      <aside
        :class="[
          'fixed z-40 left-0 right-0 py-20 px-8 shadow-sm rounded-b-lg bg-gray-100 grid place-items-center gap-y-4 transition-all',
          sidebarOpened ? 'top-0' : '-top-full',
        ]"
      >
        <router-link
          @click="sidebarOpened = false"
          :to="{ name: 'app.home' }"
          class="w-full pb-4 px-12 select-none rounded flex justify-between items-center hover:bg-gray-300 py-4 border-b-[.5px]"
        >
          <HomeIcon class="w-8 h-8 mr-2" />
          <span class="text-xl font-bold tracking-widest">主页</span>
        </router-link>
        <router-link
          @click="sidebarOpened = false"
          :to="{ name: 'app.products' }"
          class="w-full pb-4 px-12 select-none rounded flex justify-between items-center hover:bg-gray-300 py-4 border-b-[.5px]"
        >
          <ShoppingBagIcon class="w-8 h-8 mr-2" />
          <span class="text-xl font-bold tracking-widest">商城</span>
        </router-link>
        <router-link
          @click="sidebarOpened = false"
          :to="{ name: 'cart' }"
          class="w-full pb-4 px-12 select-none rounded flex justify-between items-center hover:bg-gray-300 py-4 border-b-[.5px]"
        >
          <ShoppingCartIcon class="w-8 h-8 mr-2" />
          <span class="text-xl font-bold tracking-widest">购物车</span>
        </router-link>
        <template v-if="!currentUser?.id">
          <router-link
            @click="sidebarOpened = false"
            :to="{ name: 'login' }"
            class="w-full pb-4 px-12 select-none rounded flex justify-between items-center hover:bg-gray-300 py-4 border-b-[.5px]"
          >
            <UserIcon class="w-8 h-8 mr-2" />
            <span class="text-xl font-bold tracking-widest">登录</span>
          </router-link>
        </template>
        <template v-else>
          <router-link
            @click="sidebarOpened = false"
            :to="{ name: 'app.profile', params: { id: 1 } }"
            class="w-full pb-4 px-12 select-none rounded flex justify-between items-center hover:bg-gray-300 py-4 border-b-[.5px]"
          >
            <UserIcon class="w-8 h-8 mr-2" />
            <span class="text-xl font-bold tracking-widest">账号详情</span>
          </router-link>
          <router-link
            @click="sidebarOpened = false"
            :to="{ name: 'app.orders' }"
            class="w-full pb-4 px-12 select-none rounded flex justify-between items-center hover:bg-gray-300 py-4 border-b-[.5px]"
          >
            <ClipboardIcon class="w-8 h-8 mr-2" />
            <span class="text-xl font-bold tracking-widest">订单记录</span>
          </router-link>
          <router-link
            @click="logout"
            :to="{ name: 'app.home' }"
            class="w-full pb-4 px-12 select-none rounded flex justify-between items-center hover:bg-gray-300 py-4 border-b-[.5px]"
          >
            <ArrowLeftCircleIcon class="w-8 h-8 mr-2" />
            <span class="text-xl font-bold tracking-widest">退出登录</span>
          </router-link>
        </template>

        <XMarkIcon
          @click="handleSidebarClick"
          class="absolute z-50 top-6 right-7 w-10 h-10 p-1 rounded transition-all hover:bg-gray-200"
        />
      </aside>
    </template>
  </header>
</template>
