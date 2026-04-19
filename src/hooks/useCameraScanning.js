import { useCallback, useEffect, useRef, useState } from 'react'

export function useCameraScanning({ onScanComplete }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [scanState, setScanState] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [cameraError, setCameraError] = useState(null)

  const stopCamera = useCallback(() => {
    if (!streamRef.current) {
      return
    }

    streamRef.current.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }, [])

  const startScan = useCallback(async () => {
    setScanState('scanning')
    setProgress(0)
    setCameraError(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
    } catch {
      setCameraError('カメラを起動できませんでした。シミュレーションモードで続行します。')
      setScanState('fallback')
    }

    let current = 0
    const timer = setInterval(() => {
      current += 4
      setProgress(current)

      if (current >= 100) {
        clearInterval(timer)
        stopCamera()
        setScanState('done')
        setTimeout(() => {
          onScanComplete()
        }, 500)
      }
    }, 100)
  }, [onScanComplete, stopCamera])

  const resetScan = useCallback(() => {
    stopCamera()
    setScanState('idle')
    setProgress(0)
    setCameraError(null)
  }, [stopCamera])

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return {
    videoRef,
    scanState,
    progress,
    cameraError,
    startScan,
    resetScan,
  }
}
