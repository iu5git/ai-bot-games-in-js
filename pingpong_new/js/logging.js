const logText = document.getElementsByClassName("logging")[0];
const datasetSize = document.getElementsByClassName("datasetSize")[0];
let lastGoodMove = 1;
const header = "ball_x,ball_y,paddle_y,up,down,nothing";
let recordData = [header];

const updateDataset = () => {
    logText.innerHTML = [
        ball.x,
        ball.y,
        rightPaddle.y,
        keyPresses.up,
        keyPresses.down,
        keyPresses.nothing
    ];
    recordData.push(logText.innerHTML);
    datasetSize.textContent = recordData.length - 1;
}