<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppHeader from "./components/layout/AppHeader.vue";

const route = useRoute();

const hasHeaderBorder = computed(() => {
  return route.path !== "/";
});
</script>

<template>
  <div class="app">
    <AppHeader :has-border="hasHeaderBorder" />

    <RouterView />
  </div>
</template>
