/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="@sveltejs/kit" />

import { build, files, prerendered, version } from '$service-worker';

const sw = globalThis.self as unknown as ServiceWorkerGlobalScope;

const CACHE = `cache-${version}`;

const ASSETS = [...build, ...files, ...prerendered];

sw.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(CACHE)
			.then((cache) => cache.addAll(ASSETS))
			.then(() => sw.skipWaiting())
	);
});

sw.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
			)
			.then(() => sw.clients.claim())
	);
});

sw.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);
	if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

	event.respondWith(respond(event));
});

async function respond(event: FetchEvent): Promise<Response> {
	const url = new URL(event.request.url);
	const cache = await caches.open(CACHE);

	// Serve build/static/prerendered assets from cache (guaranteed hit after install)
	if (ASSETS.includes(url.pathname)) {
		const cached = await cache.match(url.pathname);
		if (cached) return cached;
	}

	// Network-first for everything else (Google Fonts, etc.)
	try {
		const response = await fetch(event.request);

		if (!(response instanceof Response)) {
			throw new Error('invalid response from fetch');
		}

		if (response.status === 200) {
			cache.put(event.request, response.clone());
		}

		return response;
	} catch {
		const cached = await cache.match(event.request);
		if (cached) return cached;

		return new Response('Offline', { status: 503 });
	}
}
