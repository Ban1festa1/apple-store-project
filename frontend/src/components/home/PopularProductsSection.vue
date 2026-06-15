<script setup>
import popularProductsImage from "../../assets/images/popular-products.png";
import ipadImage from "../../assets/images/popular-ipad.png";
import samsungImage from "../../assets/images/popular-samsung.png";
import macbookImage from "../../assets/images/popular-macbook.png";

const cards = [
  {
    title: "Popular Products",
    text: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: popularProductsImage,
    theme: "white",
  },
  {
    title: "Ipad Pro",
    text: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: ipadImage,
    theme: "light",
  },
  {
    title: "Samsung Galaxy",
    text: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: samsungImage,
    theme: "gray",
  },
  {
    title: "Macbook Pro",
    text: "iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.",
    image: macbookImage,
    theme: "dark",
  },
];
</script>

<template>
  <section class="popular">
    <article
      v-for="card in cards"
      :key="card.title"
      class="popular-card"
      :class="`popular-card--${card.theme}`"
    >
      <div class="popular-card__image-box">
        <img class="popular-card__image" :src="card.image" :alt="card.title" />
      </div>

      <div class="popular-card__content">
        <h2 class="popular-card__title">
          {{ card.title }}
        </h2>

        <p class="popular-card__text">
          {{ card.text }}
        </p>

        <RouterLink class="popular-card__button" to="/products">
          Shop Now
        </RouterLink>
      </div>
    </article>
  </section>
</template>

<style scoped>
.popular {
  width: 100%;
  max-width: 1440px;
  min-height: 640px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.popular-card {
  min-height: 640px;
  padding: 0 32px 56px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  overflow: hidden;
}

.popular-card--white {
  background-color: #ffffff;
}

.popular-card--light {
  background-color: #f9f9f9;
}

.popular-card--gray {
  background-color: #eaeaea;
}

.popular-card--dark {
  background-color: #2c2c2c;
}

.popular-card__image-box {
  height: 360px;

  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.popular-card__image {
  display: block;
  max-width: 100%;
  max-height: 330px;

  object-fit: contain;
  user-select: none;
  pointer-events: none;
}

.popular-card__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.popular-card__title {
  margin: 0 0 16px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 33px;
  font-style: italic;
  font-weight: 400;
  line-height: 40px;
  color: #000000;
}

.popular-card--dark .popular-card__title {
  color: #ffffff;
}

.popular-card__text {
  max-width: 296px;
  margin: 0 0 32px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  line-height: 24px;
  color: #909090;
}

.popular-card--dark .popular-card__text {
  color: #b5b5b5;
}

.popular-card__button {
  width: 188px;
  height: 56px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #000000;
  border-radius: 6px;
  background-color: transparent;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  line-height: 24px;
  color: #000000;

  cursor: pointer;
}

.popular-card__button:hover {
  background-color: #000000;
  color: #ffffff;
}

.popular-card--dark .popular-card__button {
  border-color: #ffffff;
  color: #ffffff;
}

.popular-card--dark .popular-card__button:hover {
  background-color: #ffffff;
  color: #2c2c2c;
}
</style>
