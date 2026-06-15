import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../pages/HomePage.vue";
import ProductPage from "../pages/ProductPage.vue";
import CartPage from "../pages/CartPage.vue";
import FavoritesPage from "../pages/FavoritesPage.vue";
import ProductsPage from "../pages/ProductsPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/product/:id",
    name: "product",
    component: ProductPage,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartPage,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: FavoritesPage,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
