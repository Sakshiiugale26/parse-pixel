import { useDispatch } from "react-redux";
import { setCategory } from "../features/products/productSlice";

const categories = [
  "all",
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

export default function CategoryFilter() {
  const dispatch = useDispatch();

  return (
    <select
      onChange={(e) => dispatch(setCategory(e.target.value))}
      className="
        w-full
        px-4 py-2
        rounded-md
        bg-gray-900
        text-white
        border border-gray-600
        focus:outline-none
        focus:ring-2 focus:ring-blue-500
      "
    >
      {categories.map((cat) => (
        <option key={cat} value={cat} className="bg-gray-900">
          {cat.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
