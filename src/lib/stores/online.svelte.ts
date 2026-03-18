import { browser } from '$app/environment';

function createOnlineStore() {
	let isOnline = $state(browser ? navigator.onLine : true);

	if (browser) {
		window.addEventListener('online', () => (isOnline = true));
		window.addEventListener('offline', () => (isOnline = false));
	}

	return {
		get online() {
			return isOnline;
		}
	};
}

export const network = createOnlineStore();
