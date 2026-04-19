export default function Button({ className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`bg-amber-500 hover:bg-amber-400 text-green-950 font-bold py-3 px-6 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${className}`}
      {...props}
    />
  )
}
