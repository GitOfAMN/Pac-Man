/***************************
 CACHE DOM NODES
 ***************************/

const openModalOne = document.querySelector('.get-started')
const openGamePage = document.querySelector('.lets-play')
const gamePage = document.querySelector('.gameboard')

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
console.log(context)

/***************************
UTILITY FUNCTIONS & OTHER VARIABLES
 ***************************/

canvas.width = innerWidth


const setShownModal = (modalNumber) => {
    const modals = document.querySelectorAll('.modal')
    modals.forEach((modal) => {
        modal.style.display = 'none'
    })

    modalNumber ? document.getElementById(modalNumber).style.display = 'block' : null

    document.getElementById(modalNumber).style.display = 'block'
}

/***************************
 CLASSES
 ***************************/

// Game Board

class Boundary {
    static width = 40
    static height = 40
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

const map = [
    ['-', '-', '-', '-', '-', '-', ],
    ['-', ' ', ' ', ' ', ' ', '-', ],
    ['-', ' ', '-', '-', ' ', '-', ],
    ['-', ' ', ' ', ' ', ' ', '-', ],
    ['-', '-', '-', '-', '-', '-', ]
]
const boundaries = []

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
           case '-':
            boundaries.push(
                new Boundary({
                    position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    }
                })
            )
            break
        }
    })
})

boundaries.forEach((boundary) => {
    boundary.draw()
})

// The Pac-Man

class PacMan {
    constructor() {
       this.position = position
       this.velocity = velocity
       this.radius = 10
        
    }

    draw() {
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = 'yellow'
        context.fill()
        context.closePath()
    }
}



/***************************
EVENT LISTENERS
 ***************************/

/*
 When the button in the first modal is clicked show the second Modal and make all others dissapear
*/
document.querySelector('#one > button')
  .addEventListener('click', (evt) => {
    setShownModal('two')
  })

document.querySelector('#two > button')
  .addEventListener('click', (evt) => {
    setShownModal('three')
  })

document.querySelector('.gamrboard > button')
  .addEventListener('click', (evt) => {
    setShownModal('gameboard')
  })

/* When the Button is clicked that is in the final modal make all modals disappear and make the game board visible
  */

document.querySelector('#three > button')
    .addEventListener('click', (evt) => {
    setShownModal(null)
  })