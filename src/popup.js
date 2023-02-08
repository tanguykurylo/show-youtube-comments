document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(['show-scrollbar'], value => {
        showScrollbar = value['show-scrollbar'] || false
        const scrollbarButton = document.querySelector("#show-scrollbar")
        scrollbarButton.checked = showScrollbar
        scrollbarButton.addEventListener("click", () => {
            showScrollbar = !showScrollbar
            chrome.storage.sync.set({ "show-scrollbar": showScrollbar });
            scrollbarButton.checked = showScrollbar
            console.log(`local show-scrollbar: ${showScrollbar}`)
            chrome.storage.sync.get(['show-scrollbar'], value => {console.log(`stored show-scrollbar: ${value['show-scrollbar']}`)})
        })
    })
	
	chrome.storage.sync.get(['show-comments'], value => {
        showScrollbar = value['show-comments'] || true
        const commentsButton = document.querySelector("#show-comments")
        commentsButton.checked = showScrollbar
        commentsButton.addEventListener("click", () => {
            showScrollbar = !showScrollbar
            chrome.storage.sync.set({ "show-comments": showScrollbar });
            commentsButton.checked = showScrollbar
            console.log(`local show-comments: ${showScrollbar}`)
            chrome.storage.sync.get(['show-comments'], value => {console.log(`stored show-comments: ${value['show-comments']}`)})
        })
    })
})