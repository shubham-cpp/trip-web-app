import { browser } from '$app/environment';

const STORAGE_KEY = 'trip-checklist-v1';

function createChecklist() {
	let checked = $state<Set<string>>(new Set());

	if (browser) {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) checked = new Set(JSON.parse(saved));
		} catch {
			// ignore
		}
	}

	return {
		get checked() {
			return checked;
		},
		toggle(id: string) {
			if (checked.has(id)) checked.delete(id);
			else checked.add(id);
			if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
		},
		reset() {
			checked = new Set();
			if (browser) localStorage.removeItem(STORAGE_KEY);
		}
	};
}

export const checklist = createChecklist();
