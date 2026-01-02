import { useDispatch } from "react-redux";
import { setSort } from "../features/products/productSlice";

export default function SortDropdown() {
  const dispatch = useDispatch();

  return (
    <select
      onChange={(e) => dispatch(setSort(e.target.value))}
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
      <option value="none" className="bg-gray-900">
        Sort by price
      </option>
      <option value="low" className="bg-gray-900">
        Low → High
      </option>
      <option value="high" className="bg-gray-900">
        High → Low
      </option>
    </select>
  );
}
