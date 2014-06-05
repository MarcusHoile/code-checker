function buttonPress(obj){
    var origHeight = obj.style.height;
    var origWidth = obj.style.width;
    var origMarginLeft = obj.style.left;
    var origMarginTop = obj.style.marginTop;
    obj.style.height = '161px';
    obj.style.width = '161px';
    obj.style.marginLeft = '7px';
    obj.style.marginTop = '3px';
    setTimeout(function(){
        obj.style.height = origHeight;
        obj.style.width = origWidth;
        obj.style.marginLeft = origMarginLeft;
        obj.style.marginTop = origMarginTop;
    }, 200);
}

function perfect() {
    $ken.addClass('perfect');
    setTimeout(function() { $ken.removeClass('perfect'); }, 600);
    $ken.css("background-position", "-140px -800px");
}


function codeCheck() {
    var random = Math.random();
    if (random <= 0.25) {
        $ken.addClass('punch');
        setTimeout(function() { $ken.removeClass('punch'); }, 150);
    } else if ((random > 0.25) && (random <= 0.5) ) {
        $ken.addClass('kick');
        setTimeout(function() { $ken.removeClass('kick'); }, 500);
    } else if ((random > 0.25) && (random <= 0.75)) {
        $ken.addClass('hadoken');
        setTimeout(function() { $ken.removeClass('hadoken'); }, 500);               
    } else {
        var delay = 500;
        $ken.removeClass('stance');
        setTimeout(function(){
            audioElement.play();    
        }, delay);
        perfect();
    }
}
