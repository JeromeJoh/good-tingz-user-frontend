<script setup lang="ts">
import store from "@/store";
import router from "@/router";

import GuestLayout from "../components/GuestLayout.vue";
import { BaseInput, BaseSubmitButton, ErrorTip } from "@/components/base";

import { ref } from 'vue';


const user = {
  name: "",
  email: "",
  password: "",
  password_confirmation: ""
};


let loading = ref<boolean>(false);
let errorMsg = ref<string>('');

function setUserName(value: string) {
  user.name = value;
}

function setEmailAddress(value: string) {
  user.email = value;
}

function setPassword(value: string) {
  user.password = value;
}

function confirmPassword(value: string) {
  user.password_confirmation = value;
}

function register(): void {
  loading.value = true;
  store.dispatch('register', user)
    .then(() => {
      router.push({name: 'app.home'});
      store.dispatch('showToast', '您的账户已创建成功，祝您购物愉快！');
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
  <GuestLayout title="注册">
    <div class="mx-auto max-w-full w-2/3 sm:w-1/2 md:w-1/3">
      <router-link
        :to="{ name: 'login' }"
        class="block w-full text-center tracking-wider text-gray-500"
      >
        记起来了？<span class="text-blatantColor hover:text-opacity-80">您有创建过账号</span>
      </router-link>
      <form class="space-y-6" method="POST" @submit.prevent="register">
        <ErrorTip :error-msg="errorMsg"/>
        <BaseInput category="text" labelTxt="名称" @change="setUserName"/>
        <BaseInput category="email" labelTxt="邮箱" @change="setEmailAddress"/>
        <BaseInput category="password" labelTxt="密码" @change="setPassword" />
        <BaseInput category="password" labelTxt="确认密码" @change="confirmPassword" />
        <BaseSubmitButton :loading="loading" />
      </form>
    </div>
  </GuestLayout>
</template>