// A JS script made for the offline Chrome dino game. Accessible most easily from chrome://dino/
// This script was made to be very simple and I didn't want to spend too much optimising this
// This script regularly scores between ~ 5,000 and 15,000
var ctx = Runner.instance_.canvasCtx; // Return the drawing context of the canvas
const obsTypeMap = {
    "CACTUS_SMALL": 0,
    "CACTUS_LARGE": 1,
    "PTERODACTYL": 2
};
const boolMap = {
    false: 0,
    true: 1
};
const header = "isJump,isDuck,tRex_y,speed,crashed,obs1_x,obs1_y,obs1_type,obs1_w,obs2_x,obs2_y,obs2_type,obs2_w,c1,c12,c2,p1,p12,p2";
let recordData = [header];
const datasetSize = document.getElementsByClassName("datasetSize")[0];
const downloadBtn = document.getElementsByClassName("download")[0];
const deleteBtn = document.getElementsByClassName("delete")[0];
const swithBtn = document.getElementsByClassName("autobot")[0];
let working = false;

function logging() {
    const ins = Runner.instance_;
    const vars = [boolMap[ins.tRex.jumping], boolMap[ins.tRex.ducking], ins.tRex.yPos, Math.floor(ins.currentSpeed * 10) / 10, boolMap[ins.crashed]];
	if (ins.horizon.obstacles.length > 1) {
        vars.push(ins.horizon.obstacles[0].xPos, ins.horizon.obstacles[0].yPos, obsTypeMap[ins.horizon.obstacles[0].typeConfig.type],
		          ins.horizon.obstacles[0].typeConfig.width * ins.horizon.obstacles[0].size);
        vars.push(ins.horizon.obstacles[1].xPos, ins.horizon.obstacles[1].yPos, obsTypeMap[ins.horizon.obstacles[1].typeConfig.type],
		          ins.horizon.obstacles[1].typeConfig.width * ins.horizon.obstacles[1].size);
		
    } else if (ins.horizon.obstacles.length > 0) {
        vars.push(ins.horizon.obstacles[0].xPos, ins.horizon.obstacles[0].yPos, obsTypeMap[ins.horizon.obstacles[0].typeConfig.type],
		          ins.horizon.obstacles[0].typeConfig.width * ins.horizon.obstacles[0].size);
        vars.push(1000, 75, 0, 0);
    } else {
        //useless data
        vars.push(1000, 75, 0, 0);
        vars.push(1000, 75, 0, 0);
        vars.push(0, 0, 0, 0, 0, 0);
        return vars;
    }
    const cactus = summer(ctx.getImageData(80, 118, 80, 1).data, 4); //.reduce(reducer);
    const cactus2 = summer(ctx.getImageData(120, 118, 80, 1).data, 4); //.reduce(reducer);
    const cactus3 = summer(ctx.getImageData(160, 118, 80, 1).data, 4); //.reduce(reducer);
    const pterodactyl = 0;//summer(ctx.getImageData(90, 85, 40, 1).data, 4); //.reduce(reducer);
    const pterodactyl2 = 0;//summer(ctx.getImageData(110, 85, 40, 1).data, 4); //.reduce(reducer);
    const pterodactyl3 = 0;//summer(ctx.getImageData(130, 85, 40, 1).data, 4);
    vars.push(cactus, cactus2, cactus3, pterodactyl, pterodactyl2, pterodactyl3);
    if (!ins.paused && ins.activated) recordData.push(vars.join());
    datasetSize.textContent = recordData.length - 1;
    return vars;
}

document.addEventListener('keydown', (e)=>{
	if (e.keyCode === 13) {
		const jump = new KeyboardEvent('keydown', {
            'keyCode': 38,
            'which': 38
        });
        document.dispatchEvent(jump);
		setTimeout(() => {
            const cancelJump = new KeyboardEvent('keyup', {
                'keyCode': 38,
                'which': 38
            });
            document.dispatchEvent(cancelJump);
        }, 75);
	}
	if (e.keyCode === 17) {
		const jump = new KeyboardEvent('keydown', {
            'keyCode': 38,
            'which': 38
        });
        document.dispatchEvent(jump);
	}
});


const actionMap = {
    'jump': () => {
        const jump = new KeyboardEvent('keydown', {
            'keyCode': 38,
            'which': 38
        });
        document.dispatchEvent(jump);
		setTimeout(() => {
            const cancelJump = new KeyboardEvent('keyup', {
                'keyCode': 38,
                'which': 38
            });
            document.dispatchEvent(cancelJump);
        }, 75);
    },
	'bigJump': () => {
        const jump = new KeyboardEvent('keydown', {
            'keyCode': 38,
            'which': 38
        });
        document.dispatchEvent(jump);
    },
    'duck': () => {
        const duck = new KeyboardEvent('keydown', {
            'keyCode': 40,
            'which': 40
        });
        document.dispatchEvent(duck);

        // The jump doesn't require firing a keyup event, but the duck event does, or else it is held down
        setTimeout(() => {
            const cancelDuck = new KeyboardEvent('keyup', {
                'keyCode': 40,
                'which': 40
            });
            document.dispatchEvent(cancelDuck);
        }, 350);
    },
    'restart': () => {
        document.dispatchEvent(new KeyboardEvent('keyup', {
            'keyCode': 32,
            'which': 32
        }))
    },
    'nothing': () => {}
};

const actions = ['nothing', 'jump', 'bigJump', 'duck'];
const speedMapJump = {false: 80, true: 90};
const speedMapDuck = {false: 35, true: 45};

(function recurseDinoScript() {
    // The dino game has a bug, where the Dino "floats" to the right. So we set the Dino position to stop it
    Runner.instance_.tRex.xPos = 21;
    // Reduce the Uint8ClampedArray into a number. If it isn't zero, there's an obstacle
    setTimeout(recurseDinoScript, 25);
    const vars = logging();
    if (!working) {
        return;
    }
	//const condition = Runner.instance_.currentSpeed>9;
    //const cactus = summer(ctx.getImageData(80, 118, speedMapJump[condition], 1).data, 4) //.reduce(reducer); // Put an 85 pixel long line in front of us. If there's anything there, jump. (Down arrow key)
    //const pterodactyl = summer(ctx.getImageData(90, 85, speedMapDuck[condition], 1).data, 4) //.reduce(reducer); //  Put a 40 pixel long line above our head. If there's anything there, duck. (Up arrow key)

    //const action = getAction(cactus, pterodactyl);
    const action = actions[getAction(vars)];
    //console.log(action);
    actionMap[action]();
    //console.log(snapshot1, snapshot2, cactus, pterodactyl,
    //            ins.tRex.jumping, ins.tRex.ducking, ins.tRex.yPos, ins.currentSpeed, ins.crashed);
})();

// Array.reduce() takes a function to reduce the array down to a single number.
function summer(arr, stride = 2) {
    let sum = 0;
    const inc = Math.floor(4 * stride);
    for (var i = 0, n = arr.length; i < n; i += inc) {
        sum += arr[i];
    } // takes onely alpha channel
    return sum
}

setInterval(() => {
    Runner.instance_.paused = !Runner.instance_.activated;
    if (Runner.instance_.crashed && working) {
        actionMap['restart']();
    }
}, 500);

// https://stackoverflow.com/questions/21012580/is-it-possible-to-write-data-to-file-using-only-javascript
let textFile = null;
const makeTextFile = function(text) {
    var data = new Blob([text], {
        type: "text/plain"
    });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
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
	swithBtn.getElementsByTagName('img')[boolMap[!working]].style.display = 'none';
	swithBtn.getElementsByTagName('img')[boolMap[working]].style.display = 'block';
};

swithBtn.addEventListener(
    "click",
    activate,
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