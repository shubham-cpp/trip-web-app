import { Plane, Banknote, UtensilsCrossed, ShieldAlert, Map, Wifi } from 'lucide-react';
import type { TopicKey } from '~/data/trips';

const topics: { key: TopicKey; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { key: 'transport', label: 'Transport', Icon: Plane },
  { key: 'money', label: 'Money', Icon: Banknote },
  { key: 'food', label: 'Food', Icon: UtensilsCrossed },
  { key: 'scams', label: 'Scams', Icon: ShieldAlert },
  { key: 'activities', label: 'Activities', Icon: Map },
  { key: 'sim', label: 'SIM', Icon: Wifi },
];

interface Props {
  active: TopicKey;
  onChange: (key: TopicKey) => void;
}

export function TopicTabs({ active, onChange }: Props) {
  return (
    <div
      className="flex overflow-x-auto scrollbar-hide"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', gap: 0 }}
    >
      {topics.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className="flex items-center gap-1.5 px-4 py-2.5 relative whitespace-nowrap flex-shrink-0 transition-colors"
            style={{
              color: isActive ? '#F5F0E8' : '#7A776C',
              transition: 'color 0.15s ease',
            }}
          >
            <Icon size={13} />
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: isActive ? 500 : 400,
                letterSpacing: '0.01em',
              }}
            >
              {label}
            </span>
            {/* Active underline */}
            <span
              style={{
                position: 'absolute',
                bottom: 0,
                left: '8px',
                right: '8px',
                height: '1.5px',
                borderRadius: '9999px',
                backgroundColor: '#D4A017',
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
