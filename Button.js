// ATTEMPT II
(function() {
    var Button = function(label) {
      this.initialize(label);
    }
    var p = Button.prototype = new createjs.Container();

    p.label;
    p.background;
    p.count = 0;

    p.Container_initialize = p.initialize;
    p.initialize = function(label) {
        this.Container_initialize();
        // add custom setup logic here.
        this.label = label;

        var color = "#CCC";
        var text = new createjs.Text(label, "20px Arial", "#000");
        text.textBaseline = "top";
        text.textAlign = "center";

        var width = text.getMeasuredWidth()+30;
        var height = text.getMeasuredHeight()+20;

        this.background = new createjs.Shape();
        this.background.graphics.beginFill(color).drawRoundRect(0,0,width,height,10);

        text.x = width/2;
        text.y = 10;

        this.addChild(this.background,text);
    }

    p.onClick = function() {
        alert("You clicked on a button: "+this.label);
    }

    window.Button = Button;
}());



/*
// ATTEMPT I
var Button = function(clip, stage) {
    // passed in sprite must have at least two frames, but can support up to four
    // frame 1 : up state
    // frame 2 : over state
    // frame 3 : down state
    // frame 4 : disabled state

    // state of button (translates to frame number)
    var state = ButtonStates.UP;
    var enabled = true;

    // private variables
    var frameCount = clip.spriteSheet.getNumFrames();

    // set the stage to accept mouseover events (disabled by default) - if not already set
    stage.enableMouseOver();

    // navigate to new frame in sprite
    clip.gotoAndStop(state);
    stage.addChild(clip);
    stage.update();

    // setup event listeners
    // note we are binding the TicTac function itself to be the this of the event handler
    clip.addEventListener("mousedown", onDown);
    clip.addEventListener("mouseover", onOver);
    clip.addEventListener("mouseout", onOut);

    // -------------------------------------------------------------  get/set methods
    this.getState = function(){
        return state;
    };

    this.getEnabled = function(){
        return enabled;
    };

    // -------------------------------------------------------------  public methods
    this.enableMe = function(){
        enabled = true;
        if (frameCount > 3) {
            state = ButtonStates.UP;
            clip.gotoAndStop(state);
            stage.update();
        }
        clip.addEventListener("mousedown", onDown);
        clip.addEventListener("mouseover", onOver);
        clip.addEventListener("mouseout", onOut);
    };

    this.disableMe = function(){
        enabled = false;
        // does the sprite support a disabled state?
        if (frameCount > 3) {
            state = ButtonStates.DISABLED;
            clip.gotoAndStop(state);
            stage.update();
        }
        clip.removeEventListener("mousedown", onDown);
        clip.removeEventListener("mouseover", onOver);
        clip.removeEventListener("mouseout", onOut);
    };

    // -------------------------------------------------------------  event handlers
    function onDown(e) {
        // is there a down state frame included in the sprite - otherwise Over frame is used
        if (frameCount > 2) state = ButtonStates.DOWN;
        else state = ButtonStates.OVER;
        clip.gotoAndStop(state);
        stage.update();
    }

    function onOver(e) {
        state = ButtonStates.OVER;
        clip.gotoAndStop(state);
        stage.update();
    }

    function onOut(e) {
        state = ButtonStates.UP;
        clip.gotoAndStop(state);
        stage.update();
    }
};

var ButtonStates = {
    "UP":0,
    "OVER":1,
    "DOWN":2,
    "DISABLED":3
};
*/
