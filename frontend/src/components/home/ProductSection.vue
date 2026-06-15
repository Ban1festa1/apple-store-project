<script setup>
import { computed, onMounted, ref } from "vue";
import { getProducts } from "../../services/productService";
import ProductCard from "../product/ProductCard.vue";

const products = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");
const activeTab = ref("new");

const tabs = [
  {
    id: "new",
    title: "New Arrival",
  },
  {
    id: "bestseller",
    title: "Bestseller",
  },
  {
    id: "featured",
    title: "Featured Products",
  },
];

const visibleProducts = computed(() => {
  if (activeTab.value === "bestseller") {
    return [...products.value].sort((a, b) => b.rating - a.rating).slice(0, 8);
  }

  if (activeTab.value === "featured") {
    return [...products.value]
      .filter((product) => product.discount_price)
      .slice(0, 8);
  }

  return products.value.slice(0, 8);
});

onMounted(async () => {
  try {
    products.value = await getProducts();
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <section class="products">
    <div class="products__inner">
      <div class="products__tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="products__tab"
          :class="{ 'products__tab--active': activeTab === tab.id }"
          type="button"
          @click="activeTab = tab.id"
        >
          {{ tab.title }}
        </button>
      </div>

      <p v-if="isLoading" class="products__message">Загрузка товаров...</p>

      <p v-else-if="errorMessage" class="products__message">
        {{ errorMessage }}
      </p>

      <div v-else class="products__grid">
        <ProductCard
          v-for="product in visibleProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.products {
  width: 100%;
  padding: 56px 0;
  background-color: #ffffff;
}

.products__inner {
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;
}

.products__tabs {
  margin-bottom: 32px;

  display: flex;
  align-items: center;
  gap: 32px;
}

.products__tab {
  position: relative;

  padding: 0 0 8px;

  border: none;
  background-color: transparent;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  line-height: 24px;
  color: #8b8b8b;

  cursor: pointer;
}

.products__tab--active {
  color: #000000;
}

.products__tab--active::after {
  content: "";

  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  height: 2px;
  background-color: #000000;
}

.products__message {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  color: #000000;
}

.products__grid {
  display: grid;
  grid-template-columns: repeat(4, 268px);
  gap: 16px;
}
</style>
