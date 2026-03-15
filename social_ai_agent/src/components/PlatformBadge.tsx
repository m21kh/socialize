import { Platform } from '@/lib/types'

export const platformConfig: Record<Platform, { label: string; color: string; bg: string; symbol: string }> = {
  instagram: { label: 'Instagram', color: '#E1306C', bg: 'rgba(225,48,108,0.12)', symbol: '📸' },
  facebook: { label: 'Facebook', color: '#1877F2', bg: 'rgba(24,119,242,0.12)', symbol: 'f' },
  youtube: { label: 'YouTube', color: '#FF0000', bg: 'rgba(255,0,0,0.12)', symbol: '▶' },
}

export function PlatformBadge({ platform }: { platform: Platform }) {
  const cfg = platformConfig[platform]
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold"
      style={{ color: cfg.color, background: cfg.bg }}>
      <span>{cfg.symbol}</span>{cfg.label}
    </span>
  )
}

export function PlatformToggle({ platform, selected, onClick }: { platform: Platform; selected: boolean; onClick: () => void }) {
  const cfg = platformConfig[platform]
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border"
      style={{
        background: selected ? cfg.bg : 'transparent',
        color: selected ? cfg.color : '#8888AA',
        borderColor: selected ? cfg.color + '60' : '#1E1E2E',
        transform: selected ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <span className="text-base">{cfg.symbol}</span>
      {cfg.label}
    </button>
  )
}
