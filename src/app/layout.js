import './globals.css'

export const metadata = {
  title: '武侠梦 - 古代武侠风格人像生成',
  description: 'AI驱动的古代武侠人物画像生成器',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
