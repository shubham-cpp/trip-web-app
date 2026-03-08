import { countries, type CountryKey } from '~/data/trips';

interface Props {
  active: CountryKey;
  onChange: (key: CountryKey) => void;
}

export function CountryTabs({ active, onChange }: Props) {
  return (
    <div
      className="flex"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      {(Object.keys(countries) as CountryKey[]).map((key) => {
        const meta = countries[key];
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex-1 flex flex-col items-center gap-0.5 py-3 relative transition-colors"
            style={{ minHeight: '56px' }}
          >
            <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{meta.flag}</span>
            <span
              style={{
                fontSize: '0.7rem',
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: isActive ? 500 : 400,
                color: isActive ? meta.colorVar : '#7A776C',
                transition: 'color 0.15s ease',
                letterSpacing: '0.02em',
              }}
            >
              {meta.name}
            </span>
            <span
              style={{
                fontSize: '0.6rem',
                color: isActive ? meta.colorVar : 'transparent',
                fontFamily: '"DM Mono", monospace',
                transition: 'color 0.15s ease',
              }}
            >
              {meta.dates}
            </span>
            {/* Active indicator */}
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                left: '12px',
                right: '12px',
                height: '2px',
                borderRadius: '9999px',
                backgroundColor: meta.colorVar,
                transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                transition: 'transform 0.2s ease',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
