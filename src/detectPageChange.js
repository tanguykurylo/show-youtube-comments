chrome.runtime.onInstalled.addListener(function(details) {
  if(details.reason == "install") {
    chrome.storage.sync.set({ "show-scrollbar": false });
  }
});
chrome.webNavigation.onCommitted.addListener(loadScriptAndCss, {
    url: [{
        urlMatches: 'https://www.youtube.com/watch'
    }]
});

function loadScriptAndCss() {
    chrome.tabs.executeScript({file: "showYoutubeComments.js"});
    chrome.tabs.insertCSS({file: "showYoutubeComments.css"});
    chrome.storage.sync.get(['show-scrollbar'], value => {
        if (value['show-scrollbar'] == true) {
            chrome.tabs.insertCSS({file: "showYoutubeComments-scrollbar.css"});
        }
        else {
            chrome.tabs.removeCSS({file: "showYoutubeComments-scrollbar.css"});
        }
    })
}