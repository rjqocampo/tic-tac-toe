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

  function placeMark(e) {
    if (flowModule.getActivePlayer.mark === 'X') {
      grids[e.target.getAttribute('data-index')] = 1;
    } else {
      grids[e.target.getAttribute('data-index')] = 2;
    }
    console.log(e.target.getAttribute('data-index'))
    console.log(flowModule.getActivePlayer().mark)
    console.table(grids);
  }

  return {
    getGrids, placeMark
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

  let activePlayer = players[0];

  function log() { // --------------------------- for testing
    console.table(activePlayer);
  }

  const getActivePlayer = () => activePlayer;

  function chooseMark(e) {
    if (e.target.textContent === 'X') {
      players[0].mark = 'X';
      players[1].mark = 'O';
    } else {
      players[0].mark = 'O'
      players[1].mark = 'X'
    }

    setActivePlayer();
  }

  function setActivePlayer() {
    activePlayer = players.find(player => player.mark === 'X');
  }

  return {
    log, chooseMark, getActivePlayer
  }
})();

const displayModule = (function() {
  const dialogPreRound = document.querySelector('.dialog-pre-round');
  const buttonStartGame = document.querySelector('.button-start-game');
  const buttonChooseMark = document.querySelector('.dialog-pre-round > div > div');
  const main = document.querySelector('main');

  buttonStartGame.addEventListener('click', () => dialogPreRound.close());
  buttonChooseMark.addEventListener('click', flowModule.chooseMark);
  main.addEventListener('click', (e) => {
    gameModule.placeMark(e)
  })

  function showGrids() {
    gameModule.getGrids().forEach((grid, index) => {
      const div = document.createElement('div');
      div.setAttribute('class', 'grid');
      div.setAttribute('data-index', `${index}`);
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