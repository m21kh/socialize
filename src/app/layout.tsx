import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SocialAgent — AI Social Media Manager',
  description: 'AI-powered social media management: generate, schedule, and analyze posts across all platforms.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
