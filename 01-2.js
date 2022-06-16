import depthArray from "./01-data.js";
const depths = depthArray();
let curDepthIndex = 0;
const numDepths = depths.length;
console.log(numDepths);
let curDepthSum;
let depthIncreaseCount = 0;

for (let i = 0; i < numDepths - 2; i++) {
  const depthSum = depths[i] + depths[i + 1] + depths[i + 2];
  console.log(curDepthSum, depthSum, depthIncreaseCount);
  if (curDepthSum && depthSum > curDepthSum) {
    depthIncreaseCount++;
  }
  curDepthSum = depthSum;
}
