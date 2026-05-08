chrome.runtime.onInstalled.addListener(details => {
	if(details.reason !== chrome.runtime.OnInstalledReason.INSTALL)return;
	chrome.storage.sync.set({
		"show-scrollbar": false,
		"show-comments": true,
		"swap-watch-next": false,
	});
});
chrome.webNavigation.onCommitted.addListener(loadScriptAndCss, {
	url: [{
		urlPrefix: "https://www.youtube.com/watch"
	}]
});
chrome.webNavigation.onHistoryStateUpdated.addListener(loadScriptAndCss, {
	url: [{
		urlPrefix: "https://www.youtube.com/watch"
	}]
});

function loadScriptAndCss(tab) {
	chrome.scripting.executeScript({target: {tabId: tab.tabId}, files: ["showYoutubeComments.js"]});
	chrome.scripting.insertCSS({target: {tabId: tab.tabId}, files: ["showYoutubeComments.css"]});
	chrome.storage.sync.get(["show-scrollbar"], value => {
		if (value["show-scrollbar"] == true)
			chrome.scripting.insertCSS({target: {tabId: tab.tabId}, files: ["showYoutubeComments-scrollbar.css"]});
		else chrome.scripting.removeCSS({target: {tabId: tab.tabId}, files: ["showYoutubeComments-scrollbar.css"]});
	});
}