// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
  devTools: false, // Tắt Redux DevTools - không gọi localhost:3001
});
