<script lang="ts">
	import { WifiOff } from '@lucide/svelte';
	import { fade } from 'svelte/transition';
	import { network } from '$lib/stores/online.svelte';
</script>

{#if !network.online}
	<span
		class="inline-flex items-center text-amber-400"
		title="You're offline"
		transition:fade={{ duration: 300 }}
	>
		<WifiOff class="w-3.5 h-3.5" />
	</span>
{/if}
