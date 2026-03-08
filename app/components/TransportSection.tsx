import { tripData, type CountryKey } from '~/data/trips';

interface Props {
  country: CountryKey;
}

const verdictClass: Record<string, string> = {
  recommended: 'verdict-recommended',
  budget: 'verdict-budget',
  optional: 'verdict-optional',
  skip: 'verdict-skip',
};

export function TransportSection({ country }: Props) {
  const { airportName, terminal, options } = tripData[country].transport;

  return (
    <div className="section-enter p-4 flex flex-col gap-3">
      {/* Airport label */}
      <div
        style={{
          fontSize: '0.7rem',
          color: '#7A776C',
          fontFamily: '"DM Mono", monospace',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}
      >
        {airportName} · {terminal}
      </div>

      {/* Section heading */}
      <h2
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontStyle: 'italic',
          fontSize: '1.5rem',
          fontWeight: 600,
          color: '#F5F0E8',
          lineHeight: 1.1,
          marginBottom: '4px',
        }}
      >
        Airport → City
      </h2>

      {/* Options */}
      {options.map((opt, i) => (
        <div
          key={i}
          style={{
            backgroundColor: '#141410',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            padding: '14px 16px',
            opacity: opt.verdict === 'skip' ? 0.7 : 1,
          }}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: opt.verdict === 'skip' ? '#7A776C' : '#F5F0E8',
                  textDecoration: opt.verdict === 'skip' ? 'line-through' : 'none',
                  marginBottom: '2px',
                }}
              >
                {opt.name}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.78rem',
                    color: '#D4A017',
                    fontWeight: 400,
                  }}
                >
                  {opt.priceLocal}
                </span>
                <span style={{ color: '#7A776C', fontSize: '0.7rem' }}>·</span>
                <span
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.72rem',
                    color: '#7A776C',
                  }}
                >
                  {opt.priceINR}
                </span>
                <span style={{ color: '#7A776C', fontSize: '0.7rem' }}>·</span>
                <span style={{ fontSize: '0.72rem', color: '#7A776C' }}>{opt.duration}</span>
              </div>
            </div>
            <span
              className={verdictClass[opt.verdict]}
              style={{
                fontSize: '0.68rem',
                padding: '3px 10px',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              {opt.verdictLabel}
            </span>
          </div>
          {opt.tip && (
            <p
              style={{
                fontSize: '0.78rem',
                color: '#9E9A8E',
                lineHeight: 1.5,
                paddingTop: '8px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {opt.tip}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
