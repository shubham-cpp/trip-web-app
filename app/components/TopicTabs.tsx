import { Plane, Banknote, UtensilsCrossed, ShieldAlert, Map } from 'lucide-react';
import { cn } from '~/lib/utils';
import type { TopicKey } from '~/data/trips';

const topics: { key: TopicKey; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { key: 'transport', label: 'Transport', Icon: Plane },
  { key: 'money', label: 'Money', Icon: Banknote },
  { key: 'food', label: 'Food', Icon: UtensilsCrossed },
  { key: 'scams', label: 'Scams', Icon: ShieldAlert },
  { key: 'activities', label: 'Activities', Icon: Map },
];

interface Props {
  active: TopicKey;
  onChange: (key: TopicKey) => void;
}

export function TopicTabs({ active, onChange }: Props) {
  return (
    <div className="flex overflow-x-auto scrollbar-hide border-b border-border">
      {topics.map(({ key, label, Icon }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2.5 relative whitespace-nowrap shrink-0 transition-colors duration-150',
              isActive ? 'text-foreground' : 'text-muted'
            )}
          >
            <Icon size={13} />
            <span
              className={cn(
                'text-[0.72rem] tracking-[0.01em]',
                isActive ? 'font-medium' : 'font-normal'
              )}
            >
              {label}
            </span>
            {/* Active underline */}
            <span
              className={cn(
                'absolute bottom-0 left-2 right-2 h-[1.5px] rounded-full bg-gold transition-transform duration-200',
                isActive ? 'scale-x-100' : 'scale-x-0'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
