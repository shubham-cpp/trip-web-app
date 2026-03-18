<script lang="ts">
	import MapsLink from './MapsLink.svelte';
	import { cn } from '$lib/utils';
	import { tripData, type CountryKey, type Activity } from '$lib/data/trips';

	let { country }: { country: CountryKey } = $props();

	const verdictConfig: Record<string, { label: string; className: string; headingClass: string }> =
		{
			must: { label: 'MUST', className: 'activity-must', headingClass: 'text-success' },
			optional: { label: 'OPTIONAL', className: 'activity-optional', headingClass: 'text-gold' },
			skip: { label: 'SKIP', className: 'activity-skip', headingClass: 'text-muted' }
		};

	let must = $derived(tripData[country].activities.filter((a) => a.verdict === 'must'));
	let optional = $derived(tripData[country].activities.filter((a) => a.verdict === 'optional'));
	let skip = $derived(tripData[country].activities.filter((a) => a.verdict === 'skip'));
</script>

{#snippet activityCard(activity: Activity)}
	{@const cfg = verdictConfig[activity.verdict]}
	{@const isSkip = activity.verdict === 'skip'}
	<div class={cn('bg-card border border-border rounded-xl px-3.5 py-3', isSkip && 'opacity-65')}>
		<div class="flex items-start justify-between gap-3 mb-1">
			<span
				class={cn(
					'text-[0.88rem] font-medium',
					isSkip ? 'text-muted line-through' : 'text-foreground'
				)}
			>
				{activity.name}
			</span>
			<div class="flex items-center gap-2 shrink-0">
				{#if activity.mapsUrl}
					<MapsLink href={activity.mapsUrl} label={`Open ${activity.name} on Google Maps`} />
				{/if}
				<span
					class={cn(
						'font-mono text-[0.72rem]',
						activity.cost === 'FREE' ? 'text-success' : 'text-gold'
					)}
				>
					{activity.cost}
				</span>
				<span
					class={cn(
						cfg.className,
						'text-[0.58rem] px-[7px] py-0.5 rounded-full font-mono tracking-[0.04em]'
					)}
				>
					{cfg.label}
				</span>
			</div>
		</div>
		{#if activity.note}
			<p class="text-xs text-[#9E9A8E] leading-relaxed">{activity.note}</p>
		{/if}
	</div>
{/snippet}

<div class="section-enter p-4 flex flex-col gap-5">
	<!-- Section heading -->
	<h2 class="font-display italic text-2xl font-semibold text-foreground leading-tight">
		Activities
	</h2>

	<!-- Must do -->
	{#if must.length > 0}
		<div>
			<div
				class={cn(
					'text-[0.65rem] tracking-[0.08em] uppercase mb-2',
					verdictConfig.must.headingClass
				)}
			>
				Must do
			</div>
			<div class="flex flex-col gap-2">
				{#each must as a, i (i)}
					{@render activityCard(a)}
				{/each}
			</div>
		</div>
	{/if}

	<!-- Optional -->
	{#if optional.length > 0}
		<div>
			<div
				class={cn(
					'text-[0.65rem] tracking-[0.08em] uppercase mb-2',
					verdictConfig.optional.headingClass
				)}
			>
				Optional
			</div>
			<div class="flex flex-col gap-2">
				{#each optional as a, i (i)}
					{@render activityCard(a)}
				{/each}
			</div>
		</div>
	{/if}

	<!-- Skip -->
	{#if skip.length > 0}
		<div>
			<div
				class={cn(
					'text-[0.65rem] tracking-[0.08em] uppercase mb-2',
					verdictConfig.skip.headingClass
				)}
			>
				Skip
			</div>
			<div class="flex flex-col gap-2">
				{#each skip as a, i (i)}
					{@render activityCard(a)}
				{/each}
			</div>
		</div>
	{/if}
</div>
