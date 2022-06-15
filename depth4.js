import { bingoDrawOrder, bingoBoards } from "./bingoData.js";
const BOARD_COLS = 5;
const BOARD_ROWS = 5;

let foundCount = 0;
let winningBoard = false;

const bingoMatches = new Array(bingoBoards.length).fill(new Array(25));

function init() {
  markMatches();
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
  if (rowArray.indexOf(undefined) === -1) {
    console.log("rowArray", rowArray, matchRow);
    return true;
  }
  const matchCol = getMatchCol(foundIndex);
  const colArray = getColArray(matchCol, bingoMatches[boardIndex]);
  if (colArray.indexOf(undefined) === -1) {
    console.log("colArray", colArray, matchCol);

    return true;
  }
  //console.log(rowArray, matchRow, colArray, matchCol);
  return false;
}

function markMatches() {
  for (let i = 0; i < bingoDrawOrder.length; i++) {
    const bingoNumber = bingoDrawOrder[i];
    for (let boardIndex = 0; boardIndex < bingoBoards.length; boardIndex++) {
      const bingoBoard = bingoBoards[boardIndex];
      const foundIndex = bingoBoard.indexOf(bingoNumber);
      if (foundIndex !== -1) {
        //console.log("match found", foundIndex, boardIndex);
        bingoMatches[boardIndex][foundIndex] = "x";
        winningBoard = checkForWin(boardIndex, foundIndex);

        //if winning board, we have all we need to generate the answer
        //need to identify the board in question
        //need to find sum of all unmarked numbers on that board
        //need to multiply that sum by "bingoNumber" to get answer
        if (winningBoard) {
          const winningBoardArray = bingoBoards[boardIndex];
          const winningMatchArray = bingoMatches[boardIndex];
          console.log("winner!");
          console.log("Board and Winning Number: ", boardIndex, bingoNumber);
          console.log("winning board: ", winningBoardArray, boardIndex);
          console.log("array of matches: ", winningMatchArray);
          const unMarkedNumberArray = [];
          winningMatchArray.forEach((boardVal, matchIndex) => {
            const unmarkedNumber = winningBoardArray[matchIndex];
            if (unmarkedNumber) {
              unMarkedNumberArray.push(unmarkedNumber);
            }
          });
          console.log("unmarked numbers", unMarkedNumberArray);
          const unmarkedNumberSum = unMarkedNumberArray.reduce(
            (prev, current) => prev + current
          );
          console.log("unmarked number sum", unmarkedNumberSum);
          console.log("bingo number", bingoNumber);
          const bingoAnswer = unmarkedNumberSum * bingoNumber;
          console.log("answer", bingoAnswer);
        }
        foundCount++;
      }
      if (winningBoard) {
        break;
      }
    }
    if (winningBoard) {
      break;
    }
  }
}

init();
