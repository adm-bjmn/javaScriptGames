const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20
const userStart = [230, 5]
const ballStart = [230, 27]
const boardWidth = 560
const boardHeight = 300

let timerId
let currentPosition = userStart
let ballCurrent = ballStart
let xDirection = 2
let yDirection = 2

class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [(xAxis + blockWidth), yAxis]
        this.topLeft = [xAxis, (yAxis + blockHeight)]
        this.topRight = [(xAxis + blockWidth), (yAxis + blockHeight)]

    }

}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

function drawBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}
drawBlocks()

const player = document.createElement('div')
player.classList.add('user')
drawPlayer()
grid.appendChild(player)

function drawPlayer() {
    player.style.left = userStart[0] + 'px'
    player.style.bottom = userStart[1] + 'px'

}

const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

function drawBall() {
    ball.style.left = ballStart[0] + 'px'
    ball.style.bottom = ballStart[1] + 'px'
}


function movePlayer(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10
                drawPlayer()
                break;
            }
        case 'ArrowRight':
            if (currentPosition[0] < 560 - blockWidth) {
                currentPosition[0] += 10
                drawPlayer()
                break;
            }
    }
}

document.addEventListener('keydown', movePlayer)

function moveBall() {
    ballCurrent[0] += xDirection
    ballCurrent[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 25)

function checkForCollisions() {

    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballCurrent[0] > blocks[i].bottomLeft[0] && ballCurrent[0] < blocks[i].bottomRight[0]) &&
            ((ballCurrent[1] + 20) > blocks[i].bottomLeft[1] && ballCurrent[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()

            if (blocks.length === 0) {
                clearInterval(timerId)
                document.removeEventListener('keydown', movePlayer)
                alert('You won...If thats what you want to call it.')
            }
        }
    }

    //check for wall colisions.
    if (
        ballCurrent[0] >= (boardWidth - 20) ||
        ballCurrent[1] >= (boardHeight - 20) ||
        ballCurrent[0] <= 0
    ) {
        changeDirection()
    }
    if (ballCurrent[1] <= 0) {
        clearInterval(timerId)
        document.removeEventListener('keydown', movePlayer)
        alert('Ahh thats a shame. Prick.')
    }
    if (
        ballCurrent[0] > currentPosition[0] &&
        ballCurrent[0] < (currentPosition[0] + blockWidth) &&
        ballCurrent[1] === (currentPosition[1] + blockHeight)) {
        yDirection = 2
    }

}


function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    }

}

