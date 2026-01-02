import productReducer, {
  setSearch,
  setCategory,
  setSort,
} from "./productSlice";

describe("productSlice", () => {
  test("should return initial state", () => {
    const state = productReducer(undefined, { type: "unknown" });

    expect(state.items).toEqual([]);
    expect(state.status).toBe("idle");
    expect(state.search).toBe("");
  });

  test("should handle setSearch", () => {
    const state = productReducer(undefined, setSearch("shirt"));
    expect(state.search).toBe("shirt");
  });

  test("should handle setCategory", () => {
    const state = productReducer(undefined, setCategory("electronics"));
    expect(state.category).toBe("electronics");
  });

  test("should handle setSort", () => {
    const state = productReducer(undefined, setSort("low"));
    expect(state.sort).toBe("low");
  });
});
