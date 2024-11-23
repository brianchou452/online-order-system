<script setup>
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();

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
    <div v-if="cartStore.cartItems.length === 0">您的購物車是空的</div>
    <div v-else>
      <ul>
        <li v-for="item in cartStore.cartItems" :key="item.imagekey">
          {{ item.name }} - {{ item.quantity }} x {{ item.price }} 元
        </li>
      </ul>
    </div>
    <template #footer>
      <div>總金額: {{ cartStore.totalAmount }} 元</div>
      <UButton color="primary" @click="checkout" class="w-full">結帳</UButton>
    </template>
  </UCard>
</template>
