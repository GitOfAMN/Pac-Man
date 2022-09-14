// Calling the variables in HTML that are needed to reference in JS

const modalOne = document.querySelector('.modal-one'),
      modalTwo = document.querySelector('.modal-two'),
      button = document.querySelector('button')

const gamePage = document.querySelector('.game-page')
const startGame = document.querySelector('.lets-play')

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
console.log(context)

canvas.width = innerWidth


// Calling the functions to effect the abovementioned variables

button.addEventListener('click', (evt) => {
  modalOne.classList.add('hide');
  modalTwo.classList.remove('hide');
})

startGame.addEventListener('click', (evt) => {
    modalTwo.classList.add('hide');
    gamePage.classList.remove('hide');
})

// Game Board

class Boundary {
    constructor({ position } ) {
       this.position = position
       this.width = 40
       this.height = 40
    }

    draw() {
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = [
    new Boundary({
        position: {
            x: 0,
            y: 0
        }
    }),

    new Boundary({
        position: {
            x: 41,
            y: 0
        }
    })
]

boundaries.forEach((boundary) => {
    boundary.draw()
})