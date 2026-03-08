import { cn } from '~/lib/utils';
import { tripData, type CountryKey } from '~/data/trips';
import type { Activity } from '~/data/trips';

interface Props {
  country: CountryKey;
}

const verdictConfig: Record<string, { label: string; className: string; headingClass: string }> = {
  must: { label: 'MUST', className: 'activity-must', headingClass: 'text-success' },
  optional: { label: 'OPTIONAL', className: 'activity-optional', headingClass: 'text-gold' },
  skip: { label: 'SKIP', className: 'activity-skip', headingClass: 'text-muted' },
};

export function ActivitiesSection({ country }: Props) {
  const activities = tripData[country].activities;

  const must = activities.filter((a) => a.verdict === 'must');
  const optional = activities.filter((a) => a.verdict === 'optional');
  const skip = activities.filter((a) => a.verdict === 'skip');

  return (
    <div className="section-enter p-4 flex flex-col gap-5">
      {/* Section heading */}
      <h2 className="font-display italic text-2xl font-semibold text-foreground leading-tight">
        Activities
      </h2>

      {/* Must do */}
      {must.length > 0 && (
        <div>
          <div className={cn('text-[0.65rem] tracking-[0.08em] uppercase mb-2', verdictConfig.must.headingClass)}>
            Must do
          </div>
          <div className="flex flex-col gap-2">
            {must.map((a, i) => (
              <ActivityCard key={i} activity={a} />
            ))}
          </div>
        </div>
      )}

      {/* Optional */}
      {optional.length > 0 && (
        <div>
          <div className={cn('text-[0.65rem] tracking-[0.08em] uppercase mb-2', verdictConfig.optional.headingClass)}>
            Optional
          </div>
          <div className="flex flex-col gap-2">
            {optional.map((a, i) => (
              <ActivityCard key={i} activity={a} />
            ))}
          </div>
        </div>
      )}

      {/* Skip */}
      {skip.length > 0 && (
        <div>
          <div className={cn('text-[0.65rem] tracking-[0.08em] uppercase mb-2', verdictConfig.skip.headingClass)}>
            Skip
          </div>
          <div className="flex flex-col gap-2">
            {skip.map((a, i) => (
              <ActivityCard key={i} activity={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const cfg = verdictConfig[activity.verdict];
  const isSkip = activity.verdict === 'skip';

  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl px-3.5 py-3',
        isSkip && 'opacity-65'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <span
          className={cn(
            'text-[0.88rem] font-medium',
            isSkip ? 'text-muted line-through' : 'text-foreground'
          )}
        >
          {activity.name}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              'font-mono text-[0.72rem]',
              activity.cost === 'FREE' ? 'text-success' : 'text-gold'
            )}
          >
            {activity.cost}
          </span>
          <span
            className={cn(
              cfg.className,
              'text-[0.58rem] px-[7px] py-0.5 rounded-full font-mono tracking-[0.04em]'
            )}
          >
            {cfg.label}
          </span>
        </div>
      </div>
      {activity.note && (
        <p className="text-xs text-[#9E9A8E] leading-relaxed">{activity.note}</p>
      )}
    </div>
  );
}
