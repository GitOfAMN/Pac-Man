// Calling the variables in html that are needed to to reference in JS
const modalOne = document.querySelector('.modal-one'),
      modalTwo = document.querySelector('.modal-two'),
      button = document.querySelector('button')

const gamePage = document.querySelector('.game-page')
const startGame = document.querySelector('.lets-play')


// Calling the functions to effect the abovementioned variables
button.addEventListener('click', (evt) => {
  modalOne.classList.add('hide');
  modalTwo.classList.remove('hide');
})

startGame.addEventListener('click', (evt) => {
    modalTwo.classList.add('hide');
    gamePage.classList.remove('hide');
})