showCommentsOnTheRight();

function showCommentsOnTheRight() {
	if (!comments() || !watchNext()) {
		window.setTimeout(showCommentsOnTheRight, 500);
		return;
	}
	swapCommentsAndWatchNext();
}

function swapCommentsAndWatchNext() {
	if (!panelsContainNodes()) {
		return;
	}
	let commentsNode = leftPanel().removeChild(comments());
	let watchNextNode = rightPanel().removeChild(watchNext());
	leftPanel().appendChild(watchNextNode);
	rightPanel().appendChild(commentsNode);
}

function comments() {
	return document.getElementById('comments');
}

function watchNext() {
	return document.getElementById('related');
}

function panelsContainNodes() {
	return leftPanel().contains(comments()) && rightPanel().contains(watchNext());
}

function rightPanel() {
	return document.getElementById('secondary-inner');
}

function leftPanel() {
	return document.getElementById('primary-inner');
}