const guessesDisplay = document.getElementById('guesses')
let guessCount = 0



const cardArray = [
    {
        name: 'Link',
        img: 'images/Link.jpg'
    },
    {
        name: 'Zelda',
        img: 'images/Zelda.jpg'
    },
    {
        name: 'Goron',
        img: 'images/Goron.jpg'
    },
    {
        name: 'Zoro',
        img: 'images/Zoro.jpg'
    },
    {
        name: 'Gerudo',
        img: 'images/Gerudo.jpg'
    },
    {
        name: 'Link',
        img: 'images/Link.jpg'
    },
    {
        name: 'Zelda',
        img: 'images/Zelda.jpg'
    },
    {
        name: 'Goron',
        img: 'images/Goron.jpg'
    },
    {
        name: 'Zoro',
        img: 'images/Zoro.jpg'
    },
    {
        name: 'Gerudo',
        img: 'images/Gerudo.jpg'
    }
]

cardArray.sort(() => 0.5 - Math.random())
console.log(cardArray)

const gameGrid = document.querySelector('#grid')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

function createGameGrid() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/Logo.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gameGrid.append(card)
    }

}
createGameGrid()

function flipCard() {
    const cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    // if second card id matches first card id them save
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

function checkMatch() {
    increaseGuesses();
    const cards = document.querySelectorAll('#grid img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    console.log(cardsChosen)
    console.log('check for a match!')
    if (optionOneId == optionTwoId) {
        alert('You have clicked the same card.')
    }

    if (cardsChosen[0] == cardsChosen[1]) {
        cards[optionOneId].setAttribute('src', cardArray[optionOneId].img)
        cards[optionTwoId].setAttribute('src', cardArray[optionTwoId].img)
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[cardsChosenIds[1]].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/Logo.png')
        cards[optionTwoId].setAttribute('src', 'images/Logo.png')
    }

    cardsChosen = []
    cardsChosenIds = []

    if (cardsWon.length == cardArray.length / 2) {
        alert('Yay! You did it!')
    }

}
function increaseGuesses() {
    guessCount = (guessCount + 1)
    guessesDisplay.innerHTML = guessCount

}