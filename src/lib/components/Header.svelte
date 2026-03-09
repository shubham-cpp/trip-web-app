<script lang="ts">
	import { cn } from '$lib/utils';

	const TRIP_START = new Date('2026-03-21T00:00:00+05:30');
	const TRIP_END = new Date('2026-03-31T23:59:59+05:30');

	function getTripStatus() {
		const now = new Date();
		const msPerDay = 1000 * 60 * 60 * 24;

		if (now < TRIP_START) {
			const days = Math.ceil((TRIP_START.getTime() - now.getTime()) / msPerDay);
			return { label: `${days}d to go`, highlight: false };
		}
		if (now <= TRIP_END) {
			const day = Math.floor((now.getTime() - TRIP_START.getTime()) / msPerDay) + 1;
			return { label: `Day ${day} of 10`, highlight: true };
		}
		return { label: 'Trip complete', highlight: false };
	}

	const status = getTripStatus();
</script>

<div class="flex items-center justify-between px-4 py-3 border-b border-border">
	<div>
		<span class="font-display italic text-[1.15rem] font-semibold text-foreground tracking-[-0.01em]">
			SE Asia <span class="text-gold">'26</span>
		</span>
	</div>
	<div class="flex items-center gap-3">
		<span class="text-[0.72rem] text-muted font-mono">Mar 21–31</span>
		<span
			class={cn(
				'text-[0.68rem] font-mono px-2 py-0.5 rounded-full border',
				status.highlight
					? 'bg-gold/15 text-gold border-gold/30'
					: 'bg-white/6 text-muted border-white/10'
			)}
		>
			{status.label}
		</span>
	</div>
</div>
