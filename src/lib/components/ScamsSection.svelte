<script lang="ts">
	import { tripData, type CountryKey } from '$lib/data/trips';

	let { country }: { country: CountryKey } = $props();
</script>

<div class="section-enter p-4 flex flex-col gap-4">
	<!-- Section heading -->
	<h2 class="font-display italic text-2xl font-semibold text-foreground leading-tight">
		Scams & Safety
	</h2>
	<p class="text-[0.78rem] text-muted leading-relaxed -mt-2">
		The ones that actually happen to tourists here.
	</p>

	{#each tripData[country].scams as scam, i (i)}
		<div
			class="bg-card border border-white/6 border-l-[3px] border-l-danger rounded-tr-xl rounded-br-xl p-3.5"
		>
			<div class="text-[0.85rem] font-semibold text-danger mb-1.5">{scam.name}</div>
			<p class="text-[0.78rem] text-[#C8C4BA] leading-relaxed mb-2.5">{scam.description}</p>
			<div
				class="flex gap-2 items-start bg-success/7 border border-success/15 rounded-lg px-2.5 py-2"
			>
				<span class="text-[0.72rem] text-success font-semibold shrink-0 pt-px">✓ Avoid:</span>
				<span class="text-[0.76rem] text-[#9E9A8E] leading-relaxed">{scam.avoid}</span>
			</div>
		</div>
	{/each}

	<!-- General rule -->
	<div class="bg-white/3 border border-border rounded-xl px-3.5 py-3 mt-1">
		<p class="text-[0.76rem] text-muted leading-relaxed text-center">
			Universal rule: if it sounds too good to be true, it is. Friendly strangers who approach you
			near tourist spots are almost always running a scam.
		</p>
	</div>
</div>
