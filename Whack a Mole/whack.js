const squares = document.querySelectorAll('.square')
const mole = document.querySelector('.mole')
const timeRemaing = document.querySelector('#time-remianing')
const score = document.querySelector('#score')

let result = 0
let hitPosition
let currentTime = 10
let timerId = null

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)]
    randomSquare.classList.add('mole')
    hitPosition = randomSquare.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++
            score.innerHTML = result
            hitPosition = null
        }
    })
})

function moveMole() {
    clearInterval(timerId)
    timerId = setInterval(randomSquare, 700)

}
moveMole()

function countDown() {
    currentTime--
    timeRemaing.innerHTML = currentTime
    if (currentTime == 0) {
        clearInterval(countDownTimerId)
        alert('TIMES UP! Score: ' + result)
        clearInterval(timerId)
    }
}

let countDownTimerId = setInterval(countDown, 1000)