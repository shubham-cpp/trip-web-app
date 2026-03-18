<script lang="ts">
	import { MapPin } from '@lucide/svelte';
	import { toast } from '$lib/stores/toast.svelte';

	let { href, label }: { href: string; label: string } = $props();

	async function probeConnectivity(): Promise<boolean> {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 3000);
		try {
			await fetch('https://www.google.com/generate_204', {
				method: 'HEAD',
				mode: 'no-cors',
				signal: controller.signal
			});
			return true;
		} catch {
			return false;
		} finally {
			clearTimeout(timeout);
		}
	}

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(href);
			toast.show('Link copied — paste in browser when online');
		} catch {
			toast.show('Could not copy link');
		}
	}

	async function handleClick(e: MouseEvent) {
		e.preventDefault();

		// Fast path: browser already knows we're offline
		if (!navigator.onLine) {
			await copyToClipboard();
			return;
		}

		// Open blank window synchronously to preserve transient activation
		const win = window.open('about:blank', '_blank');
		if (!win) {
			// Popup blocked — fall back to clipboard
			await copyToClipboard();
			return;
		}

		const online = await probeConnectivity();
		if (online) {
			win.location.href = href;
		} else {
			win.close();
			await copyToClipboard();
		}
	}
</script>

<a
	href={href}
	target="_blank"
	rel="external noopener noreferrer"
	class="inline-flex items-center text-[#5A5750] hover:text-[#9E9A8E] transition-colors"
	aria-label={label}
	onclick={handleClick}
>
	<MapPin class="w-3.5 h-3.5" />
</a>
