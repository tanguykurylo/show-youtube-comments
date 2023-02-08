showCommentsOnTheRight();

function showCommentsOnTheRight() {
	let comments, watchNext;
	if (!(comments = getComments()) || !(watchNext = getWatchNext())) {
		window.setTimeout(showCommentsOnTheRight, 500);
		return;
	}
	swapCommentsAndWatchNext(comments, watchNext);
}

function swapCommentsAndWatchNext(comments, watchNext) {
	let leftPanel, rightPanel;
	if (!(leftPanel = getLeftPanel()).contains(comments) || !(rightPanel = getRightPanel()).contains(watchNext)) {
		return;
	}
	leftPanel.appendChild(rightPanel.removeChild(watchNext));
	chrome.storage.sync.get(['show-comments'], value => {
		comments = rightPanel.appendChild(leftPanel.removeChild(comments));
        if (value['show-comments'] == true) {
			return;
		}
		comments.style.display = "none";
		const showComments = document.createElement("button");
		showComments.className = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading ";
		showComments.innerHTML = "Show Comments";
		showComments.style.left = "50%";
		showComments.style.transform = "translate(-50%, 0px)";
		showComments.addEventListener("click", () =>
		{
			showComments.remove();
			comments.style.display = "";
		});
		rightPanel.appendChild(showComments);
    })
}

function getComments() {
	return document.querySelector('#comments');
}

function getWatchNext() {
	return document.querySelector('#related');
}

function getRightPanel() {
	return document.querySelector('#secondary-inner');
}

function getLeftPanel() {
	return document.querySelector('#primary-inner > #below');
}