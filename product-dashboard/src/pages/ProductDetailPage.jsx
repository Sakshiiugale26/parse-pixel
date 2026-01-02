import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../features/favorites/favoriteSlice";
import { useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === Number(id))
  );

  const favorites = useSelector((state) => state.favorites);

  const isFavorited = favorites.some(
    (item) => item.id === product?.id
  );

  const [showPopup, setShowPopup] = useState(false);

  if (!product) {
    return (
      <p className="text-center py-10 text-white">
        Product not found
      </p>
    );
  }

  const handleAddFavorite = () => {
    if (isFavorited) {
      setShowPopup(true);
    } else {
      dispatch(addFavorite(product));
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <img
          src={product.image}
          alt={product.title}
          className="h-64 mx-auto object-contain"
        />

        <h2 className="text-xl font-bold mt-4">
          {product.title}
        </h2>

        <p className="text-gray-600 mt-2">
          {product.description}
        </p>

        <p className="text-green-600 font-bold text-lg mt-4">
          ₹ {product.price}
        </p>

        <button
          onClick={handleAddFavorite}
          className={`mt-5 px-4 py-2 rounded text-white font-medium ${
            isFavorited
              ? "bg-green-600 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {isFavorited ? "✓ Added to Favorites" : "❤️ Add to Favorites"}
        </button>
      </div>

      {/* POPUP FOR ALREADY ADDED */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <p className="mb-4 font-medium text-gray-800">
              ❤️ This product is already added to your favorites.
            </p>

            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
