<script setup>
import { computed } from "vue";

import heartIcon from "../../assets/icons/heart.svg";
import { useFavoriteStore } from "../../store/favoriteStore";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  useDiscountPrice: {
    type: Boolean,
    default: false,
  },
});

const { toggleFavorite, isFavorite } = useFavoriteStore();

const imageUrl = computed(() => {
  return `http://localhost:1452/${props.product.images?.[0] || ""}`;
});

const productPrice = computed(() => {
  if (props.useDiscountPrice && props.product.discount_price) {
    return props.product.discount_price;
  }

  return props.product.price;
});

const isFavoriteProduct = computed(() => {
  return isFavorite(props.product.id);
});

function handleFavoriteClick() {
  toggleFavorite(props.product.id);
}
</script>

<template>
  <article class="product-card">
    <button
      class="product-card__favorite"
      :class="{ 'product-card__favorite--active': isFavoriteProduct }"
      type="button"
      aria-label="Добавить в избранное"
      @click="handleFavoriteClick"
    >
      <img :src="heartIcon" alt="" />
    </button>

    <RouterLink class="product-card__image-box" :to="`/product/${product.id}`">
      <img class="product-card__image" :src="imageUrl" :alt="product.name" />
    </RouterLink>

    <RouterLink class="product-card__title" :to="`/product/${product.id}`">
      {{ product.name }}
    </RouterLink>

    <p class="product-card__price">{{ productPrice }} ₽</p>

    <RouterLink class="product-card__button" :to="`/product/${product.id}`">
      Buy Now
    </RouterLink>
  </article>
</template>

<style scoped>
.product-card {
  position: relative;

  width: 268px;
  min-height: 432px;
  padding: 24px 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 9px;
  background-color: #f6f6f6;
}

.product-card__favorite {
  position: absolute;
  top: 24px;
  right: 24px;

  width: 32px;
  height: 32px;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background-color: transparent;
  cursor: pointer;
}

.product-card__favorite img {
  width: 32px;
  height: 32px;
  opacity: 0.45;
}

.product-card__favorite--active img {
  opacity: 1;
  filter: invert(17%) sepia(99%) saturate(7464%) hue-rotate(358deg)
    brightness(101%) contrast(111%);
}

.product-card__image-box {
  width: 160px;
  height: 160px;
  margin-top: 40px;
  margin-bottom: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
}

.product-card__image {
  max-width: 160px;
  max-height: 160px;
  object-fit: contain;
}

.product-card__title {
  min-height: 72px;
  margin: 0 0 16px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  line-height: 24px;
  color: #000000;
  text-align: center;
  text-decoration: none;
}

.product-card__price {
  margin: 0 0 24px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 24px;
  color: #000000;
}

.product-card__button {
  width: 188px;
  height: 48px;
  margin-top: auto;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 8px;
  background-color: #000000;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  color: #ffffff;
  text-decoration: none;

  cursor: pointer;
}

.product-card__button:hover {
  background-color: #2c2c2c;
}
</style>
