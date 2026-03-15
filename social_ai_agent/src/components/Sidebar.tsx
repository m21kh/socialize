'use client'
import { LayoutDashboard, Sparkles, CalendarDays, BarChart3, Settings, Zap, ChevronRight } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'generate', label: 'AI Generate', icon: Sparkles },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 min-h-screen border-r border-border flex flex-col" style={{ background: '#0D0D14' }}>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B6B)' }}>
            <Zap size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-text" style={{ fontFamily: 'var(--font-display)' }}>
            SocialAgent
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'text-white'
                  : 'text-text-2 hover:text-text hover:bg-surface'
              }`}
              style={isActive ? { background: 'rgba(108, 99, 255, 0.15)', color: '#6C63FF' } : {}}
            >
              <Icon size={18} className={isActive ? 'text-accent' : 'text-text-2 group-hover:text-text'} />
              {item.label}
              {isActive && <ChevronRight size={14} className="ml-auto text-accent" />}
            </button>
          )
        })}
      </nav>

      {/* Upgrade prompt */}
      <div className="p-4 m-4 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(255,107,107,0.1))', border: '1px solid rgba(108,99,255,0.2)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-accent" />
          <span className="text-xs font-semibold text-text" style={{ fontFamily: 'var(--font-display)' }}>Pro Features</span>
        </div>
        <p className="text-xs text-text-2 mb-3">Unlock unlimited posts, bulk scheduling & advanced analytics.</p>
        <button className="w-full text-xs font-semibold py-2 rounded-lg text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #6C63FF, #FF6B6B)' }}>
          Upgrade to Pro
        </button>
      </div>
    </aside>
  )
}
