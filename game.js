// Tic Tac Toe
// Sean Morrow
// May 2014

// game variables
var stage = null;
var canvas = null;

// game objects
var gameOverScreen, ticTac0, ticTac1, ticTac2, ticTac3, ticTac4, ticTac5, ticTac6, ticTac7, ticTac8, winningLines, title;
// object to preload and handle all assets (spritesheet and sounds)
var assetManager;

// state of the game
var state;

var GameConstants = {
	"FRAME_RATE":30,
	"STARTING_LIVES":5,
	"SURVIVORS_PER_PRISON":3,
	"SURVIVORS_REQ_FOR_BOMB":8,
	"KILLS_FOR_BALLOON":10,
	"RED_START_PRODUCTION_FREQ":15,
	"RED_PRODUCTION_PER_WORKER":1.5,
	"STATE_SETUP":-1,
	"STATE_INTRO":0,
	"STATE_INSTRUCT":1,
	"STATE_CREDITS":2,
	"STATE_PLAYING":3,
	"STATE_GAMEOVER":4
};


// ------------------------------------------------------------ private methods
function startGame() {
	// initialization

	// change stage of game
	state = GameConstants.STATE_PLAYING;
}

function stopGame(win) {


	state = GameConstants.STATE_GAMEOVER;
}

function resetGame() {


	state = GameConstants.STATE_INTRO;
}

function randomMe(iLower,iUpper) {
	// randomly selects returns a number between range
	var iRandomNum = 0;
	iRandomNum = Math.round(Math.random() * (iUpper - iLower)) + iLower;
	return iRandomNum;
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
    /*
    title = new Title();
    title.x = -17;
    title.y = 16;
    this.addChild(title);
    */

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

    stage.update();

    /*
    winningLines = new WinningLines();
    winningLines.x = 50;
    winningLines.y = 86;
    this.addChild(winningLines);

    // initialization
    gameOverScreen = new GameOverScreen();
    gameOverScreen.btnPlayAgain.addEventListener(MouseEvent.CLICK, onReset);

    // construct an array referencing all ticTac objects in winning combinations
    aWinCombos = new Array([ticTac0,ticTac1,ticTac2],[ticTac3,ticTac4,ticTac5],[ticTac6,ticTac7,ticTac8],
                           [ticTac0,ticTac3,ticTac6],[ticTac1,ticTac4,ticTac7],[ticTac2,ticTac5,ticTac8],
                           [ticTac0,ticTac4,ticTac8],[ticTac2,ticTac4,ticTac6]);
    */



    /*
	// game ready - show intro gameScreen
	gameScreen.showMe("Intro");

	// change state of game
	state = GameConstants.STATE_INTRO;
	console.log(">> intro gameScreen ready");
    */
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
