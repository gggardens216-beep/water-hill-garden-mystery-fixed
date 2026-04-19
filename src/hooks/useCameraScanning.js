import { useCallback, useEffect, useRef, useState } from 'react'

export function useCameraScanning() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [isScanning, setIsScanning] = useState(false)
  const [cameraError, setCameraError] = useState('')

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }, [])

  const startCamera = useCallback(async () => {
    setCameraError('')
    setIsScanning(true)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play().catch((error) => {
          console.error('Video playback failed:', error)
        })
      }
      return true
    } catch (error) {
      console.error('Camera start failed:', error)
      setCameraError('カメラを起動できませんでした。ブラウザ権限と HTTPS を確認してください。')
      return false
    }
  }, [])

  useEffect(() => () => stopCamera(), [stopCamera])

  return {
    videoRef,
    isScanning,
    setIsScanning,
    cameraError,
    startCamera,
    stopCamera,
  }
}
