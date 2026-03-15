'use client'
import { useState } from 'react'
import { Key, CheckCircle, ExternalLink, Save, Eye, EyeOff } from 'lucide-react'
import { mockAccounts } from '@/lib/mockData'
import { platformConfig } from './PlatformBadge'
import { Platform } from '@/lib/types'

export default function SettingsTab() {
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || '')
  const [showKey, setShowKey] = useState(false)
  const [saved, setSaved] = useState(false)
  const [accounts] = useState(mockAccounts)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold text-text" style={{ fontFamily: 'var(--font-display)' }}>Settings</h2>
        <p className="text-sm text-text-2 mt-1">Configure your AI agent and connected accounts</p>
      </div>

      {/* API Key */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(108,99,255,0.15)' }}>
            <Key size={18} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-text" style={{ fontFamily: 'var(--font-display)' }}>DeepSeek API Key</h3>
            <p className="text-xs text-text-2">Required for AI content generation via DeepSeek</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-...."
              className="w-full rounded-xl px-4 py-3 text-sm text-text pr-12 focus:outline-none focus:ring-1 focus:ring-accent"
              style={{ background: '#0A0A0F', border: '1px solid #1E1E2E' }}
            />
            <button onClick={() => setShowKey(v => !v)}
              className="absolute right-3 top-3 text-text-2 hover:text-text transition-colors">
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-accent hover:underline">
              Get API key from platform.deepseek.com <ExternalLink size={11} />
            </a>
            <button onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all"
              style={{ background: saved ? 'rgba(67,233,123,0.15)' : 'rgba(108,99,255,0.15)', color: saved ? '#43E97B' : '#6C63FF' }}>
              {saved ? <><CheckCircle size={12} /> Saved!</> : <><Save size={12} /> Save Key</>}
            </button>
          </div>

          <div className="rounded-xl p-3 text-xs" style={{ background: '#0A0A0F', border: '1px solid #1E1E2E', color: '#8888AA' }}>
            💡 <strong className="text-text">For local development:</strong> Add <code className="px-1 py-0.5 rounded" style={{ background: '#1E1E2E' }}>DEEPSEEK_API_KEY=sk-ant-...</code> to your <code className="px-1 py-0.5 rounded" style={{ background: '#1E1E2E' }}>.env.local</code> file. The key is never stored in the browser.
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-semibold text-text mb-4" style={{ fontFamily: 'var(--font-display)' }}>Connected Accounts</h3>
        <div className="space-y-3">
          {accounts.map(acc => {
            const cfg = platformConfig[acc.platform as Platform]
            return (
              <div key={acc.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#0A0A0F', border: '1px solid #1E1E2E' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                  style={{ background: cfg.bg, color: cfg.color }}>
                  {cfg.symbol}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">{cfg.label}</p>
                  <p className="text-xs text-text-2">{acc.username} · {acc.followers.toLocaleString()} followers</p>
                </div>
                <div className="flex items-center gap-2">
                  {acc.connected ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#43E97B' }}>
                      <CheckCircle size={12} /> Connected
                    </span>
                  ) : (
                    <button className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}40` }}>
                      Connect
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-text-2 mt-3">
          * Platform API connections require their respective developer accounts and OAuth credentials.
        </p>
      </div>

      {/* AI Settings */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-semibold text-text mb-4" style={{ fontFamily: 'var(--font-display)' }}>AI Preferences</h3>
        <div className="space-y-4">
          {[
            { label: 'Brand Voice', placeholder: 'e.g. Friendly, professional, empowering for small business owners' },
            { label: 'Keywords to Always Include', placeholder: 'e.g. #YourBrand, sustainability, innovation' },
            { label: 'Topics to Avoid', placeholder: 'e.g. politics, competitors, controversial topics' },
          ].map(field => (
            <div key={field.label}>
              <label className="block text-xs font-semibold text-text-2 uppercase tracking-wider mb-2">{field.label}</label>
              <textarea
                placeholder={field.placeholder}
                className="w-full bg-transparent rounded-xl px-4 py-3 text-sm text-text placeholder-text-2 resize-none focus:outline-none focus:ring-1 focus:ring-accent"
                style={{ border: '1px solid #1E1E2E', minHeight: 72 }}
              />
            </div>
          ))}
          <button className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B6B)', color: 'white' }}>
            Save AI Preferences
          </button>
        </div>
      </div>
    </div>
  )
}
