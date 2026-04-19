import { useCallback, useMemo, useState } from 'react'
import { stepData } from '../types/stepData'

export function useGameState() {
  const [screen, setScreen] = useState('prologue')
  const [userName, setUserName] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [scannedPoints, setScannedPoints] = useState(new Set())

  const step = stepData[currentStep]

  const progress = useMemo(() => {
    if (!stepData.length) {
      return 0
    }

    return ((currentStep + 1) / stepData.length) * 100
  }, [currentStep])

  const markScanned = useCallback(() => {
    setScannedPoints((prev) => new Set([...prev, currentStep]))
  }, [currentStep])

  const submitAnswer = useCallback(() => {
    if (userInput.trim() !== step.answer) {
      return { ok: false, reason: 'answer' }
    }

    if (!scannedPoints.has(currentStep)) {
      return { ok: false, reason: 'scan' }
    }

    if (currentStep >= stepData.length - 1) {
      setScreen('ending')
      return { ok: true, done: true }
    }

    setCurrentStep((prev) => prev + 1)
    setUserInput('')
    setShowHint(false)
    return { ok: true, done: false }
  }, [currentStep, scannedPoints, step, userInput])

  const startGame = useCallback(() => {
    setScreen('play')
  }, [])

  const restart = useCallback(() => {
    setScreen('prologue')
    setCurrentStep(0)
    setUserInput('')
    setShowHint(false)
    setScannedPoints(new Set())
  }, [])

  return {
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
  }
}
