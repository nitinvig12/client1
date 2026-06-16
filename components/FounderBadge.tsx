export function PhoenixIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2c1.2 2.4 3.6 3.6 3.6 6.6 0 1.8-1 3-1.8 3.9 1.8.3 3.6 1.5 4.2 3.6-1.8-.6-3-.3-3.9.6.9 1.5.6 3.3-.3 4.5-1.5-1.2-2.4-1.2-3.9 0-1.5-1.2-2.4-1.2-3.9 0-.9-1.2-1.2-3-.3-4.5-.9-.9-2.1-1.2-3.9-.6.6-2.1 2.4-3.3 4.2-3.6-.8-.9-1.8-2.1-1.8-3.9C8.4 5.6 10.8 4.4 12 2z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function FounderBadge({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const isSmall = size === 'sm'
  return (
    <span
      className={`relative inline-flex items-center gap-1 font-semibold rounded-full overflow-hidden ${
        isSmall ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      } text-amber-900`}
      style={{
        background: 'linear-gradient(135deg, #FEA971 0%, #7E5BFF 100%)',
        boxShadow: '0 0 8px rgba(254,169,113,0.6), 0 0 2px rgba(126,91,255,0.4)',
      }}
    >
      <span className="text-white drop-shadow-sm flex items-center gap-1">
        <PhoenixIcon size={isSmall ? 9 : 11} />
        Founding 111
      </span>
    </span>
  )
}
