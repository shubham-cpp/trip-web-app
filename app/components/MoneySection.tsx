import { cn } from '~/lib/utils';
import { tripData, cardStrategy, type CountryKey } from '~/data/trips';

interface Props {
  country: CountryKey;
}

const cardTypeClasses: Record<string, string> = {
  primary: 'bg-success/10 text-success border-success/25',
  atm: 'bg-gold/10 text-gold border-gold/25',
  backup: 'bg-muted/10 text-muted border-muted/25',
};

const cardTypeLabel: Record<string, string> = {
  primary: 'POS',
  atm: 'ATM',
  backup: 'Backup',
};

export function MoneySection({ country }: Props) {
  const { airportExchange, bestChangers, atms, atmNote } = tripData[country].money;

  const airportIsGood = airportExchange.verdict === 'yes-basement';

  return (
    <div className="section-enter p-4 flex flex-col gap-5">
      {/* Section heading */}
      <h2 className="font-display italic text-2xl font-semibold text-foreground leading-tight">
        Money & ATMs
      </h2>

      {/* Airport Exchange */}
      <div>
        <div className="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">
          Exchange at airport?
        </div>
        <div
          className={cn(
            'rounded-xl px-3.5 py-3 border',
            airportIsGood
              ? 'bg-success/8 border-success/25'
              : 'bg-danger/7 border-danger/25'
          )}
        >
          <div
            className={cn(
              'text-[0.85rem] font-medium mb-1',
              airportIsGood ? 'text-success' : 'text-danger'
            )}
          >
            {airportExchange.summary}
          </div>
          <p className="text-[0.78rem] text-[#9E9A8E] leading-relaxed">
            {airportExchange.detail}
          </p>
        </div>
      </div>

      {/* Best Changers */}
      <div>
        <div className="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">
          Best money changers
        </div>
        <div className="flex flex-col gap-2">
          {bestChangers.map((c, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl px-3.5 py-3"
            >
              <div className="text-[0.88rem] font-medium text-foreground mb-0.5">
                {c.name}
              </div>
              <div className="text-[0.72rem] text-gold font-mono mb-1.5">
                {c.location}
              </div>
              <p className="text-[0.76rem] text-[#9E9A8E] leading-relaxed">{c.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ATMs */}
      <div>
        <div className="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">
          ATMs
        </div>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* Best ATMs */}
          {atms.best.map((atm, i) => (
            <div
              key={i}
              className={cn(
                'flex items-center justify-between px-3.5 py-2.5',
                (i < atms.best.length - 1 || atms.avoid.length > 0) && 'border-b border-white/5'
              )}
            >
              <div>
                <span className="text-[0.83rem] font-medium text-foreground">
                  {atm.bank}
                </span>
                <span className="text-[0.7rem] font-mono text-muted ml-2">
                  max {atm.maxPerTxn}
                </span>
              </div>
              <span
                className={cn(`atm-${atm.verdict}`, 'text-xs font-mono font-medium')}
              >
                {atm.fee}
              </span>
            </div>
          ))}
          {/* Avoid ATMs */}
          {atms.avoid.map((atm, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3.5 py-2.5 bg-danger/5 border-t border-danger/12"
            >
              <div>
                <span className="text-[0.83rem] text-danger line-through">
                  {atm.bank}
                </span>
              </div>
              <span className="atm-avoid text-xs font-mono">
                {atm.fee}
              </span>
            </div>
          ))}
        </div>
        {atmNote && (
          <p className="text-[0.74rem] text-muted leading-relaxed mt-2 px-0.5">
            {atmNote}
          </p>
        )}
      </div>

      {/* Card strategy */}
      <div className="border-t border-border pt-1">
        <div className="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">
          Card strategy (all countries)
        </div>
        <div className="flex flex-col gap-2">
          {cardStrategy.map((c, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl px-3.5 py-3 flex gap-3 items-start"
            >
              <span
                className={cn(
                  'text-[0.62rem] px-[7px] py-0.5 rounded-full border font-mono shrink-0 mt-0.5',
                  cardTypeClasses[c.type]
                )}
              >
                {cardTypeLabel[c.type]}
              </span>
              <div>
                <div className="text-[0.83rem] font-medium text-foreground mb-0.5">
                  {c.card}
                </div>
                <div className="text-[0.72rem] text-gold mb-1 font-mono">
                  {c.use}
                </div>
                <p className="text-[0.75rem] text-[#9E9A8E] leading-relaxed">{c.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DCC Warning */}
      <div className="bg-danger-gradient border border-danger/30 rounded-xl p-3.5">
        <div className="text-[0.78rem] font-semibold text-danger mb-1.5">
          ⚠ Always decline DCC
        </div>
        <p className="text-[0.76rem] text-[#C8C4BA] leading-relaxed">
          When an ATM or card machine asks "Pay in INR?" or "Guaranteed conversion?" — always choose
          the <strong className="text-foreground">local currency</strong>. DCC adds a secret 3–7% markup on
          top of any card fees. Thailand ATMs are the most aggressive about this.
        </p>
      </div>
    </div>
  );
}
