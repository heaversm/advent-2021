import depthArray from "./depthArray.js";
const depths = depthArray();
let curDepth = depths[0],
  depthIncreaseCount = 0;

depths.forEach((depth) => {
  if (depth > curDepth) {
    //console.log(curDepth, depth, depthIncreaseCount);
    depthIncreaseCount++;
  }
  curDepth = depth;
});

console.log(depthIncreaseCount);
