function startGame(){
    buttonPress($bigButton);
    buttonOff();   
    setTimeout(function() {
        codeCheck(); 
        // jumpForward();
    }, 200);
}

function buttonOn() {
    $bigButton.on('click', function() {
        startGame();
        $tryAgain.css("display", "none");
    });
}

function buttonOff() {
    $('#button').off('click');
}

function buttonPress(obj) {
    var origHeight = obj.css('height');
    var origWidth = obj.css('width');
    var origMarginLeft = obj.css('left');
    var origMarginTop = obj.css('marginTop');
    obj.css('height','78px');
    obj.css('width', '75px');
    obj.css('marginTop', '4px');
    obj.css('left', "2px");
    setTimeout(function(){
        obj.css('height', origHeight);
        obj.css('width', origWidth);
        obj.css('marginTop', origMarginTop);
        obj.css('left', origMarginLeft);
    }, 200);
}



// ========== resets and end points =======
function reboot() {
    clearInterval(plasmaTimer);
    clearInterval(tetsuTimer);
    clearInterval(punchTimer);
    clearInterval(jumpTimer);
    $ken.css('left', kenOrigPosLeft);
    $ken.css('top', kenOrigPosTop);   
    $result.css("display", "none");
    $tryAgain.css("display", "none");
}

function destroyCode() {
    $code.val(""); 
}

function noCode() {
    $ken.addClass('angry');
    setTimeout(function(){
        $ken.removeClass('angry');
    }, 1200);
}

function tryAgain() {
    $tryAgain.css("display", "block");
    setTimeout(function(){
        $tryAgain.css("display", "none");
    }, 800);
}

function explode() {
    $explosion.css('display', 'block');
    editor.setValue('');

    setTimeout(function() {
        $explosion.css('display', 'none');

    }, 800);
}

//  ============== perfect ==============

function perfect() {
    $tryAgain.css("display", "none");
    $ken.addClass('perfect');
    setTimeout(function() { $ken.removeClass('perfect'); }, 600);
    $ken.css("background-position", "-320px -1380px");
    $result.css("display", "block");
    setTimeout(function() {
        $ken.addClass('stance');
        buttonOn();
        $result.css("display", "none");
    }, 2000);
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
    buttonOn();
}

function plasmaMove() {
    var plasmaCurrentPos = parseInt($plasma.css('left'));
    $plasma.css('left', ((plasmaCurrentPos + plasmaDistance) + 'px'));
    if (parseInt($plasma.css('left')) > 150) {
        resetPlasma();
        destroyCode();
        tryAgain(); 
    }
}

function hadoken() {
    $tryAgain.css("display", "none");
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

function resetTetsu() {
    $ken.removeClass('kick');
    $ken.css('left', (kenOrigPosLeft + 'px'));
    clearInterval(tetsuTimer);
    buttonOn();
}

function tetsuMove() {
    kenCurrentPosLeft = parseInt($ken.css('left'));
    $ken.css('left', ((kenCurrentPosLeft + tetsuDistance) + 'px'));
    if (parseInt($ken.css('left')) > 90) {
        tetsuDistance = -40;
        explode();
        destroyCode();
        tryAgain(); 
    } else if (parseInt($ken.css('left')) < -250) {
        resetTetsu();
        tetsuDistance = 40
    }
}



function tetsu() {
    $tryAgain.css("display", "none");
    $ken.addClass('kick');
    tetsuTimer = setInterval(function(){
        tetsuMove();
    }, tetsuDelay);
}




//  ============== dragon punch ============
var punchDelay = 60;
var punchTimer = null;
var punchDistance = -40;

function resetPunch() {
    punchDistance = -40;
    $ken.removeClass('punch');
    clearInterval(punchTimer);   
    buttonOn();

}

function punchMove() {
    kenCurrentPosTop = parseInt($ken.css('top'));
    $ken.css('top', ((kenCurrentPosTop + punchDistance) + 'px'));
    if (parseInt($ken.css('top')) < -110) {

        punchDistance = 40;
    } else if (parseInt($ken.css('top')) > (jumpHeight + 260)) {
        resetPunch();
        jumpBack();
    }
}

function dragonPunch() {
    $tryAgain.css("display", "none");
    $ken.addClass('punch');
    punchTimer = setInterval(function() {
        punchMove();
    }, punchDelay)
}



//  ============== jump ============
var jumpDelay = 80;
var jumpTimer = null;
var jumpDirection = -40;
var jumpRight = 20;
var jumpHeight = -120;



function jumpForwardMove() {
    kenCurrentPosLeft = parseInt($ken.css('left'));
    kenCurrentPosTop = parseInt($ken.css('top'));

    $ken.css('left', ((kenCurrentPosLeft + jumpRight) + 'px'));
    $ken.css('top', ((kenCurrentPosTop + jumpDirection) + 'px'));

    if (parseInt($ken.css('top')) < jumpHeight) {
        jumpDirection = 40
    }
    if (parseInt($ken.css('top')) > 140) {
        $ken.removeClass('jump');
        clearInterval(jumpTimer); 
        dragonPunch();
    }
}

function jumpForward() {
    $tryAgain.css("display", "none");
    $ken.addClass('jump');
    jumpTimer = setInterval(function() {
        jumpForwardMove();
    }, jumpDelay)
}


function jumpBackMove() {
    kenCurrentPosLeft = parseInt($ken.css('left'));
    kenCurrentPosTop = parseInt($ken.css('top'));

    $ken.css('left', ((kenCurrentPosLeft + jumpRight) + 'px'));
    $ken.css('top', ((kenCurrentPosTop + jumpDirection) + 'px'));

    if (parseInt($ken.css('top')) < -120) {
        jumpDirection = 40
    }
    if (parseInt($ken.css('left')) < kenOrigPosLeft) {
        reboot();
        $ken.removeClass('jump');
        clearInterval(jumpTimer); 
        jumpDirection = -40;
        jumpRight = 20;
    }
}

function jumpBack() {
    jumpRight = -20;
    jumpDirection = -40;
    $ken.addClass('jump');
    jumpTimer = setInterval(function() {
        jumpBackMove();
    }, jumpDelay)

}

function codeCheck() {
    var random = Math.random();
    $result.val();
    // if ($code.val() == "") {
    //     noCode();
    // } else 
    if (random <= 0.25) {
        jumpForward();
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








