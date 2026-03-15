'use client'
import { TrendingUp, Users, Eye, MessageSquare, Clock, CheckCircle, FileText, ArrowUp } from 'lucide-react'
import { mockAccounts, mockPosts, mockAnalytics } from '@/lib/mockData'
import { PlatformBadge } from './PlatformBadge'
import { format } from 'date-fns'

const statCards = [
  { label: 'Total Reach', value: '61.2K', change: '+18.4%', icon: Eye, color: '#6C63FF' },
  { label: 'Engagements', value: '4,890', change: '+12.1%', icon: TrendingUp, color: '#43E97B' },
  { label: 'Followers', value: '60.6K', change: '+3.2%', icon: Users, color: '#FF6B6B' },
  { label: 'Posts This Week', value: '14', change: '+6', icon: MessageSquare, color: '#FFB347' },
]

export default function DashboardTab({ setActiveTab }: { setActiveTab: (t: string) => void }) {
  const scheduled = mockPosts.filter(p => p.status === 'scheduled')
  const published = mockPosts.filter(p => p.status === 'published')

  const maxReach = Math.max(...mockAnalytics.map(d => d.reach))

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {statCards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className="glass rounded-xl p-5 glow hover:scale-[1.02] transition-transform duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: card.color + '20' }}>
                  <Icon size={18} style={{ color: card.color }} />
                </div>
                <span className="text-xs font-semibold flex items-center gap-1 px-2 py-0.5 rounded-full" style={{ background: '#43E97B20', color: '#43E97B' }}>
                  <ArrowUp size={10} />{card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-text" style={{ fontFamily: 'var(--font-display)' }}>{card.value}</p>
              <p className="text-xs text-text-2 mt-0.5">{card.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Reach chart */}
        <div className="col-span-2 glass rounded-xl p-5 glow">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-text" style={{ fontFamily: 'var(--font-display)' }}>Weekly Reach</h3>
            <span className="text-xs text-text-2 px-2 py-1 rounded-md" style={{ background: '#1E1E2E' }}>Last 7 days</span>
          </div>
          <div className="flex items-end gap-2 h-32">
            {mockAnalytics.map(d => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md transition-all duration-500 hover:opacity-80"
                  style={{
                    height: `${(d.reach / maxReach) * 100}%`,
                    background: 'linear-gradient(to top, rgba(108,99,255,0.6), rgba(108,99,255,0.2))',
                    border: '1px solid rgba(108,99,255,0.3)',
                    minHeight: 4
                  }} />
                <span className="text-xs text-text-2">{d.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connected accounts */}
        <div className="glass rounded-xl p-5 glow">
          <h3 className="font-semibold text-text mb-4" style={{ fontFamily: 'var(--font-display)' }}>Accounts</h3>
          <div className="space-y-3">
            {mockAccounts.map(acc => (
              <div key={acc.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{
                    background: acc.connected ? 'rgba(67,233,123,0.15)' : 'rgba(255,107,107,0.1)',
                    color: acc.connected ? '#43E97B' : '#FF6B6B'
                  }}>
                  {acc.platform[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-text truncate">{acc.username}</p>
                  <p className="text-xs text-text-2">{acc.followers.toLocaleString()} followers</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${acc.connected ? 'bg-accent-3' : 'bg-accent-2'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Queue & Recent */}
      <div className="grid grid-cols-2 gap-4">
        {/* Scheduled queue */}
        <div className="glass rounded-xl p-5 glow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
              <Clock size={16} className="text-accent" /> Upcoming Posts
            </h3>
            <button onClick={() => setActiveTab('schedule')} className="text-xs text-accent hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {scheduled.map(post => (
              <div key={post.id} className="p-3 rounded-lg" style={{ background: '#0A0A0F', border: '1px solid #1E1E2E' }}>
                <p className="text-xs text-text line-clamp-2 mb-2">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {post.platforms.map(p => <PlatformBadge key={p} platform={p} />)}
                  </div>
                  <span className="text-xs text-text-2">
                    {post.scheduledAt ? format(post.scheduledAt, 'MMM d, h:mm a') : 'Draft'}
                  </span>
                </div>
              </div>
            ))}
            {scheduled.length === 0 && (
              <p className="text-xs text-text-2 text-center py-4">No scheduled posts</p>
            )}
          </div>
        </div>

        {/* Recent published */}
        <div className="glass rounded-xl p-5 glow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
              <CheckCircle size={16} className="text-accent-3" /> Recent Posts
            </h3>
            <button onClick={() => setActiveTab('analytics')} className="text-xs text-accent hover:underline">Analytics</button>
          </div>
          <div className="space-y-3">
            {published.map(post => (
              <div key={post.id} className="p-3 rounded-lg" style={{ background: '#0A0A0F', border: '1px solid #1E1E2E' }}>
                <p className="text-xs text-text line-clamp-2 mb-2">{post.content}</p>
                {post.engagement && (
                  <div className="flex gap-3 text-xs text-text-2">
                    <span>❤️ {post.engagement.likes.toLocaleString()}</span>
                    <span>💬 {post.engagement.comments}</span>
                    <span>🔄 {post.engagement.shares}</span>
                    <span>👁 {post.engagement.reach.toLocaleString()}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
