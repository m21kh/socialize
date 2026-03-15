'use client'
import { useState } from 'react'
import { LayoutDashboard, Sparkles, FileText, Settings, Zap, ChevronRight, Menu, X } from 'lucide-react'
import GenerateTab from './GenerateTab'
import PostsTab from './PostsTab'
import SettingsTab from './SettingsTab'

const navItems = [
  { id: 'generate', label: 'AI Generate', icon: Sparkles, badge: 'AI' },
  { id: 'posts', label: 'Content Library', icon: FileText, badge: null },
  { id: 'settings', label: 'Settings', icon: Settings, badge: null },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('generate')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderTab = () => {
    switch (activeTab) {
      case 'generate': return <GenerateTab />
      case 'posts': return <PostsTab />
      case 'settings': return <SettingsTab />
      default: return <GenerateTab />
    }
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#0A0A0F' }}>
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} transition-all duration-300 border-r border-border flex flex-col shrink-0`}
        style={{ background: '#0D0D14' }}>

        {/* Logo */}
        <div className="h-16 px-4 flex items-center gap-3 border-b border-border shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B6B)' }}>
            <Zap size={15} className="text-white" />
          </div>
          {sidebarOpen && (
            <span className="font-bold text-text text-base truncate" style={{ fontFamily: 'var(--font-display)' }}>
              SocialAgent
            </span>
          )}
          <button onClick={() => setSidebarOpen(v => !v)}
            className="ml-auto text-text-2 hover:text-text transition-colors shrink-0">
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive ? '' : 'text-text-2 hover:text-text hover:bg-surface'}`}
                style={isActive ? { background: 'rgba(108,99,255,0.12)', color: '#6C63FF' } : {}}
                title={!sidebarOpen ? item.label : undefined}
              >
                <Icon size={17} className={isActive ? 'text-accent shrink-0' : 'text-text-2 group-hover:text-text shrink-0'} />
                {sidebarOpen && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-xs px-1.5 py-0.5 rounded-md font-bold shrink-0"
                        style={{ background: 'rgba(108,99,255,0.2)', color: '#6C63FF' }}>
                        {item.badge}
                      </span>
                    )}
                    {isActive && !item.badge && <ChevronRight size={13} className="ml-auto text-accent shrink-0" />}
                  </>
                )}
              </button>
            )
          })}
        </nav>

        {/* Pro badge */}
        {sidebarOpen && (
          <div className="m-3 p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(255,107,107,0.08))', border: '1px solid rgba(108,99,255,0.18)' }}>
            <p className="text-xs font-semibold text-text mb-1" style={{ fontFamily: 'var(--font-display)' }}>✨ Go Pro</p>
            <p className="text-xs text-text-2 mb-2 leading-relaxed">Unlimited AI generations, bulk scheduling & advanced analytics.</p>
            <button className="w-full text-xs font-bold py-1.5 rounded-lg text-white hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B6B)' }}>
              Upgrade
            </button>
          </div>
        )}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 px-6 flex items-center justify-between border-b border-border shrink-0" style={{ background: '#0D0D14' }}>
          <div>
            <h1 className="text-sm font-semibold text-text" style={{ fontFamily: 'var(--font-display)' }}>
              {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p className="text-xs text-text-2">AI Social Media Agent</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs"
              style={{ background: 'rgba(67,233,123,0.1)', color: '#43E97B', border: '1px solid rgba(67,233,123,0.2)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-3 animate-pulse" />
              DeepSeek AI Ready
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B6B)', color: 'white' }}>
              Y
            </div>
          </div>
        </header>

        {/* Tab content */}
        <main className="flex-1 p-6 overflow-auto">
          {renderTab()}
        </main>
      </div>
    </div>
  )
}
