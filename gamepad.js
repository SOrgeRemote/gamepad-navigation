let prevButtons = []
let targetX = 0
let targetY = 0

let movementSpeed = 1

let selectedInput = undefined

// listen for gamepad connected
window.addEventListener("gamepadconnected", function (e) {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length)

        requestAnimationFrame(loop)
})

// disconnected
window.addEventListener("gamepaddisconnected", function (e) {
    console.log("Gamepad disconnected from index %d: %s",
        e.gamepad.index, e.gamepad.id)
    cancelAnimationFrame(loop)
})

function loop() {
    processGamepad()
    requestAnimationFrame(loop)
}

function processGamepad() {
    let gamepads = navigator.getGamepads()
    if (!gamepads) {
        return
    }

    let gamepad = gamepads[0]

    let currentButtons = gamepad.buttons

    currentButtons.forEach((button, index) => {

        // movement repeats
        if (index >= 12 && index <= 15 && button.pressed) {
            moveCursor(index)
            return
        }

        if (!prevButtons[index] && button.pressed) {
            buttonPressed(index)
        }
        prevButtons[index] = button.pressed
    })
}

function buttonPressed(buttonId) {
    switch (buttonId) {
        case 0:
            clickElement()
            break
        case 2:
            recognizeSpeech()
            break
        case 6:
            decreaseSpeed()
            break
        case 7:
            increaseSpeed()
            break
    }
}

function recognizeSpeech() {
    const recognition = new window.webkitSpeechRecognition()
    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        insertText(speechToText)
    }
    recognition.start()
}

function insertText(text) {
    if (!selectedInput) {
        return
    }

    selectedInput.value = text
}

function decreaseSpeed() {
    movementSpeed /= 2

    if (movementSpeed < 1) {
        movementSpeed = 1
    }
}

function increaseSpeed() {
    movementSpeed *= 2
}

function moveCursor (buttonId) {
    switch (buttonId) {
        case 12:
            moveUp()
            break
        case 13:
            moveDown()
            break
        case 14:
            moveLeft()
            break
        case 15:
            moveRight()
            break
    }

    let topSet = targetY - (cursorImg.height / 2)
    let leftSet = targetX - (cursorImg.width / 2)
    
    cursorImg.style.top = topSet + "px"
    cursorImg.style.left = leftSet + "px"
}

function clickElement() {
    let elements = document.elementsFromPoint(targetX, targetY)
    
    let element = undefined
    
    for (let e in elements) {
        
        if (elements[e] != cursorImg) {
            element = elements[e]
            break
        }
    }
    
    if (!element) {
        return
    }

    if (element.tagName == "INPUT") {
        selectedInput = element
        element.select()
        element.click()
    } else {
        selectedInput = undefined
        element.click()
    }
}

function moveUp() {
    targetY -= movementSpeed

    if (targetY < 0) {
        targetY = 0
    }
}

function moveDown() {
    targetY += movementSpeed
}

function moveLeft() {
    targetX -= movementSpeed
    
    if (targetX < 0) {
        targetX = 0
    }
}

function moveRight() {
    targetX += movementSpeed
}