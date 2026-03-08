import { useState } from 'react';
import { ChevronRight, Check, TriangleAlert } from 'lucide-react';
import { cn } from '~/lib/utils';
import { checklistGroups, type ChecklistItem } from '~/data/checklist';
import { useChecklist } from '~/hooks/useChecklist';

export function ChecklistSection() {
  const { checked, toggle, reset } = useChecklist();

  const totalItems = checklistGroups.reduce((sum, g) => sum + g.items.length, 0);
  const checkedCount = checked.size;
  const progress = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0;

  const firstIncompleteGroupId = checklistGroups.find(g =>
    g.items.some(item => !checked.has(item.id))
  )?.id;

  const [openGroups, setOpenGroups] = useState<Set<string>>(
    new Set(firstIncompleteGroupId ? [firstIncompleteGroupId] : [])
  );

  const toggleGroup = (id: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="section-enter p-4 flex flex-col gap-4">
      <h2 className="font-display italic text-2xl font-semibold text-foreground leading-tight">
        Checklist
      </h2>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[0.65rem] tracking-[0.08em] uppercase text-muted">Progress</span>
          <span className="font-mono text-[0.7rem] text-muted">{checkedCount} of {totalItems} packed</span>
        </div>
        <div className="h-[3px] rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-full bg-gold rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Groups */}
      <div className="flex flex-col gap-2">
        {checklistGroups.map(group => {
          const pending = group.items.filter(item => !checked.has(item.id));
          const done = group.items.filter(item => checked.has(item.id));
          const isOpen = openGroups.has(group.id);

          return (
            <div
              key={group.id}
              className={cn(
                'bg-card border border-border rounded-xl overflow-hidden',
                group.accent === 'gold' && 'border-l-[3px] border-l-gold'
              )}
            >
              {/* Accordion header */}
              <button
                className="w-full flex items-center justify-between px-3.5 py-3 text-left"
                onClick={() => toggleGroup(group.id)}
              >
                <span className="font-display italic text-[1rem] font-semibold text-foreground">
                  {group.label}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-[0.65rem] text-muted">
                    {done.length} / {group.items.length}
                  </span>
                  <ChevronRight
                    size={14}
                    className={cn(
                      'text-muted transition-transform duration-200',
                      isOpen && 'rotate-90'
                    )}
                  />
                </div>
              </button>

              {/* Items */}
              {isOpen && (
                <div className="pb-1 border-t border-white/5">
                  {pending.map(item => (
                    <ItemRow key={item.id} item={item} isDone={false} onToggle={() => toggle(item.id)} />
                  ))}

                  {done.length > 0 && (
                    <>
                      <div className="flex items-center gap-2 px-3.5 py-1.5 mt-0.5">
                        <div className="h-px flex-1" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                        <span className="text-[0.58rem] text-muted font-mono tracking-[0.06em]">done</span>
                        <div className="h-px flex-1" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
                      </div>
                      {done.map(item => (
                        <ItemRow key={item.id} item={item} isDone={true} onToggle={() => toggle(item.id)} />
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Reset button */}
      {checkedCount > 0 && (
        <button
          onClick={reset}
          className="text-[0.72rem] text-muted hover:text-danger transition-colors self-center mt-1"
        >
          ↺ Reset all
        </button>
      )}
    </div>
  );
}

function ItemRow({
  item,
  isDone,
  onToggle,
}: {
  item: ChecklistItem;
  isDone: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      className={cn(
        'w-full flex items-start gap-3 px-3.5 py-2 text-left transition-opacity',
        isDone && 'opacity-75'
      )}
      onClick={onToggle}
    >
      {/* Checkbox */}
      <div className="mt-[3px] shrink-0">
        {isDone ? (
          <div className="w-4 h-4 rounded-sm bg-success border border-success flex items-center justify-center">
            <Check size={10} strokeWidth={3} className="text-surface" />
          </div>
        ) : (
          <div className="w-4 h-4 rounded-sm border border-white/25" />
        )}
      </div>

      {/* Label + warning */}
      <div className="flex-1 min-w-0">
        <span
          className={cn(
            'text-[0.83rem] leading-snug',
            isDone ? 'text-muted line-through' : 'text-foreground'
          )}
        >
          {item.label}
        </span>
        {(item.urgent || item.warning) && (
          <span className="ml-1.5 text-danger text-[0.65rem] inline-flex items-center gap-[3px] align-baseline">
            {item.urgent && <TriangleAlert size={10} className="shrink-0 inline" />}
            {item.warning && <span>{item.warning}</span>}
          </span>
        )}
      </div>
    </button>
  );
}
