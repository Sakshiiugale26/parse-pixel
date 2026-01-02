import { Routes, Route, NavLink } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-md px-6 py-4 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-xl font-bold text-blue-400 hover:text-blue-300"
        >
          Product Dashboard
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `px-3 py-1 rounded-md text-sm font-medium transition ${
              isActive
                ? "bg-red-500 text-white"
                : "text-gray-300 hover:text-white hover:bg-gray-700"
            }`
          }
        >
          ❤️ Favorites
        </NavLink>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
    </div>
  );
}
