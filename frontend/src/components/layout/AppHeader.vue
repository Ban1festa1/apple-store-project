<script setup>
import { ref } from "vue";

import logoCyber from "../../assets/images/Logo.svg";
import heartIcon from "../../assets/icons/heart.svg";
import cartIcon from "../../assets/icons/cart.svg";

defineProps({
  hasBorder: {
    type: Boolean,
    default: false,
  },
});

const searchQuery = ref("");
</script>

<template>
  <header class="header" :class="{ 'header--border': hasBorder }">
    <div class="header__inner">
      <RouterLink class="header__logo" to="/">
        <img :src="logoCyber" alt="Cyber" />
      </RouterLink>

      <label class="header__search">
        <svg
          class="header__search-icon"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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

        <input
          v-model="searchQuery"
          class="header__search-input"
          type="search"
          placeholder="Search"
        />
      </label>

      <nav class="header__actions">
        <RouterLink
          class="header__action"
          to="/favorites"
          aria-label="Избранное"
        >
          <img :src="heartIcon" alt="Избранное" />
        </RouterLink>

        <RouterLink class="header__action" to="/cart" aria-label="Корзина">
          <img :src="cartIcon" alt="Корзина" />
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  height: 88px;
  background-color: #ffffff;
}

.header--border {
  border-bottom: 1px solid #d4d4d4;
}

.header__inner {
  width: 100%;
  max-width: 1128px;
  height: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header__logo {
  display: flex;
  align-items: center;
  width: 96px;
}

.header__logo img {
  display: block;
  width: 96px;
  height: auto;
}

.header__search {
  width: 372px;
  height: 56px;
  padding: 0 16px;

  display: flex;
  align-items: center;
  gap: 8px;

  background-color: #f5f5f5;
  border-radius: 8px;
}

.header__search-icon {
  flex-shrink: 0;
}

.header__search-input {
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;

  font-size: 14px;
  font-style: italic;
  color: #111111;
}

.header__search-input::placeholder {
  color: #989898;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.header__action {
  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.header__action img {
  display: block;
  width: 32px;
  height: 32px;
}
</style>
