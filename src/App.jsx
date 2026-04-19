import { useEffect, useRef, useState } from 'react'
import {
  AlertCircle,
  Camera,
  CheckCircle2,
  ChevronRight,
  Compass,
  HelpCircle,
  History,
  Home,
  Info,
  Map as MapIcon,
  QrCode,
  ScanLine,
  User,
  X,
} from 'lucide-react'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('title')
  const [currentStep, setCurrentStep] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [userName, setUserName] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [showMap, setShowMap] = useState(false)
  const [scannedPoints, setScannedPoints] = useState(new Set())
  const [cameraError, setCameraError] = useState(null)

  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const scanTimeoutRef = useRef(null)

  const steps = [
    {
      id: 1,
      title: '始まりの1921',
      location: '吉田観賞魚 創業の碑',
      bg: 'https://images.unsplash.com/photo-1558905619-17254261b646?auto=format&fit=crop&q=80&w=800',
      target: '創業の石碑',
      story:
        'この庭園が生まれた年を探せ。それは全ての命の源となるコードである。現地にある石碑をカメラに収めてください。',
      answer: '1921',
      hint: '石碑に刻まれた「大正10年」を西暦に変換してみてください。',
    },
    {
      id: 2,
      title: '黄金の主の秘密',
      location: '吉田観賞魚 錦鯉の池',
      bg: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=800',
      target: '池の看板',
      story: '水面を揺らす『黄金の主』たちの数と、看板の文字を照らし合わせよ。看板をスキャンしてください。',
      answer: 'キンギョ',
      hint: '池の周りの看板にある「赤い文字」を順番に読んでみましょう。',
    },
    {
      id: 3,
      title: '水底の古代魚',
      location: '吉田観賞魚 熱帯魚コーナー',
      bg: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800',
      target: 'アロワナの水槽',
      story: '古より姿を変えぬ魚たちが守る文字がある。水槽の隅、青いラベルをカメラで読み取りましょう。',
      answer: 'ミズ',
      hint: '大きな水槽の隅にある学名プレートに注目してください。',
    },
    {
      id: 4,
      title: '時の番人の休息',
      location: 'GGG 園芸エリア',
      bg: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
      target: 'うさぎの置物',
      story: '季節を告げる花々に囲まれた番人（置物）を探せ。彼をカメラの枠内に収めてください。',
      answer: 'ヒカリ',
      hint: '大きなウサギが持っているプレートの文字を読みましょう。',
    },
    {
      id: 5,
      title: '2階に眠る記憶',
      location: 'GGG 2階アンティーク売場',
      bg: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=800',
      target: 'アンティーク家具',
      story: '100年前の異国から届いた椅子。天秤の針が指し示す「3桁の数字」を読み解け。',
      answer: '385',
      hint: '天秤に「真鍮の鍵」と「古いベル」が乗った展示を探してください。',
    },
    {
      id: 6,
      title: '大地の実り',
      location: 'ガーデンズマルシェ',
      bg: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800',
      target: '地産野菜コーナー',
      story: '八王子の土が育んだ宝物。生産者パネルをカメラで捉え、文字を抽出します。',
      answer: 'オコジュ',
      hint: '「一休み」を意味する多摩の方言です。',
    },
    {
      id: 7,
      title: 'お小休の誘惑',
      location: 'カフェ・オコジュ 暖炉',
      bg: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
      target: '薪の山',
      story: '暖炉のそば、薪（まき）の束に刻まれた文字があるはずです。断面をスキャンしてください。',
      answer: 'タネ',
      hint: '積み上げられた薪の断面をよく見てください。',
    },
    {
      id: 8,
      title: '黄金の種の在り処',
      location: 'Salaブレッドハウス前',
      bg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
      target: 'パンの看板',
      story: '甘い香りに誘われて、種の封印は解かれようとしている。看板を読み取ってください。',
      answer: 'ミライ',
      hint: '看板にあるパンの名前を右から読んでみましょう。',
    },
    {
      id: 9,
      title: '最終謎：100年の封印',
      location: '中央庭園（ゴール）',
      bg: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=800',
      target: '自分自身の影',
      story: '集めた8つの言葉を繋げよ。最後に、あなたの影をカメラでスキャンしてください。',
      answer: 'ワタシ',
      hint: 'これまでの答えの1文字目を順番に繋げると…？',
    },
  ]

  const current = steps[currentStep]

  const stopCamera = () => {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current)
      scanTimeoutRef.current = null
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  const resetGame = () => {
    stopCamera()
    setGameState('title')
    setCurrentStep(0)
    setUserInput('')
    setShowHint(false)
    setIsScanning(false)
    setShowMap(false)
    setScannedPoints(new Set())
    setCameraError(null)
  }

  const handleScan = async () => {
    setIsScanning(true)
    setCameraError(null)
    stopCamera()
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      scanTimeoutRef.current = setTimeout(() => {
        stopCamera()
        setIsScanning(false)
        setScannedPoints((prev) => new Set([...prev, current.id]))
      }, 3000)
    } catch (error) {
      console.error('Camera initialization failed:', error)
      setCameraError('カメラを起動できませんでした。ブラウザの設定を確認してください。')
      scanTimeoutRef.current = setTimeout(() => {
        setIsScanning(false)
        setScannedPoints((prev) => new Set([...prev, current.id]))
      }, 2000)
    }
  }

  const handleNext = () => {
    if (userInput.trim() === current.answer) {
      if (currentStep === steps.length - 1) {
        setGameState('ending')
        stopCamera()
        return
      }
      setCurrentStep((prev) => prev + 1)
      setUserInput('')
      setShowHint(false)
      setCameraError(null)
      stopCamera()
      setIsScanning(false)
      return
    }
    alert('答えが違うようです。周囲をもう一度よく観察してください。')
  }

  useEffect(() => () => stopCamera(), [])

  return (
    <main className="app">
      {gameState === 'title' && (
        <section className="screen title-screen">
          <div className="title-card">
            <QrCode size={36} />
            <h1>100年の庭園と、四つ葉の継承</h1>
            <p>Water Hill Gardenを舞台にした次世代型AR謎解きゲーム</p>
            <div className="title-features">
              <span>
                <Compass size={16} />
                周遊探索
              </span>
              <span>
                <History size={16} />
                100年の物語
              </span>
              <span>
                <ScanLine size={16} />
                ARスキャン
              </span>
            </div>
            <button className="primary" onClick={() => setGameState('prologue')}>
              はじめる
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
      )}

      {gameState === 'prologue' && (
        <section className="screen">
          <div className="card">
            <Info size={28} />
            <h2>プロローグ</h2>
            <p>
              庭園に眠る「黄金の種」を解放できるのは、受け継がれし四つ葉の継承者だけ。
              現地にある石碑・看板・展示物をスキャンし、9つの謎を解いてください。
            </p>
            <label className="input-label" htmlFor="name">
              <User size={16} />
              継承者の名前
            </label>
            <input
              id="name"
              className="text-input"
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder="あなたの名前"
            />
            <button className="primary" onClick={() => setGameState('play')}>
              {userName.trim() ? `${userName}さん、出発` : '出発する'}
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
      )}

      {gameState === 'play' && (
        <section className="screen play-screen">
          <div className="step-bg" style={{ backgroundImage: `url(${current.bg})` }} />
          <div className="overlay" />
          <div className="play-content">
            <header className="topbar">
              <button className="ghost" onClick={resetGame}>
                <Home size={18} />
                タイトルへ
              </button>
              <button className="ghost" onClick={() => setShowMap(true)}>
                <MapIcon size={18} />
                マップ
              </button>
            </header>

            <article className="card">
              <p className="meta">
                STEP {currentStep + 1} / {steps.length}
              </p>
              <h2>{current.title}</h2>
              <p className="location">{current.location}</p>
              <p>{current.story}</p>

              <div className="target-row">
                <span className="target">
                  <Camera size={16} />
                  目標: {current.target}
                </span>
                {scannedPoints.has(current.id) && (
                  <span className="done">
                    <CheckCircle2 size={16} />
                    スキャン完了
                  </span>
                )}
              </div>

              <div className="actions">
                <button className="secondary" onClick={handleScan} disabled={isScanning}>
                  {isScanning ? <ScanLine size={16} className="pulse" /> : <Camera size={16} />}
                  {isScanning ? '解析中...' : 'スキャンする'}
                </button>
                <button className="ghost" onClick={() => setShowHint((prev) => !prev)}>
                  <HelpCircle size={16} />
                  ヒント
                </button>
              </div>

              {isScanning && (
                <div className="scanner">
                  <video ref={videoRef} autoPlay playsInline muted />
                </div>
              )}

              {cameraError && (
                <p className="error">
                  <AlertCircle size={16} />
                  {cameraError}
                </p>
              )}

              {showHint && (
                <p className="hint">
                  <HelpCircle size={16} />
                  {current.hint}
                </p>
              )}

              <div className="answer-row">
                <input
                  className="text-input"
                  type="text"
                  value={userInput}
                  onChange={(event) => setUserInput(event.target.value)}
                  placeholder="答えを入力"
                />
                <button className="primary" onClick={handleNext}>
                  次へ
                  <ChevronRight size={18} />
                </button>
              </div>
            </article>
          </div>
        </section>
      )}

      {gameState === 'ending' && (
        <section className="screen">
          <div className="card">
            <CheckCircle2 size={36} />
            <h2>謎解き完了</h2>
            <p>
              {userName.trim() ? `${userName}さん` : 'あなた'}は100年の封印を解き、黄金の種を未来へ繋ぎました。
            </p>
            <p className="meta">全{steps.length}ステップ制覇 / スキャン {scannedPoints.size} 箇所</p>
            <button className="primary" onClick={resetGame}>
              もう一度遊ぶ
              <ChevronRight size={18} />
            </button>
          </div>
        </section>
      )}

      {showMap && gameState === 'play' && (
        <aside className="modal">
          <div className="modal-card">
            <header>
              <h3>
                <MapIcon size={18} />
                探索マップ
              </h3>
              <button className="icon-btn" onClick={() => setShowMap(false)}>
                <X size={18} />
              </button>
            </header>
            <ul>
              {steps.map((step, index) => (
                <li key={step.id}>
                  <span>{`STEP ${index + 1} ${step.location}`}</span>
                  {scannedPoints.has(step.id) ? (
                    <CheckCircle2 size={16} className="checked" />
                  ) : (
                    <span className="pending">未</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </main>
  )
}

export default App
