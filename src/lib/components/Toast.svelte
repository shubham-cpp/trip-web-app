<script lang="ts">
	import { fade } from 'svelte/transition';
	import { toast } from '$lib/stores/toast.svelte';
</script>

{#if toast.visible}
	<div
		class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-elevated border border-border text-foreground text-sm font-mono px-4 py-2 rounded-lg shadow-lg"
		transition:fade={{ duration: 200 }}
	>
		{toast.message}
	</div>
{/if}
