var isPaused = false;
// https://stackoverflow.com/questions/16554094/canvas-requestanimationframe-pause
window.requestAnimFrame = (function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();

// Отслеживаем нажатия клавишы
document.addEventListener("keydown", function(e) {
    // Если нажата клавиша ESC,
    if (e.which !== 27) return;
    console.log('Paused');
    isPaused = !isPaused;
    // Рисуем иконку паузы
    pauseDisplay();
});