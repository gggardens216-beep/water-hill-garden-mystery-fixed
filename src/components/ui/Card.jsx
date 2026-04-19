export default function Card({ className = '', ...props }) {
  return <div {...props} className={`rounded-2xl border p-5 ${className}`} />
}
