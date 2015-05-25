// Tic Tac Toe implemented in HTML5
// Sean Morrow
// May 2014

// the base width and height of game that graphics are designed for (pre-resizing for android screens)
var BASE_HEIGHT = 300;
var BASE_WIDTH = 280;
var scaleRatio = 1;
// am I running on a mobile device?
var mobile = false;

// game variables
var stage = null;
var canvas = null;
var turnCount = 0;
var aWinCombos = null;
var winner = "NONE";
var gameOn = true;
var mobile = false;

// game objects
var assetManager;
var ticTac0, ticTac1, ticTac2, ticTac3, ticTac4, ticTac5, ticTac6, ticTac7, ticTac8;
var winLine;
var title;
var btnPlayAgain;

// is this a mobile device and what type?
var ua = navigator.userAgent.toLowerCase();
if (ua.match(/(android)/)) {
    mobile = true;
    console.log(">> device info: " + ua);
}

// ------------------------------------------------------------ private methods
function resetMe() {
    // resetting all ticTac objects
    for (var n=0; n<9; n++) {
        this["ticTac" + n].resetMe();
    }

    // game variable resets
    winner = "NONE";
    turnCount = 0;
    gameOn = true;

    stage.update();
    console.log(">> game ready");
}

function checkWin() {
    // scroll through all combinations of wins
    for (var n=0; n<aWinCombos.length; n++) {
        if ((aWinCombos[n][0].getType() == "X") && (aWinCombos[n][1].getType() == "X") && (aWinCombos[n][2].getType() == "X")) {
            winner = "X";
            winLine.gotoAndStop("win" + n);
            stage.addChild(winLine);
            break;
        } else if ((aWinCombos[n][0].getType() == "O") && (aWinCombos[n][1].getType() == "O") && (aWinCombos[n][2].getType() == "O")) {
            winner = "O";
            winLine.gotoAndStop("win" + n);
            stage.addChild(winLine);
            break;
        }
    }

    if ((winner !== "NONE") || (turnCount >= 9)) {
        gameOn = false;
        // disable all ticTacs
        for (n=0; n<9; n++) {
            this["ticTac" + n].disableMe();
        }

        // add play again button
        stage.addChild(btnPlayAgain);
    }
    stage.update();
}

function randomMe(low, high) {
    // returns a random number
	return Math.floor(Math.random() * (1 + high - low)) + low;
}

// ------------------------------------------------------------ event handlers
function onInit() {
	console.log(">> initializing");

	// get reference to canvas
	canvas = document.getElementById("stage");
	// set canvas to as wide/high as the browser window
	canvas.width = 280;
	canvas.height = 300;
	// create stage object
	stage = new createjs.Stage(canvas);

	// color the background of the game with a shape
	background = new createjs.Shape();
	background.graphics.beginFill("#FFFFFF").drawRect(0,0,280,300);
	stage.addChild(background);
	stage.update();

    // is a touch screen supported?
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
        mobile = true;
    }

	// construct preloader object to load spritesheet and sound assets
	assetManager = new AssetManager();
    stage.addEventListener("onAllAssetsLoaded", onSetup);
    // load the assets
	assetManager.loadAssets(manifest);

    // initial resize of app to adjust for device screen size
    onResize();
}

function onSetup() {
	console.log(">> setup");
	// kill event listener
	stage.removeEventListener("onAllAssetsLoaded", onSetup);

    // initialization
    title = assetManager.getSprite("assets");
    title.gotoAndStop("title");
    title.x = 22;
    title.y = 16;
    stage.addChild(title);

    ticTac0 = new TicTac(assetManager, stage, mobile);
    ticTac0.positionMe(50,86);

    ticTac1 = new TicTac(assetManager, stage, mobile);
    ticTac1.positionMe(112,86);

    ticTac2 = new TicTac(assetManager, stage, mobile);
    ticTac2.positionMe(174,86);

    ticTac3 = new TicTac(assetManager, stage, mobile);
    ticTac3.positionMe(50,150);

    ticTac4 = new TicTac(assetManager, stage, mobile);
    ticTac4.positionMe(112,150);

    ticTac5 = new TicTac(assetManager, stage, mobile);
    ticTac5.positionMe(174,150);

    ticTac6 = new TicTac(assetManager, stage, mobile);
    ticTac6.positionMe(50,212);

    ticTac7 = new TicTac(assetManager, stage, mobile);
    ticTac7.positionMe(112,212);

    ticTac8 = new TicTac(assetManager, stage, mobile);
    ticTac8.positionMe(174,212);

    winLine = assetManager.getSprite("assets");
    winLine.x = 50;
    winLine.y = 86;

    btnPlayAgain = assetManager.getSprite("assets");
    btnPlayAgain.x = 65;
    btnPlayAgain.y = 272;
    btnPlayAgain.buttonBuilder = new ButtonBuilder(btnPlayAgain, ["btnPlayAgain_up", "btnPlayAgain_over", "btnPlayAgain_over"], stage);
    btnPlayAgain.buttonBuilder.setMobile(mobile);
    btnPlayAgain.addEventListener("click", onReset);

    // construct an array referencing all ticTac objects in winning combinations
    aWinCombos = [[ticTac0,ticTac1,ticTac2],[ticTac3,ticTac4,ticTac5],[ticTac6,ticTac7,ticTac8],
                  [ticTac0,ticTac3,ticTac6],[ticTac1,ticTac4,ticTac7],[ticTac2,ticTac5,ticTac8],
                  [ticTac0,ticTac4,ticTac8],[ticTac2,ticTac4,ticTac6]];

    // setup game listeners that will persist throughout the lifetime of the game
    stage.addEventListener("playerFinished", onPlayerFinished, true);
    stage.addEventListener("computerFinished", onComputerFinished, true);
    stage.addEventListener("turnFinished", onTurnFinished, true);

    // listener for browser resize (on desktop) to resize game
    window.addEventListener("resize", onResize);

    // update the stage
    stage.update();
}

function onResize(e) {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var bestFit = false;
    if (bestFit) {
        // !!!!!!!!!!!!! probably drop this bestfit approach since it stretches things bad
        // scale to exact fit
        stage.scaleX = w / BASE_WIDTH;
        stage.scaleY = h / BASE_HEIGHT;

        // adjust canvas size
        stage.canvas.width = BASE_WIDTH * stage.scaleX;
        stage.canvas.height = BASE_HEIGHT * stage.scaleY;
    } else {
        // keep aspect ratio
        scaleRatio = Math.min(w / BASE_WIDTH, h / BASE_HEIGHT);
        stage.scaleX = scaleRatio;
        stage.scaleY = scaleRatio;

        // adjust canvas size
        canvas.width = BASE_WIDTH * scaleRatio;
        canvas.height = BASE_HEIGHT * scaleRatio;
    }
}

function onComputerFinished(e) {
    console.log("computer finished");
}

function onPlayerFinished(e) {
    console.log("player finished");
    //ticTac8.computeMe();

    if (!gameOn) return;

    // PASS ONE
    // is the computer only one O away from winning? if so then complete the win!
    for (var n=0; n<aWinCombos.length; n++) {
        // check combinations for computer about to win (two Os and a NONE)
        if ((aWinCombos[n][0].getType() == "O") && (aWinCombos[n][1].getType() == "O") && (aWinCombos[n][2].getType() == "NONE")) {
            // complete the win
            aWinCombos[n][2].computeMe();
            return;
        } else if ((aWinCombos[n][0].getType() == "O") && (aWinCombos[n][1].getType() == "NONE") && (aWinCombos[n][2].getType() == "O")) {
            aWinCombos[n][1].computeMe();
            return;
        } else if ((aWinCombos[n][0].getType() == "NONE") && (aWinCombos[n][1].getType() == "O") && (aWinCombos[n][2].getType() == "O")) {
            aWinCombos[n][0].computeMe();
            return;
        }
    }

    // PASS TWO
    // is the player only one X away from winning? if so then block it!
    for (n=0; n<aWinCombos.length; n++) {
        // check combinations for player about to win (two Xs and a NONE)
        if ((aWinCombos[n][0].getType() == "X") && (aWinCombos[n][1].getType() == "X") && (aWinCombos[n][2].getType() == "NONE")) {
            // block the win
            aWinCombos[n][2].computeMe();
            return;
        } else if ((aWinCombos[n][0].getType() == "X") && (aWinCombos[n][1].getType() == "NONE") && (aWinCombos[n][2].getType() == "X")) {
            aWinCombos[n][1].computeMe();
            return;
        } else if ((aWinCombos[n][0].getType() == "NONE") && (aWinCombos[n][1].getType() == "X") && (aWinCombos[n][2].getType() == "X")) {
            aWinCombos[n][0].computeMe();
            return;
        }
    }

    // PASS THREE
    // otherwise randomly select a ticTac
    var randomIndex;
    // randomly select a ticTac object to take
    while (true) {
        randomIndex = randomMe(0,8);
        // is this spot free? If so use it!
        if (this["ticTac" + randomIndex].getType() == "NONE") {
            this["ticTac" + randomIndex].computeMe();
            break;
        }
    }
}

function onTurnFinished(e) {
    console.log("turn finished");

	// increment turn counter
	turnCount++;
	// do we have a winner now?
	checkWin();
}

function onReset(e) {
    // remove play again button / winLine
	stage.removeChild(btnPlayAgain);
    stage.removeChild(winLine);
    // reset the game
	resetMe();
}

// ------------------------------------------------------ game entry point
if (mobile) {
    document.addEventListener("deviceready", onInit, false);
} else {
    window.addEventListener("load", onInit, false);
}
