// store/productSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [], // [{ id, name, price, image, specs, ... }]
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.list = action.payload;
    },
    addProduct(state, action) {
      state.list.push(action.payload);
    },
    removeProduct(state, action) {
      state.list = state.list.filter(product => product.id !== action.payload);
    },
    updateProduct(state, action) {
      const updated = action.payload;
      const index = state.list.findIndex(p => p.id === updated.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...updated };
      }
    }
  },
});

// Export action creators
export const {
  setProducts,
  addProduct,
  removeProduct,
  updateProduct,
} = productSlice.actions;

// Selector tiện dụng
export const selectAllProducts = state => state.products.list;
export const selectProductById = (state, id) =>
  state.products.list.find(product => product.id === id);

// Export reducer
export default productSlice.reducer;
