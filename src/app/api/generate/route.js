import { NextResponse } from 'next/server'
import { buildPrompt } from '@/lib/prompts'

export const config = { api: { bodyParser: false } }

// 调用通义万象图像生成（人物参考图模式）
async function callTongyiWanxiang(imageBase64, prompt) {
  const apiKey = process.env.TONGYI_API_KEY
  if (!apiKey) throw new Error('未配置 TONGYI_API_KEY')

  // 提交生成任务
  const submitRes = await fetch(
    'https://dashscope.aliyuncs.com/api/v1/services/aigc/image-generation/generation',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'X-DashScope-Async': 'enable',
      },
      body: JSON.stringify({
        model: 'wanx-v1',
        input: {
          prompt,
          ref_img: imageBase64,
        },
        parameters: {
          style: '<auto>',
          size: '768*1024',
          n: 1,
          ref_strength: 0.5,
          ref_mode: 'repaint',
        },
      }),
    }
  )

  const submitData = await submitRes.json()
  if (submitData.code) throw new Error(submitData.message || '提交任务失败')

  const taskId = submitData.output?.task_id
  if (!taskId) throw new Error('未获取到任务ID')

  // 轮询任务状态（最多等60秒）
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 3000))
    const pollRes = await fetch(
      `https://dashscope.aliyuncs.com/api/v1/tasks/${taskId}`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    )
    const pollData = await pollRes.json()
    const taskStatus = pollData.output?.task_status

    if (taskStatus === 'SUCCEEDED') {
      const url = pollData.output?.results?.[0]?.url
      if (!url) throw new Error('生成成功但未返回图片URL')
      return url
    }
    if (taskStatus === 'FAILED') {
      throw new Error(pollData.output?.message || '生成任务失败')
    }
  }

  throw new Error('生成超时，请稍后重试')
}

export async function POST(request) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image')
    const dynasty = formData.get('dynasty') || '唐朝'
    const style = formData.get('style') || '水墨画'

    if (!imageFile) {
      return NextResponse.json({ error: '请上传图片' }, { status: 400 })
    }

    // 转 base64
    const arrayBuffer = await imageFile.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    const mimeType = imageFile.type || 'image/jpeg'
    const imageBase64 = `data:${mimeType};base64,${base64}`

    const prompt = buildPrompt(dynasty, style)
    const imageUrl = await callTongyiWanxiang(imageBase64, prompt)

    return NextResponse.json({ imageUrl })
  } catch (e) {
    console.error('[generate]', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
