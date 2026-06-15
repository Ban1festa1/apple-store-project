<script setup>
import footerLogo from "../../assets/images/footer-logo.svg";

import twitterIcon from "../../assets/icons/social/social-twitter.svg";
import facebookIcon from "../../assets/icons/social/social-facebook.svg";
import tiktokIcon from "../../assets/icons/social/social-tiktok.svg";
import instagramIcon from "../../assets/icons/social/social-instagram.svg";

const services = [
  "Bonus program",
  "Gift cards",
  "Credit and payment",
  "Service contracts",
  "Non-cash account",
  "Payment",
];

const assistance = [
  "Find an order",
  "Terms of delivery",
  "Exchange and return of goods",
  "Guarantee",
  "Frequently asked questions",
  "Terms of use of the site",
];

const socials = [
  {
    name: "Twitter",
    icon: twitterIcon,
  },
  {
    name: "Facebook",
    icon: facebookIcon,
  },
  {
    name: "TikTok",
    icon: tiktokIcon,
  },
  {
    name: "Instagram",
    icon: instagramIcon,
  },
];
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <RouterLink class="footer__logo" to="/">
          <img :src="footerLogo" alt="Cyber" />
        </RouterLink>

        <p class="footer__description">
          We are a residential interior design firm located in Portland. Our
          boutique-studio offers more than
        </p>

        <div class="footer__socials">
          <a
            v-for="social in socials"
            :key="social.name"
            class="footer__social"
            href="#"
            :aria-label="social.name"
          >
            <img :src="social.icon" :alt="social.name" />
          </a>
        </div>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Services</h3>

        <ul class="footer__list">
          <li v-for="item in services" :key="item">
            <a href="#">
              {{ item }}
            </a>
          </li>
        </ul>
      </div>

      <div class="footer__column">
        <h3 class="footer__title">Assistance to the buyer</h3>

        <ul class="footer__list">
          <li v-for="item in assistance" :key="item">
            <a href="#">
              {{ item }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  min-height: 504px;
  padding: 104px 0;

  background-color: #000000;
}

.footer__inner {
  width: 100%;
  max-width: 1128px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 384px 220px 300px;
  justify-content: space-between;
  column-gap: 64px;
}

.footer__brand {
  min-height: 296px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer__logo {
  display: inline-flex;
  margin-bottom: 24px;
}

.footer__logo img {
  display: block;
  width: 96px;
  height: auto;
}

.footer__description {
  max-width: 384px;
  margin: 0;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: italic;
  font-weight: 400;
  line-height: 24px;
  color: #cfcfcf;
}

.footer__socials {
  margin-top: auto;

  display: flex;
  align-items: center;
  gap: 36px;
}

.footer__social {
  width: 20px;
  height: 20px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.footer__social img {
  display: block;
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.footer__column {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer__title {
  margin: 0 0 24px;

  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: #ffffff;
}

.footer__list {
  margin: 0;
  padding: 0;

  display: flex;
  flex-direction: column;
  gap: 24px;

  list-style: none;
}

.footer__list a {
  font-family: "ABeeZee", Arial, Helvetica, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: #cfcfcf;
  text-decoration: none;
}

.footer__list a:hover {
  color: #ffffff;
}
</style>
