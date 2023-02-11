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
	
	chrome.storage.sync.get(['show-comments', 'swap-watch-next'], value => {
		if(value['swap-watch-next'] == true) {
			leftPanel.appendChild(rightPanel.removeChild(watchNext));
			comments = rightPanel.appendChild(leftPanel.removeChild(comments));
		}
		else comments = rightPanel.insertBefore(leftPanel.removeChild(comments), watchNext);
				
		if (value['show-comments'] == true || getChat(rightPanel)) {
			return;
		}
		comments.style.display = "none";
		const showComments = document.createElement("button");
		showComments.className = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading ";
		showComments.innerHTML = "Show Comments";
		const style = showComments.style;
		style.left = "50%";
		style.transform = "translate(-50%, 0px)";
		style.marginBottom = "var(--ytd-margin-6x)";
		
		showComments.addEventListener("click", () =>
		{
			showComments.remove();
			comments.style.display = "";
		});
		if(value['swap-watch-next'] == true)rightPanel.appendChild(showComments);
		else rightPanel.insertBefore(showComments, watchNext);
    });
}

function getComments() {
	return document.querySelector('#comments');
}

function getWatchNext() {
	return document.querySelector('#related');
}

function getChat (rightPanel) {
	return rightPanel.querySelector("#chat");
}

function getRightPanel() {
	return document.querySelector('#secondary-inner');
}

function getLeftPanel() {
	return document.querySelector('#primary-inner > #below');
}