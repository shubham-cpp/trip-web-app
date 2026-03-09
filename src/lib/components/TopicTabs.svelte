<script lang="ts">
	import { Plane, Banknote, UtensilsCrossed, ShieldAlert, Map, ClipboardList } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import type { TopicKey } from '$lib/data/trips';

	let {
		active,
		onchange
	}: {
		active: TopicKey;
		onchange: (key: TopicKey) => void;
	} = $props();

	const topics: { key: TopicKey; label: string; Icon: typeof Plane }[] = [
		{ key: 'transport', label: 'Transport', Icon: Plane },
		{ key: 'money', label: 'Money', Icon: Banknote },
		{ key: 'food', label: 'Food', Icon: UtensilsCrossed },
		{ key: 'scams', label: 'Scams', Icon: ShieldAlert },
		{ key: 'activities', label: 'Activities', Icon: Map },
		{ key: 'checklist', label: 'Checklist', Icon: ClipboardList }
	];
</script>

<div class="flex overflow-x-auto scrollbar-hide border-b border-border">
	{#each topics as { key, label, Icon } (key)}
		{@const isActive = active === key}
		<button
			onclick={() => onchange(key)}
			class={cn(
				'flex items-center gap-1.5 px-4 py-2.5 relative whitespace-nowrap shrink-0 transition-colors duration-150',
				isActive ? 'text-foreground' : 'text-muted'
			)}
		>
			<Icon size={13} />
			<span
				class={cn(
					'text-[0.72rem] tracking-[0.01em]',
					isActive ? 'font-medium' : 'font-normal'
				)}
			>
				{label}
			</span>
			<!-- Active underline -->
			<span
				class={cn(
					'absolute bottom-0 left-2 right-2 h-[1.5px] rounded-full bg-gold transition-transform duration-200',
					isActive ? 'scale-x-100' : 'scale-x-0'
				)}
			></span>
		</button>
	{/each}
</div>
