export default function Button({ className = '', ...props }) {
  return (
    <button
      {...props}
      className={`rounded-full px-6 py-3 font-semibold shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    />
  )
}
