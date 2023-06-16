const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20
const userStart = [230, 5]
const ballStart = [230, 27]
let timerId
let currentPosition = userStart
let ballCurrent = ballStart


class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [(xAxis + blockHeight), yAxis]
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
    ballCurrent[0] += 2
    ballCurrent[1] += 2
    drawBall()
}

timerId = setInterval(moveBall, 30) 