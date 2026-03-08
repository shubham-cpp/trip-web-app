import { cn } from '~/lib/utils';
import { countries, type CountryKey } from '~/data/trips';

interface Props {
  active: CountryKey;
  onChange: (key: CountryKey) => void;
}

const countryTextClass: Record<CountryKey, string> = {
  kl: 'text-kl',
  hcmc: 'text-hcmc',
  hanoi: 'text-hanoi',
  bangkok: 'text-bangkok',
};

const countryBgClass: Record<CountryKey, string> = {
  kl: 'bg-kl',
  hcmc: 'bg-hcmc',
  hanoi: 'bg-hanoi',
  bangkok: 'bg-bangkok',
};

export function CountryTabs({ active, onChange }: Props) {
  return (
    <div className="flex border-b border-border">
      {(Object.keys(countries) as CountryKey[]).map((key) => {
        const meta = countries[key];
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex-1 flex flex-col items-center gap-0.5 py-3 relative transition-colors min-h-14"
          >
            <span className="text-xl leading-none">{meta.flag}</span>
            <span
              className={cn(
                'text-[0.7rem] font-sans tracking-[0.02em] transition-colors duration-150',
                isActive ? cn('font-medium', countryTextClass[key]) : 'font-normal text-muted'
              )}
            >
              {meta.name}
            </span>
            <span
              className={cn(
                'text-[0.6rem] font-mono transition-colors duration-150',
                isActive ? countryTextClass[key] : 'text-transparent'
              )}
            >
              {meta.dates}
            </span>
            {/* Active indicator */}
            <span
              className={cn(
                'absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-transform duration-200',
                countryBgClass[key],
                isActive ? 'scale-x-100' : 'scale-x-0'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
