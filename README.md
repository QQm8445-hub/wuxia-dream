# 武侠梦 - 古代武侠风格人像生成

基于 Next.js + Tailwind CSS + 通义万象 API 的 AI 武侠画像生成器。

## 功能

- 上传照片（JPG/PNG，最大5MB）
- 选择古代朝代（唐/宋/明/清）
- 选择画风（水墨/工笔/写实/漫画）
- AI 生成武侠风格人物画像
- 下载高清结果

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 配置环境变量：
```bash
cp .env.example .env.local
# 编辑 .env.local，填入通义万象 API Key
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 访问 http://localhost:3000

## 获取 API Key

前往 [阿里云 DashScope](https://dashscope.console.aliyun.com/) 注册并获取 API Key。

## 技术栈

- Next.js 14
- React 18
- Tailwind CSS
- 通义万象图像生成 API
