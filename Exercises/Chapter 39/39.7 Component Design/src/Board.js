import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 7, ncols = 7, chanceLightStartsOn = .25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let newRow = [];
      for (let j = 0; j < ncols; j++) {
        newRow.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(newRow);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [x, y] = coord.split("-").map(Number);

      const flipCell = (x, y, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      let newBoard = [...oldBoard];

      flipCell(x, y, newBoard);
      flipCell(x + 1, y, newBoard);
      flipCell(x - 1, y, newBoard);
      flipCell(x, y + 1, newBoard);
      flipCell(x, y - 1, newBoard);

      return newBoard;
    });
  }

  if (hasWon()) return <h1>YOU WIN!</h1>;

  return <table>
    <tbody>
      {board.map((row, yCoord) =>
        <tr key={`${yCoord}`}>
          {row.map((cell, xCoord) =>
            <Cell key={`${xCoord}-${yCoord}`} isLit={cell} flipCellsAroundMe={() => flipCellsAround(`${xCoord}-${yCoord}`)} />)}
        </tr>)}
    </tbody>
  </table>;
}

export default Board;
