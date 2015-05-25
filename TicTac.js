var TicTac = function(assetManager, stage, mobile) {
    // private property variables
    var type = "NONE";
    // reference to itself for scoping issues
    var me = this;

    // construct custom event object for plane being killed
    var eventTurnFinished = new createjs.Event("turnFinished", true);
    var eventComputerFinished = new createjs.Event("computerFinished", true);
    var eventPlayerFinished = new createjs.Event("playerFinished", true);

    // grab sprite for TicTac and add to stage canvas
    var sprite = assetManager.getSprite("assets");
    sprite.gotoAndStop("ticTacNone_up");
    stage.addChild(sprite);

    // setup event listeners
    if (!mobile) {
        sprite.addEventListener("click", onClick);
        sprite.addEventListener("mouseover", onOver);
        sprite.addEventListener("mouseout", onOut);
    } else {
        sprite.addEventListener("pressup", onClick);
        sprite.addEventListener("mousedown", onOver);
    }

    // ------------------------------------------------ get/set methods
    this.getType = function() {
        return type;
    };

    // ------------------------------------------------ event handler
    function onClick(e) {
        // player selecting ticTac
        // scope issue! This only occurs if you have a private method trying to call a public method
        // this refers to the onClick() function itself and not the TicTac object
        // hack is to setup a global variable pointing to this to use internally
        me.playMe();
    }

    function onOver(e) {
        sprite.gotoAndStop("ticTacNone_over");
        stage.update();
    }

    function onOut(e) {
        sprite.gotoAndStop("ticTacNone_up");
        stage.update();
    }
    // ------------------------------------------------ public methods
    this.positionMe = function(x,y) {
        sprite.x = x;
        sprite.y = y;
    };

    this.playMe = function() {
        type = "X";
        sprite.gotoAndStop("ticTacX");
        this.disableMe();

        // you need to dispatch your custom event from a displayObject that is on the stage
        // the event travels up from the stage to the target (capture / target) (sprite in this case) and back down again (bubble)
        sprite.dispatchEvent(eventTurnFinished);
        sprite.dispatchEvent(eventPlayerFinished);
        stage.update();
    };

    this.computeMe = function() {
        // adjust frame
        type = "O";
        sprite.gotoAndStop("ticTacO");
        this.disableMe();
        sprite.dispatchEvent(eventTurnFinished);
        sprite.dispatchEvent(eventComputerFinished);
        stage.update();
    };

    this.disableMe = function() {
        // disables the TicTac object
        sprite.removeAllEventListeners();
    };

    this.enableMe = function() {
        // enables the TicTac object
        if (!mobile) {
            sprite.addEventListener("click", onClick);
            sprite.addEventListener("mouseover", onOver);
            sprite.addEventListener("mouseout", onOut);
        } else {
            sprite.addEventListener("pressup", onClick);
            sprite.addEventListener("mousedown", onOver);
        }
    };

    this.resetMe = function() {
        // resetting the TicTac object back to initial state
        type = "NONE";
        sprite.gotoAndStop("ticTacNone_up");
        this.enableMe();
		stage.update();
    };
};
