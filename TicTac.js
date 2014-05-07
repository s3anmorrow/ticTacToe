var TicTac = function() {
     // private game variables
     var stage = window.stage;
     var assetManager = window.assetManager;

     // public properties - masquerading as static variables
     // ticTac state contants
     this.NONE = 0;
     this.NONE_OVER = 1;
     this.X = 2;
     this.X_OVER = 3;
     this.O = 4;
     this.O_OVER = 5;

     // initialization
     var type = this.NONE;
     // construct custom event object for plane being killed
     var eventTurnFinished = document.createEvent("Event");
     eventTurnFinished.initEvent("onGameEvent", true, true);
     eventTurnFinished.source = this;
     eventTurnFinished.id = "turnFinished";
     var eventComputerFinished = document.createEvent("Event");
     eventComputerFinished.initEvent("onGameEvent", true, true);
     eventComputerFinished.source = this;
     eventComputerFinished.id = "computerFinished";
     var eventPlayerFinished = document.createEvent("Event");
     eventPlayerFinished.initEvent("onGameEvent", true, true);
     eventPlayerFinished.source = this;
     eventPlayerFinished.id = "playerFinished";

     // grab clip for TicTac and add to stage canvas
     var clip = assetManager.getClip("TicTac");
     clip.gotoAndStop(type);
     stage.addChild(clip);

     // setup event listeners
     clip.addEventListener("click", onClick);
     clip.addEventListener("mouseover", onOver);
     clip.addEventListener("mouseout", onOut);

     // variable pointing to this closure to combat scope issues with private methods
     var me = this;

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
         type = this.X;
         // adjust frame
         clip.gotoAndStop(type);
         this.disableMe();
         document.dispatchEvent(eventTurnFinished);
         document.dispatchEvent(eventPlayerFinished);
         stage.update();
     };

     this.computeMe = function() {
         type = this.O;
         // adjust frame
         clip.gotoAndStop(type);
         this.disableMe();
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
         type = this.NONE;
         clip.gotoAndStop(type);
         enableMe();
     };
 };
