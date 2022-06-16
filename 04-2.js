import { bingoDrawOrder, bingoBoards } from "./04-data.js";
const BOARD_COLS = 5;
const BOARD_ROWS = 5;

let lastBoard = false;

const bingoMatches = [];

const winningBoardsArr = []; //keeps track of the index of the boards that have won so we can skip marking them

function init() {
  buildMatchBoard();
  markMatches();
}

function buildMatchBoard() {
  for (let i = 0; i < bingoBoards.length; i++) {
    bingoMatches.push([]);
    for (let j = 0; j < BOARD_COLS * BOARD_ROWS; j++) {
      bingoMatches[i].push(null);
    }
  }
}

function getMatchRow(foundIndex) {
  return Math.floor(foundIndex / 5);
}

function getMatchCol(foundIndex) {
  return foundIndex % 5;
}

function getRowArray(row, matchBoard) {
  //return an array of all items in match row
  const startIndex = row * BOARD_ROWS;
  const endIndex = startIndex + BOARD_COLS;
  const rowArray = [];
  for (let i = startIndex; i < endIndex; i++) {
    rowArray.push(matchBoard[i]);
  }
  return rowArray;
}

function getColArray(col, matchBoard) {
  //return an array of all items in match col
  const colArray = [];
  const colIndices = [];
  for (let i = 0; i < 5; i++) {
    colIndices.push(col + BOARD_COLS * i);
  }

  colIndices.forEach((colIndex) => {
    colArray.push(matchBoard[colIndex]);
  });
  return colArray;
}

function checkForWin(boardIndex, foundIndex) {
  //find row and col in board where particular found match occured
  //check all 5 values in row by proximity to index and exit if no match
  //check all 5 values in col by proximity to index and exit if no match
  //otherwise, we have a winner!

  const matchRow = getMatchRow(foundIndex);
  const rowArray = getRowArray(matchRow, bingoMatches[boardIndex]);
  if (rowArray.indexOf(null) === -1) {
    //there are no null values in this row, we have a winner
    return true;
  }
  const matchCol = getMatchCol(foundIndex);
  const colArray = getColArray(matchCol, bingoMatches[boardIndex]);
  if (colArray.indexOf(null) === -1) {
    //there are no null values in this col, we have a winner
    return true;
  }
  return false;
}

function markMatches() {
  for (let i = 0; i < bingoDrawOrder.length; i++) {
    const bingoNumber = bingoDrawOrder[i];
    for (let boardIndex = 0; boardIndex < bingoBoards.length; boardIndex++) {
      if (winningBoardsArr.indexOf(boardIndex) !== -1) {
        //if this board has already been marked as a winner, skip everything else
        continue;
      }
      const bingoBoard = bingoBoards[boardIndex];
      const foundIndex = bingoBoard.indexOf(bingoNumber);
      if (foundIndex !== -1) {
        const bingoMatchBoard = bingoMatches[boardIndex];
        bingoMatchBoard[foundIndex] = "x";
        const winningBoard = checkForWin(boardIndex, foundIndex);

        //if winning board, we have all we need to generate the answer
        //need to identify the board in question
        //need to find sum of all unmarked numbers on that board
        //need to multiply that sum by "bingoNumber" to get answer

        if (winningBoard) {
          //if there are still boards, we should remove this board from bingoBoards and bingoMatches arrays
          //and continue until there's only one board left.
          winningBoardsArr.push(boardIndex);
          console.log(winningBoardsArr);

          if (winningBoardsArr.length < bingoBoards.length) {
            //still have to find the last board to win, skip the rest
            continue;
          }
          //otherwise, calculate the score
          lastBoard = true;
          const winningBoardArray = bingoBoards[boardIndex];
          const winningMatchArray = bingoMatches[boardIndex];

          //construct an array of unmarked numbers
          const unMarkedNumberArray = [];
          for (let j = 0; j < BOARD_COLS * BOARD_ROWS; j++) {
            const matchCheck = winningMatchArray[j];
            if (!matchCheck) {
              const unmarkedNumber = winningBoardArray[j];
              unMarkedNumberArray.push(unmarkedNumber);
            }
          }

          const unmarkedNumberSum = unMarkedNumberArray.reduce(
            (prev, current) => prev + current
          );
          // console.log("unmarked number sum", unmarkedNumberSum);
          // console.log("bingo number", bingoNumber);
          const bingoAnswer = unmarkedNumberSum * bingoNumber;
          console.log("answer", bingoAnswer);
        }
      }
      if (lastBoard) {
        break;
      }
    }
    if (lastBoard) {
      break;
    }
  }
}

init();
