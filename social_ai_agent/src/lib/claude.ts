import { Platform } from './types'

const platformGuides: Record<Platform, string> = {
  instagram: 'Instagram: engaging caption, 3-5 relevant emojis, 5-10 hashtags at end, max 2200 chars',
  facebook: 'Facebook: conversational, community-friendly, can be longer, add a question to spark comments',
  youtube: 'YouTube: write a compelling video description with hook, key points, timestamps placeholder, CTA to subscribe, and relevant tags at the end',
}

async function callDeepSeek(systemPrompt: string, userMessage: string): Promise<string> {
  // Calls our own Next.js API route — keeps the API key server-side and safe
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'deepseek-chat',
      max_tokens: 1000,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data?.error?.message || 'DeepSeek API error')
  }
  return data.choices?.[0]?.message?.content || ''
}

export async function generatePost(
  topic: string,
  platforms: Platform[],
  tone: string,
  contentType: string
): Promise<Record<Platform, string>> {
  const results: Record<string, string> = {}

  await Promise.all(
    platforms.map(async (platform) => {
      const system = `You are an expert social media content creator specializing in ${platform}.
Platform rules: ${platformGuides[platform]}
Tone: ${tone}
Content type: ${contentType}
Return ONLY the post/content text — no explanations, no meta-commentary, no labels.`

      results[platform] = await callDeepSeek(system, `Create ${contentType} content about: ${topic}`)
    })
  )

  return results as Record<Platform, string>
}

export async function improvePost(content: string, platform: Platform): Promise<string> {
  return callDeepSeek(
    `You are a social media expert. Improve this ${platform} post to maximize engagement. Return ONLY the improved post text.`,
    content
  )
}

export async function generateHashtags(topic: string, platform: Platform): Promise<string> {
  return callDeepSeek(
    `Generate the best hashtags for ${platform} for the given topic. Return ONLY the hashtags separated by spaces, no explanation.`,
    `Topic: ${topic}`
  )
}
