var height = 600;
var width = 800;

var pjs = new PointJS('2D', width, height);
//pjs.system.initFullScale();
//pjs.system.initFPSCheck();

var log = pjs.system.log;
var game = pjs.game;
var p = pjs.vector.point;
var s = pjs.vector.size;
var camera = pjs.camera;
var brush = pjs.brush;
var OOP = pjs.OOP;
var math = pjs.math;
var key = pjs.keyControl.initKeyControl();
var tiles = pjs.tiles;
var mouse = pjs.mouseControl.initMouseControl();


var object = game.newRectObject({

    position: p(10,10),
    w: 100, h: 100,
    fillColor: 'black'

});

var object2 = game.newCircleObject({
    
    position: p(200,200),
    radius: 50,
    fillColor: 'red'
    
});

var Scene = function(){
    
    this.update = function(){
        
        game.clear();
        
        game.fill('white');
        
        object.draw();
        
        object.listenEvents();
        
        
//        object2.draw();
        
//        object2.moveTimeC(mouse.getPositionS(),10);
        
        if(mouse.isPress('RIGHT'))
            game.stop();
        
    }
    
    this.entry = function(){
        
        EVENT.addEventsToObj(object);
        
//        object.addEvent('intersect',function(obj){
//
//            console.log(obj.id);
//
//        },object2);
        
        object.addEvent('wheelUp',function(){

            console.log('up');

        });
        
        object.addEvent('wheelDown',function(){

            console.log('down');

        });
        
        object.addEvent('click',function(){
            
            console.log('click');
            
        });
        
        object.addEvent('mouseOver',function(){

            console.log('over');

        });
        
        object.addEvent('mouseOut',function(){

            console.log('out');

        });
        
        object.addEvent('mouseDown',function(){

            console.log('mouseDown');

        });
        
        object.addEvent('mouseUp',function(){

            console.log('mouseUp');

        });
        
        
    }
    
}

game.newLoopFromClassObject('Scene', new Scene());

game.startLoop('Scene');