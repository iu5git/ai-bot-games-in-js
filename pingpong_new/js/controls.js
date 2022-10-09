// Вводим словарик с состояниями нажатых клавиш
const keyPresses = {
    up: 0,
    down: 0,
    nothing: 1
};

// Отслеживаем нажатия клавиш
document.addEventListener("keydown", function(e) {
    // Если нажата клавиша вверх,
    if (e.which === 38) {
        // то двигаем правую платформу вверх
        rightPaddle.dy = -rightPaddle.paddleSpeed;
        keyPresses["up"] = 1;
        keyPresses["down"] = 0;
        keyPresses["nothing"] = 0;
    }
    // Если нажата клавиша вниз,
    else if (e.which === 40) {
        // то двигаем правую платформу вниз
        rightPaddle.dy = rightPaddle.paddleSpeed;
        keyPresses["up"] = 0;
        keyPresses["down"] = 1;
        keyPresses["nothing"] = 0;
    }
    // Если нажата клавиша W,
    if (e.which === 87) {
        // то двигаем левую платформу вверх
        leftPaddle.dy = -leftPaddle.paddleSpeed;
    }
    // Если нажата клавиша S,
    else if (e.which === 83) {
        // то двигаем левую платформу вниз
        leftPaddle.dy = leftPaddle.paddleSpeed;
    }
});

// А теперь следим за тем, когда кто-то отпустит клавишу, чтобы остановить движение платформы
document.addEventListener("keyup", function(e) {
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
});