function createToastStore() {
	let message = $state('');
	let visible = $state(false);
	let timer: ReturnType<typeof setTimeout>;

	return {
		get message() {
			return message;
		},
		get visible() {
			return visible;
		},
		show(text: string, duration = 2000) {
			message = text;
			visible = true;
			clearTimeout(timer);
			timer = setTimeout(() => {
				visible = false;
			}, duration);
		}
	};
}

export const toast = createToastStore();
