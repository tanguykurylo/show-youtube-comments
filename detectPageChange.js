chrome.webNavigation.onHistoryStateUpdated.addListener(loadScriptAndCss, {
    url: [{
        urlMatches: 'https://www.youtube.com/watch'
    }]
});

function loadScriptAndCss() {
    chrome.tabs.executeScript({
        file: "showYoutubeComments.js"
    });
    chrome.tabs.insertCSS({
        file: "showYoutubeComments.css"
    });
}