var scoreStats = {
    currentCombo: 0,
    bestCombo: 0,
    totalTries: 0,
    mean: 0
};

// вызывается при проигрыше
const updateStatus = (gameover = false, reset = false) => {
    const scoreElements = Array.from(
        document.getElementsByClassName("score")[0].getElementsByTagName("a")
    );
    if (!gameover) {
        scoreStats.currentCombo++;
        scoreStats.bestCombo = Math.max(
            scoreStats.currentCombo,
            scoreStats.bestCombo
        );
    } else {
        scoreStats.totalTries++;
        scoreStats.mean =
            Math.floor(
                (scoreStats.mean +
                    (scoreStats.currentCombo - scoreStats.mean) / scoreStats.totalTries) *
                100
            ) / 100;
        scoreStats.currentCombo = 0;
    }
    if (reset) {
        scoreStats.totalTries = 0;
        scoreStats.currentCombo = 0;
        scoreStats.bestCombo = 0;
        scoreStats.mean = 0;
    }
    // Current
    scoreElements[0].textContent = scoreStats.currentCombo;
    // Best
    scoreElements[1].textContent = scoreStats.bestCombo;
    // Average
    scoreElements[2].textContent = scoreStats.mean;
};