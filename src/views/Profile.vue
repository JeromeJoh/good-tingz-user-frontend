<script setup>
import store from "@/store";
import { onMounted, ref } from "vue";
import FormInput from "@/components/form/FormInput.vue";
import FormSubmitButton from "@/components/form/FormSubmitButton.vue";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const profileData = ref(null);

// TODO: loading submit

onMounted(() => {
  store.dispatch("getProfile", store.state.user.data).then((data) => {
    console.log(data);
    profileData.vale = data;
  });
});

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];
const selectedPerson = ref(people[0]);
</script>

<template>
  <div class="px-12 py-8 grid md:grid-cols-2 grid-cols-1 gap-12">
    <form class="px-6 py-4 mb-24 flex flex-col gap-y-12">
      <div class="flex flex-col gap-y-4">
        <h1 class="md:text-2xl text-xl border-b-[.5px] py-4 my-2 tracking-wider">账号信息</h1>
        <div class="grid grid-cols-2 gap-x-4">
          <FormInput label-txt="姓" />
          <FormInput label-txt="名" />
        </div>
        <FormInput label-txt="邮箱" />
        <FormInput label-txt="密码" disabled />
      </div>
      <div class="flex flex-col gap-y-4">
        <h1 class="md:text-2xl text-xl border-b-[.5px] py-4 my-2 tracking-wider">账单地址</h1>
        <FormInput label-txt="地址名" />
        <FormInput label-txt="邮政编码" />
        <div v-if="1">
          <label
            class="block text-lg font-medium mb-2 text-gray-500 px-1 tracking-wider"
            >所在州</label
          >
          <div class="font-sans">
            <Listbox v-model="selectedPerson">
              <div class="relative mt-1">
                <ListboxButton
                  class="relative text-base w-full rounded-md bg-[#fff] py-2 px-3 text-left shadow-sm outline-none ring-1 ring-inset ring-gray-200"
                >
                  <span class="block truncate">{{ selectedPerson.name }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ChevronUpDownIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="person in people"
                      :key="person.name"
                      :value="person"
                      as="template"
                      class="text-base"
                    >
                      <li
                        :class="[
                          active
                            ? 'bg-primaryColor'
                            : 'text-black',
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]"
                      >
                        <span
                          :class="[
                            selected ? 'font-medium' : 'font-normal',
                            'block truncate',
                          ]"
                          >{{ person.name }}</span
                        >
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3 text-blatantColor"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-y-4">
        <h1 class="md:text-2xl text-xl border-b-[.5px] py-4 my-2 tracking-wider">邮寄地址</h1>
        <FormInput label-txt="地址名" />
        <FormInput label-txt="邮政编码" />
        <div v-if="1">
          <label
            class="block text-lg font-medium mb-2 text-gray-500 px-1 tracking-wider"
            >所在州</label
          >
          <div class="font-sans">
            <Listbox v-model="selectedPerson">
              <div class="relative mt-1">
                <ListboxButton
                  class="relative text-base w-full rounded-md bg-[#fff] py-2 px-3 text-left shadow-sm outline-none ring-1 ring-inset ring-gray-200"
                >
                  <span class="block truncate">{{ selectedPerson.name }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ChevronUpDownIcon
                      class="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </ListboxButton>

                <transition
                  leave-active-class="transition duration-100 ease-in"
                  leave-from-class="opacity-100"
                  leave-to-class="opacity-0"
                >
                  <ListboxOptions
                    class="absolute mt-1 max-h-60 z-30 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption
                      v-slot="{ active, selected }"
                      v-for="person in people"
                      :key="person.name"
                      :value="person"
                      as="template"
                      class="text-base"
                    >
                      <li
                        :class="[
                          active
                            ? 'bg-primaryColor'
                            : 'text-black',
                          'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]"
                      >
                        <span
                          :class="[
                            selected ? 'font-medium' : 'font-normal',
                            'block truncate',
                          ]"
                          >{{ person.name }}</span
                        >
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3 text-blatantColor"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>
      <FormSubmitButton button-txt="保存更新" />
    </form>
    <form class="px-6 py-4 flex flex-col gap-y-8">
      <div class="flex flex-col gap-y-4">
        <h1 class="md:text-2xl text-xl border-b-[.5px] py-4 my-2 tracking-wider">修改密码</h1>
        <FormInput label-txt="旧密码" />
        <FormInput label-txt="新密码" />
        <FormInput label-txt="确认密码" />
      </div>
      <FormSubmitButton button-txt="确认修改" />
    </form>
  </div>
</template>