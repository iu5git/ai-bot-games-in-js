const botImages = Array.from(
    document.getElementsByClassName("upload")[0].getElementsByTagName("img")
);

var onnxSess;
var use_bot = {
    state: false,
    busy: false,
    intervalId: 0
};

// https://stackoverflow.com/questions/52184291/async-await-with-setinterval
async function waitUntil(condition, func) {
    let frame = 0;
    return await new Promise((resolve) => {
        condition.intervalId = setInterval(async () => {
            if (!condition.state) {
                resolve("a");
            } else {
                if (!condition.busy && !isPaused) {
                    await func(false);
                    await func(true);
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

document.getElementsByClassName("modelFile")[0].onchange = async function(
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
    reader.onloadend = async function() {
        onnxSess = new onnx.InferenceSession();
        await onnxSess.loadModel(reader.result);
        use_bot.state = true;
        waitUntil(use_bot, runONNX);
        leftPaddle.width = rightPaddle.width;
        leftPaddle.height = rightPaddle.height;
        leftPaddle.y = rightPaddle.y;
    };
    reader.readAsDataURL(file);
    console.log(fileList[0]);
};

// Получение позиции максимального элемента в массиве
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

const normalizationConstant = 705;
// Предсказание нейронной сеткой
const runONNX = async (left = false) => {
    use_bot.busy = true;
    console.time("onnx");
    var inp = Float32Array.from([
        left ? (1 - ball.x / normalizationConstant + 30 / normalizationConstant) : (ball.x / normalizationConstant),
        ball.y / normalizationConstant,
        left ? (leftPaddle.y / normalizationConstant) : (rightPaddle.y / normalizationConstant)
    ]);
    let input = new onnx.Tensor(inp, "float32", [1, 3]);
    let output = (await onnxSess.run([input])).get("output").data;
    const actionId = indexOfMax(output);
    if (actionId === 2) {
        // up
        if (left) {
            leftPaddle.dy = -leftPaddle.paddleSpeed;
        } else {
            keyPresses["up"] = 1;
            keyPresses["down"] = 0;
            keyPresses["nothing"] = 0;
            rightPaddle.dy = -rightPaddle.paddleSpeed;
        }
    } else if (actionId === 1) {
        // down
        if (left) {
            leftPaddle.dy = leftPaddle.paddleSpeed;
        } else {
            keyPresses["up"] = 0;
            keyPresses["down"] = 1;
            keyPresses["nothing"] = 0;
            rightPaddle.dy = rightPaddle.paddleSpeed;
        }
    } else {
        //nothing
        if (left) {
            leftPaddle.dy = 0;
        } else {
            keyPresses["up"] = 0;
            keyPresses["down"] = 0;
            keyPresses["nothing"] = 1;
            rightPaddle.dy = 0;
        }
    }
    console.timeEnd("onnx");
    use_bot.busy = false;
    return output;
};