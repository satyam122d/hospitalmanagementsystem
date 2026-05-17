export function Input({ className = "", ...props }) {
  return (
    <input
      className={`border border-gray-300 rounded-lg px-4 py-3 w-full outline-none focus:ring-2 focus:ring-teal-500 ${className}`}
      {...props}
    />
  );
}