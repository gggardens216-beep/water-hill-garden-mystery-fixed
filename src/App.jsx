import { useState, useEffect, useRef } from 'react'

const STAGES = {
  TITLE: 'title',
  PROLOGUE: 'prologue',
  AR_SCAN: 'ar_scan',
  PUZZLE: 'puzzle',
  CLUE_ONE: 'clue_one',
  CLUE_TWO: 'clue_two',
  FINAL: 'final',
  ENDING: 'ending',
}

const stepsData = [
  {
    id: 1,
    title: '始まりの1921',
    location: '吉田観賞魚 創業の碑',
    puzzle: 'この庭園が生まれた年を探せ。それは全ての命の源となるコードである。現地にある石碑をカメラに収めてください。',
    hint: '石碑に刻まれた「大正10年」を西暦に変換してみてください。',
  },
  {
    id: 2,
    title: '庭師の暗号',
    location: '古い楠の根元',
    puzzle: '古い木札に「水→山→池→光」と刻まれている。最後に向かうべき場所を示す語を導け。',
    hint: '順番ではなく、庭園の導線を逆にたどると意味が見えてきます。',
  },
  {
    id: 3,
    title: '四つ葉の継承',
    location: '中央庭園',
    puzzle: '四つ葉のクローバーに託された4つの言葉を順に並べ、欠けた1語を答えよ。',
    hint: '写真の裏にある「希望・信念・愛・？」の並びを確認してください。',
  },
  {
    id: 4,
    title: '水面の合図',
    location: '錦鯉の池',
    puzzle: '池の案内板にある3つの漢字を組み合わせ、庭師が残した合言葉を完成させよ。',
    hint: '「水」「命」「循環」の3語が鍵です。',
  },
  {
    id: 5,
    title: '温室の記録',
    location: 'グリーンギャラリー',
    puzzle: '温室入口のプレートに記された年号と植物名から、次の地点番号を求めよ。',
    hint: '数字は足し算ではなく、桁を並べて読みます。',
  },
  {
    id: 6,
    title: '市場の詩',
    location: 'ガーデンズマルシェ',
    puzzle: '壁にある詩の空欄を埋め、庭師が大切にした価値を1語で答えよ。',
    hint: '「土から始まり、土へ還る」の一節に注目してください。',
  },
  {
    id: 7,
    title: '静寂の庭',
    location: 'オコジュ',
    puzzle: '小径の道標に刻まれた方角をたどり、最後に指す方位を答えよ。',
    hint: '東→南→西→? と90度ずつ回転しています。',
  },
  {
    id: 8,
    title: '百年の鍵',
    location: '記念アーチ',
    puzzle: 'アーチの銘文にある3つの数字を並び替え、解錠コードを作成せよ。',
    hint: '最も古い年を先頭に置くと正しい順序になります。',
  },
  {
    id: 9,
    title: '継がれる物語',
    location: '終章の掲示板',
    puzzle: 'これまでの手がかりを繋ぎ、庭師が百年後へ託したメッセージを完成させてください。',
    hint: '過去と現在、人と自然を繋ぐ言葉が最終章の鍵です。',
  },
]

const storyContent = {
  prologue: {
    title: '序章 ― 庭師の手紙',
    lines: [
      '1924年、Water Hill Gardenに一人の老庭師がいた。',
      '彼の名は吉田源三郎。五十年以上、この庭を守り続けた男だ。',
      '死の床で彼は言った。「この庭には、百年後の者へ贈り物を隠した。',
      '四つ葉のクローバーを探しなさい。そこに全ての答えがある。」',
      '百年の時が流れた今、あなたの手にその謎が委ねられた。',
      '庭を歩き、石碑を読み、自然の声に耳を傾けよ。',
    ],
  },
  clueOne: {
    title: '第一の手がかり ― 石碑の言葉',
    lines: [
      'スキャンが完了した。石碑に刻まれた古い文字が浮かび上がる。',
      '「水は山を流れ、命は土へ還る。吉田の庭は永遠に生き続ける。」',
      '石碑の裏に、擦り切れた手書きのメモが貼り付けてある。',
      '「四つ葉のクローバーは、最も古い木の根元に眠る。',
      '　その木は百年前、私が幼い娘のために植えたものだ。」',
      '―― 吉田源三郎、大正十三年秋',
    ],
  },
  clueTwo: {
    title: '第二の手がかり ― 四つ葉の継承',
    lines: [
      '古い楠の根元に、色褪せた小さな木箱を見つけた。',
      '箱の中には、押し花にされた四つ葉のクローバーと一枚の写真。',
      '写真には、幼い少女と老庭師が庭で微笑んでいる姿。',
      '裏に書かれた文字：「娘よ、この庭が君を見守り続けるように。',
      '　四つ葉は希望・信念・愛・幸運を象徴する。',
      '　百年後の旅人よ、この想いを次の世代へ繋いでほしい。」',
    ],
  },
  final: {
    title: '最終章 ― 時を超えた絆',
    lines: [
      'あなたは今、百年の時を超えた吉田源三郎のメッセージを受け取った。',
      'この庭は単なる花と木の集まりではない。',
      'それは世代を超えた愛と、生命の連続性の証だ。',
      '吉田観賞魚の錦鯉が泳ぐ池、グリーンギャラリーの温室、',
      'ガーデンズマルシェの活気、オコジュの静けさ―',
      '全ては繋がっている。過去と現在、人と自然、希望と記憶。',
      'あなたもまた、この物語の一部となった。',
    ],
  },
}

function TitleScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-green-800 to-emerald-900 flex flex-col items-center justify-center px-6 text-center">
      <div className="mb-8 text-6xl animate-pulse">🌿</div>
      <h1 className="text-5xl font-bold text-amber-200 mb-2 tracking-widest" style={{ fontFamily: 'serif' }}>
        Water Hill Garden
      </h1>
      <p className="text-xl text-green-200 mb-1 tracking-wide">
        ウォーターヒルガーデン
      </p>
      <p className="text-lg text-emerald-300 mb-10 font-light tracking-widest">
        ― 百年の謎解き ―
      </p>

      <div className="bg-black/30 rounded-2xl p-6 mb-10 max-w-md border border-green-600/40">
        <p className="text-green-100 text-sm leading-relaxed">
          1924年に始まった物語。老庭師・吉田源三郎が残した謎が、
          百年の時を超えてあなたを待っている。
        </p>
        <p className="text-green-300 text-xs mt-3 italic">
          AR スキャンで現地の石碑や看板を読み解け。
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        {['🌸', '🍀', '🌊', '🐟'].map((emoji, i) => (
          <span
            key={i}
            className="text-2xl animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <button
        onClick={onStart}
        className="bg-amber-500 hover:bg-amber-400 text-green-900 font-bold py-4 px-10 rounded-full text-lg shadow-lg shadow-amber-900/50 transition-all duration-200 hover:scale-105 active:scale-95"
      >
        謎解きを始める
      </button>

      <p className="text-green-500 text-xs mt-8">
        吉田観賞魚 · グリーンギャラリーガーデンズ · ガーデンズマルシェ · オコジュ
      </p>
    </div>
  )
}

function StoryPanel({ title, lines, onNext, nextLabel = '次へ進む', icon = '📜' }) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    setVisibleLines(0)
    if (lines.length === 0) return undefined

    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        const next = Math.min(prev + 1, lines.length)
        if (next >= lines.length) clearInterval(timer)
        return next
      })
    }, 500)
    return () => clearInterval(timer)
  }, [title, lines.length])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-emerald-950 flex flex-col items-center justify-center px-6 py-10">
      <div className="text-5xl mb-6">{icon}</div>
      <h2 className="text-2xl font-bold text-amber-300 mb-8 text-center tracking-wide" style={{ fontFamily: 'serif' }}>
        {title}
      </h2>

      <div className="bg-black/40 rounded-2xl p-6 max-w-lg w-full border border-green-700/40 mb-8 min-h-48">
        {lines.map((line, idx) => (
          <p
            key={idx}
            className={`text-green-100 leading-relaxed mb-3 text-sm transition-all duration-500 ${
              idx < visibleLines ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {line}
          </p>
        ))}
      </div>

      {visibleLines >= lines.length && (
        <button
          onClick={onNext}
          className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 animate-fade-in"
        >
          {nextLabel}
        </button>
      )}
    </div>
  )
}

function ARScanScreen({ onScanComplete }) {
  const videoRef = useRef(null)
  const [scanState, setScanState] = useState('idle') // idle | scanning | done | fallback
  const [progress, setProgress] = useState(0)
  const [cameraError, setCameraError] = useState(null)

  const startScan = async () => {
    setScanState('scanning')
    setProgress(0)
    setCameraError(null)

    try {
      // カメラ利用には HTTPS（または localhost）+ ブラウザ権限許可が必要
      if (!window.isSecureContext) {
        throw new Error('InsecureContext')
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('MediaDevicesUnavailable')
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await new Promise((resolve) => {
          if (videoRef.current.readyState >= 1) {
            resolve()
            return
          }
          videoRef.current.onloadedmetadata = () => resolve()
        })
        await videoRef.current.play()
      }
    } catch (error) {
      let message = 'カメラを起動できませんでした。ブラウザ設定を確認し、シミュレーションモードで続行してください。'
      if (error?.name === 'NotAllowedError') {
        message = 'カメラ権限が拒否されています。ブラウザでカメラを許可してください。'
      } else if (error?.name === 'NotFoundError') {
        message = 'カメラデバイスが見つかりませんでした。別の端末でお試しください。'
      } else if (error?.name === 'NotReadableError') {
        message = 'カメラが他アプリで使用中の可能性があります。カメラを解放して再試行してください。'
      } else if (error?.message === 'InsecureContext') {
        message = 'カメラ機能は HTTPS 環境（または localhost）でのみ利用できます。'
      } else if (error?.message === 'MediaDevicesUnavailable') {
        message = 'このブラウザはカメラ API に対応していません。'
      }
      setCameraError(`${message} シミュレーションモードに切り替えます。`)
      setScanState('fallback')
    }

    let pct = 0
    const interval = setInterval(() => {
      pct += 2
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(interval)
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(t => t.stop())
        }
        setScanState('done')
        setTimeout(onScanComplete, 1200)
      }
    }, 60)
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-center">
      <div className="text-5xl mb-6">📷</div>
      <h2 className="text-2xl font-bold text-green-400 mb-2">AR スキャン</h2>
      <p className="text-green-200 text-sm mb-6">現地の石碑をカメラでスキャンしてください</p>

      <div className="relative w-full max-w-sm h-64 bg-gray-900 rounded-2xl overflow-hidden border-2 border-green-500/60 mb-6">
        {scanState === 'scanning' && !cameraError && (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            autoPlay
            playsInline
          />
        )}

        {(scanState === 'idle' || scanState === 'fallback') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-green-500">
            <div className="text-6xl mb-2">🌿</div>
            <p className="text-xs text-green-400">
              {scanState === 'fallback' ? 'シミュレーションモード' : 'カメラ待機中'}
            </p>
          </div>
        )}

        {scanState === 'scanning' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="absolute top-0 left-0 right-0 h-0.5 bg-green-400 shadow-lg shadow-green-400/80"
              style={{
                top: `${progress}%`,
                transition: 'top 0.06s linear',
              }}
            />
            <div className="border-2 border-green-400 w-40 h-40 rounded-lg opacity-60 animate-pulse" />
            <p className="text-green-300 text-xs mt-2 absolute bottom-4">スキャン中... {progress}%</p>
          </div>
        )}

        {scanState === 'done' && (
          <div className="absolute inset-0 bg-green-900/80 flex flex-col items-center justify-center">
            <div className="text-5xl mb-2">✅</div>
            <p className="text-green-200 font-bold">スキャン完了！</p>
          </div>
        )}

        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-green-400 rounded-tl" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-green-400 rounded-tr" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-green-400 rounded-bl" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-green-400 rounded-br" />
      </div>

      {cameraError && (
        <p className="text-yellow-400 text-xs mb-4 max-w-xs">{cameraError}</p>
      )}

      {scanState === 'idle' && (
        <button
          onClick={startScan}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
        >
          スキャン開始
        </button>
      )}

      {scanState === 'fallback' && (
        <div className="text-center">
          <p className="text-green-300 text-sm mb-4">
            スキャンをシミュレートしています...
          </p>
          {progress > 0 && progress < 100 && (
            <div className="w-64 bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function PuzzleScreen({ step, stepNumber, totalSteps, onSkip }) {
  const [showHint, setShowHint] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-emerald-950 flex flex-col items-center justify-center px-6 py-10 text-center">
      <div className="text-5xl mb-4">🧩</div>
      <h2 className="text-2xl font-bold text-amber-300 mb-3 tracking-wide" style={{ fontFamily: 'serif' }}>
        謎解きポイント
      </h2>
      <p
        className="text-amber-200 text-xs mb-2"
        aria-label={`問題 ${stepNumber} / ${totalSteps}`}
      >
        第{stepNumber}問 / 全{totalSteps}問
      </p>
      <p className="text-green-200 text-sm mb-3">{step.title}</p>
      <p className="text-green-300 text-xs mb-6">📍 {step.location}</p>

      <div className="bg-black/40 rounded-2xl p-6 max-w-lg w-full border border-green-700/40 mb-4">
        <p className="text-green-100 text-sm leading-relaxed">{step.puzzle}</p>
      </div>

      <button
        onClick={() => setShowHint((prev) => !prev)}
        className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold py-2 px-5 rounded-full shadow transition-all duration-200 hover:scale-105 active:scale-95 mb-4"
      >
        <span aria-hidden="true">❓</span>
        {showHint ? 'ヒントを閉じる' : '庭師のヒント'}
      </button>

      {showHint && (
        <div className="bg-amber-100/95 text-emerald-950 rounded-xl p-4 max-w-lg w-full border border-amber-300 mb-6">
          <p className="text-sm leading-relaxed">{step.hint}</p>
        </div>
      )}

      <button
        onClick={onSkip}
        className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      >
        スキップして次のストーリーへ
      </button>
    </div>
  )
}

function EndingScreen({ onRestart }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-green-800 to-green-900 flex flex-col items-center justify-center px-6 text-center">
      <div className="text-6xl mb-6 animate-bounce">🍀</div>
      <h2 className="text-3xl font-bold text-amber-200 mb-4 tracking-widest" style={{ fontFamily: 'serif' }}>
        謎解き完了
      </h2>
      <p className="text-green-200 text-lg mb-2">おめでとうございます！</p>
      <p className="text-green-300 text-sm mb-8">
        吉田源三郎の百年の想いを受け取りました。
      </p>

      <div className="bg-black/30 rounded-2xl p-6 max-w-md border border-amber-600/30 mb-8">
        <p className="text-amber-200 text-sm leading-relaxed italic">
          「水は山を流れ、命は土へ還る。<br />
          そして想いは、時を超えて人から人へと受け継がれる。<br />
          この庭を訪れたあなたもまた、百年の物語の一部だ。」
        </p>
        <p className="text-green-400 text-xs mt-3">― 吉田源三郎</p>
      </div>

      <div className="grid grid-cols-2 gap-3 max-w-sm w-full mb-8 text-xs">
        {[
          { icon: '🐟', name: '吉田観賞魚', desc: '錦鯉の泳ぐ池' },
          { icon: '🌺', name: 'グリーンギャラリー', desc: '命溢れる温室' },
          { icon: '🛒', name: 'ガーデンズマルシェ', desc: '大地の恵み' },
          { icon: '🦦', name: 'オコジュ', desc: '静寂の庭園' },
        ].map((spot) => (
          <div key={spot.name} className="bg-black/30 rounded-xl p-3 border border-green-700/40">
            <div className="text-2xl mb-1">{spot.icon}</div>
            <p className="text-green-200 font-semibold">{spot.name}</p>
            <p className="text-green-400">{spot.desc}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onRestart}
        className="bg-amber-500 hover:bg-amber-400 text-green-900 font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
      >
        もう一度プレイ
      </button>
    </div>
  )
}

export default function App() {
  const [stage, setStage] = useState(STAGES.TITLE)
  const [puzzleIndex, setPuzzleIndex] = useState(0)
  const [nextStoryStage, setNextStoryStage] = useState(STAGES.CLUE_ONE)

  const go = (next) => setStage(next)
  const clampPuzzleIndex = (index) => {
    if (index < 0) return 0
    if (index >= stepsData.length) return stepsData.length - 1
    return index
  }

  const goToPuzzle = (index, next) => {
    const safeIndex = clampPuzzleIndex(index)
    setPuzzleIndex(safeIndex)
    setNextStoryStage(next)
    go(STAGES.PUZZLE)
  }
  const handlePuzzleSkip = () => {
    const hasNextPuzzle = puzzleIndex < stepsData.length - 1
    if (nextStoryStage === STAGES.ENDING && hasNextPuzzle) {
      goToPuzzle(puzzleIndex + 1, STAGES.ENDING)
      return
    }
    go(nextStoryStage)
  }

  if (stage === STAGES.TITLE) {
    return <TitleScreen onStart={() => go(STAGES.PROLOGUE)} />
  }

  if (stage === STAGES.PROLOGUE) {
    return (
      <StoryPanel
        title={storyContent.prologue.title}
        lines={storyContent.prologue.lines}
        icon="📜"
        onNext={() => go(STAGES.AR_SCAN)}
        nextLabel="石碑をスキャンする"
      />
    )
  }

  if (stage === STAGES.AR_SCAN) {
    return <ARScanScreen onScanComplete={() => go(STAGES.CLUE_ONE)} />
  }

  if (stage === STAGES.PUZZLE) {
    const currentStep = stepsData[puzzleIndex]
    return (
      <PuzzleScreen
        step={currentStep}
        stepNumber={puzzleIndex + 1}
        totalSteps={stepsData.length}
        onSkip={handlePuzzleSkip}
      />
    )
  }

  if (stage === STAGES.CLUE_ONE) {
    return (
      <StoryPanel
        title={storyContent.clueOne.title}
        lines={storyContent.clueOne.lines}
        icon="🪨"
        onNext={() => goToPuzzle(0, STAGES.CLUE_TWO)}
        nextLabel="古い楠を探す"
      />
    )
  }

  if (stage === STAGES.CLUE_TWO) {
    return (
      <StoryPanel
        title={storyContent.clueTwo.title}
        lines={storyContent.clueTwo.lines}
        icon="🍀"
        onNext={() => goToPuzzle(1, STAGES.FINAL)}
        nextLabel="最後の真実へ"
      />
    )
  }

  if (stage === STAGES.FINAL) {
    return (
      <StoryPanel
        title={storyContent.final.title}
        lines={storyContent.final.lines}
        icon="🌟"
        onNext={() => goToPuzzle(2, STAGES.ENDING)}
        nextLabel="物語を締めくくる"
      />
    )
  }

  if (stage === STAGES.ENDING) {
    return <EndingScreen onRestart={() => go(STAGES.TITLE)} />
  }

  return null
}
