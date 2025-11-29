import { Star } from "lucide-react";
export default function StarRating({ value = 0, onChange, readOnly = false, size = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: size }, (_, i) => (
        <Star
          key={i}
          className={`
            w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200
            ${i < value ? "text-yellow-400" : "text-gray-300"}
            ${readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"}
          `}
          onClick={() => !readOnly && onChange?.(i + 1)}
        />
      ))}
    </div>
  );
}
