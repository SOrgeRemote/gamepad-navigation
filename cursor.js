window.addEventListener("load", () => {
    initCursor()
})

function initCursor() {
    document.body.style.zIndex = -1

    let cursorImg = document.createElement("img")
    cursorImg.id = "SUPER_AMAZING_CURSOR_CROSSHAIR_THING"
    cursorImg.src = chrome.runtime.getURL("images/crosshair.png")
    let style = cursorImg.style
    style.width = "100px"
    style.height = "100px"
    style.position = "fixed"
    style.zIndex = 2
    style.top = "-50px"
    style.left = "-50px"
    document.body.append(cursorImg)
}