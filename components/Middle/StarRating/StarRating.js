export default function StarRating({ value = 0, onChange, readOnly = false, size = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: size }, (_, i) => (
        <svg
          key={i}
          onClick={() => !readOnly && onChange?.(i + 1)}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer transition-colors duration-200 ${
            i < value ? "text-yellow-400" : "text-gray-300"
          } ${readOnly ? "cursor-default" : "hover:scale-110"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 
            1 0 00.95.69h4.173c.969 0 1.371 1.24.588 
            1.81l-3.37 2.448a1 1 0 
            00-.364 1.118l1.286 
            3.967c.3.921-.755 
            1.688-1.54 
            1.118l-3.37-2.448a1 
            1 0 00-1.175 
            0l-3.37 
            2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.967a1 
            1 0 00-.364-1.118L2.05 
            9.394c-.783-.57-.38-1.81.588-1.81h4.173a1 
            1 0 00.95-.69l1.286-3.967z"
          />
        </svg>
      ))}
    </div>
  );
}
