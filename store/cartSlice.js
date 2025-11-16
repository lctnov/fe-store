// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helpers for localStorage
const loadCartFromLocalStorage = () => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Error loading cart from localStorage", err);
    return [];
  }
};

const saveCartToLocalStorage = (cartItems) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (err) {
    console.error("Error saving cart to localStorage", err);
  }
};

// Initial state
const initialState = {
  cartItems: loadCartFromLocalStorage(),
};

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.cartItems.find((i) => i.id === item.id);

      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }

      saveCartToLocalStorage(state.cartItems);
    },

    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      saveCartToLocalStorage(state.cartItems);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
        saveCartToLocalStorage(state.cartItems);
      }
    },

    clearCart(state) {
      state.cartItems = [];
      saveCartToLocalStorage([]);
    },
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;

export const selectTotalItems = (state) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotalPrice = (state) =>
  state.cart.cartItems.reduce((sum, item) => {
    const price = parseInt(item.price?.replace(/,/g, ""), 10) || 0;
    return sum + price * item.quantity;
  }, 0);

// Export actions + reducer
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
