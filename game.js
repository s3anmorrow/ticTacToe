// Tic Tac Toe implemented in HTML5
// Sean Morrow
// May 2014

// game variables
var stage = null;
var canvas = null;
var turnCount = 0;
var aWinCombos = null;
var winner = 0;

// game objects
var btnPlayAgain, ticTac0, ticTac1, ticTac2, ticTac3, ticTac4, ticTac5, ticTac6, ticTac7, ticTac8, winningLines, title;
// object to preload and handle all assets (spritesheet and sounds)
var assetManager;

var GameConstants = {
	"FRAME_RATE":30
};


// ------------------------------------------------------------ private methods

function resetMe() {
	/*
    // resetting all ticTac objects
	for (var n:int=0; n<9; n++) {
		this["ticTac" + n].resetMe();
	}
    */

	// reset winning lines
	winningLines.gotoAndStop(0);
	// game variable resets
	winner = 0;
	turnCount = 0;

	// setup event listeners
	//this.addEventListener(TicTac.PLAYER_FINISHED, onPlayerFinished, true);
	//this.addEventListener(TicTac.COMPUTER_FINISHED, onComputerFinished, true);
	//this.addEventListener(TicTac.TURN_FINISHED, onTurnFinished, true);

    stage.update();
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

	// setup listener for when assetManager has loaded the gameScreen assets
	//document.addEventListener("onScreensLoaded", onPreloadAssets);
	// construct preloader object to load spritesheet and sound assets
	assetManager = new AssetManager();
	// load screens first so I can display the preload gameScreen
	//assetManager.loadScreens();

    // !!!!!!!!!!!!!! TESTING
    // jumping right to loading assets for now
    onPreloadAssets();
}

function onPreloadAssets() {
	console.log(">> preloading assets");

    // kill eventlistener
	//document.removeEventListener("onScreensLoaded", onPreloadAssets);

	// construct gameScreen object
	//gameScreen = new Screen();
	//gameScreen.showMe("Preload");
	// setup listeners for when assetManager has loaded each asset and all assets
	//document.addEventListener("onAssetLoaded", gameScreen.progressMe);
	document.addEventListener("onAssetsLoaded", onSetup);
	// load the rest of the assets (minus gameScreen assets)
	assetManager.loadAssets();
}

function onSetup() {
	console.log(">> setup");
	// kill event listeners
	//document.removeEventListener("onAssetLoaded", gameScreen.progressMe);
	document.removeEventListener("onAssetsLoaded", onSetup);

	// setup listener for ticker to actually update the stage
	//createjs.Ticker.setFPS(GameConstants.FRAME_RATE);
	//createjs.Ticker.addEventListener("tick", onTick);


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
    //btnPlayAgain.addEventListener(MouseEvent.CLICK, onReset);

    // construct an array referencing all ticTac objects in winning combinations
    aWinCombos = new Array([ticTac0,ticTac1,ticTac2],[ticTac3,ticTac4,ticTac5],[ticTac6,ticTac7,ticTac8],
                           [ticTac0,ticTac3,ticTac6],[ticTac1,ticTac4,ticTac7],[ticTac2,ticTac5,ticTac8],
                           [ticTac0,ticTac4,ticTac8],[ticTac2,ticTac4,ticTac6]);

    resetMe();

    // update the stage
    stage.update();
    console.log(">> intro gameScreen ready");
}

function onGameEvent(e) {
	console.log("gameEvent: " + e.id);


	// what type of event has occurred?
	switch (e.id){
		case "planeKilled":

			break;
	}
}

// game loop method
function onTick() {

    console.log("tick!");

	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TESTING
	//document.getElementById("fps").innerHTML = createjs.Ticker.getMeasuredFPS();
	// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    /*
	// STEP I : KEYBOARD MONITORING
	if (upKey) redPlane.rotateUp();
	else if (downKey) redPlane.rotateDown();

	// STEP II : UPDATING STEP
	// scroll through all used objects in game and update them all
	var length = usedList.length;
	var target;
	for (var n=0; n<length; n++) {
		target = usedList[n];
		if (target !== null) target.updateMe();
	}
    */

	// STEP III : RENDERING
	// update the stage!
	//stage.update();
}
