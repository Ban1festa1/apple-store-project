<script setup>
import { computed, onMounted, ref } from "vue";

import { getProducts } from "../services/productService";
import { useFavoriteStore } from "../store/favoriteStore";
import AppFooter from "../components/layout/AppFooter.vue";

const products = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

const { favorites, setFavorites, hasSavedFavorites } = useFavoriteStore();

const favoriteProducts = computed(() => {
  return favorites.value
    .map((favoriteId) => {
      const product = products.value.find((item) => item.id === favoriteId);

      if (!product) {
        return null;
      }

      return {
        ...product,
        imageUrl: `http://localhost:1452/${product.images?.[0] || ""}`,
      };
    })
    .filter(Boolean);
});

function getProductCode(product) {
  return `#${product.id}${product.price}${product.guarantee || 12}${product.count_review || 0}`;
}

function createDemoFavorites(data) {
  if (hasSavedFavorites()) {
    return;
  }

  const demoProducts = [
    data.find((item) => item.name.toLowerCase().includes("airpods max silver")),
    data.find((item) =>
      item.name.toLowerCase().includes("apple watch series 9"),
    ),
  ].filter(Boolean);

  if (demoProducts.length === 0) {
    return;
  }

  setFavorites(demoProducts.map((product) => product.id));
}

onMounted(async () => {
  try {
    const data = await getProducts();

    products.value = data;
    createDemoFavorites(data);
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="favorites-page">
    <section class="favorites">
      <div class="favorites__inner">
        <h1 class="favorites__title">Favorite</h1>

        <p v-if="isLoading" class="favorites__message">
          Загрузка избранного...
        </p>

        <p v-else-if="errorMessage" class="favorites__message">
          {{ errorMessage }}
        </p>

        <p v-else-if="favoriteProducts.length === 0" class="favorites__message">
          Избранных товаров пока нет
        </p>

        <div v-else class="favorites__list">
          <article
            v-for="product in favoriteProducts"
            :key="product.id"
            class="favorite-item"
          >
            <RouterLink
              class="favorite-item__image"
              :to="`/product/${product.id}`"
            >
              <img :src="product.imageUrl" :alt="product.name" />
            </RouterLink>

            <div class="favorite-item__info">
              <RouterLink
                class="favorite-item__title"
                :to="`/product/${product.id}`"
              >
                {{ product.name }}
              </RouterLink>

              <p class="favorite-item__code">
                {{ getProductCode(product) }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<style scoped>
.favorites-page {
  width: 100%;
  min-height: calc(100vh - 88px);

  display: flex;
  flex-direction: column;

  background-color: #ffffff;
}

.favorites {
  width: 100%;
  flex: 1;
  padding: 112px 0;

  background-color: #ffffff;
}

.favorites__inner {
  width: 100%;
  max-width: 536px;
  margin: 0 auto;
}

.favorites__title {
  margin: 0 0 40px;
  padding-bottom: 40px;

  border-bottom: 1px solid #d9d9d9;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px;
  color: #000000;
}

.favorites__message {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-style: italic;
  color: #000000;
}

.favorites__list {
  display: flex;
  flex-direction: column;
}

.favorite-item {
  min-height: 176px;
  padding: 40px 0;

  display: grid;
  grid-template-columns: 112px 1fr;
  gap: 48px;
  align-items: center;

  border-bottom: 1px solid #d9d9d9;
}

.favorite-item:first-child {
  padding-top: 0;
}

.favorite-item__image {
  width: 112px;
  height: 112px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
}

.favorite-item__image img {
  max-width: 112px;
  max-height: 112px;
  object-fit: contain;
}

.favorite-item__info {
  min-width: 0;
}

.favorite-item__title {
  display: block;
  margin-bottom: 16px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-style: italic;
  font-weight: 400;
  line-height: 32px;
  color: #000000;
  text-decoration: none;
}

.favorite-item__code {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-style: normal;
  line-height: 24px;
  color: #000000;
}
</style>
