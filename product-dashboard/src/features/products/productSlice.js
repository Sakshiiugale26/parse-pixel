import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productThunks";

const initialState = {
  items: [],
  status: "idle", // idle | loading | success | error
  error: null,
  search: "",
  category: "all",
  sort: "none",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔄 Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload || "Failed to fetch products";
      });
  },
});

export const { setSearch, setCategory, setSort } =
  productSlice.actions;

export default productSlice.reducer;
