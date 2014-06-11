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
    setTimeout(function() {
        // resetPlasma();
        resetTetsu();
        // codeCheck();
        // hadoken();
        tetsu();

    }, 200);
}

function perfect() {
    $ken.addClass('perfect');
    setTimeout(function() { $ken.removeClass('perfect'); }, 600);
    setInterval(function(){ 
        var plasmaLeft = -50;
        $plasma
    });
    $ken.css("background-position", "-160px -690px");
    $result.css("display", "block");
}

var plasmaDelay = 200;
var plasmaDistance = 40;
var plasmaTimer = null;
var plasmaOrigPos = -50;



function hadoken() {
    $ken.addClass('hadoken');
    setTimeout(function() { 
        $plasma.addClass('plasma'); 
        plasmaTimer = setInterval(function(){
            plasmaMove();
        }, plasmaDelay);  
    }, 400);
    setTimeout(function() { $ken.removeClass('hadoken'); }, 500);
}

function plasmaMove() {
    var plasmaCurrentPos = parseInt($plasma.css('left'));
    $plasma.css('left', ((plasmaCurrentPos + plasmaDistance) + 'px'));
    if (parseInt($plasma.css('left')) > 300) {
        resetPlasma();
        destroyCode();
        tryAgain(); 
    }
}

var tetsuDelay = 100;
var tetsuDistance = 40;
var tetsuTimer = null;
var kenOrigPos = -105;

function tetsuMove() {
    kenCurrentPos = parseInt($ken.css('left'));
    $ken.css('left', ((kenCurrentPos + tetsuDistance) + 'px'));
    if (parseInt($ken.css('left')) > 300) {
        tetsuDistance = -40
        destroyCode();
        tryAgain(); 

    } else if (parseInt($ken.css('left')) < -130) {
        resetTetsu();
    }
}

function resetTetsu() {
    $ken.removeClass('kick');
    $ken.css('left', (kenOrigPos + 'px'));
    clearInterval(tetsuTimer);
}

function resetPlasma() {
    $plasma.removeClass('plasma');
    $plasma.css('left', (plasmaOrigPos + 'px'));
    clearInterval(plasmaTimer);
}

function tetsu() {
    $ken.addClass('kick');
    tetsuTimer = setInterval(function(){
        tetsuMove();
    }, tetsuDelay);
}

function destroyCode() {
    $code.val(""); 
}

function noCode() {
    alert("Gimme yer code!");
}

function tryAgain() {
    $tryAgain.css("display", "block");
    setTimeout(function(){
        $tryAgain.css("display", "none")}, 800
        ); 
}

function codeCheck() {
    var random = Math.random();
    $result.val();
    // if ($code.val() == "") {
    //     noCode();
    // } else 
    if (random <= 0.25) {
        $ken.addClass('punch');
        setTimeout(function() { $ken.removeClass('punch'); }, 500);
        destroyCode();
        tryAgain();
    } else if ((random > 0.25) && (random <= 0.5) ) {
        $ken.addClass('kick');
        setTimeout(function() { $ken.removeClass('kick'); }, 500);
        destroyCode();
        tryAgain();
    } else if ((random > 0.25) && (random <= 0.75)) {
        hadoken();
    } else {
        var delay = 500;
        $ken.removeClass('stance');
        setTimeout(function(){
            audioElement.play();    
        }, delay);
        perfect();
    }
}

function reboot() {
    $ken.addClass('stance');
    $result.css("display", "none");
    destroyCode();
}






