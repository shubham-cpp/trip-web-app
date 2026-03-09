<script>
	import { page } from '$app/stores';
</script>

<main class="pt-16 p-4 container mx-auto">
	<h1>{$page.status === 404 ? '404' : 'Error'}</h1>
	<p>{$page.error?.message ?? 'An unexpected error occurred.'}</p>
</main>
