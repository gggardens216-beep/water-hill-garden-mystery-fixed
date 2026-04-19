import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'

export default function Problem({
  step,
  currentStep,
  totalSteps,
  answerInput,
  onAnswerInput,
  showHint,
  onToggleHint,
  onSubmit,
  scanned,
  onScan,
  isScanning,
  videoRef,
  cameraError,
}) {
  const [scanProgress, setScanProgress] = useState(0)

  useEffect(() => {
    if (!isScanning) {
      setScanProgress(0)
      return
    }

    let value = 0
    const timer = setInterval(() => {
      value += 4
      setScanProgress(Math.min(value, 100))
    }, 120)

    return () => clearInterval(timer)
  }, [isScanning])

  const progress = Math.round(((currentStep + 1) / totalSteps) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-green-950 to-black px-6 py-8 text-green-100">
      <div className="mx-auto max-w-2xl">
        <p className="mb-2 text-xs text-green-400">進捗 {currentStep + 1} / {totalSteps}</p>
        <div className="mb-6 h-2 rounded-full bg-green-950">
          <div className="h-2 rounded-full bg-green-500 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <Card className="mb-4 border-green-700/40 bg-black/40">
          <h3 className="mb-2 text-xl font-bold text-amber-300">{step.title}</h3>
          <p className="mb-1 text-sm text-green-300">場所：{step.location}</p>
          <p className="text-sm leading-relaxed">{step.story}</p>
        </Card>

        <Card className="mb-4 border-green-700/40 bg-black/40">
          <div className="relative mb-4 h-56 overflow-hidden rounded-xl border border-green-600/40 bg-gray-950">
            {isScanning && !cameraError ? (
              <video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-green-400">
                {scanned ? 'スキャン済み' : 'スキャン待機中'}
              </div>
            )}
            {isScanning && (
              <div className="absolute inset-x-0 top-0 h-0.5 bg-green-400" style={{ top: `${scanProgress}%` }} />
            )}
          </div>

          {cameraError && <p className="mb-3 text-xs text-yellow-300">{cameraError}</p>}

          <Button
            onClick={onScan}
            disabled={isScanning}
            className="w-full bg-green-600 text-white hover:bg-green-500"
          >
            {isScanning ? 'スキャン中...' : scanned ? '再スキャンする' : 'スキャン開始'}
          </Button>
        </Card>

        <Card className="border-green-700/40 bg-black/40">
          <div className="mb-3 flex gap-2">
            <input
              value={answerInput}
              onChange={(e) => onAnswerInput(e.target.value)}
              placeholder="答えを入力"
              className="w-full rounded-xl border border-green-700/50 bg-black/30 px-4 py-3 outline-none focus:border-amber-400"
            />
            <Button onClick={onSubmit} className="bg-amber-500 text-green-950 hover:bg-amber-400">
              解答
            </Button>
          </div>

          <Button onClick={onToggleHint} className="w-full bg-gray-700 text-white hover:bg-gray-600">
            {showHint ? 'ヒントを閉じる' : 'ヒントを見る'}
          </Button>

          {showHint && (
            <div className="mt-3 rounded-xl border border-amber-600/40 bg-amber-950/30 p-3 text-sm text-amber-200">
              {step.hint}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
