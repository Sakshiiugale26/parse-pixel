import { describe, test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";

import productsReducer from "../features/products/productSlice";
import favoritesReducer from "../features/favorites/favoriteSlice";
import App from "../App";

/* ---------- Helper: render app with Redux + Router ---------- */
const renderWithStore = () => {
  const store = configureStore({
    reducer: {
      products: productsReducer,
      favorites: favoritesReducer,
    },
  });

  return render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

/* -------------------- Integration Test -------------------- */
describe("Integration Test: Search & Favorite Flow", () => {
test("search filters products", async () => {
  renderWithStore();

  const searchInput = await screen.findByPlaceholderText(/search products/i);

  fireEvent.change(searchInput, {
    target: { value: "shirt" },
  });

  const results = await screen.findAllByText(/shirt/i);
  expect(results.length).toBeGreaterThan(0);
});
});
