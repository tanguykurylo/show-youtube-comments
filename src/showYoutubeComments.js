showCommentsOnTheRight(null, null, null, null);

function showCommentsOnTheRight(comments, watchNext, leftPanel, rightPanel) {
	if (!(comments ??= getComments()) || !(watchNext ??= getWatchNext()) ||
		!(leftPanel ??= getLeftPanel()) || !(rightPanel ??= getRightPanel())) {
		window.setTimeout(() => showCommentsOnTheRight(comments, watchNext, leftPanel, rightPanel), 100);
		return;
	}
	initiateChanges(comments, watchNext, leftPanel, rightPanel);
}

function initiateChanges(comments, watchNext, leftPanel, rightPanel) {
	const commentsStyle = comments.style;
	
	chrome.storage.sync.get(["show-comments", "swap-watch-next"], value => {
		const showComments = value["show-comments"] == true, swapWatchNext = value["swap-watch-next"] == true;
		
		// Move comments from left to right
		if(leftPanel.contains(comments))
		{
			comments = swapWatchNext ? rightPanel.appendChild(leftPanel.removeChild(comments)) :
										rightPanel.insertBefore(leftPanel.removeChild(comments), watchNext);
			
		}
		
		// If we want to swap the Watch Next section from right to left
		if(swapWatchNext)
		{
			if(rightPanel.contains(watchNext))
				watchNext = leftPanel.appendChild(rightPanel.removeChild(watchNext));
		}
		else if(leftPanel.contains(watchNext))
			watchNext = rightPanel.appendChild(leftPanel.removeChild(watchNext));
		
		// If we want to always show the comments
		let showCommentsBtn = document.querySelector("#show-comments");
		if(showComments)
		{
			// Make comments visible
			comments.style.display = "";
			
			// If the Show Comments button exists in the DOM, hide it
			if(showCommentsBtn)showCommentsBtn.style.display = "none";
		}
		else
		{
			// Make comments hidden
			commentsStyle.display = "none";
			
			// Make sure Show Comments button is seen
			if(showCommentsBtn)showCommentsBtn.style.display = "";
			else
			{
				showCommentsBtn = document.createElement("button");
				showCommentsBtn.id = "show-comments";
				showCommentsBtn.className = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-leading ";
				showCommentsBtn.innerHTML = "Show Comments";
				
				const showCommentsStyle = showCommentsBtn.style;
				showCommentsStyle.left = "50%";
				showCommentsStyle.transform = "translate(-50%, 0px)";
				showCommentsStyle.marginBottom = "var(--ytd-margin-6x)";
				
				showCommentsBtn.addEventListener("click", () =>
				{
					showCommentsStyle.display = "none";
					commentsStyle.display = "";
				});
				
				if(swapWatchNext)rightPanel.appendChild(showCommentsBtn);
				else rightPanel.insertBefore(showCommentsBtn, watchNext);
			}
		}
	});
}

function getComments() {
	return document.querySelector("#comments");
}

function getWatchNext() {
	return document.querySelector("#related");
}

function getChat (rightPanel) {
	return rightPanel.querySelector("#chat");
}

function getLeftPanel() {
	return document.querySelector("#primary-inner > #below");
}

function getRightPanel() {
	return document.querySelector("#secondary-inner");
}