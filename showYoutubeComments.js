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
	let margins = rightPanelMargins();
	rightPanel().style.height = window.innerHeight - margins.top + "px";
	rightPanel().style.overflow = "scroll";
}

function rightPanelMargins() {
	let rightPanelStyle = window.getComputedStyle(rightPanel());
	let navbarStyle = window.getComputedStyle(navbar());
	let marginLeft = parseInt(rightPanelStyle.marginLeft);
	let marginTop = parseInt(rightPanelStyle.paddingTop) + parseInt(navbarStyle.height);
	return {
		left: marginLeft,
		top: marginTop
	};
}

function rightPanel() {
	return document.getElementById('secondary-inner');
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