
let prevButtons = []
let targetX = 0
let targetY = 0

let movementSpeed = 1

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
        case 6:
            decreaseSpeed()
            break
        case 7:
            increaseSpeed()
            break
    }
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

    let cursor = document.getElementById("SUPER_AMAZING_CURSOR_CROSSHAIR_THING")

    let topSet = targetY - (cursor.height / 2)
    let leftSet = targetX - (cursor.width / 2)
    
    cursor.style.top = topSet + "px"
    cursor.style.left = leftSet + "px"
}

function clickElement() {
    let element = document.elementFromPoint(targetX, targetY)

    console.log(element);
    
    
    if (!element) {
        return
    }

    element.click()
}

function moveUp() {
    targetY -= movementSpeed
}

function moveDown() {
    targetY += movementSpeed
}

function moveLeft() {
    targetX -= movementSpeed
}

function moveRight() {
    targetX += movementSpeed
}