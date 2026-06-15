<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { getProducts } from "../services/productService";
import ProductCard from "../components/product/ProductCard.vue";
import AppFooter from "../components/layout/AppFooter.vue";

const products = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

const selectedBrands = ref(["Apple"]);
const brandSearch = ref("");
const sortType = ref("rating");
const currentPage = ref(1);

const productsPerPage = 9;

const filterGroups = [
  "Battery capacity",
  "Screen type",
  "Screen diagonal",
  "Protection class",
  "Built-in memory",
];

const brands = computed(() => {
  const brandMap = {};

  products.value.forEach((product) => {
    if (!product.brand) {
      return;
    }

    if (!brandMap[product.brand]) {
      brandMap[product.brand] = 0;
    }

    brandMap[product.brand] += 1;
  });

  return Object.entries(brandMap)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
});

const visibleBrands = computed(() => {
  const search = brandSearch.value.trim().toLowerCase();

  if (!search) {
    return brands.value;
  }

  return brands.value.filter((brand) =>
    brand.name.toLowerCase().includes(search),
  );
});

const filteredProducts = computed(() => {
  let result = [...products.value];

  if (selectedBrands.value.length > 0) {
    result = result.filter((product) =>
      selectedBrands.value.includes(product.brand),
    );
  }

  if (sortType.value === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  }

  if (sortType.value === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sortType.value === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  }

  if (sortType.value === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
});

const totalPages = computed(() => {
  return Math.ceil(filteredProducts.value.length / productsPerPage);
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * productsPerPage;
  const end = start + productsPerPage;

  return filteredProducts.value.slice(start, end);
});

const pages = computed(() => {
  const count = totalPages.value;

  if (count <= 5) {
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  return [1, 2, 3, "...", count];
});

function toggleBrand(brandName) {
  if (selectedBrands.value.includes(brandName)) {
    selectedBrands.value = selectedBrands.value.filter(
      (brand) => brand !== brandName,
    );
  } else {
    selectedBrands.value.push(brandName);
  }
}

function setPage(page) {
  if (page === "...") {
    return;
  }

  currentPage.value = page;
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
}

watch([selectedBrands, sortType], () => {
  currentPage.value = 1;
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
  <main class="products-page">
    <div class="products-page__inner">
      <aside class="filters">
        <div class="filters__group filters__group--open">
          <button class="filters__title" type="button">
            <span>Brand</span>

            <span class="filters__arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 14L12 9L17 14"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>

          <label class="filters__search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M10.8 18.1C14.8317 18.1 18.1 14.8317 18.1 10.8C18.1 6.76832 14.8317 3.5 10.8 3.5C6.76832 3.5 3.5 6.76832 3.5 10.8C3.5 14.8317 6.76832 18.1 10.8 18.1Z"
                stroke="#989898"
                stroke-width="2"
              />
              <path
                d="M16.2 16.2L21 21"
                stroke="#989898"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>

            <input v-model="brandSearch" type="search" placeholder="Search" />
          </label>

          <div class="filters__options">
            <label
              v-for="brand in visibleBrands"
              :key="brand.name"
              class="filters__checkbox"
            >
              <input
                type="checkbox"
                :checked="selectedBrands.includes(brand.name)"
                @change="toggleBrand(brand.name)"
              />

              <span class="filters__custom-checkbox"></span>

              <span class="filters__name">
                {{ brand.name }}
              </span>

              <span class="filters__count">
                {{ brand.count }}
              </span>
            </label>
          </div>
        </div>

        <div v-for="group in filterGroups" :key="group" class="filters__group">
          <button class="filters__title" type="button">
            <span>{{ group }}</span>

            <span class="filters__arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 10L12 15L17 10"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </aside>

      <section class="catalog">
        <div class="catalog__top">
          <p class="catalog__count">
            Selected Products: <strong>{{ filteredProducts.length }}</strong>
          </p>

          <select v-model="sortType" class="catalog__sort">
            <option value="rating">By rating</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">By name</option>
          </select>
        </div>

        <p v-if="isLoading" class="catalog__message">Загрузка товаров...</p>

        <p v-else-if="errorMessage" class="catalog__message">
          {{ errorMessage }}
        </p>

        <div v-else class="catalog__grid">
          <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <div
          v-if="!isLoading && !errorMessage && totalPages > 1"
          class="pagination"
        >
          <button class="pagination__arrow" type="button" @click="prevPage">
            ‹
          </button>

          <button
            v-for="page in pages"
            :key="page"
            class="pagination__item"
            :class="{ 'pagination__item--active': currentPage === page }"
            type="button"
            @click="setPage(page)"
          >
            {{ page }}
          </button>

          <button class="pagination__arrow" type="button" @click="nextPage">
            ›
          </button>
        </div>
      </section>
    </div>

    <AppFooter />
  </main>
</template>

<style scoped>
.products-page {
  width: 100%;
  background-color: #ffffff;
}

.products-page__inner {
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;
  padding: 48px 0 80px;

  display: grid;
  grid-template-columns: 256px 1fr;
  gap: 32px;
}

.filters {
  width: 256px;
}

.filters__group {
  border-bottom: 1px solid #b5b5b5;
}

.filters__group--open {
  padding-bottom: 24px;
}

.filters__title {
  width: 100%;
  min-height: 48px;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: none;
  background-color: transparent;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-style: italic;
  font-weight: 400;
  line-height: 24px;
  color: #000000;

  cursor: pointer;
}

.filters__arrow {
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.filters__arrow svg {
  display: block;
}

.filters__search {
  width: 100%;
  height: 40px;
  margin: 16px 0;
  padding: 0 16px;

  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: 8px;
  background-color: #f5f5f5;
}

.filters__search input {
  width: 100%;

  border: none;
  outline: none;
  background-color: transparent;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  line-height: 18px;
  color: #000000;
}

.filters__search input::placeholder {
  color: #929292;
}

.filters__options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filters__checkbox {
  display: flex;
  align-items: center;
  gap: 8px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 15px;
  font-style: italic;
  line-height: 24px;
  color: #000000;

  cursor: pointer;
}

.filters__checkbox input {
  display: none;
}

.filters__custom-checkbox {
  width: 16px;
  height: 16px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d3d3d3;
  border-radius: 3px;
  background-color: #ffffff;
}

.filters__checkbox input:checked + .filters__custom-checkbox {
  border-color: #000000;
  background-color: #000000;
}

.filters__checkbox input:checked + .filters__custom-checkbox::after {
  content: "✓";

  font-size: 11px;
  line-height: 1;
  color: #ffffff;
}

.filters__name {
  color: #000000;
}

.filters__count {
  font-size: 12px;
  color: #929292;
}

.catalog {
  min-width: 0;
}

.catalog__top {
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.catalog__count {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  line-height: 24px;
  color: #929292;
}

.catalog__count strong {
  font-size: 20px;
  color: #000000;
}

.catalog__sort {
  width: 256px;
  height: 40px;
  padding: 0 16px;

  border: 1px solid #d4d4d4;
  border-radius: 8px;
  background-color: #ffffff;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #000000;
}

.catalog__grid {
  display: grid;
  grid-template-columns: repeat(3, 268px);
  gap: 16px;
}

.catalog__message {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  color: #000000;
}

.pagination {
  margin-top: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.pagination__item,
.pagination__arrow {
  min-width: 32px;
  height: 32px;
  padding: 0 10px;

  border: none;
  border-radius: 5px;
  background-color: #f6f6f6;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #000000;

  cursor: pointer;
}

.pagination__arrow {
  background-color: transparent;
  font-size: 24px;
}

.pagination__item--active {
  background-color: #000000;
  color: #ffffff;
}
</style>
