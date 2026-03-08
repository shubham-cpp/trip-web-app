import { tripData, type CountryKey } from '~/data/trips';
import type { Activity } from '~/data/trips';

interface Props {
  country: CountryKey;
}

const verdictConfig: Record<string, { label: string; className: string }> = {
  must: { label: 'MUST', className: 'activity-must' },
  optional: { label: 'OPTIONAL', className: 'activity-optional' },
  skip: { label: 'SKIP', className: 'activity-skip' },
};

export function ActivitiesSection({ country }: Props) {
  const activities = tripData[country].activities;

  const must = activities.filter((a) => a.verdict === 'must');
  const optional = activities.filter((a) => a.verdict === 'optional');
  const skip = activities.filter((a) => a.verdict === 'skip');

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
        Activities
      </h2>

      {/* Must do */}
      {must.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#4CAF7D',
              marginBottom: '8px',
            }}
          >
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
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#D4A017',
              marginBottom: '8px',
            }}
          >
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
          <div
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#7A776C',
              marginBottom: '8px',
            }}
          >
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
      style={{
        backgroundColor: '#141410',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '12px',
        padding: '12px 14px',
        opacity: isSkip ? 0.65 : 1,
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-1">
        <span
          style={{
            fontSize: '0.88rem',
            fontWeight: 500,
            color: isSkip ? '#7A776C' : '#F5F0E8',
            textDecoration: isSkip ? 'line-through' : 'none',
          }}
        >
          {activity.name}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.72rem',
              color: activity.cost === 'FREE' ? '#4CAF7D' : '#D4A017',
            }}
          >
            {activity.cost}
          </span>
          <span
            className={cfg.className}
            style={{
              fontSize: '0.58rem',
              padding: '2px 7px',
              borderRadius: '999px',
              fontFamily: '"DM Mono", monospace',
              letterSpacing: '0.04em',
            }}
          >
            {cfg.label}
          </span>
        </div>
      </div>
      {activity.note && (
        <p style={{ fontSize: '0.75rem', color: '#9E9A8E', lineHeight: 1.5 }}>{activity.note}</p>
      )}
    </div>
  );
}
