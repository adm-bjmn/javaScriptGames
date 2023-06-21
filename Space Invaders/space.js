document.addEventListener('DOMContentLoaded', () => {

    const livesDisplay = document.querySelector('#lives')
    const scoreDisplay = document.querySelector('#score')

    const grid = document.querySelector('.grid')
    let currentShooterIndex = 202
    const width = 15
    let direction = 1
    let invadersId
    let goingRight = true
    let aliensRemoved = []
    let score = 0

    for (let i = 0; i < 225; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
    }

    const squares = Array.from(document.querySelectorAll('.grid div'))

    const alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ]

    function remove() {
        for (let i = 0; i < alienInvaders.length; i++) {
            squares[alienInvaders[i]].classList.remove('invader')
        }
    }
    draw()

    function draw() {
        for (let i = 0; i < alienInvaders.length; i++) {
            if (!aliensRemoved.includes(i))
                squares[alienInvaders[i]].classList.add('invader')
        }
    }

    squares[currentShooterIndex].classList.add('shooter')

    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter')
        switch (e.key) {
            case 'ArrowLeft':
                if (currentShooterIndex % width !== 0) currentShooterIndex -= 1
                break
            case 'ArrowRight':
                if (currentShooterIndex % width < width - 1) currentShooterIndex += 1
                break
        }
        squares[currentShooterIndex].classList.add('shooter')
    }

    document.addEventListener('keydown', moveShooter)

    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1
        remove()

        if (rightEdge && goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width + 1
                goingRight = false
            }
            direction = -1
        }
        if (leftEdge && !goingRight) {
            for (let i = 0; i < alienInvaders.length; i++) {
                alienInvaders[i] += width - 1
                goingRight = true
            }
            direction = 1
        }

        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += direction
        }
        draw()

        if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
            livesDisplay.innerHTML = 'You Loose'
            clearInterval(invadersId)
        }
        for (let i = 0; i < alienInvaders.length; i++) {
            if (alienInvaders[i] > squares.length) {
                livesDisplay.innerHTML = 'You Loose'
                clearInterval(invadersId)
            }
        }
        if (aliensRemoved.length === alienInvaders.length) {
            livesDisplay.innerHTML = 'You Win'
            clearInterval(invadersId)

        }
    }
    invadersId = setInterval(moveInvaders, 500)

    function shootBullet(e) {
        let lazerID
        let currentLazerIndex = currentShooterIndex
        function moveLazer() {
            squares[currentLazerIndex].classList.remove('lazer')
            currentLazerIndex -= width
            squares[currentLazerIndex].classList.add('lazer')

            if (squares[currentLazerIndex].classList.contains('invader')) {
                squares[currentLazerIndex].classList.remove('invader')
                squares[currentLazerIndex].classList.remove('lazer')
                clearInterval(lazerID)
                score++
                scoreDisplay.innerHTML = score
                const alienRemoval = alienInvaders.indexOf(currentLazerIndex)
                aliensRemoved.push(alienRemoval)

            }
        }
        switch (e.key) {
            case 'ArrowUp':
                lazerID = setInterval(moveLazer, 100)
        }
    }

    document.addEventListener('keydown', shootBullet)
})

