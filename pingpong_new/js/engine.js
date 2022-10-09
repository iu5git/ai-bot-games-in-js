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
    // Сохраняем текущие значения объектов
    updateDataset();

    if (use_bot.state) {
        leftPaddle.y += leftPaddle.dy;
        // Если правая платформа пытается вылезти за игровое поле вниз,
        if (leftPaddle.y < grid) {
            // то оставляем её на месте
            leftPaddle.y = grid;
        }
        // Проверяем то же самое сверху
        else if (leftPaddle.y > LeftmaxPaddleY) {
            leftPaddle.y = LeftmaxPaddleY;
        }
    }
    // Если платформы на предыдущем шаге куда-то двигались — пусть продолжают двигаться
    rightPaddle.y += rightPaddle.dy;

    // Если правая платформа пытается вылезти за игровое поле вниз,
    if (rightPaddle.y < grid) {
        // то оставляем её на месте
        rightPaddle.y = grid;
    }
    // Проверяем то же самое сверху
    else if (rightPaddle.y > RightmaxPaddleY) {
        rightPaddle.y = RightmaxPaddleY;
    }

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

            // Обновляем доску с рекордами
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
        // Обновляем доску с рекордами
        updateStatus(false);
        // Сохраняем временную позицию последнего удачно отбитого мячика
        lastGoodMove = recordData.length;
    }

    // Отрисовываем новый кадр
    redraw();

    // Логирование
    console.log('!');
};

// Запускаем игру
function Start() {
    if (!isPaused) {
        loop();
    }
    // Рекурсивный вызов игрового движка
    requestAnimFrame(Start);
}

Start();
loop();