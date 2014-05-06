var TicTac = function() {
     // private game variables
     var stage = window.stage;
     var assetManager = window.assetManager;

     // public properties - masquerading as static variables
     // ticTac state contants
     this.NONE = 0;
     this.X = 1;
     this.O = 2;

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

     // ???????????????????????
     //this.addEventListener(MouseEvent.CLICK, onClick);


     // ------------------------------------------------ get/set methods
     this.getType = function() {
         return type;
     }

     // ------------------------------------------------ public methods
     this.positionMe = function(x,y) {
         clip.x = x;
         clip.y = y;
     }

     this.playMe = function() {
         type = this.X;
         // adjust frame
         clip.gotoAndStop(type);
         disableMe();
         document.dispatchEvent(eventTurnFinished);
         document.dispatchEvent(eventPlayerFinished);
     }

     this.computeMe = function() {
         type = this.O;
         // adjust frame
         clip.gotoAndStop(type);
         disableMe();
         document.dispatchEvent(eventTurnFinished);
         document.dispatchEvent(eventComputerFinished);
     }

     this.disableMe = function() {
         // ???????????????????????
         // disables the TicTac object
         //btnRollover.enabled = false;
         //btnRollover.mouseEnabled = false;
         //this.removeEventListener(MouseEvent.CLICK, onClick);
     }

     this.disableMe = function() {
         // ???????????????????????
         // disables the TicTac object
         //btnRollover.enabled = true;
         //btnRollover.mouseEnabled = true;
         //this.addEventListener(MouseEvent.CLICK, onClick);
     }

     this.resetMe = function() {
         // resetting the TicTac object back to initial state
         type = this.NONE;
         clip.gotoAndStop(type);
         enableMe();
     }
 }
