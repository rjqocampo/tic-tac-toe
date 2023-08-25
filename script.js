/*
Grid has 3 states: 0, 1, 2;
2 player objects. Has 2 states: X or O

public function
set mark
reset game

Intro modal
Choose mark: X or O
Default players[0]: 
*/

const gameModule = (function() {
  const grids = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const getGrids = () => grids;

  return {
    getGrids
  }
})();

const flowModule = (function () {
  const players = [
    {
      name: 'Player 1',
      mark: 'X',
    },
    {
      name: 'Player 2',
      mark: 'O',
    }
  ];

  function log() {
    console.table(players);
  }

  function setMark(e) {
    if(e.target.textContent === 'X') {
      players[0].mark = 'X';
      players[1].mark = 'O';
    } else {
      players[0].mark = 'O'
      players[1].mark = 'X'
    }
  }

  return {
    log, setMark
  }
})();

const playerModule = (function() {

})();

const displayModule = (function() {
  const dialogPreRound = document.querySelector('.dialog-pre-round');
  const buttonStartGame = document.querySelector('.button-start-game');
  const buttonChooseMark = document.querySelector('.dialog-pre-round > div > div');
  const main = document.querySelector('main');

  buttonStartGame.addEventListener('click', () => dialogPreRound.close());
  buttonChooseMark.addEventListener('click', flowModule.setMark);
  

  function showGrids() {
    gameModule.getGrids().forEach((grid) => {
      const div = document.createElement('div');
      div.setAttribute('class', 'grid');
      main.appendChild(div);
    });
  }

  function removeGrids() {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  }

  dialogPreRound.showModal();
  showGrids();
})();