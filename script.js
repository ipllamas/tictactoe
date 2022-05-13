const tile = (mark, position) => {
 return {mark, position};
}

const player = (number) => {
  return {number};
}

const gameboard = (() => {
  /*array of tiles on the gameboard will be referred to numerically like so:
  [0][1][2]
  [3][4][5]
  [6][7][8] */

  const tilesArray = [];
  for (let index = 0; index < 9; index++) {
    const newTile = tile(null, index);
    tilesArray.push(newTile);
  }

  const markTile = (e) => {
    const position = e.target.getAttribute('id');
    const currentPlayer = logicController.getCurrentPlayer();

    if(currentPlayer === 1) {
      tilesArray[position].mark = 'x';
      e.target.textContent = 'x';
    } else {
      tilesArray[position].mark = 'o';
      e.target.textContent = 'o';
    }

    logicController.changeTurn();
  }

  return {markTile};
})();

const displayController = (() => {
  const createNewBoard = () => {
    const board = document.querySelector('#gameboard');
    for(let index = 0; index < 9; index++) {
      const tileButton = document.createElement('button')
      tileButton.setAttribute('type','button');
      tileButton.setAttribute('id', index);
      tileButton.classList.add('tile');

      tileButton.addEventListener('click', gameboard.markTile);

      board.appendChild(tileButton);
    }
  }

  return {createNewBoard};
})();

const logicController = (() => {
  const playerOne = player(1);
  const playerTwo = player(2);
  let currentPlayer;

  const initializeGame = () => {
    displayController.createNewBoard();
    currentPlayer = 1;
  }

  const changeTurn = () => {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
  }

  const getCurrentPlayer = () => {
    return currentPlayer;
  }

  return {initializeGame, changeTurn, getCurrentPlayer};
})();

logicController.initializeGame();
console.log(logicController.currentPlayer);