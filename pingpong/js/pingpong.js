// Обращаемся к игровому полю из документа
const logText = document.getElementsByClassName("logging")[0];
const datasetSize = document.getElementsByClassName("datasetSize")[0];
const botImages = Array.from(
  document.getElementsByClassName("upload")[0].getElementsByTagName("img")
);
let lastGoodMove = 1;
let scoreStats = { currentCombo: 0, bestCombo: 0, totalTries: 0, mean: 0 };
// logText.style.color = "white";
// logText.style.position = "fixed";
// logText.style.left = "100px";
// logText.style.top = "100px";
const keyPresses = { up: 0, down: 0, nothing: 1 };
const header = "ball_x,ball_y,paddle_y,up,down,nothing";
let recordData = [header];
// Обращаемся к игровому полю из документа
const canvas = document.getElementById("game");
// Делаем поле двухмерным
const context = canvas.getContext("2d");
// Размер игровой клетки
const grid = 15;
// Высота платформы
const paddleHeight = grid * 5; // 80
// Задаём максимальное расстояние, на которое могут двигаться платформы
const LeftmaxPaddleY = canvas.height - grid - paddleHeight * 2;
const RightmaxPaddleY = canvas.height - grid - paddleHeight;
// Скорость платформы
var paddleSpeed = 6;
// Скорость мяча
var ballSpeed = 4;
// Описываем левую платформу
const leftPaddle = {
  // Ставим её по центру
  x: grid * 2,
  y: 0,
  // Ширина — одна клетка
  width: grid,
  // Высоту берём из константы
  height: canvas.height, //paddleHeight * 2,
  // Платформа на старте никуда не движется
  dy: 0
};
leftPaddle.dy = 0; //paddleSpeed;
// Описываем правую платформу
const rightPaddle = {
  // Ставим по центру с правой стороны
  x: canvas.width - grid * 3,
  y: canvas.height / 2 - paddleHeight / 2,
  // Задаём такую же ширину и высоту
  width: grid,
  height: paddleHeight,
  // Правая платформа тоже пока никуда не двигается
  dy: 0
};
// Описываем мячик
const ball = {
  // Он появляется в самом центре поля
  x: canvas.width / 2,
  y: canvas.height / 2,
  // квадратный, размером с клетку
  width: grid,
  height: grid,
  // На старте мяч пока не забит, поэтому убираем признак того, что мяч нужно ввести в игру заново
  resetting: false,
  // Подаём мяч в правый верхний угол
  dx: ballSpeed,
  dy: -ballSpeed
};

const updateSpeed = (x) => {
  const scale_factor = 0.5 + (1.25 * x) / (100 + x);
  ball.dx = Math.floor(ballSpeed * scale_factor) * (ball.dx > 0 ? 1 : -1);
  ball.dy = Math.floor(ballSpeed * scale_factor) * (ball.dy > 0 ? 1 : -1);
};
updateSpeed(0);

// вызывается при проигрыше
const updateStatus = (gameover = false, reset = false) => {
  const scoreElements = Array.from(
    document.getElementsByClassName("score")[0].getElementsByTagName("a")
  );
  if (!gameover) {
    scoreStats.currentCombo++;
    scoreStats.bestCombo = Math.max(
      scoreStats.currentCombo,
      scoreStats.bestCombo
    );
  } else {
    scoreStats.totalTries++;
    scoreStats.mean =
      Math.floor(
        (scoreStats.mean +
          (scoreStats.currentCombo - scoreStats.mean) / scoreStats.totalTries) *
          100
      ) / 100;
    scoreStats.currentCombo = 0;
  }
  if (reset) {
    scoreStats.totalTries = 0;
    scoreStats.currentCombo = 0;
    scoreStats.bestCombo = 0;
    scoreStats.mean = 0;
  }
  // Current
  scoreElements[0].textContent = scoreStats.currentCombo;
  // Best
  scoreElements[1].textContent = scoreStats.bestCombo;
  // Average
  scoreElements[2].textContent = scoreStats.mean;
};
// Проверка на то, пересекаются два объекта с известными координатами или нет
// Подробнее тут: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
const collides = (obj1, obj2) => {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
};

// Главный цикл игры
const loop = () => {
  // Очищаем игровое поле
  //requestAnimationFrame(loop);
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

  context.clearRect(0, 0, canvas.width, canvas.height);
  // Если платформы на предыдущем шаге куда-то двигались — пусть продолжают двигаться
  //leftPaddle.y += leftPaddle.dy;
  rightPaddle.y += rightPaddle.dy;
  // Если левая платформа пытается вылезти за игровое поле вниз,
  if (leftPaddle.y < grid) {
    // то оставляем её на месте
    leftPaddle.y = grid;
    leftPaddle.dy = paddleSpeed;
  }
  // Проверяем то же самое сверху
  else if (leftPaddle.y > LeftmaxPaddleY) {
    leftPaddle.y = LeftmaxPaddleY;
    leftPaddle.dy = -paddleSpeed;
  }
  // Если правая платформа пытается вылезти за игровое поле вниз,
  if (rightPaddle.y < grid) {
    // то оставляем её на месте
    rightPaddle.y = grid;
  }
  // Проверяем то же самое сверху
  else if (rightPaddle.y > RightmaxPaddleY) {
    rightPaddle.y = RightmaxPaddleY;
  }

  // Рисуем платформы белым цветом
  context.fillStyle = "white";
  // Каждая платформа — прямоугольник
  context.fillRect(
    leftPaddle.x,
    leftPaddle.y,
    leftPaddle.width,
    leftPaddle.height
  );
  context.fillRect(
    rightPaddle.x,
    rightPaddle.y,
    rightPaddle.width,
    rightPaddle.height
  );
  // Если мяч на предыдущем шаге куда-то двигался — пусть продолжает двигаться
  ball.x += ball.dx;
  ball.y += ball.dy;
  // Если мяч касается стены снизу — меняем направление по оси У на противоположное
  if (ball.y < grid) {
    ball.y = grid;
    ball.dy *= -1;
  }
  // Делаем то же самое, если мяч касается стены сверху
  else if (ball.y + grid > canvas.height - grid) {
    ball.y = canvas.height - grid * 2;
    ball.dy *= -1;
  }
  // Если мяч улетел за игровое поле влево или вправо — перезапускаем его
  if ((ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
    // Помечаем, что мяч перезапущен, чтобы не зациклиться
    ball.resetting = true;
    // Даём секунду на подготовку игрокам
    setTimeout(() => {
      // Всё, мяч в игре
      ball.resetting = false;
      // Снова запускаем его из центра
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      rightPaddle.x = canvas.width - grid * 3;
      rightPaddle.y = canvas.height / 2 - paddleHeight / 2;
      // Вырезаем плохой фрагмент из датасета
      recordData = recordData.slice(0, lastGoodMove);
      updateStatus(true);
    }, 1000);
  }
  // Если мяч коснулся левой платформы,
  if (collides(ball, leftPaddle)) {
    // то отправляем его в обратном направлении
    ball.dx *= -1;
    // Увеличиваем координаты мяча на ширину платформы, чтобы не засчитался новый отскок
    ball.x = leftPaddle.x + leftPaddle.width;
  }
  // Проверяем и делаем то же самое для правой платформы
  else if (collides(ball, rightPaddle)) {
    ball.dx *= -1;
    ball.x = rightPaddle.x - ball.width;
    lastGoodMove = recordData.length;
    updateSpeed(lastGoodMove);
    updateStatus(false);
  }

  // Рисуем мяч
  context.fillRect(ball.x, ball.y, ball.width, ball.height);
  // Рисуем стены
  context.fillStyle = "lightgrey";
  context.fillRect(0, 0, canvas.width, grid);
  context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);
  // Рисуем сетку посередине
  for (let i = grid; i < canvas.height - grid; i += grid * 2) {
    context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
  }
};
// Запускаем игру
//requestAnimationFrame(loop);

var isPaused = false;
// https://stackoverflow.com/questions/16554094/canvas-requestanimationframe-pause
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function Start() {
  if (!isPaused) {
    loop();
  }
  requestAnimFrame(Start);
}

// window.onkeydown = function () {
//   isPaused = !isPaused; // flips the pause state
// };

Start();
loop();

// Отслеживаем нажатия клавиш
document.addEventListener("keydown", function (e) {
  // Если нажата клавиша вверх,
  if (e.which === 27) {
    // pause game on ESC
    //e.preventDefault();
    isPaused = !isPaused;
    context.fillStyle = "rgba(255, 255, 255, 0.5)";
    context.fillRect(
      canvas.width / 2 - canvas.width / 7,
      canvas.height / 3,
      canvas.width / 10,
      canvas.height / 3
    );
    context.fillRect(
      canvas.width / 2 + canvas.width / 24,
      canvas.height / 3,
      canvas.width / 10,
      canvas.height / 3
    );
    //if (use_bot.state) use_bot.busy = !use_bot.busy;
  } else if (e.which === 38) {
    // то двигаем правую платформу вверх
    rightPaddle.dy = -paddleSpeed;
    keyPresses["up"] = 1;
    keyPresses["down"] = 0;
    keyPresses["nothing"] = 0;
  }
  // Если нажата клавиша вниз,
  else if (e.which === 40) {
    // то двигаем правую платформу вниз
    rightPaddle.dy = paddleSpeed;
    keyPresses["up"] = 0;
    keyPresses["down"] = 1;
    keyPresses["nothing"] = 0;
  }
  // Если нажата клавиша W,
  if (e.which === 87) {
    // то двигаем левую платформу вверх
    leftPaddle.dy = -paddleSpeed;
  }
  // Если нажата клавиша S,
  else if (e.which === 83) {
    // то двигаем левую платформу вниз
    leftPaddle.dy = paddleSpeed;
  }
});
// А теперь следим за тем, когда кто-то отпустит клавишу, чтобы остановить движение платформы
document.addEventListener("keyup", function (e) {
  // Если это стрелка вверх или вниз,
  if (e.which === 38 || e.which === 40) {
    // останавливаем правую платформу
    rightPaddle.dy = 0;
    keyPresses["up"] = 0;
    keyPresses["down"] = 0;
    keyPresses["nothing"] = 1;
  }
  // А если это W или S,
  if (e.which === 83 || e.which === 87) {
    // останавливаем левую платформу
    leftPaddle.dy = 0;
  }
  // console.log(recordData.length);
});

// https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
let textFile = null;
const makeTextFile = function (text) {
  var data = new Blob([text], { type: "text/plain" });

  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data);

  return textFile;
};

const downloadBtn = document.getElementsByClassName("download")[0];
const deleteBtn = document.getElementsByClassName("delete")[0];

downloadBtn.addEventListener(
  "click",
  function () {
    var link = downloadBtn.getElementsByTagName("a")[0];
    link.href = makeTextFile(recordData.join("\r\n"));
    link.style.display = "block";
    link.click();
  },
  false
);

deleteBtn.addEventListener(
  "click",
  function () {
    recordData.length = 0;
    lastGoodMove = 1;
    recordData[0] = header;
    datasetSize.innerHTML = recordData.length;
    updateSpeed(0);
    updateStatus(false, true);
  },
  false
);

var onnxSess;
var use_bot = { state: false, busy: false, intervalId: 0 };
// var busy = false;
// var breakLoop = false;

const indexOfMax = (arr) => {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }
  return maxIndex;
};

const runONNX = async () => {
  use_bot.busy = true;
  console.time("onnx");
  var inp = Float32Array.from([
    ball.x / 705,
    ball.y / 705,
    rightPaddle.y / 705
  ]);
  let input = new onnx.Tensor(inp, "float32", [1, 3]);
  let output = (await onnxSess.run([input])).get("output").data;
  const actionId = indexOfMax(output);
  if (actionId === 2) {
    // up
    keyPresses["up"] = 1;
    keyPresses["down"] = 0;
    keyPresses["nothing"] = 0;
    rightPaddle.dy = -paddleSpeed;
  } else if (actionId === 1) {
    // down
    keyPresses["up"] = 0;
    keyPresses["down"] = 1;
    keyPresses["nothing"] = 0;
    rightPaddle.dy = paddleSpeed;
  } else {
    //nothing
    keyPresses["up"] = 0;
    keyPresses["down"] = 0;
    keyPresses["nothing"] = 1;
    rightPaddle.dy = 0;
  }
  console.timeEnd("onnx");
  use_bot.busy = false;
  return output;
};

// https://stackoverflow.com/questions/52184291/async-await-with-setinterval
async function waitUntil(condition, func) {
  let frame = 0;
  return await new Promise((resolve) => {
    condition.intervalId = setInterval(() => {
      if (!condition.state) {
        resolve("a");
      } else {
        if (!condition.busy && !isPaused) {
          func();
          if (frame === 0) {
            botImages[0].style.display = "block";
            botImages[1].style.display = "none";
            const tmp = botImages[0];
            botImages[0] = botImages[1];
            botImages[1] = tmp;
          }
          frame = (frame + 1) % 10;
        }
      }
    }, 50);
  });
}

document.getElementsByClassName("modelFile")[0].onchange = async function (
  event
) {
  var fileList = this.files;
  use_bot.state = false;
  if (use_bot.intervalId) {
    clearInterval(use_bot.intervalId);
  }
  if (!fileList.length) {
    return;
  }

  // breakLoop = true;
  let file = fileList[0];
  let reader = new FileReader();
  reader.onloadend = async function () {
    onnxSess = new onnx.InferenceSession();
    await onnxSess.loadModel(reader.result);
    use_bot.state = true;
    //use_bot.busy = false;
    waitUntil(use_bot, runONNX);
    // breakLoop = false;
    // for (let i = 0; i < 1; i++) {
    //   if (!use_bot.busy) runONNX();
    //   await new Promise((r) => setTimeout(r, 50));
    //   if (breakLoop) break;
    // }
  };
  reader.readAsDataURL(file);
  console.log(fileList[0]);
};
