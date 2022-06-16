import diagnosticArray from "./03-data.js";
const diagnosticsData = diagnosticArray();

let bitMode;
let bitIndex = 0;
const bitLength = 12;

let filteredData;

let oxygenRating, co2Rating;
let oxyDec, co2Dec;

let isOxygen = true;

function init() {
  filteredData = [...diagnosticsData];
  calculateModeAtIndex();
}

function calculateModeAtIndex() {
  const bitArray = [];

  filteredData.forEach((diagnostic) => {
    bitArray.push(parseInt(diagnostic[bitIndex]));
  });
  bitMode = findMode(bitArray);
  //console.log("bitMode", bitMode);
  //console.log("bitIndex", bitIndex);

  filterDiagnosticsData();
}

function filterDiagnosticsData() {
  filteredData = filteredData.filter((diagnostic, index) => {
    return diagnostic[bitIndex] === bitMode;
  });

  //console.log("data length", filteredData.length);

  if (filteredData.length === 1) {
    if (isOxygen) {
      oxygenRating = filteredData[0];
      console.log("have o2", oxygenRating);
      isOxygen = false;
      filteredData = [...diagnosticsData];
      bitIndex = 0;
      calculateModeAtIndex();
      return;
    } else {
      co2Rating = filteredData[0];
      console.log("have c02", co2Rating);
      oxyDec = parseInt(oxygenRating, 2);
      co2Dec = parseInt(co2Rating, 2);
      const answer = oxyDec * co2Dec;
      console.log("final", answer, oxyDec, co2Dec);
      return;
    }
  }

  if (filteredData.length > 1 && bitIndex < bitLength - 1) {
    bitIndex++;
    calculateModeAtIndex();
  } else {
    console.log("finished", filteredData);
  }
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

  let mode = Object.keys(counted).reduce((a, b) => {
    if (counted[a] === counted[b]) {
      return b;
    }
    return counted[a] > counted[b] ? a : b;
  });

  if (!isOxygen) {
    if (mode === "1") {
      mode = "0";
    } else {
      mode = "1";
    }
  }

  //console.log("mode", mode);

  return mode;
}

init();
