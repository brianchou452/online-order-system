<script lang="ts" setup>
import type { Item } from "~/stores/cart";

const props = defineProps<{
  product: Item;
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  showMinus: (item: Item) => boolean;
}>();
</script>

<template>
  <UCard class="my-3">
    <div style="display: flex; align-items: center">
      <div style="flex: 1">
        <h3>{{ props.product.name }}</h3>
        <p>Price: ${{ props.product.price.toFixed(2) }}</p>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center">
        <!-- <img
          src="public/sunflower.jpg"
          :alt="props.product.name"
          class="object-cover w-24 h-24 rounded-lg"
        /> -->
        <img
          :src="props.product.imageUrl"
          :alt="props.product.name"
          class="object-cover w-24 h-24 rounded-lg"
        />
        <div class="relative w-full h-full">
          <UButton
            @click="props.addToCart(props.product)"
            class="absolute bottom-2.5 right-1.5"
            :ui="{ rounded: 'rounded-full' }"
            icon="i-material-symbols:add"
          />
          <UButton
            v-if="props.showMinus(props.product)"
            @click="props.removeFromCart(props.product)"
            class="absolute bottom-2.5 right-4.5"
            :ui="{ rounded: 'rounded-full' }"
            icon="i-ic:baseline-minus"
          />
        </div>
      </div>
    </div>
  </UCard>
</template>
