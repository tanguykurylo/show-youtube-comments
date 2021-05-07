showCommentsOnTheRight();

function showCommentsOnTheRight() {
	if (!comments() || !watchNext()) {
		window.setTimeout(showCommentsOnTheRight, 500);
		return;
	}
	swapCommentsAndWatchNext();
	makeCommentsScrollable();
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

function panelsContainNodes() {
	return leftPanel().contains(comments()) && rightPanel().contains(watchNext());
}

function makeCommentsScrollable() {
	let margins = computeMargins(rightPanelContainer())
	rightPanelContainer().style.height = window.innerHeight - margins.top + "px";
}

function computeMargins(element) {
	let style = window.getComputedStyle(element);
	let navbarStyle = window.getComputedStyle(navbar());
	let marginLeft = parseInt(style.marginLeft);
	let marginTop = parseInt(style.paddingTop) + parseInt(navbarStyle.height);
	return {
		left: marginLeft,
		top: marginTop
	};
}

function rightPanel() {
	return document.getElementById('secondary-inner');
}

function rightPanelContainer() {
	return document.getElementById('secondary');
}

function leftPanel() {
	return document.getElementById('primary-inner');
}

function comments() {
	return document.getElementById('comments');
}

function watchNext() {
	return document.getElementById('related');
}

function navbar() {
	return document.getElementById('masthead-container');
}