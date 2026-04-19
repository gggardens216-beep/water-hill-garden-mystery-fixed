import { useState } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'

export default function Prologue({ onStart }) {
  const [name, setName] = useState('')

  const canStart = name.trim().length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-emerald-950 px-6 py-10 text-center text-green-100">
      <h2 className="mb-6 text-3xl font-bold text-amber-300">序章 ― 庭師の手紙</h2>

      <Card className="mx-auto mb-6 max-w-xl border-green-700/40 bg-black/40 text-left">
        <p className="mb-3 text-sm leading-relaxed">
          1924年、老庭師・吉田源三郎は「百年後の旅人へ」謎を遺しました。
        </p>
        <p className="text-sm leading-relaxed">
          あなたの名を刻み、庭園に隠された継承の物語を読み解いてください。
        </p>
      </Card>

      <Card className="mx-auto max-w-xl border-green-700/40 bg-black/40">
        <label className="mb-2 block text-left text-sm text-green-300">お名前</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例：吉田 花子"
          className="mb-4 w-full rounded-xl border border-green-700/50 bg-black/30 px-4 py-3 text-green-100 outline-none focus:border-amber-400"
        />
        <Button
          onClick={() => onStart(name)}
          disabled={!canStart}
          className="w-full bg-amber-500 text-green-950 hover:bg-amber-400"
        >
          謎解きを始める
        </Button>
      </Card>
    </div>
  )
}
