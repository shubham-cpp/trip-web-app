import { tripData, type CountryKey } from '~/data/trips';

interface Props {
  country: CountryKey;
}

export function SIMSection({ country }: Props) {
  const sim = tripData[country].sim;
  const alreadyBought = sim.priceINR === '—';

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
        SIM Card
      </h2>

      {/* Already bought banner for Hanoi */}
      {alreadyBought && (
        <div
          style={{
            backgroundColor: 'rgba(76, 175, 125, 0.1)',
            border: '1px solid rgba(76, 175, 125, 0.3)',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '0.8rem',
            color: '#4CAF7D',
          }}
        >
          ✓ You already have this — your HCMC SIM works nationwide in Vietnam.
        </div>
      )}

      {/* Main SIM card */}
      <div
        style={{
          backgroundColor: '#141410',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          padding: '16px',
        }}
      >
        {/* Carrier + plan */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#F5F0E8',
                marginBottom: '2px',
              }}
            >
              {sim.carrier}
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                color: '#D4A017',
                fontFamily: '"DM Mono", monospace',
              }}
            >
              {sim.plan}
            </div>
          </div>
          {!alreadyBought && (
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#D4A017',
                  fontFamily: '"DM Mono", monospace',
                }}
              >
                {sim.price}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#7A776C', fontFamily: '"DM Mono", monospace' }}>
                {sim.priceINR}
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: '0',
            marginBottom: '12px',
            backgroundColor: '#1E1E1A',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          {[
            { label: 'Data', value: sim.data },
            { label: 'Valid', value: sim.validity },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRight: i === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '0.62rem', color: '#7A776C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#F5F0E8', fontFamily: '"DM Mono", monospace' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Why */}
        <p style={{ fontSize: '0.78rem', color: '#C8C4BA', lineHeight: 1.6, marginBottom: '10px' }}>
          {sim.why}
        </p>

        {/* Where to buy */}
        <div
          style={{
            backgroundColor: 'rgba(212, 160, 23, 0.06)',
            border: '1px solid rgba(212, 160, 23, 0.15)',
            borderRadius: '8px',
            padding: '8px 12px',
          }}
        >
          <div style={{ fontSize: '0.65rem', color: '#D4A017', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>
            Where to buy
          </div>
          <p style={{ fontSize: '0.76rem', color: '#C8C4BA', lineHeight: 1.5 }}>{sim.whereToBuy}</p>
        </div>
      </div>

      {/* Note */}
      {sim.note && (
        <p style={{ fontSize: '0.74rem', color: '#7A776C', lineHeight: 1.6, padding: '0 2px' }}>
          {sim.note}
        </p>
      )}

      {/* eSIM note */}
      <div
        style={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '10px',
          padding: '10px 14px',
        }}
      >
        <div style={{ fontSize: '0.65rem', color: '#7A776C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>
          eSIM alternative
        </div>
        <p style={{ fontSize: '0.75rem', color: '#9E9A8E', lineHeight: 1.5 }}>
          Airalo app has eSIMs for all three countries. Data-only (no local number), but works without a physical SIM slot. Good for pre-installing before departure.
        </p>
      </div>
    </div>
  );
}
