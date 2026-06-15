<script setup>
import saleRightPhone from "../../assets/images/sale-right-phone.png";
import saleRightWatch from "../../assets/images/sale-right-watch.png";
import saleLeftTop from "../../assets/images/sale-left-top.png";
import saleLeftIpad from "../../assets/images/sale-left-ipad.png";
import saleLeftBottom from "../../assets/images/sale-left-bottom.png";
</script>

<template>
  <section class="sale">
    <img class="sale__image sale__image--left-top" :src="saleLeftTop" alt="" />

    <img
      class="sale__image sale__image--left-ipad"
      :src="saleLeftIpad"
      alt=""
    />

    <img
      class="sale__image sale__image--left-bottom"
      :src="saleLeftBottom"
      alt=""
    />

    <div class="sale__content">
      <h2 class="sale__title">Big Summer <span>Sale</span></h2>

      <p class="sale__text">
        Commodo fames vitae vitae leo mauris in. Eu consequat.
      </p>

      <RouterLink class="sale__button" to="/products"> Shop Now </RouterLink>
    </div>

    <img
      class="sale__image sale__image--right-phone"
      :src="saleRightPhone"
      alt=""
    />

    <img
      class="sale__image sale__image--right-watch"
      :src="saleRightWatch"
      alt=""
    />
  </section>
</template>

<style scoped>
.sale {
  position: relative;

  width: 100%;
  height: 448px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  background: linear-gradient(100deg, #2e2e2e 0%, #111111 100%);
}

.sale__content {
  position: relative;
  z-index: 5;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.sale__title {
  margin: 0 0 8px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 72px;
  font-weight: 400;
  line-height: 72px;
  color: #ffffff;
}

.sale__title span {
  font-style: italic;
}

.sale__text {
  margin: 0 0 40px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  line-height: 32px;
  color: #787878;
}

.sale__button {
  width: 188px;
  height: 56px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #ffffff;
  border-radius: 6px;
  background-color: transparent;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: italic;
  line-height: 24px;
  color: #ffffff;

  cursor: pointer;
}

.sale__button:hover {
  background-color: #ffffff;
  color: #111111;
}

.sale__image {
  position: absolute;
  display: block;

  user-select: none;
  pointer-events: none;
}

.sale__image--left-top {
  left: 320px;
  top: -20px;

  width: 320px;
  height: auto;
  z-index: 1;
}

.sale__image--left-ipad {
  left: 50px;
  bottom: 200px;

  width: 300px;
  height: auto;
  z-index: 2;
}

.sale__image--left-bottom {
  left: 0;
  bottom: -10px;

  width: 320px;
  height: auto;
  z-index: 1;
}

.sale__image--right-phone {
  right: -35px;
  top: -5px;

  width: 230px;
  height: auto;
  z-index: 1;
}

.sale__image--right-watch {
  right: 0;
  bottom: -8px;

  width: 360px;
  height: auto;
  z-index: 2;
}
</style>
