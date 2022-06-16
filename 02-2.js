let input = document.querySelector("input");
let textarea = document.querySelector("textarea");
const courseArray = [];
let depth = 0,
  position = 0,
  depthAim = 0;

input.addEventListener("change", () => {
  let files = input.files;

  if (files.length == 0) return;

  const file = files[0];

  let reader = new FileReader();

  reader.onload = (e) => {
    const file = e.target.result;

    const lines = file.split(/\r\n|\n/);
    //console.log(lines);
    lines.forEach((line) => {
      const lineArr = line.split(" ");
      const lineObj = {
        direction: lineArr[0],
        amt: parseInt(lineArr[1]),
      };
      //console.log(lineObj);
      courseArray.push(lineObj);
    });
    textarea.value = lines.join("\n");
    chartCourse();
  };

  reader.onerror = (e) => alert(e.target.error.name);

  reader.readAsText(file);
});

function chartCourse() {
  for (let i = 0; i < courseArray.length; i++) {
    const curMovement = courseArray[i];
    const { direction, amt } = curMovement;
    switch (direction) {
      case "forward":
        position += amt;
        depthAim += amt * depth;
        break;
      case "up":
        depth -= amt;
        break;
      case "down":
        depth += amt;
        break;
      default:
        console.log("unhandled direction value", direction);
        break;
    }
  }
  console.log(depthAim * position); //answer
  //on to https://adventofcode.com/2021/day/2#part2
}
