'use client'
import { useState } from 'react'
import { FileText, Eye, ThumbsUp, MessageCircle, Share2, Trash2, Edit3 } from 'lucide-react'
import { mockPosts } from '@/lib/mockData'
import { Post } from '@/lib/types'
import { PlatformBadge } from './PlatformBadge'
import { format } from 'date-fns'

const statusStyles: Record<string, { label: string; color: string; bg: string }> = {
  published: { label: 'Published', color: '#43E97B', bg: 'rgba(67,233,123,0.1)' },
  draft: { label: 'Draft', color: '#FFB347', bg: 'rgba(255,179,71,0.1)' },
  scheduled: { label: 'Scheduled', color: '#6C63FF', bg: 'rgba(108,99,255,0.1)' },
}

export default function PostsTab() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  const filtered = posts.filter(p => filter === 'all' || p.status === filter)

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text" style={{ fontFamily: 'var(--font-display)' }}>Content Library</h2>
          <p className="text-sm text-text-2 mt-1">All your posts and drafts in one place</p>
        </div>
        <div className="flex gap-2">
          {(['all', 'published', 'draft'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all"
              style={{
                background: filter === f ? 'rgba(108,99,255,0.15)' : '#12121A',
                color: filter === f ? '#6C63FF' : '#8888AA',
                border: `1px solid ${filter === f ? 'rgba(108,99,255,0.3)' : '#1E1E2E'}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-xl p-16 flex flex-col items-center justify-center text-center">
          <FileText size={32} className="text-muted mb-3" />
          <p className="text-sm text-text-2">No posts found</p>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(post => {
          const st = statusStyles[post.status]
          return (
            <div key={post.id} className="glass rounded-xl p-5 hover:border-accent/20 transition-all group"
              style={{ border: '1px solid #1E1E2E' }}>
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  {/* Platforms + status */}
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {post.platforms.map(p => <PlatformBadge key={p} platform={p} />)}
                    <span className="px-2 py-0.5 rounded-md text-xs font-semibold" style={{ color: st.color, background: st.bg }}>
                      {st.label}
                    </span>
                    <span className="text-xs text-text-2 ml-auto">{format(post.createdAt, 'MMM d, yyyy')}</span>
                  </div>

                  {/* Content preview */}
                  <p className="text-sm text-text leading-relaxed line-clamp-3 whitespace-pre-wrap">{post.content}</p>

                  {/* Engagement */}
                  {post.engagement && (
                    <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: '1px solid #1E1E2E' }}>
                      <span className="flex items-center gap-1.5 text-xs text-text-2">
                        <ThumbsUp size={12} className="text-accent" /> {post.engagement.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-text-2">
                        <MessageCircle size={12} className="text-accent-2" /> {post.engagement.comments}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-text-2">
                        <Share2 size={12} className="text-accent-3" /> {post.engagement.shares}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-text-2">
                        <Eye size={12} className="text-yellow-400" /> {post.engagement.reach.toLocaleString()} reach
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 rounded-lg hover:bg-surface transition-colors text-text-2 hover:text-text">
                    <Edit3 size={14} />
                  </button>
                  <button onClick={() => deletePost(post.id)}
                    className="p-2 rounded-lg hover:bg-surface transition-colors text-text-2 hover:text-accent-2">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
