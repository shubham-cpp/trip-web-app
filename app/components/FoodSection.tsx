import { tripData, type CountryKey } from '~/data/trips';

interface Props {
  country: CountryKey;
}

export function FoodSection({ country }: Props) {
  const { mustTry, vegetarianPhrase, vegetarianMeaning, warning, spot } = tripData[country].food;

  return (
    <div className="section-enter p-4 flex flex-col gap-5">
      {/* Section heading */}
      <h2 className="font-display italic text-2xl font-semibold text-foreground leading-tight">
        Food & Eating
      </h2>

      {/* Must-try dishes */}
      <div>
        <div className="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">
          Must try
        </div>
        <div className="flex flex-col gap-2">
          {mustTry.map((dish, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-[10px] px-3.5 py-2.5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-[1.3rem]">{dish.emoji}</span>
                <span className="text-[0.88rem] text-foreground">
                  {dish.name}
                </span>
              </div>
              <span className="font-mono text-xs text-gold shrink-0">
                {dish.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Vegetarian phrase — show-to-restaurant card */}
      <div>
        <div className="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">
          Show this to restaurant staff
        </div>
        <div className="bg-gold-gradient border border-gold/25 rounded-xl p-4 text-center">
          <div className="font-display italic text-[1.65rem] font-semibold text-gold leading-snug mb-1.5">
            {vegetarianPhrase}
          </div>
          <div className="text-[0.72rem] text-muted font-sans">
            = {vegetarianMeaning}
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-gold/7 border border-gold/20 rounded-xl px-3.5 py-3">
        <div className="text-[0.72rem] font-semibold text-gold mb-1">
          ⚠ Watch out
        </div>
        <p className="text-[0.78rem] text-[#C8C4BA] leading-relaxed">{warning}</p>
      </div>

      {/* Spot recommendation */}
      {spot && (
        <div className="bg-card border border-border rounded-xl px-3.5 py-3">
          <div className="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-1.5">
            Where to eat
          </div>
          <p className="text-[0.8rem] text-[#C8C4BA] leading-relaxed">{spot}</p>
        </div>
      )}
    </div>
  );
}
