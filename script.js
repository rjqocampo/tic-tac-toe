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
      ai: false,
    }
  ];
  let scores = {
    x: 0,
    o: 0,
    tie: 0
  }
  let activePlayer = players[0];
  let roundWinner = null;

  const getGrids = () => grids;
  const getActivePlayer = () => activePlayer;
  const getScores = () => scores;
  const getWinner = () => {
    const saveWinner = roundWinner;
    roundWinner = null;
    return saveWinner;
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

    if (grids[index] === 0) {
      if (getActivePlayer().mark === 'X') {
        grids[index] = 1;
      } else {
        grids[index] = 2;
      }

      if (checkWinner()) {
        return;
      } else if (!checkWinner()) {
        switchActivePlayer();
        checkActivePlayerIsAI();
      }
    }
  }

  function toggleAI(e) {
    if (e.target.getAttribute('data-vs') === 'ai') {
      players[1].ai = true;
    } else if (e.target.getAttribute('data-vs') === 'player') {
      players[1].ai = false;
    }
  }

  function checkActivePlayerIsAI() {
    if (getActivePlayer().ai === true) {
      aiPlaceMark();
      checkWinner();
      switchActivePlayer();
    }
  }

  function aiPlaceMark() {
    let arrayOfEmptyGrids = [];
    let random;
     
    grids.forEach((grid, index) => {
      if (grid === 0) {
        let emptyGrid = index;
        arrayOfEmptyGrids.push(emptyGrid);
      }
    })

    random = Math.floor(Math.random() * arrayOfEmptyGrids.length);

    if(getActivePlayer().mark === 'X'){
      grids[arrayOfEmptyGrids[random]] = 1;
    } else if (getActivePlayer().mark === 'O') {
      grids[arrayOfEmptyGrids[random]] = 2;
    }
  }

  function checkWinner() {
    for (let i = 0; i < 9; i += 3) {
      if (grids[i] === grids[i + 1] && grids[i] === grids[i + 2] && grids[i] !== 0) {
        updateScores(getActivePlayer().mark);
        return true;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (grids[i] === grids[i + 3] && grids[i] === grids[i + 6] && grids[i] !== 0) {
        updateScores(getActivePlayer().mark);
        return true;
      }
    }
     
    if ((grids[0] === grids[4] && grids[0] === grids[8] && grids[0] !== 0) ||
        (grids[2] === grids[4] && grids[2] === grids[6] && grids[2] !== 0)) {
      updateScores(getActivePlayer().mark);
      return true;
    } else if (grids.every((grid) => grid !== 0)) {
      updateScores('TIE');
      return true;
    }

    return false;
  }

  function updateScores(mark) {
    if (mark === 'X') {
      roundWinner = getActivePlayer();
      scores.x++;
      return;
    } else if (mark === 'O') {
      roundWinner = getActivePlayer();
      scores.o++;
      return;
    } else {
      roundWinner = 'TIE'
      scores.tie++;
      return
    }
  }

  function resetGrids() {
    grids = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  function resetAll() {
    grids = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    players = [
      {
        name: 'Player 1',
        mark: 'X',
      },
      {
        name: 'Player 2',
        mark: 'O',
        ai: false,
      }
    ];
    scores = {
      x: 0,
      o: 0,
      tie: 0
    }
    activePlayer = players[0];
    roundResults = null;
  }

  return {
    getGrids,
    getActivePlayer, 
    getScores,
    getWinner,
    chooseMark, 
    placeMark, 
    checkWinner,
    checkActivePlayerIsAI,
    toggleAI,
    resetGrids,
    resetAll,
    switchActivePlayer
  }
})();

const displayModule = (function() {
  const dialogPreRound = document.querySelector('.dialog-pre-round');
  const dialogPostRound = document.querySelector('.dialog-post-round');
  const dialogPostRoundHeader = document.querySelector('.dialog-post-round__header');
  const dialogPostRoundWinner = document.querySelector('.dialog-post-round__winner');
  const buttonPlayAgain = document.querySelector('.button-play-again');
  const buttonChooseMode = document.querySelectorAll('.button-game-mode');
  const buttonChooseMark = document.querySelector('.dialog-pre-round > div > div');
  const buttonHome = document.querySelectorAll('.button-home');
  const xScore = document.querySelector('.x-score h3');
  const oScore = document.querySelector('.o-score h3');
  const tieScore = document.querySelector('.tie-score h3');
  const whosTurn = document.querySelector('.whos-turn');
  const main = document.querySelector('main');

  buttonChooseMark.addEventListener('click', gameModule.chooseMark);
  buttonChooseMode.forEach((button) => {
    button.addEventListener('click', (e) => {
      gameModule.toggleAI(e);
      gameModule.checkActivePlayerIsAI();
      removeGrids();
      showGrids();
      showWhosTurn();
      showScores();
      setTimeout(() => {
        dialogPreRound.close();
        dialogPostRound.close();
      }, 300)
    })
  })
  buttonHome.forEach((button) => {
    button.addEventListener('click', () => {
      gameModule.resetAll();
      setTimeout(() => {
        dialogPreRound.showModal();
      }, 300)
    })
  })
  buttonPlayAgain.addEventListener('click', () => {
    gameModule.checkActivePlayerIsAI();
    gameModule.resetGrids();
    removeGrids();
    showGrids();
    setTimeout(() => {
      dialogPostRound.close();
    }, 300)
  })
  main.addEventListener('click', (e) => {
    if (!gameModule.getActivePlayer().ai === true) {
      gameModule.placeMark(e);
    }

    removeGrids();
    showGrids();
    showWhosTurn();
    showScores();

    let winner = gameModule.getWinner();
    if (winner !== null) {
      showPostRound(winner);
    }
  })

  function showGrids() {
    let mark = gameModule.getActivePlayer().mark;
  
    gameModule.getGrids().forEach((grid, index) => {
      const div = document.createElement('div');
      div.setAttribute('data-index', `${index}`);

      if (grid === 1) {
        div.textContent = 'X'
        div.setAttribute('class', 'grid grid__x');
      } else if (grid === 2) {
        div.textContent = 'O'
        div.setAttribute('class', 'grid grid__o');
      } else {
        div.setAttribute('class', 'grid');
        if (mark === 'X') {
          div.setAttribute('class', 'grid grid--hover-x');
        } else if (mark === 'O') {
          div.setAttribute('class', 'grid grid--hover-o');
        }
      }

      main.appendChild(div);
    });
  }

  function removeGrids() {
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
  }

  function showWhosTurn() {
    whosTurn.textContent = `${gameModule.getActivePlayer().mark} TURN`;
  }

  function showScores() {
    let {x, o, tie} = gameModule.getScores();
    xScore.textContent = x;
    oScore.textContent = o;
    tieScore.textContent = tie;
  }

  function showPostRound(winner) {
    if (winner.name === 'Player 1') {
      dialogPostRoundHeader.textContent = 'GREAT JOB!';
    } else if (winner.name === 'Player 2' && winner.ai === true) {
      dialogPostRoundHeader.textContent = 'NICE TRY!';
    } else if (winner.name === 'Player 2' && winner.ai === false) {
      dialogPostRoundHeader.textContent = 'GREAT JOB!';
    } else {
      dialogPostRoundHeader.textContent = 'CLOSE MATCH!'
    }

    if (winner.mark === 'X') {
      dialogPostRoundHeader.setAttribute('class', 'dialog-post-round__header dialog-post-round__header--x');
      dialogPostRoundWinner.setAttribute('class', 'dialog-post-round__winner dialog-post-round__winner--x');
      dialogPostRoundWinner.textContent = 'X WINS THE ROUND';
      buttonPlayAgain.setAttribute('class', 'button-play-again button-play-again--x');
    } else if (winner.mark === 'O') {
      dialogPostRoundHeader.setAttribute('class', 'dialog-post-round__header dialog-post-round__header--o');
      dialogPostRoundWinner.setAttribute('class', 'dialog-post-round__winner dialog-post-round__winner--o');
      dialogPostRoundWinner.textContent = 'O WINS THE ROUND';
      buttonPlayAgain.setAttribute('class', 'button-play-again button-play-again--o');
    } else {
      dialogPostRoundHeader.setAttribute('class', 'dialog-post-round__header dialog-post-round__header--tie');
      dialogPostRoundWinner.setAttribute('class', 'dialog-post-round__winner dialog-post-round__winner--tie');
      dialogPostRoundWinner.textContent = 'IT\'S A TIE';
      buttonPlayAgain.setAttribute('class', 'button-play-again button-play-again--tie');
    }
    
    setTimeout(() => {dialogPostRound.showModal()}, 300);
  }

  dialogPreRound.showModal();
})();

// tie result is not getting passed