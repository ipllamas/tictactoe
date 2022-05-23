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

  //rows, columns, and diagonals will be 2D arrays
  const rows = [];
  const cols = [];
  const diagonals = [];
  for(let i=0; i<3; i++){
    rows[i] = [];
    cols[i] = [];
  }

  //diagonal[0] will be top left to bottom right, diagonal[1] is top right to bottom left
  diagonals[0] = [];
  diagonals[1] = [];


  //create blank tile objects and insert them into tilesArray and their corresponding rows/columns/diagonals
  for (let index = 0; index < 9; index++) {
    const newTile = tile(null, index);
    tilesArray.push(newTile);

    //insert into correct rows and columns
    const rowToInsert = Math.floor(index/3);
    const colToInsert = index%3;
    rows[rowToInsert].push(tilesArray[index]);
    cols[colToInsert].push(tilesArray[index]);

    //insert into correct diagonals;
    if (index === 4) {
      diagonals[0].push(tilesArray[index]);
      diagonals[1].push(tilesArray[index]);
    } else if (index === 0 || index === 8) {
      diagonals[0].push(tilesArray[index]);
    } else if (index === 2 || index === 6) {
      diagonals[1].push.apply(tilesArray[index]);
    }
  }

  const markTile = (e) => {
    const position = Number(e.target.getAttribute('id'));
    const currentPlayer = logicController.getCurrentPlayer();

    //checks if tile already has a mark, and prevents marking it if it does
    if(!tilesArray[position].mark) {
      if(currentPlayer === 1) {
        tilesArray[position].mark = 'x';
        e.target.textContent = 'x';
      } else {
        tilesArray[position].mark = 'o';
        e.target.textContent = 'o';
      }
      
      logicController.checkForWin(position);
      logicController.changeTurn();
    }
  }

  const getRows = () => {
    return rows;
  }

  const getCols = () => {
    return cols;
  }

  const getDiagonals = () => {
    return diagonals;
  }

  return {markTile, getRows, getCols, getDiagonals};
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
  let currentPlayer = 1;

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

  const checkForWin = (indexOfNewTile) => {
    const rowToCheck = gameboard.getRows()[Math.floor(indexOfNewTile/3)];
    const colToCheck = gameboard.getCols()[indexOfNewTile%3];
    /* const testRow = gameboard.getRows()[0];
    console.log(testRow[0].mark + testRow[1].mark + testRow[2].mark); */
    console.log("row win = "+rowToCheck.every(verifyThreeInARow));
    console.log('col win = '+colToCheck.every(verifyThreeInARow));
  }

  //Used with Array.every() to check for 3 in a row
  const verifyThreeInARow = (tile) => {
    if(getCurrentPlayer() === 1) {
      return tile.mark === 'x';
    } else {
      return tile.mark === 'o';
    }
  }

  return {initializeGame, changeTurn, getCurrentPlayer, checkForWin};
})();

logicController.initializeGame();
