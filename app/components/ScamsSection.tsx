import { tripData, type CountryKey } from '~/data/trips';

interface Props {
  country: CountryKey;
}

export function ScamsSection({ country }: Props) {
  const scams = tripData[country].scams;

  return (
    <div className="section-enter p-4 flex flex-col gap-4">
      {/* Section heading */}
      <h2
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontStyle: 'italic',
          fontSize: '1.5rem',
          fontWeight: 600,
          color: '#F5F0E8',
          lineHeight: 1.1,
        }}
      >
        Scams & Safety
      </h2>
      <p style={{ fontSize: '0.78rem', color: '#7A776C', lineHeight: 1.5, marginTop: '-8px' }}>
        The ones that actually happen to tourists here.
      </p>

      {scams.map((scam, i) => (
        <div
          key={i}
          style={{
            backgroundColor: '#141410',
            borderLeft: '3px solid #E05252',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderRight: '1px solid rgba(255,255,255,0.06)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '0 12px 12px 0',
            padding: '14px',
          }}
        >
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#E05252',
              marginBottom: '6px',
            }}
          >
            {scam.name}
          </div>
          <p
            style={{
              fontSize: '0.78rem',
              color: '#C8C4BA',
              lineHeight: 1.6,
              marginBottom: '10px',
            }}
          >
            {scam.description}
          </p>
          <div
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'flex-start',
              backgroundColor: 'rgba(76, 175, 125, 0.07)',
              border: '1px solid rgba(76, 175, 125, 0.15)',
              borderRadius: '8px',
              padding: '8px 10px',
            }}
          >
            <span style={{ fontSize: '0.72rem', color: '#4CAF7D', fontWeight: 600, flexShrink: 0, paddingTop: '1px' }}>
              ✓ Avoid:
            </span>
            <span style={{ fontSize: '0.76rem', color: '#9E9A8E', lineHeight: 1.5 }}>
              {scam.avoid}
            </span>
          </div>
        </div>
      ))}

      {/* General rule */}
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px',
          padding: '12px 14px',
          marginTop: '4px',
        }}
      >
        <p style={{ fontSize: '0.76rem', color: '#7A776C', lineHeight: 1.6, textAlign: 'center' }}>
          Universal rule: if it sounds too good to be true, it is. Friendly strangers who approach you near tourist spots are almost always running a scam.
        </p>
      </div>
    </div>
  );
}
