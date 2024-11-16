<script lang="ts" setup>
export interface Product {
    categoryID: string
    imageUrl: string
    name: string
    price: number
}

const props = defineProps<{
    product: Product
}>()

function addToCart() {
    // Add to cart logic here
}

</script>


<template>
    <div style="display: flex; align-items: center;">
        <div style="flex: 1;">
            <h3>{{ props.product.name }}</h3>
            <p>Price: ${{ props.product.price.toFixed(2) }}</p>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center;">
            <img :src="props.product.imageUrl" :alt="props.product.name"
                style="border-radius: 10%; width: 6.25rem; height: 6.25rem;" />
            <button @click="addToCart" style="margin-top: 10px;">+</button>
        </div>
    </div>
</template>
