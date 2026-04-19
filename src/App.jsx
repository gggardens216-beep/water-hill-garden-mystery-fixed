import { useMemo, useState } from 'react'

function App() {
  const [step, setStep] = useState(0)
  const chapters = useMemo(
    () => [
      {
        title: '序章：百年庭園の呼び声',
        place: 'ガーデンエントランス',
        hint: '古い地図の端に描かれた四つ葉の印を探す',
        story:
          'あなたは Water Hill Garden に届いた一通の手紙を手に、100年前の庭師・吉田清一が残した謎へと足を踏み入れる。',
      },
      {
        title: '第一章：石碑に眠る約束',
        place: '記念石碑エリア',
        hint: '石碑の影が最も短くなる時刻に文字が揃う',
        story:
          '石碑の刻印は欠けているように見えたが、光の角度を変えると「継承」の二文字が浮かび上がる。',
      },
      {
        title: '第二章：温室の記憶',
        place: 'グリーンギャラリーガーデンズ',
        hint: '同じ葉脈を持つ植物を3つ見つける',
        story:
          '温室に残された育成記録には、次の世代へ庭を託すための合言葉が暗号として散りばめられていた。',
      },
      {
        title: '終章：四つ葉の継承',
        place: 'ガーデンズマルシェ前広場',
        hint: '4つの手掛かりを年代順に並べる',
        story:
          '最後の謎を解いた瞬間、あなたのAR画面に四つ葉の紋章が現れ、庭師の想いが現代へ受け継がれる。',
      },
    ],
    [],
  )

  const current = chapters[step]

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 md:px-8">
      <header className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-primary/15 md:p-8">
        <p className="text-sm font-semibold tracking-[0.16em] text-primary">
          WATER HILL GARDEN MYSTERY
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-primary md:text-5xl">
          100年の庭園と四つ葉の継承
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-ink/80 md:text-base">
          東京都八王子市の複合施設を巡り、看板・石碑・温室を手がかりに100年前の庭師が残した謎を解く次世代型周遊ミステリー。
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-[1.2fr_1fr]">
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/70">
            Chapter {step + 1} / {chapters.length}
          </p>
          <h2 className="mt-2 font-heading text-2xl font-semibold text-primary">
            {current.title}
          </h2>
          <p className="mt-4 rounded-lg bg-mist p-4 text-sm leading-7 text-ink/85">
            {current.story}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-primary px-3 py-1 font-semibold text-white">
              現在地: {current.place}
            </span>
            <span className="rounded-full bg-accent/20 px-3 py-1 font-semibold text-ink">
              手掛かり: {current.hint}
            </span>
          </div>
        </article>

        <aside className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-primary/10 md:p-8">
          <h3 className="font-heading text-xl font-semibold text-primary">進行操作</h3>
          <p className="mt-2 text-sm text-ink/75">
            物語を進めながら、各地点でARスキャン対象を確認します。
          </p>
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={() => setStep((value) => Math.max(value - 1, 0))}
              className="flex-1 rounded-lg border border-primary/20 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={step === 0}
            >
              戻る
            </button>
            <button
              type="button"
              onClick={() =>
                setStep((value) => Math.min(value + 1, chapters.length - 1))
              }
              className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={step === chapters.length - 1}
            >
              進む
            </button>
          </div>
          <ul className="mt-5 space-y-2 text-sm text-ink/80">
            {chapters.map((chapter, index) => (
              <li
                key={chapter.title}
                className={`rounded-lg px-3 py-2 ${
                  index === step ? 'bg-primary text-white' : 'bg-mist text-ink/80'
                }`}
              >
                {chapter.title}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </main>
  )
}

export default App
