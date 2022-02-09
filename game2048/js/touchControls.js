document.getElementsByClassName('grid')[0].addEventListener('touchstart', handleTouchStart, false);        
document.getElementsByClassName('grid')[0].addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    evt.preventDefault();
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }
    evt.preventDefault();
    //console.log(evt);
    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    
    const dispatchKeypress = (keyCode) => {
        const swipe = new KeyboardEvent('keyup', {
            'keyCode': keyCode,
            'which': keyCode
        });
        document.dispatchEvent(swipe);
    };
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
            dispatchKeypress(37);
        } else {
            /* left swipe */
            dispatchKeypress(39);
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
            dispatchKeypress(38);
        } else { 
            /* up swipe */
            dispatchKeypress(40);
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};