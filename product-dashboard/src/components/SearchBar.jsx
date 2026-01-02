import { useDispatch } from "react-redux";
import { setSearch } from "../features/products/productSlice";
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const debouncedValue = useDebounce(text, 500);

  useEffect(() => {
    dispatch(setSearch(debouncedValue.toLowerCase()));
  }, [debouncedValue, dispatch]);

  return (
    <input
      type="text"
      placeholder="🔍 Search products..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="
        w-full
        px-4 py-2
        rounded-md
        bg-gray-900
        text-white
        border border-gray-600
        placeholder-gray-400
        focus:outline-none
        focus:ring-2 focus:ring-blue-500
      "
    />
  );
}
