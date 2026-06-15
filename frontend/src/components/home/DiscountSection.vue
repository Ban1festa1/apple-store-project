<script setup>
import { computed, onMounted, ref } from "vue";
import { getProducts } from "../../services/productService";
import ProductCard from "../product/ProductCard.vue";

const products = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

const discountProducts = computed(() => {
  return products.value.filter((product) => product.discount_price).slice(0, 4);
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
  <section class="discounts">
    <div class="discounts__inner">
      <h2 class="discounts__title">Discounts up to -50%</h2>

      <p v-if="isLoading" class="discounts__message">Загрузка товаров...</p>

      <p v-else-if="errorMessage" class="discounts__message">
        {{ errorMessage }}
      </p>

      <div v-else class="discounts__grid">
        <ProductCard
          v-for="product in discountProducts"
          :key="product.id"
          :product="product"
          :use-discount-price="true"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.discounts {
  width: 100%;
  padding: 80px 0;
  background-color: #ffffff;
}

.discounts__inner {
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;
}

.discounts__title {
  margin: 0 0 32px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-style: italic;
  font-weight: 400;
  line-height: 32px;
  color: #000000;
}

.discounts__grid {
  display: grid;
  grid-template-columns: repeat(4, 268px);
  gap: 16px;
}

.discounts__message {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  color: #000000;
}
</style>
