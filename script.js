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

const displayModule = (function() {
  const dialogPreRound = document.querySelector('.dialog-pre-round');
  const buttonPreRound = document.querySelector('.button-pre-round');
  const main = document.querySelector('main');

  buttonPreRound.addEventListener('click', () => dialogPreRound.close())
  dialogPreRound.showModal();

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

  showGrids();
})();

const flowModule = (function () {

})();

const playerModule = (function() {
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
    console.log(players);
  }

  return {
    log
  }
})();