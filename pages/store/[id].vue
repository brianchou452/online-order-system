<script lang="ts" setup>
import { collection } from 'firebase/firestore';
import { useCurrentUser } from 'vuefire';
import type { Product } from '~/components/ProductRow.vue';

const user = useCurrentUser()
const db = useFirestore()
const route = useRoute()

const storeId = route.params.id as string


interface Category {
  name: string
}

// const storeRef = dbRef(db, 'store')

const categories = useCollection<Category>(collection(db, 'stores', storeId, 'categorise')) // fix typo
const products = useCollection<Product>(collection(db, 'stores', storeId, 'menus'))

console.log("storeId", storeId)
console.log("user", user)

const headers = categories.value.map((category) => {
  return {
    label: category.name,
    to: `#${category.name}-${category.id}`
  }
})

</script>

<template>
  <main>
    <UHorizontalNavigation :links="headers" class="border-b border-gray-200 dark:border-gray-800" />
    <section v-for="category in categories">
      <h2 v-bind:id="`${category.name}-${category.id}`">{{ category.name }}</h2>
      <div v-for="product in products.filter(
        (product) => product.categoryID === category.id
      )">
        <ProductRow :product="product" />
        <UDivider size="2xs" />
      </div>
      <UDivider size="sm" />
    </section>

  </main>
</template>
