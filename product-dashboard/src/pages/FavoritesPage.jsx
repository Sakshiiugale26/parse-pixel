import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../features/favorites/favoriteSlice";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  if (favorites.length === 0) {
    return (
      <div className="p-6 text-center">
        <p>No favorites added yet ❤️</p>
        <Link to="/" className="text-blue-600 underline">
          Go back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {favorites.map((product) => (
        <div
          key={product.id}
          className="bg-white p-4 rounded shadow"
        >
          <img
            src={product.image}
            alt={product.title}
            className="h-40 mx-auto object-contain"
          />

          <h3 className="font-semibold mt-2 line-clamp-2">
            {product.title}
          </h3>

          <p className="text-green-600 font-bold mt-1">
            ₹ {product.price}
          </p>

          <button
            className="mt-2 text-red-500"
            onClick={() => dispatch(removeFavorite(product.id))}
          >
            ❌ Remove
          </button>
        </div>
      ))}
    </div>
  );
}
