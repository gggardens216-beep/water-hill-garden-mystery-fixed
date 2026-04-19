import Button from './components/ui/Button'
import Prologue from './components/screens/Prologue'
import Problem from './components/screens/Problem'
import Ending from './components/screens/Ending'
import { useGameState } from './hooks/useGameState'
import { useCameraScanning } from './hooks/useCameraScanning'

function Title({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-emerald-900 px-6 text-center text-green-100 flex flex-col items-center justify-center">
      <h1 className="mb-3 text-5xl font-bold tracking-widest text-amber-200" style={{ fontFamily: 'serif' }}>
        Water Hill Garden
      </h1>
      <p className="mb-8 text-green-300">― 100年の庭園と、四つ葉の継承 ―</p>
      <Button onClick={onStart} className="bg-amber-500 text-green-950 hover:bg-amber-400">
        プロローグへ
      </Button>
    </div>
  )
}

export default function App() {
  const {
    GAME_STATES,
    gameState,
    setGameState,
    currentStep,
    totalSteps,
    activeStep,
    answerInput,
    setAnswerInput,
    showHint,
    setShowHint,
    userName,
    startGame,
    scannedPoints,
    markScanned,
    submitAnswer,
    restart,
  } = useGameState()

  const {
    videoRef,
    isScanning,
    setIsScanning,
    cameraError,
    startCamera,
    stopCamera,
  } = useCameraScanning()

  const handleScan = async () => {
    const started = await startCamera()
    setTimeout(() => {
      stopCamera()
      setIsScanning(false)
      markScanned()
    }, started ? 3000 : 2000)
  }

  const handleSubmit = () => {
    const result = submitAnswer()
    if (!result.ok && result.message) {
      window.alert(result.message)
    }
  }

  if (gameState === GAME_STATES.TITLE) {
    return <Title onStart={() => setGameState(GAME_STATES.PROLOGUE)} />
  }

  if (gameState === GAME_STATES.PROLOGUE) {
    return <Prologue onStart={startGame} />
  }

  if (gameState === GAME_STATES.ENDING) {
    return <Ending userName={userName} onRestart={restart} />
  }

  return (
    <Problem
      step={activeStep}
      currentStep={currentStep}
      totalSteps={totalSteps}
      answerInput={answerInput}
      onAnswerInput={setAnswerInput}
      showHint={showHint}
      onToggleHint={() => setShowHint((prev) => !prev)}
      onSubmit={handleSubmit}
      scanned={scannedPoints.has(currentStep)}
      onScan={handleScan}
      isScanning={isScanning}
      videoRef={videoRef}
      cameraError={cameraError}
    />
  )
}
