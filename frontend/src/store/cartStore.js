import { ref } from "vue";

const STORAGE_KEY = "cyber-cart";

function loadCart() {
  const savedCart = localStorage.getItem(STORAGE_KEY);

  if (!savedCart) {
    return [];
  }

  try {
    return JSON.parse(savedCart);
  } catch {
    return [];
  }
}

const cart = ref(loadCart());

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart.value));
}

function addToCart(productId) {
  const existingItem = cart.value.find((item) => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.value.push({
      productId,
      quantity: 1,
    });
  }

  saveCart();
}

function removeFromCart(productId) {
  cart.value = cart.value.filter((item) => item.productId !== productId);
  saveCart();
}

function increaseQuantity(productId) {
  const item = cart.value.find((cartItem) => cartItem.productId === productId);

  if (item) {
    item.quantity += 1;
    saveCart();
  }
}

function decreaseQuantity(productId) {
  const item = cart.value.find((cartItem) => cartItem.productId === productId);

  if (!item) {
    return;
  }

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    removeFromCart(productId);
    return;
  }

  saveCart();
}

function setCartItems(items) {
  cart.value = items;
  saveCart();
}

export function useCartStore() {
  return {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setCartItems,
  };
}
