import { MapPin } from 'lucide-react';
import { cn } from '~/lib/utils';
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
      <div className="text-[0.7rem] text-muted font-mono tracking-[0.05em] uppercase">
        {airportName} · {terminal}
      </div>

      {/* Section heading */}
      <h2 className="font-display italic text-2xl font-semibold text-foreground leading-tight mb-1">
        Airport → City
      </h2>

      {/* Options */}
      {options.map((opt, i) => (
        <div
          key={i}
          className={cn(
            'bg-card border border-border rounded-xl px-4 py-3.5',
            opt.verdict === 'skip' && 'opacity-70'
          )}
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div
                className={cn(
                  'text-[0.9rem] font-medium mb-0.5',
                  opt.verdict === 'skip'
                    ? 'text-muted line-through'
                    : 'text-foreground'
                )}
              >
                {opt.name}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[0.78rem] text-gold">
                  {opt.priceLocal}
                </span>
                <span className="text-muted text-[0.7rem]">·</span>
                <span className="font-mono text-[0.72rem] text-muted">
                  {opt.priceINR}
                </span>
                <span className="text-muted text-[0.7rem]">·</span>
                <span className="text-[0.72rem] text-muted">{opt.duration}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {opt.mapsUrl && (
                <a
                  href={opt.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#5A5750] hover:text-[#9E9A8E] transition-colors"
                  aria-label={`Open ${opt.name} on Google Maps`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                </a>
              )}
              <span
                className={cn(
                  verdictClass[opt.verdict],
                  'text-[0.68rem] px-2.5 py-[3px] rounded-full whitespace-nowrap shrink-0'
                )}
              >
                {opt.verdictLabel}
              </span>
            </div>
          </div>
          {opt.tip && (
            <p className="text-[0.78rem] text-[#9E9A8E] leading-relaxed pt-2 border-t border-white/5">
              {opt.tip}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
