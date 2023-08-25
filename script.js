const gameModule = (function() {
  const grids = [0, 1, 2, 0, 0, 0, 0, 0, 0];
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

  const getGrids = () => grids;
  const getActivePlayer = () => activePlayer;

  function setActivePlayer() {
    activePlayer = players.find(player => player.mark === 'X');
  }

  function switchActivePlayer() {
    activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
  }

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

  function placeMark(e) {
    let index = e.target.getAttribute('data-index');
    let mark = getActivePlayer().mark;

    if (grids[index] === 0) {
      if (mark === 'X') {
        grids[index] = 1;
      } else {
        grids[index] = 2;
      }
      console.log(index)
      console.log(mark)
      console.table(grids);
    
      switchActivePlayer();
    }
  }

  function checkWinner() {

  }

  return {
    getGrids, chooseMark, getActivePlayer, placeMark
  }
})();

const displayModule = (function() {
  const dialogPreRound = document.querySelector('.dialog-pre-round');
  const buttonStartGame = document.querySelector('.button-start-game');
  const buttonChooseMark = document.querySelector('.dialog-pre-round > div > div');
  const whosTurn = document.querySelector('.whos-turn');
  const main = document.querySelector('main');

  buttonStartGame.addEventListener('click', () => dialogPreRound.close());
  buttonChooseMark.addEventListener('click', gameModule.chooseMark);
  main.addEventListener('click', (e) => {
    gameModule.placeMark(e);
    removeGrids();
    showTurn();
    showGrids();
  })

  function showGrids() {
    gameModule.getGrids().forEach((grid, index) => {
      const div = document.createElement('div');
      div.setAttribute('data-index', `${index}`);

      if (grid === 1) {
        div.textContent = 'X'
        div.setAttribute('class', 'grid grid--x');
      } else if (grid === 2) {
        div.textContent = 'O'
        div.setAttribute('class', 'grid grid--o');
      } else {
        div.setAttribute('class', 'grid');
      }

      main.appendChild(div);
    });
  }

  function removeGrids() {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  }

  function showTurn() {
    console.log(gameModule.getActivePlayer().mark)
    whosTurn.textContent = `${gameModule.getActivePlayer().mark} TURN`;
  }

  dialogPreRound.showModal();
  showTurn();
  showGrids();
})();