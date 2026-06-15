<script setup>
import { computed, onMounted, ref } from "vue";

import { getProducts } from "../services/productService";
import { useCartStore } from "../store/cartStore";
import AppFooter from "../components/layout/AppFooter.vue";

const products = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

const promoCode = ref("");
const bonusCard = ref("");

const {
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setCartItems,
} = useCartStore();

const tax = 50;
const shipping = 29;

const cartProducts = computed(() => {
  return cart.value
    .map((cartItem) => {
      const product = products.value.find(
        (item) => item.id === cartItem.productId,
      );

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: cartItem.quantity,
        imageUrl: `http://localhost:1452/${product.images?.[0] || ""}`,
        finalPrice: product.discount_price || product.price,
      };
    })
    .filter(Boolean);
});

const subtotal = computed(() => {
  return cartProducts.value.reduce((sum, product) => {
    return sum + product.finalPrice * product.quantity;
  }, 0);
});

const total = computed(() => {
  if (cartProducts.value.length === 0) {
    return 0;
  }

  return subtotal.value + tax + shipping;
});

function formatPrice(value) {
  return `$${value}`;
}

function getProductCode(product) {
  return `#${product.id}${product.price}${product.guarantee || 12}${product.count_review || 0}`;
}

function createDemoCart(data) {
  if (cart.value.length > 0) {
    return;
  }

  const demoProducts = [
    data.find((item) => item.name.toLowerCase().includes("iphone 14 pro max")),
    data.find((item) => item.name.toLowerCase().includes("airpods max silver")),
    data.find((item) =>
      item.name.toLowerCase().includes("apple watch series 9"),
    ),
  ].filter(Boolean);

  if (demoProducts.length === 0) {
    return;
  }

  setCartItems(
    demoProducts.map((product) => ({
      productId: product.id,
      quantity: 1,
    })),
  );
}

onMounted(async () => {
  try {
    const data = await getProducts();

    products.value = data;
    createDemoCart(data);
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <main class="cart-page">
    <section class="cart">
      <div class="cart__inner">
        <p v-if="isLoading" class="cart__message">Загрузка корзины...</p>

        <p v-else-if="errorMessage" class="cart__message">
          {{ errorMessage }}
        </p>

        <template v-else>
          <section class="cart-list">
            <h1 class="cart-list__title">Shopping Cart</h1>

            <p v-if="cartProducts.length === 0" class="cart__message">
              Корзина пустая
            </p>

            <div v-else class="cart-list__items">
              <article
                v-for="product in cartProducts"
                :key="product.id"
                class="cart-item"
              >
                <RouterLink
                  class="cart-item__image"
                  :to="`/product/${product.id}`"
                >
                  <img :src="product.imageUrl" :alt="product.name" />
                </RouterLink>

                <div class="cart-item__info">
                  <RouterLink
                    class="cart-item__title"
                    :to="`/product/${product.id}`"
                  >
                    {{ product.name }}
                  </RouterLink>

                  <p class="cart-item__code">
                    {{ getProductCode(product) }}
                  </p>
                </div>

                <div class="cart-item__quantity">
                  <button
                    class="cart-item__quantity-button"
                    type="button"
                    @click="decreaseQuantity(product.id)"
                  >
                    −
                  </button>

                  <span class="cart-item__quantity-value">
                    {{ product.quantity }}
                  </span>

                  <button
                    class="cart-item__quantity-button"
                    type="button"
                    @click="increaseQuantity(product.id)"
                  >
                    +
                  </button>
                </div>

                <p class="cart-item__price">
                  {{ formatPrice(product.finalPrice * product.quantity) }}
                </p>

                <button
                  class="cart-item__remove"
                  type="button"
                  aria-label="Удалить товар"
                  @click="removeFromCart(product.id)"
                >
                  ×
                </button>
              </article>
            </div>
          </section>

          <aside class="order-summary">
            <h2 class="order-summary__title">Order Summary</h2>

            <label class="order-summary__label">
              <span>Discount code / Promo code</span>

              <input v-model="promoCode" type="text" placeholder="Code" />
            </label>

            <label class="order-summary__label">
              <span>Your bonus card number</span>

              <div class="order-summary__bonus">
                <input
                  v-model="bonusCard"
                  type="text"
                  placeholder="Enter Card Number"
                />

                <button type="button">Apply</button>
              </div>
            </label>

            <div class="order-summary__rows">
              <div class="order-summary__row order-summary__row--main">
                <span>Subtotal</span>
                <strong>{{ formatPrice(subtotal) }}</strong>
              </div>

              <div class="order-summary__row">
                <span>Estimated Tax</span>
                <strong>{{
                  formatPrice(cartProducts.length ? tax : 0)
                }}</strong>
              </div>

              <div class="order-summary__row">
                <span>Estimated shipping &amp; Handling</span>
                <strong>{{
                  formatPrice(cartProducts.length ? shipping : 0)
                }}</strong>
              </div>

              <div class="order-summary__row order-summary__row--main">
                <span>Total</span>
                <strong>{{ formatPrice(total) }}</strong>
              </div>
            </div>

            <button class="order-summary__checkout" type="button">
              Checkout
            </button>
          </aside>
        </template>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<style scoped>
.cart-page {
  width: 100%;
  background-color: #ffffff;
}

.cart {
  width: 100%;
  padding: 112px 0 112px;
  background-color: #ffffff;
}

.cart__inner {
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 536px 536px;
  gap: 56px;
  align-items: flex-start;
}

.cart__message {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-style: italic;
  color: #000000;
}

.cart-list__title {
  margin: 0 0 40px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  color: #000000;
}

.cart-list__items {
  display: flex;
  flex-direction: column;
}

.cart-item {
  min-height: 160px;
  padding: 32px 0;

  display: grid;
  grid-template-columns: 90px 1fr 112px 96px 32px;
  gap: 24px;
  align-items: center;

  border-bottom: 1px solid #d9d9d9;
}

.cart-item:first-child {
  padding-top: 0;
}

.cart-item__image {
  width: 90px;
  height: 90px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-decoration: none;
}

.cart-item__image img {
  max-width: 90px;
  max-height: 90px;
  object-fit: contain;
}

.cart-item__info {
  min-width: 0;
}

.cart-item__title {
  display: block;
  margin-bottom: 8px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  line-height: 24px;
  color: #000000;
  text-decoration: none;
}

.cart-item__code {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: normal;
  line-height: 24px;
  color: #000000;
}

.cart-item__quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.cart-item__quantity-button {
  width: 20px;
  height: 32px;
  padding: 0;

  border: none;
  background-color: transparent;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  line-height: 32px;
  color: #000000;

  cursor: pointer;
}

.cart-item__quantity-value {
  width: 40px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d9d9d9;
  border-radius: 4px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  line-height: 24px;
  color: #000000;
}

.cart-item__price {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-style: italic;
  line-height: 32px;
  color: #000000;
  text-align: right;
}

.cart-item__remove {
  width: 32px;
  height: 32px;
  padding: 0;

  border: none;
  background-color: transparent;

  font-family: Arial, Helvetica, sans-serif;
  font-size: 32px;
  font-weight: 300;
  line-height: 32px;
  color: #000000;

  cursor: pointer;
}

.order-summary {
  width: 536px;
  min-height: 656px;
  padding: 56px 64px;

  border: 1px solid #d9d9d9;
  border-radius: 10px;
  background-color: #ffffff;
}

.order-summary__title {
  margin: 0 0 40px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 24px;
  font-style: italic;
  font-weight: 400;
  line-height: 32px;
  color: #000000;
}

.order-summary__label {
  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-summary__label span {
  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  color: #545454;
}

.order-summary__label input,
.order-summary__bonus input {
  width: 100%;
  height: 56px;
  padding: 0 16px;

  border: 1px solid #9f9f9f;
  border-radius: 7px;
  outline: none;
  background-color: #ffffff;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #000000;
}

.order-summary__label input::placeholder,
.order-summary__bonus input::placeholder {
  color: #979797;
}

.order-summary__bonus {
  position: relative;
}

.order-summary__bonus input {
  padding-right: 104px;
}

.order-summary__bonus button {
  position: absolute;
  top: 12px;
  right: 12px;

  width: 76px;
  height: 32px;

  border: 1px solid #000000;
  border-radius: 6px;
  background-color: transparent;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  color: #000000;

  cursor: pointer;
}

.order-summary__rows {
  margin-top: 32px;
  margin-bottom: 48px;

  display: flex;
  flex-direction: column;
  gap: 24px;
}

.order-summary__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  line-height: 24px;
}

.order-summary__row span {
  font-style: normal;
  color: #545454;
}

.order-summary__row strong {
  font-style: italic;
  font-weight: 400;
  color: #000000;
}

.order-summary__row--main span {
  font-style: italic;
  color: #000000;
}

.order-summary__checkout {
  width: 100%;
  height: 56px;

  border: none;
  border-radius: 6px;
  background-color: #000000;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  line-height: 24px;
  color: #ffffff;

  cursor: pointer;
}

.order-summary__checkout:hover {
  background-color: #2c2c2c;
}
</style>
