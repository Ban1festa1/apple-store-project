<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import { getProducts } from "../services/productService";
import ProductCard from "../components/product/ProductCard.vue";
import AppFooter from "../components/layout/AppFooter.vue";

import screenIcon from "../assets/icons/product-details/detail-screen.svg";
import cpuIcon from "../assets/icons/product-details/detail-cpu.svg";
import coresIcon from "../assets/icons/product-details/detail-cores.svg";
import cameraIcon from "../assets/icons/product-details/detail-camera.svg";
import frontCameraIcon from "../assets/icons/product-details/detail-front-camera.svg";
import batteryIcon from "../assets/icons/product-details/detail-battery.svg";
import deliveryIcon from "../assets/icons/product-details/detail-delivery.svg";
import stockIcon from "../assets/icons/product-details/detail-stock.svg";
import guaranteeIcon from "../assets/icons/product-details/detail-guarantee.svg";
import { useCartStore } from "../store/cartStore";
import { useFavoriteStore } from "../store/favoriteStore";

const route = useRoute();

const { addToCart } = useCartStore();

const { toggleFavorite, isFavorite } = useFavoriteStore();

const products = ref([]);
const product = ref(null);
const activeImage = ref("");
const isLoading = ref(true);
const errorMessage = ref("");

const productId = computed(() => {
  return Number(route.params.id);
});

const productImages = computed(() => {
  if (!product.value?.images?.length) {
    return [];
  }

  return product.value.images.map((image) => {
    return `http://localhost:1452/${image}`;
  });
});

const currentPrice = computed(() => {
  if (!product.value) {
    return "";
  }

  return product.value.discount_price || product.value.price;
});

const oldPrice = computed(() => {
  if (!product.value?.discount_price) {
    return "";
  }

  return product.value.price;
});

const isCurrentProductFavorite = computed(() => {
  if (!product.value) {
    return false;
  }

  return isFavorite(product.value.id);
});

const characteristics = computed(() => {
  return product.value?.characteristics || [];
});

const detailRows = computed(() => {
  return characteristics.value.map((item) => ({
    name: item.characteristic,
    value: `${item.value}${item.unit_type && item.unit_type !== "значение" ? ` ${item.unit_type}` : ""}`,
  }));
});

const shortSpecs = computed(() => {
  const specs = [
    {
      label: "Screen size",
      key: "Диагональ",
      icon: screenIcon,
    },
    {
      label: "CPU",
      key: "Процессор",
      icon: cpuIcon,
    },
    {
      label: "Number of Cores",
      key: "Кол-во ядер",
      icon: coresIcon,
    },
    {
      label: "Main camera",
      key: "Камера",
      icon: cameraIcon,
    },
    {
      label: "Front-camera",
      key: "Фронтальная камера",
      icon: frontCameraIcon,
    },
    {
      label: "Battery capacity",
      key: "Аккумулятор",
      icon: batteryIcon,
    },
  ];

  return specs.map((spec) => {
    const found = characteristics.value.find((item) =>
      item.characteristic.toLowerCase().includes(spec.key.toLowerCase()),
    );

    return {
      ...spec,
      value: found
        ? `${found.value}${found.unit_type && found.unit_type !== "значение" ? ` ${found.unit_type}` : ""}`
        : "—",
    };
  });
});

const relatedProducts = computed(() => {
  if (!product.value) {
    return [];
  }

  return products.value
    .filter((item) => item.id !== product.value.id)
    .filter((item) => item.category === product.value.category)
    .slice(0, 4);
});

function changeImage(image) {
  activeImage.value = image;
}

function handleAddToCart() {
  if (!product.value) {
    return;
  }

  addToCart(product.value.id);
}

function handleToggleWishlist() {
  if (!product.value) {
    return;
  }

  toggleFavorite(product.value.id);
}

onMounted(async () => {
  try {
    const data = await getProducts();

    products.value = data;
    product.value = data.find((item) => item.id === productId.value);

    if (!product.value) {
      errorMessage.value = "Товар не найден";
      return;
    }

    activeImage.value = productImages.value[0];
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="product-page">
    <p v-if="isLoading" class="product-page__message">Загрузка товара...</p>

    <p v-else-if="errorMessage" class="product-page__message">
      {{ errorMessage }}
    </p>

    <template v-else>
      <section class="product-hero">
        <div class="product-hero__inner">
          <div class="product-gallery">
            <div class="product-gallery__thumbs">
              <button
                v-for="image in productImages"
                :key="image"
                class="product-gallery__thumb"
                :class="{
                  'product-gallery__thumb--active': activeImage === image,
                }"
                type="button"
                @click="changeImage(image)"
              >
                <img :src="image" :alt="product.name" />
              </button>
            </div>

            <div class="product-gallery__main">
              <img :src="activeImage" :alt="product.name" />
            </div>
          </div>

          <div class="product-info">
            <h1 class="product-info__title">
              {{ product.name }}
            </h1>

            <div class="product-info__prices">
              <span class="product-info__price"> {{ currentPrice }} ₽ </span>

              <span v-if="oldPrice" class="product-info__old-price">
                {{ oldPrice }} ₽
              </span>
            </div>

            <div class="product-info__specs">
              <div
                v-for="spec in shortSpecs"
                :key="spec.label"
                class="spec-card"
              >
                <span class="spec-card__icon">
                  <img :src="spec.icon" :alt="spec.label" />
                </span>

                <span class="spec-card__content">
                  <span class="spec-card__label">
                    {{ spec.label }}
                  </span>

                  <span class="spec-card__value">
                    {{ spec.value }}
                  </span>
                </span>
              </div>
            </div>

            <p class="product-info__description">
              Enhanced capabilities thanks to an enlarged display and work
              without recharging throughout the day. Incredible photos and
              bright lights using the new system with two cameras
              <a href="#details">more...</a>
            </p>

            <div class="product-info__buttons">
              <button
                class="product-info__button product-info__button--outline"
                type="button"
                @click="handleToggleWishlist"
              >
                {{
                  isCurrentProductFavorite
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
                }}
              </button>

              <button
                class="product-info__button product-info__button--black"
                type="button"
                @click="handleAddToCart"
              >
                Add to Card
              </button>
            </div>

            <div class="product-info__advantages">
              <div class="advantage">
                <span class="advantage__icon">
                  <img :src="deliveryIcon" alt="Free Delivery" />
                </span>

                <span>
                  <span class="advantage__label">Free Delivery</span>
                  <strong>1 - 2 day</strong>
                </span>
              </div>

              <div class="advantage">
                <span class="advantage__icon">
                  <img :src="stockIcon" alt="In Stock" />
                </span>

                <span>
                  <span class="advantage__label">In Stock</span>
                  <strong>Today</strong>
                </span>
              </div>

              <div class="advantage">
                <span class="advantage__icon">
                  <img :src="guaranteeIcon" alt="Guaranteed" />
                </span>

                <span>
                  <span class="advantage__label">Guaranteed</span>
                  <strong>1 year</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="details" class="details-section">
        <div class="details-card">
          <h2 class="details-card__title">Details</h2>

          <p class="details-card__text">
            Just as a book is judged by its cover, the first thing you notice
            when you pick up a modern smartphone is the display. Nothing
            surprising, because advanced technologies allow you to practically
            level the display frames and cutouts for the front camera and
            speaker, leaving no room for bold design solutions.
          </p>

          <div class="details-card__table">
            <div
              v-for="row in detailRows"
              :key="row.name"
              class="details-card__row"
            >
              <span>{{ row.name }}</span>
              <strong>{{ row.value }}</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="reviews-section">
        <div class="reviews-section__inner">
          <div class="rating-card">
            <strong>{{ product.rating }}</strong>
            <span>of {{ product.count_review }} reviews</span>

            <div class="rating-card__stars">★★★★★</div>
          </div>
        </div>
      </section>

      <section class="related-section">
        <div class="related-section__inner">
          <h2 class="related-section__title">Related Products</h2>

          <div class="related-section__grid">
            <ProductCard
              v-for="item in relatedProducts"
              :key="item.id"
              :product="item"
            />
          </div>
        </div>
      </section>

      <AppFooter />
    </template>
  </main>
</template>

<style scoped>
.product-page {
  width: 100%;
  background-color: #ffffff;
}

.product-page__message {
  max-width: 1128px;
  margin: 0 auto;
  padding: 80px 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-style: italic;
  color: #000000;
}

.product-hero {
  width: 100%;
  padding: 112px 0 96px;
  background-color: #ffffff;
}

.product-hero__inner {
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 536px 536px;
  gap: 56px;
  align-items: center;
}

.product-gallery {
  display: grid;
  grid-template-columns: 75px 1fr;
  gap: 24px;
  align-items: center;
}

.product-gallery__thumbs {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.product-gallery__thumb {
  width: 75px;
  height: 93px;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 4px;
  background-color: transparent;
  opacity: 0.35;

  cursor: pointer;
}

.product-gallery__thumb--active {
  opacity: 1;
}

.product-gallery__thumb img {
  max-width: 75px;
  max-height: 93px;
  object-fit: contain;
}

.product-gallery__main {
  width: 413px;
  height: 516px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.product-gallery__main img {
  max-width: 413px;
  max-height: 516px;
  object-fit: contain;
}

.product-info {
  min-width: 0;
}

.product-info__title {
  margin: 0 0 24px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 40px;
  font-style: italic;
  font-weight: 400;
  line-height: 40px;
  color: #000000;
}

.product-info__prices {
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  gap: 16px;
}

.product-info__price {
  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 32px;
  font-style: italic;
  line-height: 32px;
  color: #000000;
}

.product-info__old-price {
  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-style: italic;
  line-height: 32px;
  color: #a0a0a0;
  text-decoration: line-through;
}

.product-info__specs {
  margin-bottom: 24px;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.spec-card {
  min-height: 64px;
  padding: 12px 16px;

  display: flex;
  align-items: center;
  gap: 12px;

  border-radius: 7px;
  background-color: #f4f4f4;
}

.spec-card__icon {
  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.spec-card__icon img {
  display: block;
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.spec-card__content {
  display: flex;
  flex-direction: column;
}

.spec-card__label {
  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-style: italic;
  line-height: 16px;
  color: #c4c4c4;
}

.spec-card__value {
  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  line-height: 18px;
  color: #4e4e4e;
}

.product-info__description {
  margin: 0 0 32px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  color: #9d9d9d;
}

.product-info__description a {
  color: #000000;
  text-decoration: underline;
}

.product-info__buttons {
  margin-bottom: 32px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.product-info__button {
  height: 56px;

  border-radius: 6px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  line-height: 24px;

  cursor: pointer;
}

.product-info__button--outline {
  border: 1px solid #000000;
  background-color: #ffffff;
  color: #000000;
}

.product-info__button--black {
  border: 1px solid #000000;
  background-color: #000000;
  color: #ffffff;
}

.product-info__advantages {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.advantage {
  display: flex;
  align-items: center;
  gap: 16px;
}

.advantage__icon {
  width: 56px;
  height: 56px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  border-radius: 11px;
  background-color: #f4f4f4;
}

.advantage__icon img {
  display: block;
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.advantage__label {
  display: block;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  color: #a0a0a0;
}

.advantage strong {
  display: block;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  line-height: 24px;
  color: #000000;
}

.details-section {
  width: 100%;
  padding: 80px 0;
  background-color: #fafafa;
}

.details-card {
  width: 100%;
  max-width: 1040px;
  margin: 0 auto;
  padding: 48px 40px;

  border-radius: 8px;
  background-color: #ffffff;
}

.details-card__title {
  margin: 0 0 32px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-style: italic;
  font-weight: 400;
  line-height: 32px;
  color: #000000;
}

.details-card__text {
  margin: 0 0 32px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  color: #9d9d9d;
}

.details-card__table {
  display: flex;
  flex-direction: column;
}

.details-card__row {
  min-height: 48px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  border-bottom: 1px solid #e5e5e5;
}

.details-card__row span,
.details-card__row strong {
  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  line-height: 20px;
  color: #000000;
}

.details-card__row strong {
  max-width: 320px;
  text-align: right;
}

.reviews-section {
  width: 100%;
  padding: 88px 0 40px;
  background-color: #ffffff;
}

.reviews-section__inner {
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;
}

.rating-card {
  width: 184px;
  height: 192px;
  padding: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-radius: 25px;
  background-color: #fafafa;
}

.rating-card strong {
  margin-bottom: 8px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 56px;
  font-style: italic;
  font-weight: 400;
  line-height: 56px;
  color: #000000;
}

.rating-card span {
  margin-bottom: 16px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 15px;
  font-style: italic;
  line-height: 24px;
  color: #a0a0a0;
}

.rating-card__stars {
  font-size: 24px;
  line-height: 24px;
  color: #ffb547;
  letter-spacing: 2px;
}

.related-section {
  width: 100%;
  padding: 40px 0 88px;
  background-color: #ffffff;
}

.related-section__inner {
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;
}

.related-section__title {
  margin: 0 0 32px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-style: italic;
  font-weight: 400;
  line-height: 32px;
  color: #000000;
}

.related-section__grid {
  display: grid;
  grid-template-columns: repeat(4, 268px);
  gap: 16px;
}
</style>
