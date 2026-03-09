<script lang="ts">
	import { cn } from '$lib/utils';
	import { tripData, cardStrategy, type CountryKey } from '$lib/data/trips';

	let { country }: { country: CountryKey } = $props();

	let airportIsGood = $derived(
		tripData[country].money.airportExchange.verdict === 'yes-basement'
	);

	const cardTypeClasses: Record<string, string> = {
		primary: 'bg-success/10 text-success border-success/25',
		atm: 'bg-gold/10 text-gold border-gold/25',
		backup: 'bg-muted/10 text-muted border-muted/25'
	};

	const cardTypeLabel: Record<string, string> = {
		primary: 'POS',
		atm: 'ATM',
		backup: 'Backup'
	};
</script>

<div class="section-enter p-4 flex flex-col gap-5">
	<!-- Section heading -->
	<h2 class="font-display italic text-2xl font-semibold text-foreground leading-tight">
		Money & ATMs
	</h2>

	<!-- Airport Exchange -->
	<div>
		<div class="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">
			Exchange at airport?
		</div>
		<div
			class={cn(
				'rounded-xl px-3.5 py-3 border',
				airportIsGood ? 'bg-success/8 border-success/25' : 'bg-danger/7 border-danger/25'
			)}
		>
			<div
				class={cn(
					'text-[0.85rem] font-medium mb-1',
					airportIsGood ? 'text-success' : 'text-danger'
				)}
			>
				{tripData[country].money.airportExchange.summary}
			</div>
			<p class="text-[0.78rem] text-[#9E9A8E] leading-relaxed">
				{tripData[country].money.airportExchange.detail}
			</p>
		</div>
	</div>

	<!-- Best Changers -->
	<div>
		<div class="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">
			Best money changers
		</div>
		<div class="flex flex-col gap-2">
			{#each tripData[country].money.bestChangers as c, i (i)}
				<div class="bg-card border border-border rounded-xl px-3.5 py-3">
					<div class="text-[0.88rem] font-medium text-foreground mb-0.5">{c.name}</div>
					<div class="text-[0.72rem] text-gold font-mono mb-1.5">{c.location}</div>
					<p class="text-[0.76rem] text-[#9E9A8E] leading-relaxed">{c.tip}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- ATMs -->
	<div>
		<div class="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">ATMs</div>
		<div class="bg-card border border-border rounded-xl overflow-hidden">
			<!-- Best ATMs -->
			{#each tripData[country].money.atms.best as atm, i (i)}
				<div
					class={cn(
						'flex items-center justify-between px-3.5 py-2.5',
						(i < tripData[country].money.atms.best.length - 1 ||
							tripData[country].money.atms.avoid.length > 0) &&
							'border-b border-white/5'
					)}
				>
					<div>
						<span class="text-[0.83rem] font-medium text-foreground">{atm.bank}</span>
						<span class="text-[0.7rem] font-mono text-muted ml-2">max {atm.maxPerTxn}</span>
					</div>
					<span class={cn(`atm-${atm.verdict}`, 'text-xs font-mono font-medium')}>{atm.fee}</span>
				</div>
			{/each}
			<!-- Avoid ATMs -->
			{#each tripData[country].money.atms.avoid as atm, i (i)}
				<div
					class="flex items-center justify-between px-3.5 py-2.5 bg-danger/5 border-t border-danger/12"
				>
					<div>
						<span class="text-[0.83rem] text-danger line-through">{atm.bank}</span>
					</div>
					<span class="atm-avoid text-xs font-mono">{atm.fee}</span>
				</div>
			{/each}
		</div>
		{#if tripData[country].money.atmNote}
			<p class="text-[0.74rem] text-muted leading-relaxed mt-2 px-0.5">
				{tripData[country].money.atmNote}
			</p>
		{/if}
	</div>

	<!-- Card strategy -->
	<div class="border-t border-border pt-1">
		<div class="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">
			Card strategy (all countries)
		</div>
		<div class="flex flex-col gap-2">
			{#each cardStrategy as c, i (i)}
				<div class="bg-card border border-border rounded-xl px-3.5 py-3 flex gap-3 items-start">
					<span
						class={cn(
							'text-[0.62rem] px-[7px] py-0.5 rounded-full border font-mono shrink-0 mt-0.5',
							cardTypeClasses[c.type]
						)}
					>
						{cardTypeLabel[c.type]}
					</span>
					<div>
						<div class="text-[0.83rem] font-medium text-foreground mb-0.5">{c.card}</div>
						<div class="text-[0.72rem] text-gold mb-1 font-mono">{c.use}</div>
						<p class="text-[0.75rem] text-[#9E9A8E] leading-relaxed">{c.why}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- DCC Warning -->
	<div class="bg-danger-gradient border border-danger/30 rounded-xl p-3.5">
		<div class="text-[0.78rem] font-semibold text-danger mb-1.5">⚠ Always decline DCC</div>
		<p class="text-[0.76rem] text-[#C8C4BA] leading-relaxed">
			When an ATM or card machine asks "Pay in INR?" or "Guaranteed conversion?" — always choose
			the <strong class="text-foreground">local currency</strong>. DCC adds a secret 3–7% markup on
			top of any card fees. Thailand ATMs are the most aggressive about this.
		</p>
	</div>
</div>
