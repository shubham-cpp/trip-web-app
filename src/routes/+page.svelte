<script lang="ts">
	import type { CountryKey, TopicKey } from '$lib/data/trips';
	import Header from '$lib/components/Header.svelte';
	import CountryTabs from '$lib/components/CountryTabs.svelte';
	import TopicTabs from '$lib/components/TopicTabs.svelte';
	import TransportSection from '$lib/components/TransportSection.svelte';
	import MoneySection from '$lib/components/MoneySection.svelte';
	import FoodSection from '$lib/components/FoodSection.svelte';
	import ScamsSection from '$lib/components/ScamsSection.svelte';
	import ActivitiesSection from '$lib/components/ActivitiesSection.svelte';
	import ChecklistSection from '$lib/components/ChecklistSection.svelte';

	let country = $state<CountryKey>('kl');
	let topic = $state<TopicKey>('transport');
</script>

<svelte:head>
	<title>SE Asia '26 — Mar 21–31</title>
	<meta name="description" content="Trip guide: KL, HCMC, Hanoi, Bangkok" />
</svelte:head>

<div class="min-h-dvh bg-surface">
	<!-- Sticky navigation stack -->
	<div class="sticky top-0 z-50 bg-surface">
		<Header />
		<CountryTabs active={country} onchange={(k) => (country = k)} />
		<TopicTabs active={topic} onchange={(k) => (topic = k)} />
	</div>

	<!-- Content -->
	<main class="max-w-120 mx-auto pb-8">
		{#if topic === 'transport'}
			{#key `transport-${country}`}
				<TransportSection {country} />
			{/key}
		{:else if topic === 'money'}
			{#key `money-${country}`}
				<MoneySection {country} />
			{/key}
		{:else if topic === 'food'}
			{#key `food-${country}`}
				<FoodSection {country} />
			{/key}
		{:else if topic === 'scams'}
			{#key `scams-${country}`}
				<ScamsSection {country} />
			{/key}
		{:else if topic === 'activities'}
			{#key `activities-${country}`}
				<ActivitiesSection {country} />
			{/key}
		{:else if topic === 'checklist'}
			<ChecklistSection />
		{/if}
	</main>
</div>
