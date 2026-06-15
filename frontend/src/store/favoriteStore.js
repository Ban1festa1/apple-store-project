import { ref } from "vue";

const STORAGE_KEY = "cyber-favorites";

function loadFavorites() {
  const savedFavorites = localStorage.getItem(STORAGE_KEY);

  if (!savedFavorites) {
    return [];
  }

  try {
    return JSON.parse(savedFavorites);
  } catch {
    return [];
  }
}

const favorites = ref(loadFavorites());

function saveFavorites() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value));
}

function hasSavedFavorites() {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

function addToFavorites(productId) {
  if (!favorites.value.includes(productId)) {
    favorites.value.push(productId);
    saveFavorites();
  }
}

function removeFromFavorites(productId) {
  favorites.value = favorites.value.filter((id) => id !== productId);
  saveFavorites();
}

function toggleFavorite(productId) {
  if (favorites.value.includes(productId)) {
    removeFromFavorites(productId);
  } else {
    addToFavorites(productId);
  }
}

function isFavorite(productId) {
  return favorites.value.includes(productId);
}

function setFavorites(items) {
  favorites.value = items;
  saveFavorites();
}

export function useFavoriteStore() {
  return {
    favorites,
    hasSavedFavorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    setFavorites,
  };
}
