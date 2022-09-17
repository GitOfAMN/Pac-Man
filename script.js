/***************************
 CACHE DOM NODES
 ***************************/

const openModalOne = document.querySelector('.get-started')
const openGamePage = document.querySelector('.lets-play')
const gamePage = document.querySelector('.gameboard')

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
console.log(context)

const keys = {
    arrowUp: {
        pressed: false
    },
    arrowLeft: {
        pressed: false
    },
    arrowDown: {
        pressed: false
    },
    arrowRight: {
        pressed: false
    },
}

/***************************
UTILITY FUNCTIONS & OTHER VARIABLES
 ***************************/

canvas.width = innerWidth
canvas.height = innerHeight


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
    ['-', '-', '-', '-', '-', '-', '-','-', ],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ','-', ],
    ['-', ' ', '-', '-', ' ', ' ', ' ','-', ],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ','-', ],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ','-', ],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ','-', ],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ','-', ],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ','-', ],
    ['-', '-', '-', '-', '-', '-', '-','-', ]
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

function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)
    boundaries.forEach((boundary) => {
        boundary.draw()
    })

    player.update()
    player.velocity.y = 0

    if (keys.arrowUp.pressed) {
        player.velocity.y = -5
    }

    if (keys.arrowDown.pressed) {
        player.velocity.y = 5
    }

    if (keys.arrowLeft.pressed) {
        player.velocity.x = -5
    }

    if (keys.arrowRight.pressed) {
        player.velocity.x = 5
    }
}

// The Pac-Man

class Player {
    constructor({ position, velocity }) {
       this.position = position
       this.velocity = velocity
       this.radius = 15
        
    }

    draw() {
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = 'yellow'
        context.fill()
        context.closePath()
    }

    update() {
       this.draw()
       this.position.x += this.velocity.x
       this.position.y += this.velocity.y
    }
}

const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    velocity: {
        x: 0,
        y: 0
    }
})

player.draw()

animate()

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
    canvas.style.display = 'block'
  })

// document.querySelector('#three')
//   .addEventListener('click', (evt) => {
//     setShownModal('gameboard')
//   })

/* When the Button is clicked that is in the final modal make all modals disappear and make the game board visible
  */

// document.querySelector('#three > button')
//     .addEventListener('click', (evt) => {
//     setShownModal(null)
//   })

addEventListener('keydown', (evt) => {
    evt.preventDefault()
    switch (evt.key) {
        case 'ArrowUp':
        keys.arrowUp.pressed = true
        break
        
        case 'ArrowLeft':
        keys.arrowLeft.pressed = true
        break
       
        case 'ArrowDown':
        keys.arrowDown.pressed = true
        break
       
        case 'ArrowRight':
        keys.arrowRight.pressed = true
        break
    }
})

addEventListener('keyup', (evt) => {
    evt.preventDefault()
    switch (evt.key) {
        case 'ArrowUp':
        keys.arrowUp.pressed = false
        break

        case 'ArrowLeft':
        keys.arrowLeft.pressed = false
        break
        
        case 'ArrowDown':
        keys.arrowDown.pressed = false
        break
        
        case 'ArrowRight':
        keys.arrowRight.pressed = false
        break
    }
})