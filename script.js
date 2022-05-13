const tile = (mark, position) => {
 return {mark, position};
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
    console.log(e.target);
    const position = e.target.getAttribute('id');
    tilesArray[position].mark = 'x';
    e.target.textContent = tilesArray[position].mark;
    /* tilesArray[position].mark = mark; */
  }

  return {tilesArray, markTile};
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

displayController.createNewBoard();