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
async function waitUntil(condition) {
    let frame = 0;
    return await new Promise((resolve) => {
        condition.intervalId = setInterval(() => {
            if (!condition.state) {
                resolve("a");
            } else {
                if (!condition.busy && !isPaused) {
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
        waitUntil(use_bot);
    };
    reader.readAsDataURL(file);
    console.log(fileList[0]);
};