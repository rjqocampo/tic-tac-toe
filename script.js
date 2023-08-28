const gameModule = (function() {
  let grids = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let players = [
    {
      name: 'Player 1',
      mark: 'X',
    },
    {
      name: 'Player 2',
      mark: 'O',
    }
  ];
  let scores = {
    x: 0,
    o: 0,
    tie: 0
  }
  let activePlayer = players[0];
  let roundResults = null;

  const getGrids = () => grids;
  const getActivePlayer = () => activePlayer;
  const getScores = () => scores;
  const getRoundResults = () => {
    const x = roundResults;
    roundResults = null;
    return x;
  }

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
      checkWinner();
      switchActivePlayer();
    }
  }

  function checkWinner() {
    for (let i = 0; i < 9; i += 3) {
      if (grids[i] === grids[i + 1] && grids[i] === grids[i + 2] && grids[i] !== 0) {
        console.log('ROW');
        updateScores(getActivePlayer().mark);
        return;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (grids[i] === grids[i + 3] && grids[i] === grids[i + 6] && grids[i] !== 0) {
        console.log('COLUMN');
        updateScores(getActivePlayer().mark);
        return;
      }
    }
     
    if ((grids[0] === grids[4] && grids[0] === grids[8] && grids[0] !== 0) ||
        (grids[2] === grids[4] && grids[2] === grids[6] && grids[2] !== 0)) {
      console.log('DIAGONAL');
      updateScores(getActivePlayer().mark);
      return;
    } else if (grids.every((grid) => grid !== 0)) {
      console.log('DRAW');
      updateScores('TIE');
    }
  }

  function updateScores(mark) {
    if (mark === 'X') {
      console.log('Add score to X');
      scores.x++;
    } else if (mark === 'O') {
      console.log('Add score to O');
      scores.o++;
    } else {
      console.log('Add score to TIE');
      scores.tie++;
    }
    
    roundResults = mark;
    console.log(roundResults);
  }

  function resetGrids() {
    grids = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  function resetAll() {
    console.table(grids);
    console.table(players);
    console.table(scores);
    console.log(activePlayer);
    console.log(roundResults);

    grids = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    players = [
      {
        name: 'Player 1',
        mark: 'X',
      },
      {
        name: 'Player 2',
        mark: 'O',
      }
    ];
    scores = {
      x: 0,
      o: 0,
      tie: 0
    }
    activePlayer = players[0];
    roundResults = null;

    console.log('RESET')
    console.table(grids);
    console.table(players);
    console.table(scores);
    console.log(activePlayer);
    console.log(roundResults);
  }

  return {
    getGrids,
    getActivePlayer, 
    getScores,
    getRoundResults,
    chooseMark, 
    placeMark, 
    checkWinner,
    resetGrids,
    resetAll
  }
})();

const displayModule = (function() {
  const dialogPreRound = document.querySelector('.dialog-pre-round');
  const dialogPostRound = document.querySelector('.dialog-post-round');
  const dialogPostRoundHeader = document.querySelector('.dialog-post-round__header');
  const dialogPostRoundWinner = document.querySelector('.dialog-post-round__winner');
  const buttonPlayAgain = document.querySelector('.button-play-again');
  const buttonStartGame = document.querySelector('.button-start-game');
  const buttonChooseMark = document.querySelector('.dialog-pre-round > div > div');
  const buttonHome = document.querySelectorAll('.button-home');
  const xScore = document.querySelector('.x-score h3');
  const oScore = document.querySelector('.o-score h3');
  const tieScore = document.querySelector('.tie-score h3');
  const whosTurn = document.querySelector('.whos-turn');
  const main = document.querySelector('main');

  buttonChooseMark.addEventListener('click', gameModule.chooseMark);
  buttonStartGame.addEventListener('click', () => {
    dialogPreRound.close();
    dialogPostRound.close();
    removeGrids();
    showTurn();
    showGrids();
    showScores();
  });
  buttonHome.forEach((button) => {
    button.addEventListener('click', () => {
      gameModule.resetAll();
      dialogPreRound.showModal();
    })
  })
  buttonPlayAgain.addEventListener('click', () => {
    gameModule.resetGrids();
    dialogPostRound.close();
    removeGrids();
    showGrids();
  })
  main.addEventListener('click', (e) => {
    gameModule.placeMark(e);
    removeGrids();
    showTurn();
    showGrids();
    showScores();

    let results = gameModule.getRoundResults();
    if (results !== null) {
      console.log(results);
      showPostRound(results);
    }
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
    whosTurn.textContent = `${gameModule.getActivePlayer().mark} TURN`;
  }

  function showScores() {
    let {x, o, tie} = gameModule.getScores();
    xScore.textContent = x;
    oScore.textContent = o;
    tieScore.textContent = tie;
  }

  function showPostRound(results) {
    console.log(`Show post-round for ${results}`);
    if (results === 'X') {
      dialogPostRoundHeader.setAttribute('class', 'dialog-post-round__header dialog-post-round__header--x');
      dialogPostRoundHeader.textContent = 'GREAT JOB!';
      dialogPostRoundWinner.setAttribute('class', 'dialog-post-round__winner dialog-post-round__winner--x');
      dialogPostRoundWinner.textContent = 'X WINS THE ROUND';
      buttonPlayAgain.setAttribute('class', 'button-play-again button-play-again--x');
    } else if (results === 'O') {
      dialogPostRoundHeader.setAttribute('class', 'dialog-post-round__header dialog-post-round__header--o');
      dialogPostRoundHeader.textContent = 'GREAT JOB!';
      dialogPostRoundWinner.setAttribute('class', 'dialog-post-round__winner dialog-post-round__winner--o');
      dialogPostRoundWinner.textContent = 'O WINS THE ROUND';
      buttonPlayAgain.setAttribute('class', 'button-play-again button-play-again--o');
    } else {
      dialogPostRoundHeader.setAttribute('class', 'dialog-post-round__header dialog-post-round__header--tie');
      dialogPostRoundHeader.textContent = 'CLOSE MATCH!'
      dialogPostRoundWinner.setAttribute('class', 'dialog-post-round__winner dialog-post-round__winner--tie');
      dialogPostRoundWinner.textContent = 'IT\'S A TIE';
      buttonPlayAgain.setAttribute('class', 'button-play-again button-play-again--tie');
    }
    dialogPostRound.showModal();
  }

  dialogPreRound.showModal();
})();