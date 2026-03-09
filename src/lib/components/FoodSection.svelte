<script lang="ts">
	import { tripData, type CountryKey } from '$lib/data/trips';

	let { country }: { country: CountryKey } = $props();
</script>

<div class="section-enter p-4 flex flex-col gap-5">
	<!-- Section heading -->
	<h2 class="font-display italic text-2xl font-semibold text-foreground leading-tight">
		Food & Eating
	</h2>

	<!-- Must-try dishes -->
	<div>
		<div class="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">Must try</div>
		<div class="flex flex-col gap-2">
			{#each tripData[country].food.mustTry as dish, i (i)}
				<div
					class="bg-card border border-border rounded-[10px] px-3.5 py-2.5 flex items-center justify-between"
				>
					<div class="flex items-center gap-3">
						<span class="text-[1.3rem]">{dish.emoji}</span>
						<span class="text-[0.88rem] text-foreground">{dish.name}</span>
					</div>
					<span class="font-mono text-xs text-gold shrink-0">{dish.price}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- Vegetarian phrase — show-to-restaurant card -->
	<div>
		<div class="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-2">
			Show this to restaurant staff
		</div>
		<div class="bg-gold-gradient border border-gold/25 rounded-xl p-4 text-center">
			<div
				class="font-display italic text-[1.65rem] font-semibold text-gold leading-snug mb-1.5"
			>
				{tripData[country].food.vegetarianPhrase}
			</div>
			<div class="text-[0.72rem] text-muted font-sans">
				= {tripData[country].food.vegetarianMeaning}
			</div>
		</div>
	</div>

	<!-- Warning -->
	<div class="bg-gold/7 border border-gold/20 rounded-xl px-3.5 py-3">
		<div class="text-[0.72rem] font-semibold text-gold mb-1">⚠ Watch out</div>
		<p class="text-[0.78rem] text-[#C8C4BA] leading-relaxed">{tripData[country].food.warning}</p>
	</div>

	<!-- Spot recommendation -->
	{#if tripData[country].food.spot}
		<div class="bg-card border border-border rounded-xl px-3.5 py-3">
			<div class="text-[0.65rem] tracking-[0.08em] uppercase text-muted mb-1.5">Where to eat</div>
			<p class="text-[0.8rem] text-[#C8C4BA] leading-relaxed">{tripData[country].food.spot}</p>
		</div>
	{/if}
</div>
