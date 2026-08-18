'use client'

export default function ShareButtons({ url, title }) {
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {}
    }
  }

  return (
    <button
      onClick={handleNativeShare}
      title="Share"
      style={{
        padding: '0 14px', height: '26px',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        color: '#f4f1ea', cursor: 'pointer',
        fontSize: '10px', fontFamily: 'Space Mono, monospace',
        letterSpacing: '1px', borderRadius: '2px',
        whiteSpace: 'nowrap',
      }}
    >
      ↑ SHARE
    </button>
  )
}
