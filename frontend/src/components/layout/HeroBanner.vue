<script setup>
import heroIphone from "../../assets/images/hero-iphone.png";
</script>

<template>
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__content">
        <p class="hero__label">Pro.Beyond.</p>

        <h1 class="hero__title">IPhone 14 Pro</h1>

        <p class="hero__description">
          Created to change everything for the better. For everyone
        </p>

        <RouterLink class="hero__button" to="/products"> Shop Now </RouterLink>
      </div>

      <img class="hero__image" :src="heroIphone" alt="IPhone 14 Pro" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  width: 100%;
  height: 632px;
  overflow: hidden;

  background-color: #211c24;
}

.hero__inner {
  position: relative;

  width: 100%;
  max-width: 1128px;
  height: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;
}

.hero__content {
  position: relative;
  z-index: 2;

  width: 714px;
}

.hero__label {
  margin: 0 0 24px;

  font-size: 25px;
  line-height: 32px;
  color: #ffffff;
  opacity: 0.4;
}

.hero__title {
  margin: 0 0 24px;

  font-size: 96px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: -2px;
  color: #ffffff;
}

.hero__description {
  margin: 0 0 32px;

  font-size: 18px;
  font-style: italic;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.6;
}

.hero__button {
  width: 188px;
  height: 56px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #ffffff;
  border-radius: 6px;
  background-color: transparent;

  font-size: 16px;
  font-style: italic;
  line-height: 24px;
  color: #ffffff;

  cursor: pointer;
}

.hero__button:hover {
  background-color: #ffffff;
  color: #211c24;
}

.hero__image {
  position: absolute;
  right: 0;
  bottom: 0;

  width: 406px;
  height: 632px;
  object-fit: contain;
  object-position: bottom right;
}
</style>
