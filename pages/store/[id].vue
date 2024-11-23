<script lang="ts" setup>
import { collection, doc } from "firebase/firestore";
import { useCurrentUser } from "vuefire";
import type { Store } from "~/interfaces/store";
import type { Item } from "~/stores/cart";

const user = useCurrentUser();
const db = useFirestore();
const route = useRoute();
const cart = useCartStore();

const storeId = route.params.id as string;
cart.storeID = storeId;

interface Category {
  name: string;
}

const storeRef = computed(() => doc(db, "stores", storeId));
const store = useDocument<Store>(storeRef);
const categories = useCollection<Category>(
  collection(db, "stores", storeId, "categories")
);
const products = useCollection<Item>(
  collection(db, "stores", storeId, "menus")
);

console.log("user", user);

const headers = categories.value.map((category) => {
  return {
    label: category.name,
    to: `#${category.name}-${category.id}`,
    active: false,
  };
});

const activeLink = ref("");

const handleScroll = () => {
  const sections = document.querySelectorAll("section");
  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 60) {
      currentSection = section.getAttribute("id") ?? "";
    }
  });
  activeLink.value = currentSection;
  console.log("activeLink", activeLink.value);
  headers.forEach((header) => {
    if (header.to === `#${activeLink.value}`) {
      header.active = true;
    } else {
      header.active = false;
    }
  });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <main>
    <h2 class="text-3xl font-extrabold dark:text-white my-8 mx-4">
      {{ store?.name }}
    </h2>

    <UHorizontalNavigation
      :links="headers"
      class="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-stone-900"
      :ui="{
        container: 'flex-nowrap items-center overflow-x-scroll no-scrollbar',
        inner: '',
      }"
    >
    </UHorizontalNavigation>
    <UContainer>
      <section
        v-for="category in categories"
        v-bind:id="`${category.name}-${category.id}`"
        class="py-5"
      >
        <h2 class="text-3xl font-extrabold dark:text-white my-8">
          {{ category.name }}
        </h2>
        <UDivider size="sm" />
        <div
          v-for="product in products.filter(
            (product) => product.categoryID === category.id
          )"
        >
          <ProductRow
            :product="product"
            :addToCart="cart.addItem"
            :removeFromCart="cart.removeItem"
            :showMinus="cart.hasItem"
          />
        </div>
      </section>
      <UButton label="Open" @click="cart.isOpen = true" />
    </UContainer>
    <UModal v-model="cart.isOpen" fullscreen>
      <Cart />
    </UModal>
  </main>
</template>
