<script setup>
import HeroBanner from "../components/layout/HeroBanner.vue";
import PromoSection from "../components/home/PromoSection.vue";
import CategorySection from "../components/home/CategorySection.vue";
import ProductSection from "../components/home/ProductSection.vue";
import PopularProductsSection from "../components/home/PopularProductsSection.vue";
import DiscountSection from "../components/home/DiscountSection.vue";
import SaleBanner from "../components/home/SaleBanner.vue";
import AppFooter from "../components/layout/AppFooter.vue";
</script>

<template>
  <main>
    <HeroBanner />
    <PromoSection />
    <CategorySection />
    <ProductSection />
    <PopularProductsSection />
    <DiscountSection />
    <SaleBanner />
    <AppFooter />
  </main>
</template>
