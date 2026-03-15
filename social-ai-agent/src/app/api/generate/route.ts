import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const apiKey = process.env.DEEPSEEK_API_KEY || ''

  if (!apiKey) {
    return NextResponse.json({ error: { message: 'DEEPSEEK_API_KEY not set in environment variables.' } }, { status: 401 })
  }

  const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  const data = await response.json()
  return NextResponse.json(data, { status: response.status })
}
