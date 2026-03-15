import { Platform } from './types'

const platformGuides: Record<Platform, string> = {
  instagram: 'Instagram: engaging caption, 3-5 relevant emojis, 5-10 hashtags at end, max 2200 chars',
  facebook: 'Facebook: conversational, community-friendly, can be longer, add a question to spark comments',
  youtube: 'YouTube: write a compelling video description with hook, key points, timestamps placeholder, CTA to subscribe, and relevant tags at the end',
}

export async function generatePost(topic: string, platforms: Platform[], tone: string, contentType: string): Promise<Record<Platform, string>> {
  const results: Record<string, string> = {}

  await Promise.all(platforms.map(async (platform) => {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are an expert social media content creator specializing in ${platform}.
Platform rules: ${platformGuides[platform]}
Tone: ${tone}
Content type: ${contentType}
Return ONLY the post/content text — no explanations, no meta-commentary, no labels.`,
        messages: [{ role: 'user', content: `Create ${contentType} content about: ${topic}` }]
      })
    })
    const data = await response.json()
    results[platform] = data.content?.[0]?.text || 'Generation failed. Please try again.'
  }))

  return results as Record<Platform, string>
}

export async function improvePost(content: string, platform: Platform): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You are a social media expert. Improve this ${platform} post to maximize engagement. Return ONLY the improved post text.`,
      messages: [{ role: 'user', content }]
    })
  })
  const data = await response.json()
  return data.content?.[0]?.text || content
}

export async function generateHashtags(topic: string, platform: Platform): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: `Generate the best hashtags for ${platform} for the given topic. Return ONLY the hashtags separated by spaces, no explanation.`,
      messages: [{ role: 'user', content: `Topic: ${topic}` }]
    })
  })
  const data = await response.json()
  return data.content?.[0]?.text || ''
}
