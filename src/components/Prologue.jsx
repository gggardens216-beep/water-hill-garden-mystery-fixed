import Button from './Button'
import Card from './Card'

export default function Prologue({ userName, onNameChange, onStart }) {
  const canStart = userName.trim().length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-emerald-900 flex items-center justify-center px-6 py-10">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-bold text-amber-200 mb-2 tracking-wide" style={{ fontFamily: 'serif' }}>
          100年の庭園と、四つ葉の継承
        </h1>
        <p className="text-green-200 mb-8">序章</p>

        <Card className="text-left mb-6">
          <p className="text-green-100 text-sm leading-relaxed mb-3">
            1921年。吉田源三郎はこの庭に未来への謎を残しました。
          </p>
          <p className="text-green-100 text-sm leading-relaxed mb-3">
            あなたはARスキャンで現地の手がかりを集め、隠された言葉を解き明かします。
          </p>
          <p className="text-green-300 text-xs">まずは、あなたの名前を教えてください。</p>
        </Card>

        <Card className="mb-6">
          <label htmlFor="user-name" className="block text-green-200 text-sm mb-2 text-left">
            お名前
          </label>
          <input
            id="user-name"
            value={userName}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="例: 水の丘 太郎"
            className="w-full rounded-xl bg-green-950/70 border border-green-600/50 px-4 py-3 text-green-100 placeholder:text-green-500 outline-none focus:ring-2 focus:ring-amber-400/60"
          />
        </Card>

        <Button onClick={onStart} disabled={!canStart}>
          謎解きを始める
        </Button>
      </div>
    </div>
  )
}
