function buttonPress(obj){
    var origHeight = obj.style.height;
    var origWidth = obj.style.width;
    var origMarginLeft = obj.style.left;
    var origMarginTop = obj.style.marginTop;
    obj.style.height = '80px';
    obj.style.width = '80px';
    obj.style.marginLeft = '4px';
    obj.style.marginTop = '2px';
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
    $result.css("display", "block");
}

function destroyCode() {
    $code.val(""); 
}

function noCode() {
    alert("Gimme yer code!");
}

function tryAgain() {
    // clearTimeout(timeout);
    $tryAgain.css("display", "block");
    setTimeout(function(){
        $tryAgain.css("display", "none")}, 800
    ); // .delay(1000).css("display", "none");
}

function codeCheck() {
    var random = Math.random();
    $result.val();
    if ($code.val() == "") {
        noCode();
    // } else if ($code.css("display") == "block") {
    // } else if ($result.css("display") == "block") {


    } else if (random <= 0.25) {
        $ken.addClass('punch');
        setTimeout(function() { $ken.removeClass('punch'); }, 150);
        destroyCode();
        tryAgain();
    } else if ((random > 0.25) && (random <= 0.5) ) {
        $ken.addClass('kick');
        setTimeout(function() { $ken.removeClass('kick'); }, 500);
        destroyCode();
        tryAgain();
    } else if ((random > 0.25) && (random <= 0.75)) {
        $ken.addClass('hadoken');
        setTimeout(function() { $ken.removeClass('hadoken'); }, 500);               
        destroyCode();
        tryAgain();
    } else {
        var delay = 500;
        $ken.removeClass('stance');
        setTimeout(function(){
            audioElement.play();    
        }, delay);
        perfect();
    }
}
