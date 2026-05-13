showCommentsOnTheRight();

function showCommentsOnTheRight() {
	if (!panelsContainNodes()) {
		window.setTimeout(showCommentsOnTheRight, 500);
		return;
	}
	swapCommentsAndWatchNext();
}

function swapCommentsAndWatchNext() {
	if (!panelsContainNodes()) {
	}
	let leftParent = document.getElementById('comments').parentElement;
	let rightParent = document.getElementById('related').parentElement;
	let commentsNode = leftParent.removeChild(comments());
	let watchNextNode = rightParent.removeChild(watchNext());
	leftParent.appendChild(watchNextNode);
	rightParent.appendChild(commentsNode);
}

function comments() {
	return document.getElementById('comments');
}

function watchNext() {
	return document.getElementById('related');
}

function panelsContainNodes() {
	return leftPanel()?.contains(comments()) && rightPanel()?.contains(watchNext());
}

function rightPanel() {
	return document.getElementById('secondary-inner');
}

function leftPanel() {
	return document.getElementById('primary-inner');
}