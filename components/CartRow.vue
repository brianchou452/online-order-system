<script lang="ts" setup>
import type { Item } from "~/stores/cart";

const props = defineProps<{
  product: Item;
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  quantity: number;
}>();
</script>

<template>
  <div class="flex items-center">
    <div class="flex-1">
      <h3>{{ props.product.name }}</h3>
      <p>
        ${{ props.product.price.toFixed(2) }} x {{ props.quantity }} = ${{
          (props.product.price * props.quantity).toFixed(0)
        }}
      </p>
    </div>
    <div class="flex flex-wrap flex-row-reverse items-center justify-evenly">
      <UButton
        @click="props.addToCart(props.product)"
        icon="i-material-symbols:add"
        class="touch-manipulation mx-0.5"
        variant="soft"
        color="gray"
      />
      <UButton
        @click="props.removeFromCart(props.product)"
        icon="i-ic:baseline-minus"
        class="touch-manipulation mx-0.5"
        variant="soft"
        color="gray"
      />
    </div>
  </div>
</template>
