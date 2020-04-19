function startGame() {
    buttonPress($bigButton);
    buttonOff();
    setTimeout(function () {
        codeCheck();
    }, 200);
}

function buttonOn() {
    $bigButton.on('click', function () {
        startGame();
        $response.html('');
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
    obj.css('height', '78px');
    obj.css('width', '75px');
    obj.css('marginTop', '4px');
    obj.css('left', "2px");
    setTimeout(function () {
        obj.css('height', origHeight);
        obj.css('width', origWidth);
        obj.css('marginTop', origMarginTop);
        obj.css('left', origMarginLeft);
    }, 200);
}

function resetTextCode() {
    editor.setValue('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
}

// ========== resets and end points =======
function reboot() {
    clearInterval(plasmaTimer);
    clearInterval(tetsuTimer);
    clearInterval(punchTimer);
    clearInterval(jumpTimer);
    resetTextCode();
    $ken.css('left', kenOrigPosLeft);
    $ken.css('top', kenOrigPosTop);
    $result.css("display", "none");
    $tryAgain.css("display", "none");
    $ken.addClass('stance');
    $response.html('');
    buttonOn();
    tally = 0;
    announceRound(0, 200)
}

function noCode() {
    $ken.addClass('angry');
    $response.html('"Gimme yer code you wussy"');
    editor.setValue('ENTER YOUR CODE HERE\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n');
    setTimeout(function () {
        $ken.removeClass('angry');
        $response.html('');
        buttonOn();
    }, 1200);
}


function explode() {
    $explosion.css('display', 'block');
    setTimeout(function () {
        resetTextCode()
    }, 250);

    setTimeout(function () {
        $explosion.css('display', 'none');


    }, 800);
}
function nuke() {
    $nuclear.css('display', 'block');
    $top.addClass('nuke-top');
    $bottom.addClass('nuke-bottom');
    setTimeout(function () {
        resetTextCode()
    }, 280);

    setTimeout(function () {
        $nuclear.css('display', 'none');
        $top.removeClass('nuke-top');
        $bottom.removeClass('nuke-bottom');

    }, 800);
}

//  ============== perfect ==============




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
    scoreCheck();

}

function plasmaMove() {
    var plasmaCurrentPos = parseInt($plasma.css('left'));
    $plasma.css('left', ((plasmaCurrentPos + plasmaDistance) + 'px'));
    if (parseInt($plasma.css('left')) > 110) {
        resetPlasma();
    }
}

function hadoken() {
    $('.hadoken-plasma').css('z-index', 3);
    $response.html("'That's Bullshit!'");
    $ken.addClass('hadoken');
    setTimeout(function () {
        $plasma.addClass('plasma');
        plasmaTimer = setInterval(function () {
            plasmaMove();
        }, plasmaDelay);
    }, 400);
    setTimeout(function () {
        $ken.removeClass('hadoken');
        $response.html('');
    }, 500);
    setTimeout(function () {
        nuke();
        $('.hadoken-plasma').css('z-index', 0);
    }, 1200);
}


// ============ tetsu kick ============

var tetsuDelay = 100;
var tetsuDistance = 40;
var tetsuTimer = null;

function resetTetsu() {
    $ken.removeClass('kick');
    $response.html('');
    $ken.css('left', (kenOrigPosLeft + 'px'));
    clearInterval(tetsuTimer);
    buttonOn();
    scoreCheck();

}

function tetsuMove() {
    kenCurrentPosLeft = parseInt($ken.css('left'));
    $ken.css('left', ((kenCurrentPosLeft + tetsuDistance) + 'px'));
    if (parseInt($ken.css('left')) > 90) {
        tetsuDistance = -40;
        nuke();
    } else if (parseInt($ken.css('left')) < -250) {
        resetTetsu();
        tetsuDistance = 40
    }
}



function tetsu() {
    $response.html('"This code looks a lot like bullshit!"');
    $ken.addClass('kick');
    tetsuTimer = setInterval(function () {
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
    $response.html('');
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
    $response.html('"Are you kidding me?"');
    $ken.addClass('punch');
    punchTimer = setInterval(function () {
        punchMove();
    }, punchDelay)
    setTimeout(function () {
        explode();

    }, 140);
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
    jumpTimer = setInterval(function () {
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
        $ken.removeClass('jump');
        clearInterval(jumpTimer);
        jumpDirection = -40;
        jumpRight = 20;
        $ken.css('top', kenOrigPosTop);
        $ken.css('left', kenOrigPosLeft);
        scoreCheck();

    }
}

function jumpBack() {
    jumpRight = -20;
    jumpDirection = -40;
    $ken.addClass('jump');
    jumpTimer = setInterval(function () {
        jumpBackMove();
    }, jumpDelay)

}

function perfect() {
    $ken.addClass('perfect');
    setTimeout(function () { $ken.removeClass('perfect'); }, 600);
    $ken.css("background-position", "-320px -1380px");
    $result.css("display", "block");
    $tryAgain.css("display", "block");
}

function youLose() {
    clearInterval(plasmaTimer);
    clearInterval(tetsuTimer);
    clearInterval(punchTimer);
    clearInterval(jumpTimer);
    $ken.addClass('lost');
    $ken.removeClass('stance');
    $ken.removeClass('kick');
    $ken.removeClass('hadoken');
    $ken.removeClass('punch');
    $response.html('You Lose');
    youLoseSound.play();
    setTimeout(function () {
        laughSound.play();
    }, 1500);


    setTimeout(function () { $ken.removeClass('lost'); }, 600);
    $ken.css("background-position", "-320px -2300px");
    $tryAgain.css("display", "block");

}

function scoreCheck() {
    if (tally == 3) {
        youLose();
        buttonOff();
    }
}

function announceRound(round, delay) {
    setTimeout(function () {
        if (round == 2) {
            finalSound.play();
        } else if (round < 2) {
            roundSound.play();
        }
    }, delay);
    setTimeout(function () {
        if (round === 0) {
            oneSound.play();
        } else if (round === 1) {
            twoSound.play();
        }
    }, delay + 900);
    setTimeout(function () {
        if (round < 2) {
            fightSound.play();
        }
    }, delay + 1700);

}

function codeCheck() {
    var random = Math.random();
    if (editor.getValue().trim() == "") {
        noCode();
        hurtSound.play();
    } else if (random <= 0.25) {
        jumpForward();
        setTimeout(function () {
            punchSound.play();
        }, 710);
        tally += 1;
        announceRound(tally, 3000)
    } else if ((random > 0.25) && (random <= 0.5)) {
        tetsu();
        kickSound.play();
        setTimeout(function () {
            explosionSound.play();
        }, 800);
        tally += 1;
        announceRound(tally, 2000)
    } else if ((random > 0.25) && (random <= 0.75)) {
        hadoken();
        hadokenSound.play();
        setTimeout(function () {
            explosionSound.play();
        }, 1200);
        tally += 1;
        announceRound(tally, 2500)
    } else {
        $ken.removeClass('stance');
        setTimeout(function () {
            youWinSound.play();
        }, 500);
        setTimeout(function () {
            if (tally === 0) {
                perfectSound.play();
            }
        }, 1200);
        perfect();
    }
}








