import favoriteReducer, {
  addFavorite,
  removeFavorite,
} from "./favoriteSlice";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 100,
};

describe("favoriteSlice", () => {
  test("should add product to favorites", () => {
    const state = favoriteReducer([], addFavorite(mockProduct));
    expect(state.length).toBe(1);
    expect(state[0].id).toBe(1);
  });

  test("should remove product from favorites", () => {
    const initialState = [mockProduct];
    const state = favoriteReducer(initialState, removeFavorite(1));
    expect(state.length).toBe(0);
  });
});
