import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../features/favorites/favoriteSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  // Get favorites from Redux
  const favorites = useSelector((state) => state.favorites);

  // Check if product is already favorited
  const isFavorited = favorites.some(
    (item) => item.id === product.id
  );

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md hover:shadow-xl transition">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain"
      />

      <h3 className="font-semibold mt-3 line-clamp-2">
        {product.title}
      </h3>

      <p className="text-green-400 font-bold mt-1">
        ₹ {product.price}
      </p>

      <div className="flex justify-between items-center mt-4">
        <Link
          to={`/product/${product.id}`}
          className="text-blue-400 hover:underline text-sm"
        >
          View Details
        </Link>

        <button
          onClick={() => dispatch(addFavorite(product))}
          disabled={isFavorited}
          className={`
            px-3 py-1 rounded text-sm font-medium
            ${
              isFavorited
                ? "bg-green-600 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }
          `}
        >
          {isFavorited ? "✓ Added" : "❤️ Favorite"}
        </button>
      </div>
    </div>
  );
}
