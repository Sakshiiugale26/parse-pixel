import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productThunks";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";

function ProductListPage() {
  const dispatch = useDispatch();

  const { items, status, search, category, sort } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items
    .filter((p) =>
      p.title.toLowerCase().includes(search)
    )
    .filter(
      (p) => category === "all" || p.category === category
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  if (status === "loading") {
    return <p className="text-center py-10">Loading products...</p>;
  }

  if (status === "error") {
    return <p className="text-center py-10 text-red-500">Failed to load products</p>;
  }

  return (
    <div className="w-full">
      {/* Filter Section */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="w-full md:w-48">
            <CategoryFilter />
          </div>
          <div className="w-full md:w-48">
            <SortDropdown />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;
