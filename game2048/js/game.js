const policyWithAction = {
    set a(val) {
        this.aListener(val);
    },
    registerListener: function(listener) {
        this.aListener = listener;
    }
};

const scoreReset = {
    set a(val) {
        this.aListener(val);
    },
    registerListener: function(listener) {
        this.aListener = listener;
    }
};

let clear;
let control;
let score = 0;
let done = false;
let busy = false;

document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.getElementsByClassName('grid')[0];
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const squares = [];
    const backup = [];
    const width = 4;
    let turn = 1;
    let time = Date.now();

    const moveRight = () => {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                const totalOne = parseInt(squares[i].textContent);
                const totalTwo = parseInt(squares[i + 1].textContent);
                const totalThree = parseInt(squares[i + 2].textContent);
                const totalFour = parseInt(squares[i + 3].textContent);
                const row = [totalOne, totalTwo, totalThree, totalFour];

                const filteredRow = row.filter(num => num);
                const missing = 4 - filteredRow.length;
                const zeros = Array(missing).fill(0);
                const newRow = zeros.concat(filteredRow);

                squares[i].textContent = newRow[0];
                squares[i + 1].textContent = newRow[1];
                squares[i + 2].textContent = newRow[2];
                squares[i + 3].textContent = newRow[3];
            }
        }
    }

    const moveLeft = () => {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                const totalOne = parseInt(squares[i].textContent);
                const totalTwo = parseInt(squares[i + 1].textContent);
                const totalThree = parseInt(squares[i + 2].textContent);
                const totalFour = parseInt(squares[i + 3].textContent);
                const row = [totalOne, totalTwo, totalThree, totalFour];

                const filteredRow = row.filter(num => num);
                const missing = 4 - filteredRow.length;
                const zeros = Array(missing).fill(0);
                const newRow = filteredRow.concat(zeros);

                squares[i].textContent = newRow[0];
                squares[i + 1].textContent = newRow[1];
                squares[i + 2].textContent = newRow[2];
                squares[i + 3].textContent = newRow[3];
            }
        }
    }

    const moveUp = () => {
        for (let i = 0; i < 4; i++) {
            const totalOne = parseInt(squares[i].textContent);
            const totalTwo = parseInt(squares[i + width].textContent);
            const totalThree = parseInt(squares[i + (width * 2)].textContent);
            const totalFour = parseInt(squares[i + (width * 3)].textContent);
            const column = [totalOne, totalTwo, totalThree, totalFour];

            const filteredColumn = column.filter(num => num);
            const missing = 4 - filteredColumn.length;
            const zeros = Array(missing).fill(0);
            const newColumn = filteredColumn.concat(zeros);

            squares[i].textContent = newColumn[0];
            squares[i + width].textContent = newColumn[1];
            squares[i + (width * 2)].textContent = newColumn[2];
            squares[i + (width * 3)].textContent = newColumn[3];
        }
    }

    const moveDown = () => {
        for (let i = 0; i < 4; i++) {
            const totalOne = parseInt(squares[i].textContent);
            const totalTwo = parseInt(squares[i + width].textContent);
            const totalThree = parseInt(squares[i + (width * 2)].textContent);
            const totalFour = parseInt(squares[i + (width * 3)].textContent);
            const column = [totalOne, totalTwo, totalThree, totalFour];

            const filteredColumn = column.filter(num => num);
            const missing = 4 - filteredColumn.length;
            const zeros = Array(missing).fill(0);
            const newColumn = zeros.concat(filteredColumn);

            squares[i].textContent = newColumn[0];
            squares[i + width].textContent = newColumn[1];
            squares[i + (width * 2)].textContent = newColumn[2];
            squares[i + (width * 3)].textContent = newColumn[3];
        }
    }

    const combineRow = (how='left') => {
        if (how==='left') {
            for (let i = 0; i < 15; i++) {
                if (i % 4 === 3) {
                    continue;
                }
                j = i+1;
                if (squares[i].textContent === squares[j].textContent) {
                    const combinedTotal = parseInt(squares[i].textContent) * 2;
                    squares[i].textContent = combinedTotal;
                    squares[j].textContent = 0;
                    score += combinedTotal;
                    scoreDisplay.textContent = score;
                }
            }
        } else { // right
            for (let i = 15; i > 0; i--) {
                if (i % 4 === 0) {
                    continue;
                }
                j = i-1;
                if (squares[i].textContent === squares[j].textContent) {
                    const combinedTotal = parseInt(squares[i].textContent) * 2;
                    squares[i].textContent = combinedTotal;
                    squares[j].textContent = 0;
                    score += combinedTotal;
                    scoreDisplay.textContent = score;
                }
            }
        }
        checkForWin();
    }

    const combineColumn = (how='up') => {
        if (how==='up') {       
            for (let i = 0; i < 12; i++) {
                if (squares[i].textContent === squares[i + width].textContent) {
                    const combinedTotal = parseInt(squares[i].textContent) * 2;
                    squares[i].textContent = combinedTotal;
                    squares[i + width].textContent = 0;
                    score += combinedTotal;
                    scoreDisplay.textContent = score;
                }
            }
        } else { // down
            for (let i = 15; i > 3; i--) {
                const j = i - width;
                if (squares[i].textContent === squares[j].textContent) {
                    const combinedTotal = parseInt(squares[i].textContent) * 2;
                    squares[i].textContent = combinedTotal;
                    squares[j].textContent = 0;
                    score += combinedTotal;
                    scoreDisplay.textContent = score;
                }
            }
        }
        checkForWin();
    }

    const neighborsIndexes = {
        0: [1, 4],
        1: [0, 2, 5],
        2: [1, 3, 6],
        3: [2, 7],
        4: [0, 5, 8],
        5: [1, 4, 6, 9],
        6: [2, 5, 7, 10],
        7: [3, 6, 11],
        8: [4, 9, 12],
        9: [5, 8, 10, 13],
        10: [6, 9, 11, 14],
        11: [7, 10, 15],
        12: [8, 13],
        13: [12, 14, 9],
        14: [13, 15, 10],
        15: [14, 11],
    };

    const checkConnectivity = () => {
        for (let i = 0; i < squares.length; i++) {
                for (let j=0; j < neighborsIndexes[i].length; j++) {
                    if (squares[i].textContent === squares[neighborsIndexes[i][j]].textContent) {
                        return true; // exists at least one move
                    }
                }
            } // else no moves exists => game over
        return false;
    }

    const keyRight = () => {
        moveRight();
        combineRow('right');
        moveRight();
        //generate();
    }

    const keyLeft = () => {
        moveLeft();
        combineRow('left');
        moveLeft();
        //generate();
    }

    const keyUp = () => {
        moveUp();
        combineColumn('up');
        moveUp();
        //generate();
    }

    const keyDown = () => {
        moveDown();
        combineColumn('down');
        moveDown();
        //generate();
    }

    const keyCodeToControlMap = {
        37: keyLeft,
        38: keyUp,
        39: keyRight,
        40: keyDown,
    };

    //assign functions to keyCodes
    control = (e) => {
        if (busy) return; //prevent bugs
        // undo
        if (e.keyCode === 8 && backup.length) { // backspace
            const tmp = backup.pop();
            policyWithAction.a = 'undo';//recordData.pop();
            squares.map((el, i) => {el.textContent = tmp[0][i]});
            score = tmp[1];
            scoreDisplay.textContent = score;
            turn = tmp[2];
            addColours();
        }
        if (e.keyCode < 37 || e.keyCode > 40) return; // filter keycodes;
        busy = true;
        // update policy
        const inputs = squares.map((el) => parseInt(el.textContent));
        const scoreBefore = score;
        const maxBefore = Math.max(...inputs);
        inputs.push(score, turn, e.keyCode);
        // apply changes
        keyCodeToControlMap[e.keyCode]();
        // check if move affects board
        for (let i = 0, length = squares.length; i < length; i++) {
            if (inputs[i] !== parseInt(squares[i].textContent)) {
                generate();
                addColours();
                policyWithAction.a = inputs;
				backup.push([inputs, score, turn]);
                turn++;
                const zero_bonus = turn*(squares.length - squares.map(e=>parseInt(e.textContent)).filter(e=>e).length); //add number of zero cells
                score += Math.floor(zero_bonus/128);
                break;
            }
        }
        busy = false;
        const maxNew = Math.max(...inputs);
        //const scoreMean = inputs.reduce((r, e)=>r+e, 0)/inputs.length;
        //console.log(scoreMean);
        const reward = (maxNew - maxBefore) / 2048 + turn / 2048 - 1;
        return reward;
    }
    document.addEventListener('keyup', control);

    //check for the number 2048 in the squares to win
    const checkForWin = () => {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                done = true;
                resultDisplay.textContent = 'You WIN';
                document.removeEventListener('keyup', control);
                setTimeout(() => clear(), 3000);
            }
        }
    }
    //check if there are no zeros on the board to lose
    const checkForGameOver = () => {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].textContent == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            // check if moves exists
            if (checkConnectivity()) return;
            done = true;
            resultDisplay.textContent = 'You LOSE';
            document.removeEventListener('keyup', control);
            setTimeout(() => clear(), 1000);
        }
    }

    //clear timer
    //const clear = () => {
    clear = () => {
        console.log('here');
        done = false;
        const maxObtained = Math.max(...squares.map(e=> parseInt(e.textContent)));
        squares.length = 0;
        gridDisplay.textContent = '';
        // NEW
        // max block + average score per games + turns
        // squared so mean will be shifted to better games
        scoreReset.a = (10*maxObtained**3 + Math.floor(score/turn) + turn)**0.5 - (Date.now() - time)/100; 
        score = 0;
        turn = 1;
        backup.length = 0;
        time = Date.now();
        scoreDisplay.textContent = score;
        createBoard();
        addColours();
        document.addEventListener('keyup', control);
        //clearInterval(myTimer);
    }

    //add colours
    const valueToColorMap = {
        '0': '#afa192',
        '2': '#eee4da',
        '4': '#ede0c8',
        '8': '#f2b179',
        '16': '#ffcea4',
        '32': '#e8c064',
        '64': '#ffab6e',
        '128': '#fd9982',
        '256': '#ead79c',
        '512': '#76daff',
        '1024': '#beeaa5',
        '2048': '#d7d4f0'
    };

    const addColours = () => {
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = valueToColorMap[squares[i].textContent];
        }
    }
    const digitMap = {
        false: 2,
        true: 4
    };
    //generate a new number
    const generate = () => {
        const inputs = Array.from(gridDisplay.getElementsByTagName('div')).map((el) => parseInt(el.textContent));
        const idx = inputs.map((e, i) => [e, i]).filter(e=>e[0]===0).map(e=>e[1]);
        if (!idx.length) return;
        const randomNumber = idx[Math.floor(Math.random() * idx.length)];
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].textContent = digitMap[Math.random() < 0.1];
            checkForGameOver();
        } else generate();
    }

    //create the playing board
    const createBoard = () => {
        for (let i = 0; i < width * width; i++) {
            square = document.createElement('div');
            square.textContent = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }

    createBoard();
    addColours();
})