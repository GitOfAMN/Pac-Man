/***************************
 CACHE DOM NODES
 ***************************/

const openModalOne = document.querySelector('.get-started')
const openGamePage = document.querySelector('.lets-play')
const gamePage = document.querySelector('.gameboard')

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')
console.log(context)

const scoreEl = document.querySelector('#scoreEl')

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

// The Gameboard

class Boundary {
    static width = 40
    static height = 40
    constructor({ position, image }) {
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }

    draw() {
        // context.fillStyle = 'blue'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height)
        context.drawImage(this.image, this.position.x, this.position.y)
    }
}

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

class Ghost {
    constructor({ position, velocity, color = 'red' }) {
        this.position = position
        this.velocity = velocity
        this.radius = 15
        this.color = color
    }

    draw() {
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = this.color
        context.fill()
        context.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Pellet {
    constructor({ position }) {
        this.position = position
        this.radius = 3
    }

    draw() {
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fillStyle = 'white'
        context.fill()
        context.closePath()
    }
}

const pellets = []
const boundaries = []
const ghosts = [
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2
        },
        velocity: {
            x: 5,
            y: 0
        }
    })
]

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

let lastKey = ''
let score = 0

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2',],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|',],
    ['|', '.', '-', '.', '-', '-', '-', '.', '-', '.', '|',],
    ['|', '.', '.', '.', '.', '-', '.', '.', '.', '.', '|',],
    ['|', '.', '-', '-', '.', '.', '.', '-', '-', '.', '|',],
    ['|', '.', '.', '.', '.', '-', '.', '.', '.', '.', '|',],
    ['|', '.', '-', '.', '-', '-', '-', '.', '-', '.', '|',],
    ['|', '.', '.', '.', '.', '-', '.', '.', '.', '.', '|',],
    ['|', '.', '-', '-', '.', '-', '.', '-', '-', '.', '|',],
    ['|', '.', '.', '.', '.', '-', '.', '.', '.', '.', '|',],
    ['|', '.', '-', '.', '-', '-', '-', '.', '-', '.', '|',],
    ['|', '.', '.', '.', '.', '-', '.', '.', '.', '.', '|',],
    ['|', '.', '-', '-', '.', '.', '.', '-', '-', '.', '|',],
    ['|', '.', '.', '.', '.', '-', '.', '.', '.', '.', '|',],
    ['|', '.', '-', '.', '-', '-', '-', '.', '-', '.', '|',],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|',],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3',]
]

function createImage(src) {
const image = new Image()
image.src = src
return image
}

map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/pipeHorizontal.png')
                    })
                )
                break
            case '|':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/pipeVertical.png')
                    })
                )
                break
                case '1':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/pipeCorner1.png')
                    })
                )
                break
                case '2':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/pipeCorner2.png')
                    })
                )
                break
                case '3':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/pipeCorner3.png')
                    })
                )
                break
                case '4':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./img/pipeCorner4.png')
                    })
                )
                break
            case '.':
                pellets.push(
                    new Pellet({
                        position: {
                            x: j * Boundary.width + Boundary.width / 2,
                            y: i * Boundary.height + Boundary.width / 2
                        },
                    })
                )
                break
        }
    })
})

// Collison Detection

function circleCollidesWithRectangle({ circle, rectangle }) {
    return (
        circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&
        circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x &&
        circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y &&
        circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width
    )
}

function animate() {
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)

    if (keys.arrowUp.pressed && lastKey === 'arrowUp') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, /* (...) spread operator usage */
                        velocity: {
                            x: 0,
                            y: -5
                        }
                    },
                    rectangle: boundary
                })
            ) {
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = -5
            }
        }
    }

    if (keys.arrowDown.pressed && lastKey === 'arrowDown') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, /* (...) spread operator usage */
                        velocity: {
                            x: 0,
                            y: 5
                        }
                    },
                    rectangle: boundary
                })
            ) {
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = 5
            }
        }
    }

    if (keys.arrowLeft.pressed && lastKey === 'arrowLeft') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, /* (...) spread operator usage */
                        velocity: {
                            x: -5,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
            ) {
                player.velocity.x = 0
                break
            } else {
                player.velocity.x = -5
            }
        }
    }

    if (keys.arrowRight.pressed && lastKey === 'arrowRight') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                circleCollidesWithRectangle({
                    circle: {
                        ...player, /* (...) spread operator usage */
                        velocity: {
                            x: 5,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
            ) {
                player.velocity.x = 0
                break
            } else {
                player.velocity.x = 5
            }
        }
    }

    // Touch pellets here
    for (let i = pellets.length - 1; 0 < i; i--) {
        const pellet = pellets[i]
        pellet.draw()

        if (Math.hypot(
            pellet.position.x - player.position.x,
            pellet.position.y - player.position.y
        ) <
            pellet.radius + player.radius
        ) {
            pellets.splice(i, 1)
            score += 10
            scoreEl.innerHTML = score
        }
    }

    boundaries.forEach((boundary) => {
        boundary.draw()

        if (
            circleCollidesWithRectangle({
                circle: player,
                rectangle: boundary
            })
        ) {
            player.velocity.x = 0
            player.velocity.y = 0
        }
    })
    player.update()

    ghosts.forEach((ghost) => {
        ghost.update()

        const collisions = []
        boundaries.forEach((boundary) => {
            if (
                !collisions.includes('right') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost, /* (...) spread operator usage */
                        velocity: {
                            x: 5,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
            ) {
                collisions.push('right')
            }

            if (!collisions.includes('left') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost, /* (...) spread operator usage */
                        velocity: {
                            x: -5,
                            y: 0
                        }
                    },
                    rectangle: boundary
                })
            ) {
                collisions.push('left')
            }

            if (
                !collisions.includes('up') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost, /* (...) spread operator usage */
                        velocity: {
                            x: 0,
                            y: -5
                        }
                    },
                    rectangle: boundary
                })
            ) {
                collisions.push('up')
            }

            if (
                !collisions.includes('down') &&
                circleCollidesWithRectangle({
                    circle: {
                        ...ghost, /* (...) spread operator usage */
                        velocity: {
                            x: 0,
                            y: 5
                        }
                    },
                    rectangle: boundary
                })
            ) {
                collisions.push('down')
            }
        })
        console.log(collisions)
    })
}

animate()

/***************************
EVENT LISTENERS
 ***************************/

document.querySelector('#one > button')
    .addEventListener('click', (evt) => {
        setShownModal('two')
    })

document.querySelector('#two > button')
    .addEventListener('click', (evt) => {
        setShownModal('three')
        canvas.style.display = 'block'
    })

// document.querySelector('#three > button')
//     .addEventListener('click', (evt) => {
//         setShownModal(null)
//         document.querySelector('.gameboard').style.display = 'block'
//         canvas.style.display = 'block'
//     })

addEventListener('keydown', (evt) => {
    evt.preventDefault()
    switch (evt.key) {
        case 'ArrowUp':
            keys.arrowUp.pressed = true
            lastKey = 'arrowUp'
            break

        case 'ArrowLeft':
            keys.arrowLeft.pressed = true
            lastKey = 'arrowLeft'
            break

        case 'ArrowDown':
            keys.arrowDown.pressed = true
            lastKey = 'arrowDown'
            break

        case 'ArrowRight':
            keys.arrowRight.pressed = true
            lastKey = 'arrowRight'
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