import { tripData, cardStrategy, type CountryKey } from '~/data/trips';

interface Props {
  country: CountryKey;
}

const cardTypeColor: Record<string, string> = {
  primary: '#4CAF7D',
  atm: '#D4A017',
  backup: '#7A776C',
};

const cardTypeLabel: Record<string, string> = {
  primary: 'POS',
  atm: 'ATM',
  backup: 'Backup',
};

export function MoneySection({ country }: Props) {
  const { airportExchange, bestChangers, atms, atmNote } = tripData[country].money;

  const airportBg =
    airportExchange.verdict === 'yes-basement'
      ? 'rgba(76, 175, 125, 0.08)'
      : 'rgba(224, 82, 82, 0.07)';
  const airportBorder =
    airportExchange.verdict === 'yes-basement'
      ? 'rgba(76, 175, 125, 0.25)'
      : 'rgba(224, 82, 82, 0.25)';
  const airportColor =
    airportExchange.verdict === 'yes-basement' ? '#4CAF7D' : '#E05252';

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
        Money & ATMs
      </h2>

      {/* Airport Exchange */}
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
          Exchange at airport?
        </div>
        <div
          style={{
            backgroundColor: airportBg,
            border: `1px solid ${airportBorder}`,
            borderRadius: '12px',
            padding: '12px 14px',
          }}
        >
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 500,
              color: airportColor,
              marginBottom: '4px',
            }}
          >
            {airportExchange.summary}
          </div>
          <p style={{ fontSize: '0.78rem', color: '#9E9A8E', lineHeight: 1.5 }}>
            {airportExchange.detail}
          </p>
        </div>
      </div>

      {/* Best Changers */}
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
          Best money changers
        </div>
        <div className="flex flex-col gap-2">
          {bestChangers.map((c, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#141410',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                padding: '12px 14px',
              }}
            >
              <div style={{ fontSize: '0.88rem', fontWeight: 500, color: '#F5F0E8', marginBottom: '2px' }}>
                {c.name}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#D4A017', fontFamily: '"DM Mono", monospace', marginBottom: '6px' }}>
                {c.location}
              </div>
              <p style={{ fontSize: '0.76rem', color: '#9E9A8E', lineHeight: 1.5 }}>{c.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ATMs */}
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
          ATMs
        </div>
        <div
          style={{
            backgroundColor: '#141410',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {/* Best ATMs */}
          {atms.best.map((atm, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderBottom:
                  i < atms.best.length - 1 || atms.avoid.length > 0
                    ? '1px solid rgba(255,255,255,0.05)'
                    : 'none',
              }}
            >
              <div>
                <span style={{ fontSize: '0.83rem', fontWeight: 500, color: '#F5F0E8' }}>
                  {atm.bank}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontFamily: '"DM Mono", monospace',
                    color: '#7A776C',
                    marginLeft: '8px',
                  }}
                >
                  max {atm.maxPerTxn}
                </span>
              </div>
              <span
                className={`atm-${atm.verdict}`}
                style={{ fontSize: '0.75rem', fontFamily: '"DM Mono", monospace', fontWeight: 500 }}
              >
                {atm.fee}
              </span>
            </div>
          ))}
          {/* Avoid ATMs */}
          {atms.avoid.map((atm, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                backgroundColor: 'rgba(224, 82, 82, 0.05)',
                borderTop: '1px solid rgba(224, 82, 82, 0.12)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.83rem', color: '#E05252', textDecoration: 'line-through' }}>
                  {atm.bank}
                </span>
              </div>
              <span className="atm-avoid" style={{ fontSize: '0.75rem', fontFamily: '"DM Mono", monospace' }}>
                {atm.fee}
              </span>
            </div>
          ))}
        </div>
        {atmNote && (
          <p style={{ fontSize: '0.74rem', color: '#7A776C', lineHeight: 1.5, marginTop: '8px', padding: '0 2px' }}>
            {atmNote}
          </p>
        )}
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '4px' }}>
        <div
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#7A776C',
            marginBottom: '8px',
          }}
        >
          Card strategy (all countries)
        </div>
        <div className="flex flex-col gap-2">
          {cardStrategy.map((c, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#141410',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '12px',
                padding: '12px 14px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  fontSize: '0.62rem',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  backgroundColor: `${cardTypeColor[c.type]}18`,
                  color: cardTypeColor[c.type],
                  border: `1px solid ${cardTypeColor[c.type]}40`,
                  fontFamily: '"DM Mono", monospace',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {cardTypeLabel[c.type]}
              </span>
              <div>
                <div style={{ fontSize: '0.83rem', fontWeight: 500, color: '#F5F0E8', marginBottom: '2px' }}>
                  {c.card}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#D4A017', marginBottom: '4px', fontFamily: '"DM Mono", monospace' }}>
                  {c.use}
                </div>
                <p style={{ fontSize: '0.75rem', color: '#9E9A8E', lineHeight: 1.5 }}>{c.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DCC Warning */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(224, 82, 82, 0.1) 0%, rgba(20, 20, 16, 0.9) 100%)',
          border: '1px solid rgba(224, 82, 82, 0.3)',
          borderRadius: '12px',
          padding: '14px',
        }}
      >
        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#E05252', marginBottom: '6px' }}>
          ⚠ Always decline DCC
        </div>
        <p style={{ fontSize: '0.76rem', color: '#C8C4BA', lineHeight: 1.6 }}>
          When an ATM or card machine asks "Pay in INR?" or "Guaranteed conversion?" — always choose
          the <strong style={{ color: '#F5F0E8' }}>local currency</strong>. DCC adds a secret 3–7% markup on
          top of any card fees. Thailand ATMs are the most aggressive about this.
        </p>
      </div>
    </div>
  );
}
