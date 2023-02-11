document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(['show-scrollbar'], value => {
        let showScrollbar = value['show-scrollbar'] ?? false
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
        let showComments = value['show-comments'] ?? true
        const commentsButton = document.querySelector("#show-comments")
        commentsButton.checked = showComments
        commentsButton.addEventListener("click", () => {
            showComments = !showComments
            chrome.storage.sync.set({ "show-comments": showComments });
            commentsButton.checked = showComments
            console.log(`local show-comments: ${showComments}`)
            chrome.storage.sync.get(['show-comments'], value => {console.log(`stored show-comments: ${value['show-comments']}`)})
        })
    })
	
	chrome.storage.sync.get(['swap-watch-next'], value => {
        let swapWatchNext = value['swap-watch-next'] ?? false
        const swapButton = document.querySelector("#swap-watch-next")
        swapButton.checked = swapWatchNext
        swapButton.addEventListener("click", () => {
            swapWatchNext = !swapWatchNext
            chrome.storage.sync.set({ "swap-watch-next": swapWatchNext });
            swapButton.checked = swapWatchNext
            console.log(`local swap-watch-next: ${swapWatchNext}`)
            chrome.storage.sync.get(['swap-watch-next'], value => {console.log(`stored swap-watch-next: ${value['swap-watch-next']}`)})
        })
    })
})