import Prologue from './components/Prologue'
import Problem from './components/Problem'
import Ending from './components/Ending'
import { useGameState } from './hooks/useGameState'

export default function App() {
  const {
    screen,
    userName,
    setUserName,
    step,
    currentStep,
    userInput,
    setUserInput,
    showHint,
    setShowHint,
    progress,
    scannedPoints,
    markScanned,
    submitAnswer,
    startGame,
    restart,
  } = useGameState()

  const handleSubmit = () => {
    const result = submitAnswer()

    if (result.ok) {
      return
    }

    if (result.reason === 'scan') {
      alert('先にARスキャンを完了してください。')
      return
    }

    alert('答えが違うようです。もう一度観察してみましょう。')
  }

  if (screen === 'prologue') {
    return <Prologue userName={userName} onNameChange={setUserName} onStart={startGame} />
  }

  if (screen === 'ending') {
    return <Ending userName={userName} onRestart={restart} />
  }

  return (
    <Problem
      step={step}
      currentStep={currentStep}
      progress={progress}
      userInput={userInput}
      onInputChange={setUserInput}
      showHint={showHint}
      onHintToggle={() => setShowHint((prev) => !prev)}
      scanned={scannedPoints.has(currentStep)}
      onScanComplete={markScanned}
      onSubmit={handleSubmit}
    />
  )
}
