var ButtonBuilder = function(sprite, frames, stage) {
    // Adds button behaviour to any createJS sprite object
    // frames is array of sprite's framelabels for each state in the following order [up, over, down]

    // state of button (translates to frame number)
    var state = ButtonStates.UP;
    // does this need to work on a mobile device?
    var mobile = false;

    // set the stage to accept mouseover events (disabled by default) - if not already set
    stage.enableMouseOver();

    // navigate to new frame in sprite
    sprite.gotoAndStop(frames[state]);
    stage.update();

    // setup event listeners
    sprite.addEventListener("click", onUp);
    sprite.addEventListener("mousedown", onDown);
    sprite.addEventListener("mouseover", onOver);
    sprite.addEventListener("mouseout", onOut);

    // -------------------------------------------------------------  get/set methods
    this.getState = function(){
        return state;
    };

    this.setMobile = function(value) {
        mobile = value;
        // make adjustments
        if (mobile) {
            // remove all current desktop only event listeners
            sprite.removeAllEventListeners();
            // add mobile friendly eventListeners for only mousedown and click
            sprite.addEventListener("pressup", onOut);
            sprite.addEventListener("mousedown", onDown);
        } else {
            // remove all mobile friendly eventListeners
            sprite.removeAllEventListeners();
            // setup event listeners
            sprite.addEventListener("click", onUp);
            sprite.addEventListener("mousedown", onDown);
            sprite.addEventListener("mouseover", onOver);
            sprite.addEventListener("mouseout", onOut);
        }
    };




    // ------------------------------------------------------------- private methods
    function updateButton() {
        sprite.gotoAndStop(frames[state]);
        stage.update();
    }

    // -------------------------------------------------------------  event handlers
    function onUp(e) {
        state = ButtonStates.OVER;
        updateButton();
    }

    function onOver(e) {
        state = ButtonStates.OVER;
        updateButton();
    }

    function onDown(e) {
        // is there a down state frame included in the sprite - otherwise Over frame is used
        state = ButtonStates.DOWN;
        updateButton();
    }

    function onOut(e) {
        state = ButtonStates.UP;
        updateButton();
    }
};

var ButtonStates = {
    "UP":0,
    "OVER":1,
    "DOWN":2
};
