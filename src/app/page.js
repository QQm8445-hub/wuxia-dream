'use client'

import { useState } from 'react'
import UploadZone from '@/components/UploadZone'
import StyleSelector from '@/components/StyleSelector'
import ResultPanel from '@/components/ResultPanel'

export default function Home() {
  const [uploadedImage, setUploadedImage] = useState(null) // base64 预览
  const [uploadedFile, setUploadedFile] = useState(null)   // File 对象
  const [dynasty, setDynasty] = useState('唐朝')
  const [style, setStyle] = useState('水墨画')
  const [status, setStatus] = useState('idle') // idle | loading | done | error
  const [resultUrl, setResultUrl] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleGenerate() {
    if (!uploadedFile) return
    setStatus('loading')
    setResultUrl(null)
    setErrorMsg('')

    const formData = new FormData()
    formData.append('image', uploadedFile)
    formData.append('dynasty', dynasty)
    formData.append('style', style)

    try {
      const res = await fetch('/api/generate', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '生成失败')
      setResultUrl(data.imageUrl)
      setStatus('done')
    } catch (e) {
      setErrorMsg(e.message)
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center py-12 px-4">
      {/* 标题 */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-amber-400 tracking-widest mb-2">⚔️ 武侠梦</h1>
        <p className="text-amber-200/70 text-sm">上传照片，穿越千年，成为古代武侠人物</p>
      </div>

      <div className="w-full max-w-2xl bg-amber-950/30 border border-amber-800/40 rounded-2xl p-8 space-y-8">
        {/* 上传区域 */}
        <UploadZone
          preview={uploadedImage}
          onFileSelect={(file, base64) => {
            setUploadedFile(file)
            setUploadedImage(base64)
            setStatus('idle')
            setResultUrl(null)
          }}
        />

        {/* 风格选择 */}
        <StyleSelector
          dynasty={dynasty}
          style={style}
          onDynastyChange={setDynasty}
          onStyleChange={setStyle}
        />

        {/* 生成按钮 */}
        <button
          onClick={handleGenerate}
          disabled={!uploadedFile || status === 'loading'}
          className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:bg-amber-900/50 disabled:cursor-not-allowed text-white font-bold text-lg transition-colors"
        >
          {status === 'loading' ? '生成中...' : '✨ 生成武侠画像'}
        </button>

        {/* 错误提示 */}
        {status === 'error' && (
          <p className="text-red-400 text-sm text-center">{errorMsg}</p>
        )}
      </div>

      {/* 结果展示 */}
      {status === 'done' && resultUrl && (
        <ResultPanel imageUrl={resultUrl} dynasty={dynasty} style={style} />
      )}
    </main>
  )
}
