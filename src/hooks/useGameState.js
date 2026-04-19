import { useMemo, useState } from 'react'
import { steps } from '../data/stepData'

const GAME_STATES = {
  TITLE: 'title',
  PROLOGUE: 'prologue',
  PLAY: 'play',
  ENDING: 'ending',
}

export function useGameState() {
  const [gameState, setGameState] = useState(GAME_STATES.TITLE)
  const [currentStep, setCurrentStep] = useState(0)
  const [answerInput, setAnswerInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [userName, setUserName] = useState('')
  const [scannedPoints, setScannedPoints] = useState(new Set())

  const activeStep = useMemo(() => steps[currentStep], [currentStep])

  const startGame = (name) => {
    setUserName(name.trim())
    setGameState(GAME_STATES.PLAY)
  }

  const markScanned = () => {
    setScannedPoints((prev) => new Set([...prev, currentStep]))
  }

  const submitAnswer = () => {
    if (!activeStep) return { ok: false }

    if (answerInput.trim() !== activeStep.answer) {
      return { ok: false, message: '答えが違うようです。周囲をもう一度よく観察してください。' }
    }

    if (currentStep === steps.length - 1) {
      setGameState(GAME_STATES.ENDING)
    } else {
      setCurrentStep((prev) => prev + 1)
      setAnswerInput('')
      setShowHint(false)
    }

    return { ok: true }
  }

  const restart = () => {
    setGameState(GAME_STATES.TITLE)
    setCurrentStep(0)
    setAnswerInput('')
    setShowHint(false)
    setScannedPoints(new Set())
  }

  return {
    GAME_STATES,
    gameState,
    setGameState,
    currentStep,
    totalSteps: steps.length,
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
  }
}
