# 🤖 SocialAgent — AI Social Media Manager

An AI-powered social media content generator for **Instagram**, **Facebook**, and **YouTube**, built with Next.js and Claude AI.

![SocialAgent](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Claude AI](https://img.shields.io/badge/Claude-Sonnet-orange?logo=anthropic)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwindcss)

## ✨ Features

- **AI Post Generation** — Generate platform-optimized content for Instagram, Facebook & YouTube using Claude AI
- **Multi-Platform Support** — Each platform gets content tailored to its format, character limits, and audience
- **Tone Control** — Choose from Professional, Casual, Humorous, Inspirational, Educational, or Promotional
- **Content Types** — Posts, Story Captions, Video Descriptions, Reel Captions, Ad Copy, Threads
- **Improve & Refine** — One-click AI improvement of any generated post
- **Smart Hashtags** — AI-generated hashtags added in one click
- **Content Library** — Browse, edit, and manage all your drafts and published posts
- **Collapsible Sidebar** — Clean, distraction-free workspace

## 🚀 Quick Start (Local)

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/social-ai-agent.git
cd social-ai-agent
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set your Anthropic API key

Create a `.env.local` file in the root directory:

```
DEEPSEEK_API_KEY=sk-YOUR_DEEPSEEK_KEY_HERE
```

Get your API key at: https://platform.deepseek.com/api_keys

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🌐 Deploy to Vercel (Recommended — Free)

### Option A: One-click deploy

1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Add Environment Variable: `DEEPSEEK_API_KEY` = your key
4. Click **Deploy**

✅ Done! Your app is live in ~2 minutes.

---

## 🐙 Deploy to GitHub Pages

Since this is a static export, you can host it on GitHub Pages:

### 1. Update `next.config.js`

```js
const nextConfig = {
  output: 'export',
  basePath: '/social-ai-agent', // your repo name
  trailingSlash: true,
  images: { unoptimized: true }
}
```

### 2. Build and export

```bash
npm run build
```

### 3. Deploy with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
        env:
          DEEPSEEK_API_KEY: ${{ secrets.DEEPSEEK_API_KEY }}
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

4. Add `DEEPSEEK_API_KEY` to GitHub repo → Settings → Secrets and Variables → Actions

> ⚠️ **Security Note:** For GitHub Pages (static hosting), the API key will be exposed in the browser. Use Vercel or a backend proxy for production. GitHub Pages is best for personal demos.

---

## 🔐 Production Security

For production use, add a Next.js API route to proxy Claude calls:

Create `src/app/api/generate/route.ts`:

```ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.DEEPSEEK_API_KEY!,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify(body)
  })
  const data = await response.json()
  return NextResponse.json(data)
}
```

Then update `src/lib/claude.ts` to call `/api/generate` instead of the Anthropic API directly.

---

## 🛠️ Project Structure

```
social-ai-agent/
├── src/
│   ├── app/
│   │   ├── globals.css       # Global styles + fonts
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Entry point
│   ├── components/
│   │   ├── Dashboard.tsx     # Main shell + navigation
│   │   ├── GenerateTab.tsx   # AI generation UI
│   │   ├── PostsTab.tsx      # Content library
│   │   ├── SettingsTab.tsx   # API key + preferences
│   │   └── PlatformBadge.tsx # Platform UI components
│   └── lib/
│       ├── claude.ts         # Claude API calls
│       ├── types.ts          # TypeScript types
│       └── mockData.ts       # Sample data
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **AI:** DeepSeek Chat
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Syne + DM Sans (Google Fonts)
- **Dates:** date-fns

## 📝 License

MIT — free to use and modify.
