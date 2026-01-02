import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import favoriteReducer from "../features/favorites/favoriteSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    favorites: favoriteReducer,
  },
});
