// Parents of #comments and #related in YouTube's original layout
var leftSlot, rightSlot;

// The script can be injected several times in the same page, only observe once
if (!globalThis.showYoutubeCommentsObserver) {
	// YouTube moves #comments and #related back when it rebuilds its layout (e.g. on resize)
	// See docs: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
	globalThis.showYoutubeCommentsObserver = new MutationObserver(showCommentsOnTheRight);
	globalThis.showYoutubeCommentsObserver.observe(document.body, { childList: true, subtree: true });
	showCommentsOnTheRight();

	chrome.storage.sync.get(['show-scrollbar'], value => showScrollbar(value['show-scrollbar']));
	chrome.storage.onChanged.addListener(changes => {
		if (changes['show-scrollbar']) {
			showScrollbar(changes['show-scrollbar'].newValue);
		}
	});
}

function showCommentsOnTheRight() {
	if (!comments() || !watchNext()) {
		return;
	}
	if (leftPanel()?.contains(comments()) && rightPanel()?.contains(watchNext())) {
		leftSlot = comments().parentElement;
		rightSlot = watchNext().parentElement;
	}
	if (!leftSlot?.isConnected || !rightSlot?.isConnected) {
		return;
	}
	if (!rightPanel().contains(comments())) {
		rightSlot.appendChild(comments());
	}
	if (!leftPanel().contains(watchNext())) {
		leftSlot.appendChild(watchNext());
	}
}

function showScrollbar(show) {
	document.documentElement.toggleAttribute('data-show-comments-scrollbar', show == true);
}

function comments() {
	return document.getElementById('comments');
}

function watchNext() {
	return document.getElementById('related');
}

function rightPanel() {
	return document.getElementById('secondary-inner');
}

function leftPanel() {
	return document.getElementById('primary-inner');
}
