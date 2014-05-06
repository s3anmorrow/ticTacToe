// Tic Tac Toe
// Sean Morrow
// May 2014

// game variables
var stage = null;
var canvas = null;

// array of all game objects currently in use
var usedList;
// game objects
//var background, sky, gameScreen, scoreboard, redPlane, prison1, prison2, prison3, redFactory, blueFactory, redBunker, blueBunker, tower, balloon, landscape;
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
	//document.removeEventListener("onAssetsLoaded", onSetup);

	// setup listener for ticker to actually update the stage
	//createjs.Ticker.setFPS(GameConstants.FRAME_RATE);
	//createjs.Ticker.addEventListener("tick", onTick);



    var clip = assetManager.getClip("TicTac");

    console.log("game.js test: " + clip);
    clip.gotoAndStop("xPlaced");

    stage.addChild(clip);
    stage.update();

    /*
	// setup event listeners for keyboard keys
	document.addEventListener("keydown", onKeyDown);
	document.addEventListener("keyup", onKeyUp);

	// game ready - show intro gameScreen
	gameScreen.showMe("Intro");

	// construct sky object for adding clouds to
	sky = new createjs.Container();
	stage.addChild(sky);

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
