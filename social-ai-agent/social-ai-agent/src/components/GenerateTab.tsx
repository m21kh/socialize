'use client'
import { useState } from 'react'
import { Sparkles, Wand2, Copy, RefreshCw, ThumbsUp, Hash, ChevronDown } from 'lucide-react'
import { Platform } from '@/lib/types'
import { generatePost, improvePost, generateHashtags } from '@/lib/claude'
import { PlatformToggle, platformConfig } from './PlatformBadge'

const tones = ['Professional', 'Casual', 'Humorous', 'Inspirational', 'Educational', 'Promotional']
const contentTypes = ['Post', 'Story Caption', 'Video Description', 'Reel Caption', 'Ad Copy', 'Thread']

export default function GenerateTab() {
  const [topic, setTopic] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram'])
  const [tone, setTone] = useState('Casual')
  const [contentType, setContentType] = useState('Post')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Record<string, string>>({})
  const [activePlatform, setActivePlatform] = useState<Platform | null>(null)
  const [improving, setImproving] = useState<Platform | null>(null)
  const [hashtagsLoading, setHashtagsLoading] = useState<Platform | null>(null)
  const [copied, setCopied] = useState<Platform | null>(null)
  const [apiKeyMissing, setApiKeyMissing] = useState(false)

  const platforms: Platform[] = ['instagram', 'facebook', 'youtube']

  const togglePlatform = (p: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    )
  }

  const handleGenerate = async () => {
    if (!topic.trim() || selectedPlatforms.length === 0) return
    setLoading(true)
    setResults({})
    setActivePlatform(selectedPlatforms[0])
    try {
      const res = await generatePost(topic, selectedPlatforms, tone, contentType)
      setResults(res)
      setApiKeyMissing(false)
    } catch (err: any) {
      if (err?.message?.includes('401') || err?.message?.includes('API key')) {
        setApiKeyMissing(true)
      }
    }
    setLoading(false)
  }

  const handleImprove = async (platform: Platform) => {
    if (!results[platform]) return
    setImproving(platform)
    const improved = await improvePost(results[platform], platform)
    setResults(prev => ({ ...prev, [platform]: improved }))
    setImproving(null)
  }

  const handleHashtags = async (platform: Platform) => {
    if (!topic) return
    setHashtagsLoading(platform)
    const tags = await generateHashtags(topic, platform)
    setResults(prev => ({
      ...prev,
      [platform]: prev[platform] + '\n\n' + tags
    }))
    setHashtagsLoading(null)
  }

  const handleCopy = (platform: Platform) => {
    navigator.clipboard.writeText(results[platform] || '')
    setCopied(platform)
    setTimeout(() => setCopied(null), 2000)
  }

  const charLimits: Record<Platform, number> = {
    instagram: 2200,
    facebook: 63206,
    youtube: 5000,
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-text" style={{ fontFamily: 'var(--font-display)' }}>
          AI Content Generator
        </h2>
        <p className="text-sm text-text-2 mt-1">Generate platform-optimized content in seconds using Claude AI</p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Left: Input panel */}
        <div className="col-span-2 space-y-4">
          <div className="glass rounded-xl p-5 space-y-5">
            {/* Topic */}
            <div>
              <label className="block text-xs font-semibold text-text-2 uppercase tracking-wider mb-2">
                What's it about?
              </label>
              <textarea
                className="w-full bg-transparent rounded-xl p-3 text-sm text-text placeholder-text-2 resize-none focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                style={{ border: '1px solid #1E1E2E', minHeight: 100 }}
                placeholder="e.g. Launching our new coffee blend, summer sale 30% off, workout motivation tips..."
                value={topic}
                onChange={e => setTopic(e.target.value)}
              />
            </div>

            {/* Platforms */}
            <div>
              <label className="block text-xs font-semibold text-text-2 uppercase tracking-wider mb-2">
                Platforms
              </label>
              <div className="flex flex-col gap-2">
                {platforms.map(p => (
                  <PlatformToggle
                    key={p}
                    platform={p}
                    selected={selectedPlatforms.includes(p)}
                    onClick={() => togglePlatform(p)}
                  />
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <label className="block text-xs font-semibold text-text-2 uppercase tracking-wider mb-2">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: tone === t ? 'rgba(108,99,255,0.2)' : '#12121A',
                      color: tone === t ? '#6C63FF' : '#8888AA',
                      border: `1px solid ${tone === t ? 'rgba(108,99,255,0.4)' : '#1E1E2E'}`,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Content type */}
            <div>
              <label className="block text-xs font-semibold text-text-2 uppercase tracking-wider mb-2">Content Type</label>
              <div className="relative">
                <select
                  value={contentType}
                  onChange={e => setContentType(e.target.value)}
                  className="w-full appearance-none rounded-xl px-4 py-2.5 text-sm text-text pr-10 focus:outline-none focus:ring-1 focus:ring-accent"
                  style={{ background: '#12121A', border: '1px solid #1E1E2E' }}
                >
                  {contentTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-3 text-text-2 pointer-events-none" />
              </div>
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim() || selectedPlatforms.length === 0}
              className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B6B)' }}
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Generating with Claude...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Content
                </>
              )}
            </button>
          </div>

          {/* API key notice */}
          {apiKeyMissing && (
            <div className="rounded-xl p-4 text-xs" style={{ background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', color: '#FF6B6B' }}>
              <strong>API Key Required:</strong> Add your <code className="bg-black/30 px-1 rounded">ANTHROPIC_API_KEY</code> to <code className="bg-black/30 px-1 rounded">.env.local</code> to enable AI generation.
            </div>
          )}
        </div>

        {/* Right: Results */}
        <div className="col-span-3">
          {Object.keys(results).length === 0 && !loading && (
            <div className="glass rounded-xl h-full flex flex-col items-center justify-center p-10 text-center" style={{ minHeight: 400 }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)' }}>
                <Wand2 size={28} className="text-accent" />
              </div>
              <h3 className="font-semibold text-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                Ready to Generate
              </h3>
              <p className="text-sm text-text-2 max-w-xs">
                Enter your topic, choose platforms & tone, then click Generate. Claude AI will create platform-optimized content instantly.
              </p>
            </div>
          )}

          {loading && (
            <div className="glass rounded-xl h-full flex flex-col items-center justify-center p-10 text-center" style={{ minHeight: 400 }}>
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(108,99,255,0.2)' }} />
                <div className="absolute inset-2 rounded-full flex items-center justify-center" style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)' }}>
                  <Sparkles size={20} className="text-accent animate-pulse" />
                </div>
              </div>
              <p className="text-sm font-medium text-text">Claude is writing...</p>
              <p className="text-xs text-text-2 mt-1">Optimizing for {selectedPlatforms.join(', ')}</p>
            </div>
          )}

          {Object.keys(results).length > 0 && (
            <div className="space-y-4">
              {/* Platform tabs */}
              {selectedPlatforms.length > 1 && (
                <div className="flex gap-2">
                  {selectedPlatforms.map(p => {
                    const cfg = platformConfig[p]
                    return (
                      <button
                        key={p}
                        onClick={() => setActivePlatform(p)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={{
                          background: activePlatform === p ? cfg.bg : 'transparent',
                          color: activePlatform === p ? cfg.color : '#8888AA',
                          border: `1px solid ${activePlatform === p ? cfg.color + '50' : '#1E1E2E'}`,
                        }}
                      >
                        <span>{cfg.symbol}</span>{cfg.label}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Result cards — show active or all */}
              {(selectedPlatforms.length === 1 ? selectedPlatforms : activePlatform ? [activePlatform] : selectedPlatforms).map(platform => {
                const cfg = platformConfig[platform]
                const content = results[platform] || ''
                const limit = charLimits[platform]
                const pct = Math.min((content.length / limit) * 100, 100)
                return (
                  <div key={platform} className="glass rounded-xl p-5 animate-slide-up">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{cfg.symbol}</span>
                        <span className="text-sm font-semibold" style={{ color: cfg.color, fontFamily: 'var(--font-display)' }}>
                          {cfg.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-2">{content.length}/{limit}</span>
                        <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: '#1E1E2E' }}>
                          <div className="h-full rounded-full transition-all" style={{
                            width: `${pct}%`,
                            background: pct > 90 ? '#FF6B6B' : pct > 70 ? '#FFB347' : '#43E97B'
                          }} />
                        </div>
                      </div>
                    </div>

                    <textarea
                      className="w-full bg-transparent text-sm text-text resize-none focus:outline-none leading-relaxed"
                      style={{ minHeight: 180 }}
                      value={content}
                      onChange={e => setResults(prev => ({ ...prev, [platform]: e.target.value }))}
                    />

                    <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid #1E1E2E' }}>
                      <button
                        onClick={() => handleCopy(platform)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-surface"
                        style={{ color: copied === platform ? '#43E97B' : '#8888AA' }}
                      >
                        <Copy size={12} />
                        {copied === platform ? 'Copied!' : 'Copy'}
                      </button>
                      <button
                        onClick={() => handleImprove(platform)}
                        disabled={improving === platform}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-surface"
                        style={{ color: '#8888AA' }}
                      >
                        {improving === platform ? <RefreshCw size={12} className="animate-spin" /> : <ThumbsUp size={12} />}
                        {improving === platform ? 'Improving...' : 'Improve'}
                      </button>
                      <button
                        onClick={() => handleHashtags(platform)}
                        disabled={hashtagsLoading === platform}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-surface"
                        style={{ color: '#8888AA' }}
                      >
                        {hashtagsLoading === platform ? <RefreshCw size={12} className="animate-spin" /> : <Hash size={12} />}
                        {hashtagsLoading === platform ? 'Adding...' : 'Add Hashtags'}
                      </button>
                      <button
                        onClick={() => handleGenerate()}
                        className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{ background: 'rgba(108,99,255,0.15)', color: '#6C63FF' }}
                      >
                        <RefreshCw size={12} />
                        Regenerate
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
