// hacking static constants
var TicTac = function() {
    // private game variables
    var stage = window.stage;
    var assetManager = window.assetManager;

    // initialization
    var type = TicTacState.NONE;

    // construct custom event object for plane being killed
    var eventTurnFinished = new createjs.Event("turnFinished", true);
    var eventComputerFinished = new createjs.Event("computerFinished", true);
    var eventPlayerFinished = new createjs.Event("playerFinished", true);

    // grab clip for TicTac and add to stage canvas
    var clip = assetManager.getClip("TicTac");
    clip.gotoAndStop(type);
    stage.addChild(clip);

    // setup event listeners using on() (instead of addEventListener - gives more power and can select scope that event handler runs in!)
    var clickListener = clip.on("click", onClick, this);
    var overListener = clip.on("mouseover", onOver, this);
    var outListener = clip.on("mouseout", onOut, this);

    // ------------------------------------------------ get/set methods
    this.getType = function() {
        return type;
    };

    // ------------------------------------------------ event handler
    function onClick(e) {
        // player selecting ticTac
        this.playMe(); // WITHOUT using on() this would need to be me.playMe() with var me = this; above
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
        this.disableMe();

        // you need to dispatch your custom event from a displayObject that is on the stage
        // the event travels up from the stage to the target (capture / target) (clip in this case) and back down again (bubble)
        clip.dispatchEvent(eventTurnFinished);
        clip.dispatchEvent(eventPlayerFinished);
        stage.update();
    };

    this.computeMe = function() {
        type = TicTacState.O;
        // adjust frame
        clip.gotoAndStop(type);
        this.disableMe();
        clip.dispatchEvent(eventTurnFinished);
        clip.dispatchEvent(eventComputerFinished);
    };

    this.disableMe = function() {
        // disables the TicTac object
        clip.off("click", clickListener);
        clip.off("mouseover", overListener);
        clip.off("mouseout", outListener);
    };

    this.enableMe = function() {
        // only enable if required - with on you can have mulitple events of same name attached to the same target
        if (!clip.hasEventListener("click")) {
            // enables the TicTac object
            clickListener = clip.on("click", onClick, this);
            overListener = clip.on("mouseover", onOver, this);
            outListener = clip.on("mouseout", onOut, this);
        }
    };

    this.resetMe = function() {
        // resetting the TicTac object back to initial state
        type = TicTacState.NONE;
        clip.gotoAndStop(type);
        this.enableMe();
    };
 };

// hacking static constants
var TicTacState = {
	"NONE":0,
	"X":2,
	"O":4
};
