const dialogPreRound = document.querySelector('.dialog-pre-round');
const buttonPreRound = document.querySelector('.button-pre-round');

buttonPreRound.addEventListener('click', () => dialogPreRound.close())

dialogPreRound.showModal();

/*
Grid has 3 states: null, X, O;
2 player objects. Has 2 states: X or O

public function
set mark
reset game

Intro modal
Choose mark: X or O
Default players[0]: 
*/