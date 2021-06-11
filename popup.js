document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.sync.get(['show-scrollbar'], value => {
        showScrollbar = value['show-scrollbar'] || false
        let scrollbarButton = document.getElementById("show-scrollbar")
        scrollbarButton.checked = showScrollbar
        scrollbarButton.addEventListener("click", () => {
            showScrollbar = !showScrollbar
            chrome.storage.sync.set({ "show-scrollbar": showScrollbar });
            scrollbarButton.checked = showScrollbar
            console.log(`local show-scrollbar: ${showScrollbar}`)
            chrome.storage.sync.get(['show-scrollbar'], value => {console.log(`stored show-scrollbar: ${value['show-scrollbar']}`)})
        })
    })
    
})