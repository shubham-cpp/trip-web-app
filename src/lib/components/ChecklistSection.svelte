<script lang="ts">
	import { ChevronRight, Check, TriangleAlert } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import { checklistGroups, type ChecklistItem } from '$lib/data/checklist';
	import { checklist } from '$lib/stores/checklist.svelte';

	let totalItems = checklistGroups.reduce((sum, g) => sum + g.items.length, 0);
	let checkedCount = $derived(checklist.checked.size);
	let progress = $derived(totalItems > 0 ? (checkedCount / totalItems) * 100 : 0);

	let firstIncompleteGroupId = $derived(
		checklistGroups.find((g) => g.items.some((item) => !checklist.checked.has(item.id)))?.id
	);

	let openGroups = $state<Set<string>>(new Set());

	$effect(() => {
		if (firstIncompleteGroupId) {
			openGroups = new Set([firstIncompleteGroupId]);
		}
	});

	function toggleGroup(id: string) {
		const next = new Set(openGroups);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		openGroups = next;
	}
</script>

{#snippet itemRow(item: ChecklistItem, isDone: boolean)}
	<button
		class={cn(
			'w-full flex items-start gap-3 px-3.5 py-2 text-left transition-opacity',
			isDone && 'opacity-75'
		)}
		onclick={() => checklist.toggle(item.id)}
	>
		<!-- Checkbox -->
		<div class="mt-[3px] shrink-0">
			{#if isDone}
				<div
					class="w-4 h-4 rounded-sm bg-success border border-success flex items-center justify-center"
				>
					<Check size={10} strokeWidth={3} class="text-surface" />
				</div>
			{:else}
				<div class="w-4 h-4 rounded-sm border border-white/25"></div>
			{/if}
		</div>

		<!-- Label + warning -->
		<div class="flex-1 min-w-0">
			<span
				class={cn(
					'text-[0.83rem] leading-snug',
					isDone ? 'text-muted line-through' : 'text-foreground'
				)}
			>
				{item.label}
			</span>
			{#if item.urgent || item.warning}
				<span
					class="ml-1.5 text-danger text-[0.65rem] inline-flex items-center gap-[3px] align-baseline"
				>
					{#if item.urgent}
						<TriangleAlert size={10} class="shrink-0 inline" />
					{/if}
					{#if item.warning}
						<span>{item.warning}</span>
					{/if}
				</span>
			{/if}
		</div>
	</button>
{/snippet}

<div class="section-enter p-4 flex flex-col gap-4">
	<h2 class="font-display italic text-2xl font-semibold text-foreground leading-tight">
		Checklist
	</h2>

	<!-- Progress bar -->
	<div>
		<div class="flex items-center justify-between mb-1.5">
			<span class="text-[0.65rem] tracking-[0.08em] uppercase text-muted">Progress</span>
			<span class="font-mono text-[0.7rem] text-muted">{checkedCount} of {totalItems} packed</span>
		</div>
		<div
			class="h-[3px] rounded-full overflow-hidden"
			style="background-color: rgba(255,255,255,0.08)"
		>
			<div
				class="h-full bg-gold rounded-full transition-all duration-300"
				style={`width: ${progress}%`}
			></div>
		</div>
	</div>

	<!-- Groups -->
	<div class="flex flex-col gap-2">
		{#each checklistGroups as group (group.id)}
			{@const pending = group.items.filter((item) => !checklist.checked.has(item.id))}
			{@const done = group.items.filter((item) => checklist.checked.has(item.id))}
			{@const isOpen = openGroups.has(group.id)}
			<div
				class={cn(
					'bg-card border border-border rounded-xl overflow-hidden',
					group.accent === 'gold' && 'border-l-[3px] border-l-gold'
				)}
			>
				<!-- Accordion header -->
				<button
					class="w-full flex items-center justify-between px-3.5 py-3 text-left"
					onclick={() => toggleGroup(group.id)}
				>
					<span class="font-display italic text-[1rem] font-semibold text-foreground">
						{group.label}
					</span>
					<div class="flex items-center gap-2 shrink-0">
						<span class="font-mono text-[0.65rem] text-muted">
							{done.length} / {group.items.length}
						</span>
						<ChevronRight
							size={14}
							class={cn('text-muted transition-transform duration-200', isOpen && 'rotate-90')}
						/>
					</div>
				</button>

				<!-- Items -->
				{#if isOpen}
					<div class="pb-1 border-t border-white/5">
						{#each pending as item (item.id)}
							{@render itemRow(item, false)}
						{/each}

						{#if done.length > 0}
							<div class="flex items-center gap-2 px-3.5 py-1.5 mt-0.5">
								<div class="h-px flex-1" style="background-color: rgba(255,255,255,0.1)"></div>
								<span class="text-[0.58rem] text-muted font-mono tracking-[0.06em]">done</span>
								<div class="h-px flex-1" style="background-color: rgba(255,255,255,0.1)"></div>
							</div>
							{#each done as item (item.id)}
								{@render itemRow(item, true)}
							{/each}
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- Reset button -->
	{#if checkedCount > 0}
		<button
			onclick={checklist.reset}
			class="text-[0.72rem] text-muted hover:text-danger transition-colors self-center mt-1"
		>
			↺ Reset all
		</button>
	{/if}
</div>
