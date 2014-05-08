// hacking static constants
var TicTac = function() {
    // private game variables
    var stage = window.stage;
    var assetManager = window.assetManager;

    // initialization
    var type = TicTacState.NONE;

    // construct custom event object for plane being killed
    var eventTurnFinished = new Event("turnFinished");
    var eventComputerFinished = new Event("computerFinished");
    var eventPlayerFinished = new Event("playerFinished");

    // grab clip for TicTac and add to stage canvas
    var clip = assetManager.getClip("TicTac");
    clip.gotoAndStop(type);
    stage.addChild(clip);

    // variable pointing to "this" closure to be used in all methods below in place of "this" - to combat any scope issues
    var me = this;

    // setup event listeners
    // note we are binding the TicTac function itself to be the this of the event handler
    clip.addEventListener("click", onClick);
    clip.addEventListener("mouseover", onOver);
    clip.addEventListener("mouseout", onOut);

    // ------------------------------------------------ get/set methods
    this.getType = function() {
        return type;
    };

    // ------------------------------------------------ event handler
    function onClick(e) {
        // player selecting ticTac
        me.playMe();
        // stop click from propogating further
        e.preventDefault();
    }

    function onOver(e) {
        clip.gotoAndStop(type + 1);
        stage.update();
    }


    function onOut(e) {
        clip.gotoAndStop(type);
        stage.update();
    }

    // ------------------------------------------------ public methods
    this.positionMe = function(x,y) {
        clip.x = x;
        clip.y = y;
    };

    this.playMe = function() {
        type = TicTacState.X;
        // adjust frame
        clip.gotoAndStop(type);
        me.disableMe();

        // you are almost forced to always dispatch from document since in canvas games there really are only the stage element and the document
        // it must be dispatched on an object of the DOM to go through the capture, target, bubble phase
        document.dispatchEvent(eventTurnFinished);
        document.dispatchEvent(eventPlayerFinished);
        stage.update();
    };

    this.computeMe = function() {
        type = TicTacState.O;
        // adjust frame
        clip.gotoAndStop(type);
        me.disableMe();
        document.dispatchEvent(eventTurnFinished);
        document.dispatchEvent(eventComputerFinished);
    };

    this.disableMe = function() {
        // disables the TicTac object
        clip.removeEventListener("mouseover", onOver);
        clip.removeEventListener("mouseout", onOut);
        clip.removeEventListener("click", onClick);
    };

    this.enableMe = function() {
        // disables the TicTac object
        clip.addEventListener("mouseover", onOver);
        clip.addEventListener("mouseout", onOut);
        clip.addEventListener("click", onClick);
    };

    this.resetMe = function() {
        // resetting the TicTac object back to initial state
        type = TicTacState.NONE;
        clip.gotoAndStop(type);
        me.enableMe();
    };
 };

// hacking static constants
var TicTacState = {
	"NONE":0,
	"X":2,
	"O":4
};
