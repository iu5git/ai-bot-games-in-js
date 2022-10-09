// Обращаемся к игровому полю из документа
const canvas = document.getElementById("game");

// Обращаемся к изображению ракетки из документа
const paddleImg = document.getElementById("paddle");

// Обращаемся к изображению мячика из документа
const ballImg = document.getElementById("ball");

// Обращаемся к изображению фона из документа
const backgroundImg = document.getElementById("background");

// Делаем поле двухмерным
const context = canvas.getContext("2d");

// Размер игровой клетки
const grid = 15;

// Высота платформы
const paddleHeight = grid * 5; // 80

// Задаём максимальное расстояние, на которое могут двигаться платформы
const LeftmaxPaddleY = canvas.height - grid - paddleHeight * 2;
const RightmaxPaddleY = canvas.height - grid - paddleHeight;

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
    dy: 0,
    paddleSpeed: 10
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
    dy: 0,
    paddleSpeed: 10
};
var ballSpeed = 5;
// Описываем мячик
const ball = {
    // Он появляется в самом центре поля
    x: canvas.width / 2,
    y: canvas.height / 2,
    // квадратный, размером с клетку
    width: grid * 2,
    height: grid * 2,
    // На старте мяч пока не забит, поэтому убираем признак того, что мяч нужно ввести в игру заново
    resetting: false,
    // Подаём мяч в правый верхний угол
    dx: ballSpeed,
    dy: -ballSpeed
};

// Отключаем видимость элементов
paddleImg.style.display = "none";
ballImg.style.display = "none";
backgroundImg.style.display = "none";

// Перепишем отрисовку как функцию для переиспользования
const redraw = () => {
    // Очищаем холст от предыдущего кадра
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем содержимое заднего фона на холст
    context.drawImage(backgroundImg, 0, 0, backgroundImg.width, backgroundImg.height, 0, 0, canvas.width, canvas.height);

    // Рисуем левую ракетку на холсте
    context.drawImage(paddleImg, 0, 0, paddleImg.width, paddleImg.height, leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

    // Рисуем мячик
    context.drawImage(ballImg, 0, 0, ballImg.width, ballImg.height, ball.x, ball.y, ball.width, ball.height);

    // Рисуем правую ракетку на холсте
    context.drawImage(paddleImg, 0, 0, paddleImg.width, paddleImg.height, rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

    // Рисуем стены
    context.fillStyle = "lightgrey";
    context.fillRect(0, 0, canvas.width, grid);
    context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

    // Рисуем сетку посередине
    for (let i = grid; i < canvas.height - grid; i += grid * 2) {
        context.fillRect(canvas.width / 2 - grid / 2, i, grid / 2, grid / 2);
    };
};

redraw();