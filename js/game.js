var height = 600;
var width = 800;

var pjs = new PointJS('2D', width, height);
//pjs.system.initFullScale();
pjs.system.initFPSCheck();

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

var pjsev = new getNewEvent(pjs);

var getObjs = function(count){
    
    var arr = [];
    
    for(var i=0;i<count;i++){
        
        arr.push(game.newRectObject({

            position: p(math.random(0,width),math.random(0,height)),
            w: 40, h: 40,
            fillColor: 'green'

        }));

    }

    return arr;
    
}


var Scene = function(){
    
    var objs = getObjs(1000);
    
    var object2 = game.newCircleObject({

        position: p(0,0),
        radius: 10,
        fillColor: 'red'

    });
    
    this.update = function(){
        
        game.clear();
        
        game.fill('white');
        
        OOP.drawArr(objs);
        
        objs.listenEvents();
        
//        object2.draw();
//        
//        object2.moveTimeC(mouse.getPositionS(),10);
        
        brush.drawText({
            
            text: pjs.system.getFPS(),
            x: 10, y: 10,
            size: 35,
            color: 'blue'
            
        });
        
        if(mouse.isPress('RIGHT'))
            game.stop();
        
    }
    
    this.entry = function(){
        
        pjsev.setEventsToObj(objs);

        objs.addEvent('click',function(t){

            t.fillColor = 'yellow';

        });
        
//        pjsev.addEventsToObj(object);
        
//        objs.addEvent('intersect',function(self,obj){
//
//            console.log(obj.id + ' & ' + self.id);
//
//        },object2);
//        
//        objs.addEvent('wheelUp',function(self){
//
//            console.log(self.id + ' up');
//
//        });
//        
//        objs.addEvent('wheelDown',function(){
//
//            console.log(self.id + ' down');
//
//        });
//        
//        objs.addEvent('click',function(){
//            
//            console.log(self.id + ' click');
//            
//        });
//        
//        objs.addEvent('mouseOver',function(){
//
//            console.log(self.id + ' over');
//
//        });
//        
//        objs.addEvent('mouseOut',function(){
//
//            console.log(self.id + ' out');
//
//        });
//        
//        objs.addEvent('mouseDown',function(){
//
//            console.log(self.id + ' mouseDown');
//
//        });
//        
//        objs.addEvent('mouseUp',function(){
//
//            console.log(self.id + ' mouseUp');
//
//        });
        
        
    }
    
}

game.newLoopFromClassObject('Scene', new Scene());

game.startLoop('Scene');