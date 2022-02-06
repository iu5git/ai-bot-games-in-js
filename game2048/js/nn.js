const quantizeWeights = (weights, precision) => {
    quantizedWeights = {
        inputSize: weights.inputSize,
        n1Size: weights.n1Size,
        n2Size: weights.n2Size
    };
    quantizedWeights['w1'] = weights.w1.map(e => e.map(v => Number(v.toPrecision(precision))));
    quantizedWeights['w2'] = weights.w2.map(e => e.map(v => Number(v.toPrecision(precision))));
    if (weights.bias)
        quantizedWeights['bias'] = weights.bias.map(v => Number(v.toPrecision(precision)));
    return quantizedWeights;
}

const toJson = (population, precision = 3) => {
    return JSON.stringify(population.map(e => [quantizeWeights(e[0], precision), e[1], e[2]]));
}

const fromJson = (stringData) => {
    return JSON.parse(stringData);
}

const randomNorm = () => {
    let acc = 0;
    for (let i = 0; i < 12; i++) {
        acc += Math.random(); // Approximating Normal by Irwin-Hall distribution
    }
    return acc - 6;
}

const initializeWeights = (inputSize, n1Size, n2Size, bias) => {
    const weights = {
        inputSize: inputSize,
        n1Size: n1Size,
        n2Size: n2Size
    };
    weights['w1'] = [];
    weights['w2'] = [];
    for (let i = 0; i < weights.inputSize; i++) {
        const tmp = [];
        for (let j = 0; j < weights.n1Size; j++) {
            tmp.push(randomNorm());
        }
        weights.w1.push(tmp);
    }
    for (let i = 0; i < weights.n1Size; i++) {
        const tmp = [];
        for (let j = 0; j < weights.n2Size; j++) {
            tmp.push(randomNorm());
        }
        weights.w2.push(tmp);
    }
    if (!bias) return weights;
    weights['bias'] = [];
    for (let i = 0; i < weights.n2Size; i++) {
        weights.bias.push(randomNorm());
    }
    return weights;
}

const generatePopulation = (size = 20, inputSize = 16, n1Size = 8, n2Size = 4, bias = true) => {
    const population = [];
    for (let i = 0; i < size; i++) {
        population.push([initializeWeights(inputSize, n1Size, n2Size, bias), 0, 0.1]); // weight + score + lives;
    }
    return population;
}

const selectPopulation = (population, topP = 25) => {
    const size = Math.floor(topP * population.length / 100);
    return population.sort((a, b) => ((a[1] / a[2]) > (b[1] / b[2])) ? -1 : (((b[1] / b[2]) > (a[1] / a[2])) ? 1 : 0)).slice(0, size); //.map(e=>[e[0], e[1]/e[2], 2]);
}

const crossParents = (parentA, parentB) => {
    //console.log(parentA, parentB);
    const childWeights = initializeWeights(parentA[0].inputSize, parentA[0].n1Size, parentA[0].n2Size, parentA[0].bias);
    //console.log(childWeights);
    for (let i = 0; i < childWeights.inputSize; i++) {
        const connections = [parentA[0].w1[i], parentB[0].w1[i]][Math.floor(Math.random() * 2)];
        for (let j = 0; j < childWeights.n1Size; j++) {
            childWeights.w1[i][j] = connections[j]; //(parentA[0].w1[i][j]+parentB[0].w1[i][j])*.5;
        }
    }
    for (let i = 0; i < childWeights.n1Size; i++) {
        const connections = [parentA[0].w2[i], parentB[0].w2[i]][Math.floor(Math.random() * 2)];
        for (let j = 0; j < childWeights.n2Size; j++) {
            childWeights.w2[i][j] = connections[j];
        }
    }
    if (!childWeights.bias) return [childWeights, 0, 0.1];
    if (!parentB[0].bias)
        parentB[0].bias = [0, 0, 0, 0];
    if (!parentA[0].bias)
        parentA[0].bias = [0, 0, 0, 0];
    const bias = [parentA[0].bias, parentB[0].bias][Math.floor(Math.random() * 2)];
    for (let i = 0; i < childWeights.n2Size; i++) {
        childWeights.bias[i] = bias[i];
    }
    return [childWeights, 0, 0.1];
}

const mutateWeights = (weights, mutationRate = 0.1) => {
    const mutated = initializeWeights(weights.inputSize, weights.n1Size, weights.n2Size, weights.bias);
    for (let i = 0; i < weights.inputSize; i++) {
        const condition = Math.random() < mutationRate;
        for (let j = 0; j < weights.n1Size; j++) {
            mutated.w1[i][j] = weights.w1[i][j];
            if (condition) {
                mutated.w1[i][j] += randomNorm() * 0.25;
            }
        }
    }
    for (let i = 0; i < weights.n1Size; i++) {
        const condition = Math.random() < mutationRate;
        for (let j = 0; j < weights.n2Size; j++) {
            mutated.w2[i][j] = weights.w2[i][j];
            if (condition) {
                mutated.w2[i][j] += randomNorm() * 0.25;
            }
        }
    }
    if (!mutated.bias) return mutated;
    const condition = Math.random() < mutationRate;
    for (let i = 0; i < weights.n2Size; i++) {
        mutated.bias[i] = weights.bias[i];
        if (condition) {
            mutated.bias[i] += randomNorm() * 0.25;;
        }
    }
    return [mutated, 0, 0.1];
}

const updatePopulation = (population, selectionTopPercent = 25, randomSize = 3, mutationRate = 0.1, crossoverChance = 0.6) => {
    console.log(population.map(e => e[1] / e[2]));
    const nextPopulation = selectPopulation(population, selectionTopPercent);
    const lengthTop = nextPopulation.length;
    for (let p = 0, total = population.length - lengthTop - randomSize; p < total; p++) {
        const leftParent = nextPopulation[Math.floor(Math.random() * lengthTop)];
        const rightParent = nextPopulation[Math.floor(Math.random() * lengthTop)];
        if (Math.random() < crossoverChance) {
            const newChild = crossParents(leftParent, rightParent);
            nextPopulation.push(newChild);
        } else {
            nextPopulation.push(mutateWeights(leftParent[0], mutationRate));
        }
    }
    for (let p = 0; p < randomSize; p++) {
        nextPopulation.push([initializeWeights(population[0][0].inputSize,
            population[0][0].n1Size,
            population[0][0].n2Size,
            population[0][0].bias), 0, 0.1]);
    }
    return nextPopulation;
}


const forwardNN = (vars, weights) => {
    const Xmax = (Math.log(1 + Math.max(...vars)));
    const X = vars.map(e => Math.log(1 + e) / Xmax);

    // result of layer 1
    const l1 = [];
    const n0Size = X.length;
    const n1Size = weights.n1Size;
    const n2Size = weights.n2Size;

    for (let i = 0; i < n0Size; i++) {
        l1.push(weights.w1[i].map((e) => e * X[i])); // 32
    }
    // sum for every hidden neuron
    const n1 = [];
    for (let i = 0; i < n1Size; i++) {
        let acc = 0;
        for (let j = 0; j < n0Size; j++) {
            acc += l1[j][i];
        }
        n1.push(acc > 0 ? (acc > 5 ? 5 : acc) : 0); // Clipped@5 ReLU activation function
    }
    //console.log(n1);
    // result of layer 2
    const l2 = [];
    for (let i = 0; i < n1Size; i++) {
        l2.push(weights.w2[i].map((e) => e * n1[i])); // 7
    }
    // sum for every output neuron
    const n2 = [];
    for (let i = 0; i < n2Size; i++) {
        let acc = 0; // let acc = weights.bias[i];
        if (weights.bias) acc = weights.bias[i];
        for (let j = 0; j < n1Size; j++) {
            acc += l2[j][i];
        }
        n2.push(acc);
    }
    //console.log(n2); // result
    return n2;
}

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

const applySoftmax = (logits) => {
  const maxLogit = Math.max(...logits);
  const scores = logits.map((l) => Math.exp(l - maxLogit));
  const denom = scores.reduce((a, b) => a + b);
  return scores.map((s) => s / denom);
};

const indexOfProb = (arr) => {
	const cumulativeSum = (sum => value => sum += value)(0);
	const probs = applySoftmax(arr).map(cumulativeSum);
	const value = Math.random();
	for (let i=0, length=arr.length; i<length; i++) {
		if (probs[i] > value) return i; 
	}
}

console.log(forwardNN([0., 0., 0., 0., 0., 0., 0., 0., 0., 0., 2., 0., 0., 4., 0., 0.], initializeWeights(16, 2, 4, true)));
console.log(updatePopulation(generatePopulation()));