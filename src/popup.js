document.addEventListener("DOMContentLoaded", () => {
	chrome.storage.sync.get(["show-scrollbar", "show-comments", "swap-watch-next"], value => {
		function setupOption (id, defaultValue)
		{
			let currentValue = value[id] ?? defaultValue;
			const checkbox = document.querySelector(`#${id}`);
			checkbox.checked = currentValue;
			checkbox.addEventListener("click", () => {
				currentValue = !currentValue;
				chrome.storage.sync.set({ [id]: currentValue });
				checkbox.checked = currentValue;
			});
		}
		
		setupOption("show-scrollbar", false);
		setupOption("show-comments", true);
		setupOption("swap-watch-next", false);
	});
})