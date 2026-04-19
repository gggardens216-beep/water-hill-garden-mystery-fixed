import Button from '../ui/Button'
import Card from '../ui/Card'

export default function Ending({ userName, onRestart }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-green-800 to-green-900 px-6 py-10 text-center text-green-100">
      <div className="mx-auto max-w-xl">
        <h2 className="mb-4 text-3xl font-bold text-amber-200">ゲームクリア</h2>
        <p className="mb-6 text-lg">{userName} さん、おめでとうございます！</p>

        <Card className="mb-8 border-amber-500/40 bg-black/30">
          <p className="text-sm leading-relaxed text-amber-100">
            あなたは百年越しの手紙を読み解き、庭園に受け継がれた想いを未来へ繋ぎました。
            希望・信念・愛・幸運を胸に、またこの庭で会いましょう。
          </p>
        </Card>

        <Button onClick={onRestart} className="bg-amber-500 text-green-950 hover:bg-amber-400">
          もう一度プレイ
        </Button>
      </div>
    </div>
  )
}
