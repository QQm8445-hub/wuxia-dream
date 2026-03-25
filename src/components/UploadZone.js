export default function UploadZone({ preview, onFileSelect }) {
  function handleChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过5MB')
      return
    }
    const reader = new FileReader()
    reader.onload = () => onFileSelect(file, reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-3">
      <label className="block text-amber-300 font-semibold">上传照片</label>
      <div className="border-2 border-dashed border-amber-700/50 rounded-xl p-6 text-center hover:border-amber-600 transition-colors">
        {preview ? (
          <img src={preview} alt="预览" className="max-h-64 mx-auto rounded-lg" />
        ) : (
          <div className="text-amber-400/60">点击或拖拽上传照片</div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="mt-4 text-sm text-amber-300"
        />
      </div>
    </div>
  )
}
