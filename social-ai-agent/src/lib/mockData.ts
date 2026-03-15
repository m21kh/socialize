import { Post, Account } from './types'

export const mockAccounts: Account[] = [
  { id: '1', platform: 'instagram', username: '@yourbrand', connected: true, followers: 34200 },
  { id: '2', platform: 'facebook', username: 'Your Brand Page', connected: true, followers: 12800 },
  { id: '3', platform: 'youtube', username: 'Your Brand Channel', connected: false, followers: 8400 },
]

export const mockPosts: Post[] = [
  {
    id: '1',
    content: '✨ Behind the scenes of our latest shoot! The energy was electric and we can\'t wait to share the full story with you. Drop a 🔥 if you want to see more! #BehindTheScenes #ContentCreator',
    platforms: ['instagram'],
    status: 'published',
    engagement: { likes: 1840, comments: 124, shares: 67, reach: 24000 },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    content: 'We just hit 10,000 followers! 🎉 This community means everything to us. To celebrate, we\'re giving away a free 1-month Pro subscription. Comment below to enter! Who wants it?',
    platforms: ['facebook', 'instagram'],
    status: 'published',
    engagement: { likes: 2310, comments: 398, shares: 445, reach: 51000 },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    content: 'NEW VIDEO: How we grew our Instagram from 0 to 10K in 90 days — all organic, no ads.\n\nIn this video I break down the exact strategy, post format, and posting schedule that worked.\n\n0:00 Intro\n1:30 The content strategy\n5:00 Post format secrets\n9:45 Consistency system\n14:00 Results & takeaways\n\nLike and subscribe for weekly growth tips!\n\n#InstagramGrowth #SocialMedia #ContentStrategy',
    platforms: ['youtube'],
    status: 'draft',
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
  },
]
