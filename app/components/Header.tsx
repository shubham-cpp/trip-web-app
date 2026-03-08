const TRIP_START = new Date('2026-03-21T00:00:00+05:30');
const TRIP_END = new Date('2026-03-31T23:59:59+05:30');

function getTripStatus() {
  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;

  if (now < TRIP_START) {
    const days = Math.ceil((TRIP_START.getTime() - now.getTime()) / msPerDay);
    return { label: `${days}d to go`, highlight: false };
  }
  if (now <= TRIP_END) {
    const day = Math.floor((now.getTime() - TRIP_START.getTime()) / msPerDay) + 1;
    return { label: `Day ${day} of 10`, highlight: true };
  }
  return { label: 'Trip complete', highlight: false };
}

export function Header() {
  const status = getTripStatus();

  return (
    <div
      className="flex items-center justify-between px-4 py-3"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div>
        <span
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontSize: '1.15rem',
            fontWeight: 600,
            color: '#F5F0E8',
            letterSpacing: '-0.01em',
          }}
        >
          SE Asia{' '}
          <span style={{ color: '#D4A017' }}>'26</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span style={{ fontSize: '0.72rem', color: '#7A776C', fontFamily: '"DM Mono", monospace' }}>
          Mar 21–31
        </span>
        <span
          style={{
            fontSize: '0.68rem',
            fontFamily: '"DM Mono", monospace',
            padding: '2px 8px',
            borderRadius: '999px',
            backgroundColor: status.highlight
              ? 'rgba(212, 160, 23, 0.15)'
              : 'rgba(255, 255, 255, 0.06)',
            color: status.highlight ? '#D4A017' : '#7A776C',
            border: status.highlight
              ? '1px solid rgba(212, 160, 23, 0.3)'
              : '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
}
