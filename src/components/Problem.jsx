import { useEffect } from 'react'
import Button from './Button'
import Card from './Card'
import { useCameraScanning } from '../hooks/useCameraScanning'
import { stepData } from '../types/stepData'

export default function Problem({
  step,
  currentStep,
  progress,
  userInput,
  onInputChange,
  showHint,
  onHintToggle,
  scanned,
  onScanComplete,
  onSubmit,
}) {
  const { videoRef, scanState, progress: scanProgress, cameraError, startScan, resetScan } = useCameraScanning({
    onScanComplete,
  })

  useEffect(() => {
    resetScan()
  }, [currentStep, resetScan])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-emerald-950 px-6 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-5">
          <div className="flex justify-between text-xs text-green-300 mb-2">
            <span>進捗</span>
            <span>{currentStep + 1} / {stepData.length}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-green-950/80 overflow-hidden">
            <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <Card className="mb-4">
          <p className="text-green-300 text-xs mb-1">STEP {step.id}</p>
          <h2 className="text-2xl text-amber-200 font-bold mb-1" style={{ fontFamily: 'serif' }}>{step.title}</h2>
          <p className="text-sm text-green-200 mb-2">場所: {step.location}</p>
          <p className="text-sm text-green-100 leading-relaxed">{step.story}</p>
        </Card>

        <Card className="mb-4 text-center">
          <p className="text-green-200 text-sm mb-3">ARスキャン対象: {step.target}</p>
          <div className="relative w-full h-52 rounded-xl overflow-hidden bg-black border border-green-600/60 mb-4">
            {scanState === 'scanning' && !cameraError && (
              <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
            )}

            {(scanState === 'idle' || scanState === 'fallback') && (
              <div className="absolute inset-0 flex items-center justify-center text-green-500 text-sm">
                {scanState === 'fallback' ? 'シミュレーション中...' : 'スキャン待機中'}
              </div>
            )}

            {scanState === 'scanning' && (
              <div className="absolute inset-0">
                <div
                  className="absolute left-0 right-0 h-0.5 bg-green-400"
                  style={{ top: `${scanProgress}%`, transition: 'top 0.1s linear' }}
                />
                <div className="absolute bottom-2 left-0 right-0 text-xs text-green-300">解析中... {scanProgress}%</div>
              </div>
            )}

            {scanState === 'done' && (
              <div className="absolute inset-0 bg-green-900/70 flex items-center justify-center text-green-100 font-bold">
                スキャン完了
              </div>
            )}
          </div>

          {cameraError && <p className="text-yellow-300 text-xs mb-3">{cameraError}</p>}

          <Button onClick={startScan} disabled={scanState === 'scanning' || scanned}>
            {scanned ? 'スキャン済み' : 'ARスキャン開始'}
          </Button>
        </Card>

        <Card>
          <label htmlFor="answer" className="block text-green-200 text-sm mb-2">回答</label>
          <input
            id="answer"
            value={userInput}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder="答えを入力"
            className="w-full rounded-xl bg-green-950/70 border border-green-600/50 px-4 py-3 text-green-100 placeholder:text-green-500 outline-none focus:ring-2 focus:ring-amber-400/60 mb-4"
          />

          <div className="flex gap-3 flex-wrap">
            <Button className="bg-green-700 hover:bg-green-600 text-white" onClick={onHintToggle}>
              {showHint ? 'ヒントを隠す' : 'ヒントを見る'}
            </Button>
            <Button onClick={onSubmit}>回答する</Button>
          </div>

          {showHint && (
            <p className="mt-4 text-sm text-amber-200 bg-amber-900/30 border border-amber-700/40 rounded-lg p-3">
              ヒント: {step.hint}
            </p>
          )}
        </Card>
      </div>
    </div>
  )
}
