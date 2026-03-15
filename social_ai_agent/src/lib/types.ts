export type Platform = 'instagram' | 'facebook' | 'youtube'

export interface Post {
  id: string
  content: string
  platforms: Platform[]
  status: 'draft' | 'scheduled' | 'published'
  engagement?: {
    likes: number
    comments: number
    shares: number
    reach: number
  }
  createdAt: Date
}

export interface Account {
  id: string
  platform: Platform
  username: string
  connected: boolean
  followers: number
}

export interface GenerateRequest {
  topic: string
  platforms: Platform[]
  tone: string
  contentType: string
}
