<script lang="ts">
	import { MapPin } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import { tripData, type CountryKey } from '$lib/data/trips';

	let { country }: { country: CountryKey } = $props();

	const verdictClass: Record<string, string> = {
		recommended: 'verdict-recommended',
		budget: 'verdict-budget',
		optional: 'verdict-optional',
		skip: 'verdict-skip'
	};
</script>

<div class="section-enter p-4 flex flex-col gap-3">
	<!-- Airport label -->
	<div class="text-[0.7rem] text-muted font-mono tracking-[0.05em] uppercase">
		{tripData[country].transport.airportName} · {tripData[country].transport.terminal}
	</div>

	<!-- Section heading -->
	<h2 class="font-display italic text-2xl font-semibold text-foreground leading-tight mb-1">
		Airport → City
	</h2>

	<!-- Options -->
	{#each tripData[country].transport.options as opt, i (i)}
		<div
			class={cn(
				'bg-card border border-border rounded-xl px-4 py-3.5',
				opt.verdict === 'skip' && 'opacity-70'
			)}
		>
			<div class="flex items-start justify-between gap-3 mb-2">
				<div>
					<div
						class={cn(
							'text-[0.9rem] font-medium mb-0.5',
							opt.verdict === 'skip' ? 'text-muted line-through' : 'text-foreground'
						)}
					>
						{opt.name}
					</div>
					<div class="flex items-center gap-2 flex-wrap">
						<span class="font-mono text-[0.78rem] text-gold">{opt.priceLocal}</span>
						<span class="text-muted text-[0.7rem]">·</span>
						<span class="font-mono text-[0.72rem] text-muted">{opt.priceINR}</span>
						<span class="text-muted text-[0.7rem]">·</span>
						<span class="text-[0.72rem] text-muted">{opt.duration}</span>
					</div>
				</div>
				<div class="flex items-center gap-2 shrink-0">
					{#if opt.mapsUrl}
						<a
							href={opt.mapsUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center text-[#5A5750] hover:text-[#9E9A8E] transition-colors"
							aria-label={`Open ${opt.name} on Google Maps`}
						>
							<MapPin class="w-3.5 h-3.5" />
						</a>
					{/if}
					<span
						class={cn(
							verdictClass[opt.verdict],
							'text-[0.68rem] px-2.5 py-[3px] rounded-full whitespace-nowrap shrink-0'
						)}
					>
						{opt.verdictLabel}
					</span>
				</div>
			</div>
			{#if opt.tip}
				<p class="text-[0.78rem] text-[#9E9A8E] leading-relaxed pt-2 border-t border-white/5">
					{opt.tip}
				</p>
			{/if}
		</div>
	{/each}
</div>
