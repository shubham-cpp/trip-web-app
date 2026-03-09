<script lang="ts">
	import { cn } from '$lib/utils';
	import { countries, type CountryKey } from '$lib/data/trips';

	let {
		active,
		onchange
	}: {
		active: CountryKey;
		onchange: (key: CountryKey) => void;
	} = $props();

	const countryTextClass: Record<CountryKey, string> = {
		kl: 'text-kl',
		hcmc: 'text-hcmc',
		hanoi: 'text-hanoi',
		bangkok: 'text-bangkok'
	};

	const countryBgClass: Record<CountryKey, string> = {
		kl: 'bg-kl',
		hcmc: 'bg-hcmc',
		hanoi: 'bg-hanoi',
		bangkok: 'bg-bangkok'
	};
</script>

<div class="flex border-b border-border">
	{#each Object.keys(countries) as key (key)}
		{@const meta = countries[key as CountryKey]}
		{@const isActive = active === key}
		<button
			onclick={() => onchange(key as CountryKey)}
			class="flex-1 flex flex-col items-center gap-0.5 py-3 relative transition-colors min-h-14"
		>
			<span class="text-xl leading-none">{meta.flag}</span>
			<span
				class={cn(
					'text-[0.7rem] font-sans tracking-[0.02em] transition-colors duration-150',
					isActive
						? cn('font-medium', countryTextClass[key as CountryKey])
						: 'font-normal text-muted'
				)}
			>
				{meta.name}
			</span>
			<span
				class={cn(
					'text-[0.6rem] font-mono transition-colors duration-150',
					isActive ? countryTextClass[key as CountryKey] : 'text-transparent'
				)}
			>
				{meta.dates}
			</span>
			<!-- Active indicator -->
			<span
				class={cn(
					'absolute bottom-0 left-3 right-3 h-0.5 rounded-full transition-transform duration-200',
					countryBgClass[key as CountryKey],
					isActive ? 'scale-x-100' : 'scale-x-0'
				)}
			></span>
		</button>
	{/each}
</div>
