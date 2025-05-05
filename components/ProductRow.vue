<script lang="ts" setup>
import type { Item } from "~/stores/cart";

const props = defineProps<{
  product: Item;
  addToCart: (item: Item) => void;
  removeFromCart: (item: Item) => void;
  showMinus: (item: Item) => boolean;
  quantity: number;
}>();
</script>

<template>
  <UCard class="my-3">
    <div style="display: flex; align-items: center">
      <div style="flex: 1">
        <h3>{{ props.product.name }}</h3>
        <p>${{ props.product.price.toFixed(2) }}</p>
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
          <div class="absolute bottom-2.5 right-0 w-full">
            <div
              class="flex flex-wrap flex-row-reverse items-center justify-evenly"
            >
              <UButton
                @click="props.addToCart(props.product)"
                :ui="{ rounded: 'rounded-full' }"
                icon="i-material-symbols:add"
                class="touch-manipulation"
              />

              <p
                class="w-3"
                v-bind:style="{
                  visibility: props.showMinus(props.product)
                    ? 'visible'
                    : 'hidden',
                }"
              >
                {{ props.quantity }}
              </p>

              <UButton
                @click="props.removeFromCart(props.product)"
                :ui="{ rounded: 'rounded-full' }"
                icon="i-ic:baseline-minus"
                class="touch-manipulation"
                v-bind:style="{
                  visibility: props.showMinus(props.product) ? '' : 'hidden',
                }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
