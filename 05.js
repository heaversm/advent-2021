import { ventData } from "./05-data.js";

const parsedVentData = [];
const ventDiagram = {};

let minX = 0,minY = 0,maxX = 0,maxY = 0;

function init() {
  parseData();
}

function parseData(){
 
  for (let i=0;i<ventData.length;i++){
    const ventDataItem = ventData[i];
    const ventDataPairs = ventDataItem.split(' -> ');

    const ventDataObj = {
      start: ventDataPairs[0].split(',').map( d => { return parseInt(d) }),
      end: ventDataPairs[1].split(',').map( d => { return parseInt(d) }),
      direction: null,
    }

    ventDataObj.direction = determineDirection(ventDataObj);
    if (ventDataObj.direction === -1){
      continue;
    } else {
      evaluateExtents(ventDataObj);
      parsedVentData.push(ventDataObj)
    }
  }
  drawVentDiagram();
}

function evaluateExtents(ventDataObj){
  const localMinX = Math.min(ventDataObj.start[0],ventDataObj.end[0]);
  const localMaxX = Math.max(ventDataObj.start[0],ventDataObj.end[0]);
  const localMinY = Math.min(ventDataObj.start[1],ventDataObj.end[1]);
  const localMaxY = Math.max(ventDataObj.start[1],ventDataObj.end[1]);
  if (localMinX < minX){
    minX = localMinX
  }
  if (localMinY < minY){
    minY = localMinY
  }
  if (localMaxX > maxX){
    maxX = localMaxX
  }
  if (localMaxY > maxY){
    maxY = localMaxY
  }
}

function determineDirection(ventDataObj){
  
  if (ventDataObj.start[0] === ventDataObj.end[0]){
    return 1
  }
  else if (ventDataObj.start[1] === ventDataObj.end[1]){
    return 0
  }
  return -1
}

function drawVentDiagram(){

  for (let i=0;i<parsedVentData.length;i++){
    const thisVentData = parsedVentData[i];
    const startX = thisVentData.start[0];
    const startY = thisVentData.start[1];
    const endX = thisVentData.end[0];
    const endY = thisVentData.end[1];
    let loopX = Math.min(startX,endX);
    let loopY = Math.min(startY,endY);
    //console.log(loopX,loopY);
    const isHorizontal = thisVentData.direction === 0;
    const dif = isHorizontal ? Math.abs(endX - startX) : Math.abs(endY-startY);
    for (let j = 0; j<dif;j++){

      let thisKey = `x${loopX}y${loopY}`;
    
      if (ventDiagram[thisKey]){
        ventDiagram[thisKey]++;
       
      } else {
        ventDiagram[thisKey] = 1;
      }
      if (isHorizontal){
        loopX++;
      } else {
        loopY++;
      }
    }
  }

  const numIntersections = countNumIntersections(ventDiagram);
  console.log(numIntersections);


}

function countNumIntersections(ventDiagram){
  const ventKeys = Object.keys(ventDiagram)
  return ventKeys.reduce((total, point) => {
    if (ventDiagram[point] > 1) {
      return total + 1
    }
    return total
  }, 0)
} 




init();
