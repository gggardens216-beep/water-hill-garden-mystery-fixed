import Button from './Button'
import Card from './Card'

export default function Ending({ userName, onRestart }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-green-800 to-green-900 flex items-center justify-center px-6 py-10">
      <div className="max-w-xl w-full text-center">
        <h2 className="text-3xl font-bold text-amber-200 mb-2 tracking-wide" style={{ fontFamily: 'serif' }}>
          ゲームクリア！
        </h2>
        <p className="text-green-200 mb-6">{userName}さん、謎解き達成おめでとうございます。</p>

        <Card className="text-left mb-6">
          <p className="text-green-100 text-sm leading-relaxed mb-3">
            あなたが集めた言葉は、100年続く庭園の記憶そのものでした。
          </p>
          <p className="text-green-100 text-sm leading-relaxed">
            水は山を流れ、命は土へ還る。そして想いは、次の世代へと受け継がれていきます。
          </p>
        </Card>

        <Button onClick={onRestart}>もう一度プレイ</Button>
      </div>
    </div>
  )
}
