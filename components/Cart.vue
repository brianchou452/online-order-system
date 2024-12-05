<script setup lang="ts">
import { object, string } from "yup";
import { useCartStore } from "~/stores/cart";

const phoneRegExp =
  /(\d{2,3}-?|\(\d{2,3}\))\d{3,4}-?\d{4}|09\d{2}(\d{6}|-\d{3}-\d{3})/;
const schema = object({
  email: string().email("email格式不確").required("必填"),
  name: string().required("必填"),
  phone: string().matches(phoneRegExp, "請檢查電話號碼的格式").required("必填"),
});

const cartStore = useCartStore();
const userStore = useUserStore();
const user = useCurrentUser();
const formRef = ref();

const onCheckoutSubmit = async () => {
  if (formRef.value) {
    await formRef.value.submit();
  }
};

const checkout = async () => {
  console.log("checkout");
  await cartStore.purchaseItems();
  console.log("checkout done");
  cartStore.isOpen = false;
};
</script>

<template>
  <UCard
    :ui="{
      base: 'h-full flex flex-col',
      rounded: '',
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      body: {
        base: 'grow',
      },
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3
          class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
        >
          購物車
        </h3>
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="cartStore.isOpen = false"
        />
      </div>
    </template>

    <div class="w-full flex flex-col gap-y-4">
      <UCard>
        <div v-if="cartStore.cartItems.length === 0">您的購物車是空的</div>
        <div v-else>
          <ul>
            <li v-for="item in cartStore.cartItems" :key="item.imagekey">
              {{ item.name }} - {{ item.quantity }} x {{ item.price }} 元
            </li>
          </ul>
        </div>
      </UCard>

      <UCard>
        <div class="space-y-4">
          <UForm
            :schema="schema"
            :state="userStore"
            class="space-y-4"
            ref="formRef"
            @submit="checkout"
          >
            <UFormGroup label="姓名" name="name">
              <UInput v-model="userStore.name" />
            </UFormGroup>
            <UFormGroup label="Email" name="email">
              <UInput v-model="userStore.email" type="email" />
            </UFormGroup>
            <UFormGroup label="手機" name="phone">
              <UInput v-model="userStore.phone" type="phone" />
            </UFormGroup>
          </UForm>
          <template v-if="!user">
            <UDivider label="OR" />
            <LoginButton />
          </template>
        </div>
      </UCard>
    </div>

    <template #footer>
      <div class="space-y-2">
        <div class="text-2xl">總金額: ${{ cartStore.totalAmount }} 元</div>
        <UButton
          color="primary"
          @click="onCheckoutSubmit"
          block
          size="lg"
          :disabled="cartStore.$state.cartItems.length === 0"
        >
          結帳
        </UButton>
      </div>
    </template>
  </UCard>
</template>
