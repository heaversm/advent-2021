import diagnosticArray from "./03-data.js";
const diagnosticsData = diagnosticArray();

const bitArrays = [];
let gamma = "";
let epsilon = "";
let gammaDecimal, epsilonDecimal;

function init() {
  createArrayOfArrays();
}

function createArrayOfArrays() {
  for (let i = 0; i < 12; i++) {
    bitArrays.push([]);
  }
  getBitArrays();
}

function getBitArrays() {
  diagnosticsData.forEach((diagnostic) => {
    for (let i = 0; i < diagnostic.length; i++) {
      bitArrays[i].push(parseInt(diagnostic[i]));
    }
  });
  //console.log(bitArrays[0].length, bitArrays[0][0], bitArrays.length);
  calculateBitsInArrays();
}

function calculateBitsInArrays() {
  bitArrays.forEach((bitArray, index) => {
    const bitMode = findMode(bitArray);
    gamma += bitMode;
    epsilon += bitMode === "1" ? "0" : "1";
  });
  gammaDecimal = parseInt(gamma, 2);
  epsilonDecimal = parseInt(epsilon, 2);
  const answer = gammaDecimal * epsilonDecimal;
  console.log(answer, gammaDecimal, epsilonDecimal);
}

function findMode(numbers) {
  let counted = numbers.reduce((acc, curr) => {
    if (curr in acc) {
      acc[curr]++;
    } else {
      acc[curr] = 1;
    }

    return acc;
  }, {});

  let mode = Object.keys(counted).reduce((a, b) =>
    counted[a] > counted[b] ? a : b
  );

  return mode;
}

init();
