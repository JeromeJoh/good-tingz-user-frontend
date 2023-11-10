<script setup lang="ts">
import store from "@/store";
import router from "@/router";

import GuestLayout from "../components/GuestLayout.vue";
import { BaseInput, BaseSubmitButton, ErrorTip } from "@/components/base";

import { ref } from 'vue';

// TODO: remember-me bug


export interface IUser {
  email: string,
  password: string,
  remember: boolean,
}

const user: IUser = {
  email: "",
  password: "",
  remember: false
};


let loading = ref<boolean>(false);
let errorMsg = ref<string>('');

function setEmailAddress(value: string) {
  user.email = value;
}

function setPassword(value: string) {
  user.password = value;
}

function login(): void {
  loading.value = true;
  store.dispatch('login', user)
    .then(() => {
      router.push({name: 'app.home'});
      store.commit('showToast', '您已成功登录！');
    })
    .catch(({ message }) => {
      errorMsg.value = message;
    })
    .finally(() => {
      loading.value = false;
    })
}
</script>
<template>
  <GuestLayout title="登录">
    <div class="mx-auto max-w-full w-2/3 sm:w-1/2 md:w-1/3">
      <router-link
        :to="{ name: 'signup' }"
        class="block w-full text-center tracking-wider text-gray-500"
      >
        新顾客吗？<span class="text-blatantColor hover:text-opacity-80">创建您自己的账号</span>
      </router-link>
      <form class="space-y-6" method="POST" @submit.prevent="login">
        <ErrorTip :error-msg="errorMsg"/>
        <BaseInput category="email" labelTxt="邮箱" @change="setEmailAddress"/>
        <BaseInput category="password" labelTxt="密码" @change="setPassword" />

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              v-model="user.remember"
              class="h-4 w-4 rounded"
            />
            <label for="remember-me" class="ml-2 block text-base">
              记住密码
            </label>
          </div>

          <div class="text-base">
            <router-link
              :to="{ name: 'requestPassword' }"
              class="font-medium text-blatantColor hover:text-opacity-80"
            >
              忘记密码？
            </router-link>
          </div>
        </div>

        <BaseSubmitButton button-txt="登录" :loading="loading" />
      </form>
    </div>
  </GuestLayout>
</template>