export default function Card({ className = '', ...props }) {
  return (
    <div
      className={`bg-black/35 rounded-2xl border border-green-700/40 p-5 ${className}`}
      {...props}
    />
  )
}
