// Prompt 模板：朝代 + 画风 → 通义万象提示词
const DYNASTY_PROMPTS = {
  唐朝: 'Tang Dynasty ancient China, flowing hanfu robes, elegant court style',
  宋朝: 'Song Dynasty ancient China, refined literati style, scholarly robes',
  明朝: 'Ming Dynasty ancient China, heroic warrior robes, martial arts master',
  清朝: 'Qing Dynasty ancient China, traditional qipao or warrior attire',
}

const STYLE_PROMPTS = {
  水墨画: 'traditional Chinese ink wash painting style, black and white brush strokes, sumi-e art',
  工笔画: 'Chinese gongbi fine brush painting style, detailed line art, vibrant colors',
  写实风: 'realistic digital painting, cinematic lighting, highly detailed',
  漫画风: 'Chinese comic manga style, clean lines, anime-inspired illustration',
}

export function buildPrompt(dynasty, style, gender = '') {
  const dynastyDesc = DYNASTY_PROMPTS[dynasty] || DYNASTY_PROMPTS['唐朝']
  const styleDesc = STYLE_PROMPTS[style] || STYLE_PROMPTS['水墨画']
  return `A ${dynastyDesc} martial arts hero portrait, ${styleDesc}, wuxia warrior, dramatic pose, ancient Chinese background, masterpiece quality, 8k resolution`
}
