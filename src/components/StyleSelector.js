const DYNASTIES = ['唐朝', '宋朝', '明朝', '清朝']
const STYLES = ['水墨画', '工笔画', '写实风', '漫画风']

export default function StyleSelector({ dynasty, style, onDynastyChange, onStyleChange }) {
  return (
    <div className="space-y-5">
      {/* 朝代选择 */}
      <div>
        <label className="block text-amber-300 font-semibold mb-2">选择朝代</label>
        <div className="grid grid-cols-4 gap-2">
          {DYNASTIES.map((d) => (
            <button
              key={d}
              onClick={() => onDynastyChange(d)}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                dynasty === d
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-950/50 text-amber-300 hover:bg-amber-800/50'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* 画风选择 */}
      <div>
        <label className="block text-amber-300 font-semibold mb-2">选择画风</label>
        <div className="grid grid-cols-4 gap-2">
          {STYLES.map((s) => (
            <button
              key={s}
              onClick={() => onStyleChange(s)}
              className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                style === s
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-950/50 text-amber-300 hover:bg-amber-800/50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
