// IDEAS FOR LESSONS FOR COURSE
// variable scope - different in event handlers and this.method() of classes - bind() method solution or varaible solution
// custom events using new Event() and new CustomEvent() for passing data along - https://developer.mozilla.org/en-US/docs/Web/API/document.createEvent




// Tic Tac Toe implemented in HTML5
// Sean Morrow
// May 2014

// game variables
var stage = null;
var canvas = null;
var turnCount = 0;
var aWinCombos = null;
var winner = 0;


// ????????????????
var me = this;


// game objects
var btnPlayAgain, ticTac0, ticTac1, ticTac2, ticTac3, ticTac4, ticTac5, ticTac6, ticTac7, ticTac8, winningLines, title;
// object to preload and handle all assets (spritesheet and sounds)
var assetManager;

var GameConstants = {
	"FRAME_RATE":30
};


// ------------------------------------------------------------ private methods

function resetMe() {
    // resetting all ticTac objects
	for (var n=0; n<9; n++) {
		this["ticTac" + n].resetMe();
	}

	// reset winning lines
	winningLines.gotoAndStop(8);
	// game variable resets
	winner = 0;
	turnCount = 0;

	// setup event listeners
	document.addEventListener("playerFinished", onPlayerFinished.bind(this), true);
	document.addEventListener("computerFinished", onComputerFinished, true);
	document.addEventListener("turnFinished", onTurnFinished, true);

    stage.update();
}

function checkWin() {
    // scroll through all combinations of wins
	for (var n=0; n<aWinCombos.length; n++) {
		if ((aWinCombos[n][0].getType() == TicTacState.X) && (aWinCombos[n][1].getType() == TicTacState.X) && (aWinCombos[n][2].getType() == TicTacState.X)) {
			winner = TicTacState.X;
			winningLines.gotoAndStop(n + 2);
			break;
		} else if ((aWinCombos[n][0].getType() == TicTacState.O) && (aWinCombos[n][1].getType() == TicTacState.O) && (aWinCombos[n][2].getType() == TicTacState.O)) {
			winner = TicTacState.O;
			winningLines.gotoAndStop(n + 2);
			break;
		}
	}

	if ((winner != 0) || (turnCount >= 9)) {
		// game over
		document.removeEventListener("playerFinished", onPlayerFinished, true);
        document.removeEventListener("computerFinished", onComputerFinished, true);
        document.removeEventListener("turnFinished", onTurnFinished, true);
		// add play again button
		stage.addChild(btnPlayAgain);
	}
}



function randomMe(low, high) {
    // returns a random number
	return Math.floor(Math.random() * (1 + high - low)) + low;
}

// ------------------------------------------------------------ event handlers
function onInit() {
	console.log(">> initializing");
	state = GameConstants.STATE_SETUP;

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
	background.cache(0,0,280,300);
	stage.addChild(background);
	stage.update();

    // enable mouseover events for the stage - disabled by default since they can be expensive
    stage.enableMouseOver();

	// construct preloader object to load spritesheet and sound assets
	assetManager = new AssetManager();
    document.addEventListener("onAssetsLoaded", onSetup);
    // load the assets
	assetManager.loadAssets();
}

function onSetup() {
	console.log(">> setup");
	// kill event listener
	document.removeEventListener("onAssetsLoaded", onSetup);

    /*
    // CLIP TESTING WITH ASSET MANAGER
    var clip = assetManager.getClip("TicTac");
    clip.gotoAndStop("xPlaced");
    stage.addChild(clip);
    stage.update();
    */

    // initialization
    title = assetManager.getClip("Title");
    title.x = 22;
    title.y = 16;
    stage.addChild(title);

    ticTac0 = new TicTac();
    ticTac0.positionMe(50,86);

    ticTac1 = new TicTac();
    ticTac1.positionMe(112,86);

    ticTac2 = new TicTac();
    ticTac2.positionMe(174,86);

    ticTac3 = new TicTac();
    ticTac3.positionMe(50,150);

    ticTac4 = new TicTac();
    ticTac4.positionMe(112,150);

    ticTac5 = new TicTac();
    ticTac5.positionMe(174,150);

    ticTac6 = new TicTac();
    ticTac6.positionMe(50,212);

    ticTac7 = new TicTac();
    ticTac7.positionMe(112,212);

    ticTac8 = new TicTac();
    ticTac8.positionMe(174,212);

    winningLines = assetManager.getClip("WinningLines");
    winningLines.x = 50;
    winningLines.y = 86;
    // set it to be blank (no winning lines)
    winningLines.gotoAndStop(8);
    stage.addChild(winningLines);

    // initialization
    btnPlayAgain = assetManager.getClip("BtnPlayAgain");
    btnPlayAgain.addEventListener("click", onReset);

    // construct an array referencing all ticTac objects in winning combinations
    aWinCombos = new Array([ticTac0,ticTac1,ticTac2],[ticTac3,ticTac4,ticTac5],[ticTac6,ticTac7,ticTac8],
                           [ticTac0,ticTac3,ticTac6],[ticTac1,ticTac4,ticTac7],[ticTac2,ticTac5,ticTac8],
                           [ticTac0,ticTac4,ticTac8],[ticTac2,ticTac4,ticTac6]);

    // update the stage
    stage.update();

    resetMe();
}

function onComputerFinished(e) {
    console.log("computer finished");
}

function onPlayerFinished(e) {
    console.log("player finished");

	var computerPlayed = false;

	// PASS ONE
	// is the computer only one O away from winning? if so then complete the win!
	for (var n=0; n<aWinCombos.length; n++) {
		// check combinations for computer about to win (two Os and a NONE)
		if ((aWinCombos[n][0].getType() == TicTacState.O) && (aWinCombos[n][1].getType() == TicTacState.O) && (aWinCombos[n][2].getType() == TicTacState.NONE)) {
			// complete the win
			aWinCombos[n][2].computeMe();
			computerPlayed = true;
			break;
		} else if ((aWinCombos[n][0].getType() == TicTacState.O) && (aWinCombos[n][1].getType() == TicTacState.NONE) && (aWinCombos[n][2].getType() == TicTacState.O)) {
			aWinCombos[n][1].computeMe();
			computerPlayed = true;
			break;
		} else if ((aWinCombos[n][0].getType() == TicTacState.NONE) && (aWinCombos[n][1].getType() == TicTacState.O) && (aWinCombos[n][2].getType() == TicTacState.O)) {
			aWinCombos[n][0].computeMe();
			computerPlayed = true;
			break;
		}
	}

	// PASS TWO
	// is the player only one X away from winning? if so then block it!
	if (computerPlayed == false) {
		for (n=0; n<aWinCombos.length; n++) {
			// check combinations for player about to win (two Xs and a NONE)
			if ((aWinCombos[n][0].getType() == TicTacState.X) && (aWinCombos[n][1].getType() == TicTacState.X) && (aWinCombos[n][2].getType() == TicTacState.NONE)) {
				// block the win
				aWinCombos[n][2].computeMe();
				computerPlayed = true;
				break;
			} else if ((aWinCombos[n][0].getType() == TicTacState.X) && (aWinCombos[n][1].getType() == TicTacState.NONE) && (aWinCombos[n][2].getType() == TicTacState.X)) {
				aWinCombos[n][1].computeMe();
				computerPlayed = true;
				break;
			} else if ((aWinCombos[n][0].getType() == TicTacState.NONE) && (aWinCombos[n][1].getType() == TicTacState.X) && (aWinCombos[n][2].getType() == TicTacState.X)) {
				aWinCombos[n][0].computeMe();
				computerPlayed = true;
				break;
			}
		}
	}

	// PASS THREE
	if (computerPlayed == false) {
		// otherwise randomly select a ticTac
		var randomIndex;
		// randomly select a ticTac object to take
		while (true) {
			randomIndex = randomMe(0,8);

            console.log("Test: " + me["ticTac" + randomIndex]);
            console.log(me["ticTac" + randomIndex].getType() + " == " + TicTacState.NONE)


            // is this spot free? If so use it!
			if (me["ticTac" + randomIndex].getType() == TicTacState.NONE) {
				me["ticTac" + randomIndex].computeMe();
				break;
			}
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
	resetMe();
	// remove play again button
	stage.removeChild(btnPlayAgain);
}
