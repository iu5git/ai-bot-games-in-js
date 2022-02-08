const botImages = Array.from(
    document.getElementsByClassName("upload")[0].getElementsByTagName("img")
);

var onnxSess;
var use_bot = {
    state: false,
    busy: false,
    intervalId: 0
};
// var busy = false;
// var breakLoop = false;

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

    const file = fileList[0];
    const reader = new FileReader();
    reader.onloadend = async function() {
        onnxSess = new onnx.InferenceSession();
        await onnxSess.loadModel(reader.result);
        use_bot.state = true;
    };
    reader.readAsDataURL(file);
    console.log(fileList[0]);
};

getAction = async (vars) => {
    if (Math.random() < 0.10) {
        return [37, 38, 39, 40][Math.floor(Math.random() * 4)];
    } // Thompson sampling
    const X = vars; //.map((e)=>Math.log(1+e));
    const actionMap = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
    const scores = []
    for (let i = 0; i < actionMap.length; i++) {
        //console.log(X.concat(actionMap[i]));
        let input = new onnx.Tensor(X.concat(actionMap[i]), "float32", [1, 20]);
        let output = (await onnxSess.run([input])).get("output").data[0];
        scores.push(output);
    }
    console.log(scores);
    return [37, 38, 39, 40][indexOfMax(scores)];
}


/*getAction = async (vars) => {
	if (Math.random() < 0.05) {
		return [37, 38, 39, 40][Math.floor(Math.random() * 4)];
	} // Thompson sampling
	const X = vars;//.map((e)=>Math.log(1+e));
	let input = new onnx.Tensor(X, "float32", [1, 16]);
	let output = (await onnxSess.run([input])).get("output").data;
	const cumulativeSum = (sum => value => sum += value)(0);
	const probs = applySoftmax(output).map(cumulativeSum);
	const value = Math.random();
	const probsdiff = probs.map(e => e - value);
	for (let i=0; i<4; i++) {
		if (probsdiff[i] > 0) {
			return [37, 38, 39, 40][i];
		}
	}
	return 40;
}*/

getAction = async (vars, log = true, depth = 2, returnAction = true) => {
    const X = log ? vars.map((e) => Math.log(1 + e)) : vars;
    const actionMap = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ]
    const scores = [];
    for (let i = 0; i < actionMap.length; i++) {
        //console.log(X.concat(actionMap[i]));
        let input = new onnx.Tensor(X.concat(actionMap[i]), "float32", [1, 20]);
        let output = (await onnxSess.run([input])).get("output").data; // 17 digits
        if (depth > 0) { // recursive call
            const score = await getAction(X.map((e, j) => e + output[j]), false, depth - 1, false);
            scores.push(output[16] + score); // current reward plus possible reward from action
        } else { // return prediction
            scores.push(output[16]);
        }
    }
    if (!returnAction) {
        return Math.max(...scores); // return maximum reward among actions;
    }
    if (Math.random() < 0.05) {
        return [37, 38, 39, 40][Math.floor(Math.random() * 4)];
    } // Thompson sampling
    const cumulativeSum = (sum => value => sum += value)(0);
    const probs = applySoftmax(scores).map(cumulativeSum);
    const value = Math.random();
    const probsdiff = probs.map(e => e - value);
    for (let i = 0; i < 4; i++) {
        if (probsdiff[i] > 0) {
            return [37, 38, 39, 40][i];
        }
    }
    return 40;
    return [37, 38, 39, 40][indexOfMax(scores)];
}

// OLDER

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
    population = [];
    for (let i = 0; i < fileList.length; i++) {
        await (new Promise(r => {
            const file = fileList[i];
            const reader = new FileReader();
            reader.onloadend = async function() {
				const populationObject = fromJson(reader.result);
                population = population.concat(populationObject.population);
				generation = Math.max(generation, populationObject.generation);
				saveNewConfig(populationObject.config, false);
                use_bot.state = true;
                r();
            };
            //reader.readAsDataURL(file);
            reader.readAsText(file);
        }));
    }
    population = selectPopulation(population, 200).slice(0, POPULATION_CONFIG.size); // crop by current config length
    console.log(fileList[0]);
};


let lastVars = [];
let lastActions = [0, 0, 0, 0];
let counter = 0;
const POPULATION_CONFIG = JSON.parse(localStorage.getItem('config')) || {
    n1Size: 2,
    bias: true,
    size: 50,
    runs: 1,
    selectionTopPercent: 25,
    mutationRate: 0.1,
    crossoverChance: 0.6,
    randomSize: 3,
    savingPrecision: 3,
	probability: 0.2,
};

const saveNewConfig = (config, updateStrictly=true) => {
    let recreateNew = false;
    for (let key in config) {
        if (POPULATION_CONFIG[key] !== config[key] && (key === 'n1Size' || key === 'bias' || key === 'size')) {
            recreateNew = true;
        }
        POPULATION_CONFIG[key] = config[key];
    };
	localStorage.setItem("config", JSON.stringify(POPULATION_CONFIG));
    if (recreateNew && updateStrictly) {
        population = generatePopulation(POPULATION_CONFIG.size, 176, POPULATION_CONFIG.n1Size, 4, POPULATION_CONFIG.bias);
        curRun = 0;
        ptr = 0;
        generation = 0;
        updateGeneticStats();
    };
}

let population = generatePopulation(POPULATION_CONFIG.size, 176, POPULATION_CONFIG.n1Size, 4, POPULATION_CONFIG.bias);
let generation = 0;
let ptr = 0;
let curRun = 0;

const updateGeneticStats = () => {
    const stats = document.getElementById('genetic').getElementsByTagName('a');
    stats[0].textContent = generation + 1;
    stats[1].textContent = ptr + 1;
    stats[2].textContent = curRun + 1;
}
updateGeneticStats();

const STATS = {naive: 0, real: 0, total: 0};
(async function scoreObserver() {
    await (new Promise(r => {
        scoreReset.registerListener(r);
    })).then((score) => {
		const cur_score = Math.floor(score*(0.25+STATS.real/STATS.total));
		if (population[ptr][2]>POPULATION_CONFIG.runs) {
			population[ptr][1] += 0.7*population[ptr][1]/population[ptr][2]+0.3*cur_score;
		} else {
			population[ptr][1] += cur_score;
		}
        STATS.naive = 0;
        STATS.real = 0;
        STATS.total = 0;
        population[ptr][2]++;
        curRun = (curRun + 1) % POPULATION_CONFIG.runs;
        if (curRun === 0) {
            ptr = (ptr + 1) % population.length;
            if (ptr === 0) {
                population = updatePopulation(population,
                    POPULATION_CONFIG.selectionTopPercent,
                    POPULATION_CONFIG.randomSize,
                    POPULATION_CONFIG.mutationRate,
                    POPULATION_CONFIG.crossoverChance);
                generation++;
            }
        }
        updateGeneticStats();
    });
    scoreObserver();
})();

getAction = async (vars) => {
    let sameBoard = true;
    for (let i = 0; i < lastVars.length; i++) {
        if (lastVars[i] === vars[i]) {
            counter++;
        } else {
            sameBoard = false;
            counter = 0;
        }
    }
    lastVars = vars;
	STATS.total += 1;
	if (counter > lastVars.length * 30) {
        STATS.naive += 1;
		return [37, 38, 39, 40][Math.floor(Math.random() * 4)];
	}
    if (counter > lastVars.length * 10) {
        STATS.naive += 1;
        if (!population[ptr][0].bias) return [37, 38, 39, 40][Math.floor(Math.random() * 4)];
		return [37, 38, 39, 40][indexOfProb(population[ptr][0].bias)];
        //const cumulativeSum = (sum => value => sum += value)(0);
        //const probs = applySoftmax(population[ptr][0].bias).map(cumulativeSum);
        //const value = Math.random();
        //for (let i = 0; i < 4; i++) {
        //    if (probs[i] > value) {
        //        return [37, 38, 39, 40][i];
        //    }
        //}
        //return 40;
    }
    STATS.real += 1;
    //return [37, 37, 38, 38, 39, 40][Math.floor(Math.random() * 6)];
    let scores;
    if (sameBoard) { // avoid useless calculations
        scores = lastActions;
    } else {
        scores = forwardNN(vars, population[ptr][0]); // get latent representation
        lastActions = scores;
    }
	const funcMap = {
        false: indexOfMax,
        true: indexOfProb
    };
	return [37, 38, 39, 40][funcMap[Math.random() < POPULATION_CONFIG.probability](scores)];
    //const cumulativeSum = (sum => value => sum += value)(0);
    //const probs = applySoftmax(scores).map(cumulativeSum);
    //const value = Math.random();
    //for (let i = 0; i < 4; i++) {
    //    if (probs[i] > value) {
    //        return [37, 38, 39, 40][i];
    //    }
    //}
    /*
    	let actions = [37, 38, 39, 40];
    	if (!sameBoard) return actions[indexOfMax(scores)];
    	for (let i=0; i < (counter-lastVars.length*3)/vars.length; i++) {
    		const index = indexOfMax(scores);
    		actions.splice(index, 1);
    		scores.splice(index, 1);
    	}
    	return actions[indexOfMax(scores)]; // метод исключения*/
    /*
    const value = Math.random();
    const probsdiff = probs.map(e => e - value);
    for (let i=0; i<4; i++) {
    	if (probsdiff[i] > 0) {
    		return [37, 38, 39, 40][i];
    	}
    }
    return 40;*/



    /*
    const actionMap = [[1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,1]]
    const scores = [];
    if (Math.random() < 0.0) {
    	return [37, 38, 39][Math.floor(Math.random() * 3)];
    } // Thompson sampling
    const answer = decisionTree(X);
    //if (answer > 39) return [37, 37, 38, 38, 39][Math.floor(Math.random() * 6)];
    return answer;
    for (let i=0; i<actionMap.length; i++) {
    	let input = X.concat(actionMap[i]);
    	console.log(input);
    	scores.push(decisionTree(input));
    }
    if (Math.random() < 0.05) {
    	return [37, 38, 39, 40][Math.floor(Math.random() * 4)];
    } // Thompson sampling
    console.log(scores);
    const cumulativeSum = (sum => value => sum += value)(0);
    const probs = applySoftmax(scores).map(cumulativeSum);
    const value = Math.random();
    const probsdiff = probs.map(e => e - value);
    for (let i=0; i<4; i++) {
    	if (probsdiff[i] > 0) {
    		return [37, 38, 39, 40][i];
    	}
    }
    return 40;
    return [37, 38, 39, 40][indexOfMax(scores)];*/
}