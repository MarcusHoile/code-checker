function startGame(){
    if ($ken.hasClass('kick') || $ken.hasClass('punch') || $ken.hasClass('hadoken')) {
        reboot();
        buttonPress($bigButton);
    } else {
        reboot();
        buttonPress($bigButton);
        setTimeout(function() {
            codeCheck();     
        }, 200);
    }
}


function buttonPress(obj) {
    var origHeight = obj.css('height');
    var origWidth = obj.css('width');
    var origMarginLeft = obj.css('left');
    var origMarginTop = obj.css('marginTop');
    obj.css('height','80px');
    obj.css('width', '80px');
    obj.css('left', '4px');
    obj.css('marginTop', '2px');
    setTimeout(function(){
        obj.css('height', origHeight);
        obj.css('width', origWidth);
        obj.css('left', origMarginLeft);
        obj.css('marginTop', origMarginTop);
    }, 200);
}

var kenOrigPosLeft = -105;
var kenOrigPosTop = 0;

// ========== resets and end points =======
function reboot() {
    clearInterval(plasmaTimer);
    clearInterval(tetsuTimer);
    clearInterval(punchTimer);
    $ken.removeClass('kick');
    $ken.removeClass('punch');
    $ken.removeClass('hadoken');
    $ken.addClass('stance');
    $ken.css('left', kenOrigPosLeft)
    $ken.css('top', kenOrigPosTop)   
    $result.css("display", "none");
    $tryAgain.css("display", "none");
    destroyCode();
}
function destroyCode() {
    $code.val(""); 
}

function noCode() {
    alert("Gimme yer code!");
}

function tryAgain() {
    $tryAgain.css("display", "block");
}

//  ============== perfect ==============

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


// ----------- hadoken and plasm ----------

var plasmaDelay = 200;
var plasmaDistance = 40;
var plasmaTimer = null;
var plasmaOrigPos = -50;


function resetPlasma() {
    $plasma.removeClass('plasma');
    $plasma.css('left', (plasmaOrigPos + 'px'));
    clearInterval(plasmaTimer);
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


// ============ tetsu kick ============

var tetsuDelay = 100;
var tetsuDistance = 40;
var tetsuTimer = null;

function tetsuMove() {
    kenCurrentPosLeft = parseInt($ken.css('left'));
    $ken.css('left', ((kenCurrentPosLeft + tetsuDistance) + 'px'));
    if (parseInt($ken.css('left')) > 300) {
        tetsuDistance = -40
        destroyCode();
        tryAgain(); 

    } else if (parseInt($ken.css('left')) < -130) {
        reboot();
        tetsuDistance = 40
    }
}

function resetTetsu() {
    $ken.removeClass('kick');
    $ken.css('left', (kenOrigPosLeft + 'px'));
    clearInterval(tetsuTimer);
}

function tetsu() {
    $ken.addClass('kick');
    tetsuTimer = setInterval(function(){
        tetsuMove();
    }, tetsuDelay);
}




//  ============== dragon punch ============
var punchDelay = 100;
var punchTimer = null;
var punchDistance = -40;

function resetPunch() {
 $ken.removeClass('punch');
 $ken.css('top', (kenOrigPosTop + 'px'));
 clearInterval(punchTimer);   
}

function punchMove() {
    kenCurrentPosTop = parseInt($ken.css('top'));
    $ken.css('top', ((kenCurrentPosTop + punchDistance) + 'px'));
    if (parseInt($ken.css('top')) < -120) {
        punchDistance = 40;
        destroyCode();
        tryAgain(); 

    } else if (parseInt($ken.css('top')) > kenOrigPosTop) {
        resetPunch();
        punchDistance = -40;
    }
}

function dragonPunch() {
    $ken.addClass('punch');
    punchTimer = setInterval(function() {
        punchMove();
    }, punchDelay)
}



//  ============== jump ============
var jumpDelay = 100;
var jumpTimer = null;
var jumpUp = -40;
var jumpRight = 40;



function jumpMove() {
    kenCurrentPosLeft = parseInt($ken.css('left'));
    kenCurrentPosTop = parseInt($ken.css('top'));

    $ken.css('left', ((kenCurrentPosLeft + jumpRight) + 'px'));
    $ken.css('top', ((kenCurrentPosTop + jumpUp) + 'px'));

    if (parseInt($ken.css('top')) < -120) {
        jumpUp = 40
    }
    if (parseInt($ken.css('left')) > 220) {
        $ken.removeClass('jump');
       clearInterval(jumpTimer); 
       dragonPunch();
   }
}



function jump() {
    $ken.addClass('jump');
    jumpTimer = setInterval(function() {
        jumpMove();
    }, jumpDelay)
}

function codeCheck() {
    var random = Math.random();
    $result.val();
    // if ($code.val() == "") {
    //     noCode();
    // } else 
    if (random <= 0.25) {
        jump();
    } else if ((random > 0.25) && (random <= 0.5) ) {
        tetsu();
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








