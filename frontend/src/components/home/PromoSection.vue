<script setup>
import playstationImage from "../../assets/images/promo-playstation.png";
import airpodsImage from "../../assets/images/promo-airpods.png";
import visionImage from "../../assets/images/promo-vision.png";
import macbookImage from "../../assets/images/promo-macbook.png";
</script>

<template>
  <section class="promo">
    <div class="promo__left">
      <article class="promo-card promo-card--playstation">
        <img
          class="promo-card__image promo-card__image--playstation"
          :src="playstationImage"
          alt="Playstation 5"
        />

        <div class="promo-card__content promo-card__content--playstation">
          <h2 class="promo-card__title promo-card__title--playstation">
            Playstation 5
          </h2>

          <p class="promo-card__text">
            Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will
            redefine your PlayStation experience.
          </p>
        </div>
      </article>

      <div class="promo__bottom">
        <article class="promo-card promo-card--airpods">
          <img
            class="promo-card__image promo-card__image--airpods"
            :src="airpodsImage"
            alt="Apple AirPods Max"
          />

          <div class="promo-card__content promo-card__content--airpods">
            <h2 class="promo-card__title promo-card__title--small">
              Apple<br />
              AirPods<br />
              Max
            </h2>

            <p class="promo-card__text">
              Computational audio. Listen, it's powerful
            </p>
          </div>
        </article>

        <article class="promo-card promo-card--vision">
          <img
            class="promo-card__image promo-card__image--vision"
            :src="visionImage"
            alt="Apple Vision Pro"
          />

          <div class="promo-card__content promo-card__content--vision">
            <h2
              class="promo-card__title promo-card__title--small promo-card__title--white"
            >
              Apple<br />
              Vision Pro
            </h2>

            <p class="promo-card__text promo-card__text--vision">
              An immersive way to experience entertainment
            </p>
          </div>
        </article>
      </div>
    </div>

    <article class="promo-card promo-card--macbook">
      <div class="promo-card__content promo-card__content--macbook">
        <h2 class="promo-card__title promo-card__title--macbook">
          Macbook <span>Air</span>
        </h2>

        <p class="promo-card__text promo-card__text--macbook">
          The new 15-inch MacBook Air makes room for more of what you love with
          a spacious Liquid Retina display.
        </p>

        <RouterLink class="hero__button" to="/products"> Shop Now </RouterLink>
      </div>

      <img
        class="promo-card__image promo-card__image--macbook"
        :src="macbookImage"
        alt="Macbook Air"
      />
    </article>
  </section>
</template>

<style scoped>
.promo {
  width: 100%;
  min-height: 600px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  background-color: #ffffff;
}

.promo__left {
  min-width: 0;

  display: grid;
  grid-template-rows: 328px 272px;
}

.promo__bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.promo-card {
  position: relative;
  overflow: hidden;
}

.promo-card--playstation {
  display: flex;
  align-items: center;

  background-color: #ffffff;
}

.promo-card--airpods {
  display: flex;
  align-items: center;

  background-color: #ededed;
}

.promo-card--vision {
  display: flex;
  align-items: center;

  background-color: #353535;
}

.promo-card--macbook {
  min-height: 600px;

  display: flex;
  align-items: center;

  background-color: #ededed;
}

.promo-card__image {
  display: block;

  user-select: none;
  pointer-events: none;
}

.promo-card__image--playstation {
  width: 330px;
  height: 328px;

  margin-bottom: -28px;

  object-fit: contain;
  object-position: left center;
}

.promo-card__image--airpods {
  position: absolute;
  left: -74px;
  bottom: -8px;

  width: 235px;
  height: 235px;

  object-fit: contain;
}

.promo-card__image--vision {
  position: absolute;
  left: -44px;
  bottom: 0;

  width: 235px;
  height: 210px;

  object-fit: contain;
}

.promo-card__image--macbook {
  position: absolute;
  right: -20px;
  bottom: 54px;

  width: 290px;
  height: auto;

  object-fit: contain;
}

.promo-card__content {
  position: relative;
  z-index: 2;
}

.promo-card__content--playstation {
  max-width: 380px;
  margin-left: 28px;
}

.promo-card__content--airpods {
  max-width: 190px;
  margin-left: 176px;
}

.promo-card__content--vision {
  max-width: 190px;
  margin-left: 188px;
}

.promo-card__content--macbook {
  max-width: 390px;
  margin-left: 56px;
}

.promo-card__title {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-weight: 400;
  color: #000000;
}

.promo-card__title--playstation {
  margin-bottom: 16px;

  font-size: 49px;
  font-style: italic;
  line-height: 56px;
}

.promo-card__title--small {
  margin-bottom: 16px;

  font-size: 29px;
  font-style: italic;
  line-height: 40px;
}

.promo-card__title--white {
  color: #ffffff;
}

.promo-card__title--macbook {
  margin-bottom: 16px;

  font-size: 64px;
  line-height: 72px;
}

.promo-card__title--macbook span {
  font-style: italic;
}

.promo-card__text {
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  line-height: 24px;
  color: #909090;
}

.promo-card__text--vision {
  color: #b5b5b5;
}

.promo-card__text--macbook {
  max-width: 360px;
  margin-bottom: 24px;
}

.promo-card__button {
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

.promo-card__button:hover {
  background-color: #000000;
  color: #ffffff;
}
</style>
