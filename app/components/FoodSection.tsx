import { tripData, type CountryKey } from '~/data/trips';

interface Props {
  country: CountryKey;
}

export function FoodSection({ country }: Props) {
  const { mustTry, vegetarianPhrase, vegetarianMeaning, warning, spot } = tripData[country].food;

  return (
    <div className="section-enter p-4 flex flex-col gap-5">
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
        Food & Eating
      </h2>

      {/* Must-try dishes */}
      <div>
        <div
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#7A776C',
            marginBottom: '8px',
          }}
        >
          Must try
        </div>
        <div className="flex flex-col gap-2">
          {mustTry.map((dish, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#141410',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '10px',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ fontSize: '1.3rem' }}>{dish.emoji}</span>
                <span style={{ fontSize: '0.88rem', color: '#F5F0E8', fontWeight: 400 }}>
                  {dish.name}
                </span>
              </div>
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.75rem',
                  color: '#D4A017',
                  flexShrink: 0,
                }}
              >
                {dish.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Vegetarian phrase — show-to-restaurant card */}
      <div>
        <div
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#7A776C',
            marginBottom: '8px',
          }}
        >
          Show this to restaurant staff
        </div>
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(212, 160, 23, 0.08) 0%, rgba(20, 20, 16, 0.95) 100%)',
            border: '1px solid rgba(212, 160, 23, 0.25)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontSize: '1.65rem',
              fontWeight: 600,
              color: '#D4A017',
              lineHeight: 1.2,
              marginBottom: '6px',
            }}
          >
            {vegetarianPhrase}
          </div>
          <div
            style={{
              fontSize: '0.72rem',
              color: '#7A776C',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            = {vegetarianMeaning}
          </div>
        </div>
      </div>

      {/* Warning */}
      <div
        style={{
          backgroundColor: 'rgba(212, 160, 23, 0.07)',
          border: '1px solid rgba(212, 160, 23, 0.2)',
          borderRadius: '12px',
          padding: '12px 14px',
        }}
      >
        <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#D4A017', marginBottom: '4px' }}>
          ⚠ Watch out
        </div>
        <p style={{ fontSize: '0.78rem', color: '#C8C4BA', lineHeight: 1.6 }}>{warning}</p>
      </div>

      {/* Spot recommendation */}
      {spot && (
        <div
          style={{
            backgroundColor: '#141410',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            padding: '12px 14px',
          }}
        >
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7A776C', marginBottom: '6px' }}>
            Where to eat
          </div>
          <p style={{ fontSize: '0.8rem', color: '#C8C4BA', lineHeight: 1.6 }}>{spot}</p>
        </div>
      )}
    </div>
  );
}
