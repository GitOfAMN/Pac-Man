const modalOne = document.querySelector('.modal-one'),
      modalTwo = document.querySelector('.modal-two'),
      button = document.querySelector('button')

// when the modal button is clicked, add a class of 'hide' to the first modal to hide it and remove the class of 'hide' from the second modal to show it
button.addEventListener('click', (evt) => {
  modalOne.classList.add('hide');
  modalTwo.classList.remove('hide');
})
