import { ventData } from "./05-data.js";

const parsedVentData = [];
const ventDiagram = {};

let minX = 0,
  minY = 0,
  maxX = 0,
  maxY = 0;

function init() {
  parseData();
}

function parseData() {
  for (let i = 0; i < ventData.length; i++) {
    const ventDataItem = ventData[i];
    const ventDataPairs = ventDataItem.split(" -> ");

    const ventDataObj = {
      start: ventDataPairs[0].split(",").map((d) => {
        return parseInt(d);
      }),
      end: ventDataPairs[1].split(",").map((d) => {
        return parseInt(d);
      }),
      direction: null,
    };

    ventDataObj.direction = determineDirection(ventDataObj);
    if (ventDataObj.direction === null) {
      continue;
    } else {
      evaluateExtents(ventDataObj);
      parsedVentData.push(ventDataObj);
    }
  }
  drawVentDiagram();
}

function evaluateExtents(ventDataObj) {
  const localMinX = Math.min(ventDataObj.start[0], ventDataObj.end[0]);
  const localMaxX = Math.max(ventDataObj.start[0], ventDataObj.end[0]);
  const localMinY = Math.min(ventDataObj.start[1], ventDataObj.end[1]);
  const localMaxY = Math.max(ventDataObj.start[1], ventDataObj.end[1]);
  if (localMinX < minX) {
    minX = localMinX;
  }
  if (localMinY < minY) {
    minY = localMinY;
  }
  if (localMaxX > maxX) {
    maxX = localMaxX;
  }
  if (localMaxY > maxY) {
    maxY = localMaxY;
  }
}

function determineDirection(ventDataObj) {
  if (ventDataObj.start[0] === ventDataObj.end[0]) {
    return "vertical";
  } else if (ventDataObj.start[1] === ventDataObj.end[1]) {
    return "horizontal";
  } else {
    return "diagonal";
  }
}

function drawVentDiagram() {
  for (let i = 0; i < parsedVentData.length; i++) {
    const thisVentData = parsedVentData[i];
    const startX = thisVentData.start[0];
    const startY = thisVentData.start[1];
    const endX = thisVentData.end[0];
    const endY = thisVentData.end[1];

    //console.log(loopX,loopY);
    const isHorizontal = thisVentData.direction === "horizontal";
    const isVertical = thisVentData.direction === "vertical";
    const isDiagonal = !isHorizontal && !isVertical;

    if (isVertical) {
      const minY = Math.min(startY, endY);
      const maxY = Math.max(startY, endY);
      for (let y = minY; y <= maxY; y++) {
        addPointToDiagram(startX, y);
      }
    }

    if (isHorizontal) {
      const minX = Math.min(startX, endX);
      const maxX = Math.max(startX, endX);
      for (let x = minX; x <= maxX; x++) {
        addPointToDiagram(x, startY);
      }
    }

    if (isDiagonal) {
      const distanceX = range(startX, endX);
      const distanceY = range(startY, endY);
      distanceX.forEach((x, index) => {
        const y = distanceY[index];
        addPointToDiagram(x, y);
      });
    }
  }

  const numIntersections = countNumIntersections(ventDiagram);
  console.log(numIntersections);
}

const range = (startVal, endVal) => {
  const numPoints = Math.abs(startVal - endVal) + 1;
  const pointsArray = new Array(numPoints);
  for (let i = 0; i < pointsArray.length; i++) {
    if (startVal < endVal) {
      pointsArray[i] = startVal + i;
    } else {
      pointsArray[i] = startVal - i;
    }
  }
  return pointsArray;
};

const addPointToDiagram = (x, y) => {
  const key = `x${x}y${y}`;
  if (ventDiagram[key]) {
    ventDiagram[key]++;
  } else {
    ventDiagram[key] = 1;
  }
};

function countNumIntersections(ventDiagram) {
  const ventKeys = Object.keys(ventDiagram);
  return ventKeys.reduce((total, point) => {
    if (ventDiagram[point] > 1) {
      return total + 1;
    }
    return total;
  }, 0);
}

init();
