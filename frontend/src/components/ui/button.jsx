export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}