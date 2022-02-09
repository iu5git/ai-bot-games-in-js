setInterval(async () => {
    if (!working) return;
    const keyCode = await getAction(getInputs());
    const keyEv = new KeyboardEvent('keyup', {
        'keyCode': keyCode,
        'which': keyCode
    });
    document.dispatchEvent(keyEv);
}, 10);


const gridDisplay = document.getElementsByClassName('grid')[0];
const getInputs = () => {
    return Array.from(gridDisplay.getElementsByTagName('div')).map((el) => parseInt(el.textContent));
}

const header = "p11,p12,p13,p14,p21,p22,p23,p24,p31,p32,p33,p34,p41,p42,p43,p44,score,turn,keycode";
let recordData = [header];
const datasetSize = document.getElementsByClassName("datasetSize")[0];
const downloadBtn = document.getElementsByClassName("download")[0];
const deleteBtn = document.getElementsByClassName("delete")[0];
const switchBtn = document.getElementsByClassName("autobot")[0];
const settingsBtn = document.getElementsByClassName("settingsBtn")[0];
const closeSettings = document.getElementsByClassName("closeSettings")[0];
const saveSettings = document.getElementsByClassName("saveSettings")[0];

let working = false;

const boolMap = {
    false: 0,
    true: 1
};


(async function policyObserver() {
    await (new Promise(r => {
        policyWithAction.registerListener(r);
    })).then((newRecord) => {
        recordData.push(newRecord);
        datasetSize.textContent = recordData.length - 1;
    });
    policyObserver();
})();

// https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
const textFile = {
    "text/plain": null,
    "application/json": null
};
const makeTextFile = function(text, type = "text/plain") {
    const data = new Blob([text], {
        type: type
    });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile[type] !== null) {
        window.URL.revokeObjectURL(textFile[type]);
    }

    textFile[type] = window.URL.createObjectURL(data);

    return textFile[type];
};

downloadBtn.addEventListener(
    "click",
    function() {
        var link = downloadBtn.getElementsByTagName("a")[0];
        link.href = makeTextFile(recordData.join("\r\n"));
        link.style.display = "block";
        link.click();
    },
    false
);

const populationBtn = document.getElementsByClassName("population")[0];
populationBtn.addEventListener(
    "click",
    function() {
        var link = populationBtn.getElementsByTagName("a")[0];
        const jsonPop = toJson(population, POPULATION_CONFIG.savingPrecision);
        const populationObject = {generation: generation, config: POPULATION_CONFIG, population: fromJson(jsonPop)};
        link.href = makeTextFile(JSON.stringify(populationObject), 'application/json');
        link.style.display = "block";
        link.click();
    },
    false
);

deleteBtn.addEventListener(
    "click",
    function() {
        recordData.length = 0;
        recordData[0] = header;
        datasetSize.innerHTML = recordData.length;
    },
    false
);

const activate = () => {
    working = !working;
    switchBtn.getElementsByTagName('img')[boolMap[!working]].style.display = 'none';
    switchBtn.getElementsByTagName('img')[boolMap[working]].style.display = 'block';
};

switchBtn.addEventListener(
    "click",
    activate,
    false
);

const setColor = (arr, color) => {
    arr.map(e => {e.previousElementSibling.style.color=color;});
}

const updateSettingsView = (e) => {
        const changeMap = {
            '': 'block',
            'none': 'block',
            'block': 'none'
        };
        const typeMap = {
            'checkbox': (e) => {
                e.checked = POPULATION_CONFIG[e.id];
                e.oninput = function () {this.previousElementSibling.style.color = 'red';};
            },
            'range': (e) => {
                e.value = POPULATION_CONFIG[e.id];
                e.nextElementSibling.value = e.value;
                e.oninput = function () {this.nextElementSibling.value = this.value;this.previousElementSibling.style.color = 'red';};
            }
        };
        const settings = document.getElementsByClassName('settings')[0];
        settings.style.display = changeMap[settings.style.display];
        const options = Array.from(settings.getElementsByTagName('input'));
        
        for (let i = 0; i < options.length; i++) {
            typeMap[options[i].type](options[i]);
        }
        setColor(options, 'white');
    }

settingsBtn.addEventListener(
    "click",
    updateSettingsView,
    false
);

const constructConfig = (options) => {
    return {
        n1Size: parseInt(options[0]),
        bias: {
            'on': true,
            'off': false
        } [options[1]],
        size: parseInt(options[2]),
        runs: parseInt(options[3]),
        selectionTopPercent: parseInt(options[4]),
        mutationRate: parseFloat(options[5]),
        crossoverChance: parseFloat(options[6]),
        randomSize: parseInt(options[7]),
        probability: parseFloat(options[8]),
        savingPrecision: parseInt(options[9]),
    };
};

closeSettings.addEventListener(
    "click",
    updateSettingsView,
    false
);

saveSettings.addEventListener(
    "click",
    (e) => {
        const settings = document.getElementsByClassName('settings')[0];
        const elems = Array.from(settings.getElementsByTagName('input'));
        const options = elems.map(e => e.value);
        const config = constructConfig(options);
        saveNewConfig(config);
        setColor(elems, '#1EFF92');
        setTimeout(()=>{
        setColor(elems, 'white');}
        , 1000)
    },
    false
);

document.addEventListener(
    "keydown",
    (e) => {
        if (e.keyCode === 9) {
            e.preventDefault();
            activate();
        }
    },
    false
);