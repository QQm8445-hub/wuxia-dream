export default function ResultPanel({ imageUrl, dynasty, style }) {
  return (
    <div className="w-full max-w-2xl mt-8 bg-amber-950/30 border border-amber-800/40 rounded-2xl p-8 text-center space-y-4">
      <h2 className="text-amber-400 font-bold text-xl">✨ 生成完成</h2>
      <p className="text-amber-200/60 text-sm">{dynasty} · {style}</p>
      <img
        src={imageUrl}
        alt="武侠画像"
        className="mx-auto rounded-xl max-h-96 border border-amber-700/30"
      />
      <a
        href={imageUrl}
        download="wuxia-dream.png"
        target="_blank"
        rel="noreferrer"
        className="inline-block mt-2 px-6 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors"
      >
        ⬇️ 下载图片
      </a>
    </div>
  )
}
