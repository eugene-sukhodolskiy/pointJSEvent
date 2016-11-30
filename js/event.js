var getNewEvent = function(pjs){

    var EVENT = {};
    
    //    @obj - one object
    
    EVENT._setEventsToObjs = function(objs){
        
        for(var i=0;i<objs.length;i++){
            
            EVENT.setEventsToObj(objs[i]);
            
        }
        
    }
    
    EVENT.addEventToArr = function(ename,callback,objs){

        for(var i=0;i<this.length;i++){
            
            this[i].addEvent(ename,callback,objs);
            
        }

    }
    
    EVENT.delEventFromArr = function(ename){
        
        for(var i=0;i<this.length;i++){

            this[i].delEvent(ename);

        }
        
    }
    
    EVENT.listenEventsInArr = function(){
        
        for(var i=0;i<this.length;i++){

            this[i].listenEvents();

        }
        
    }

//    @obj - array object or one object
    
    EVENT.setEventsToObj = function(obj){
        
        if(typeof obj[0] == 'object'){
            
            obj.arrObjsFlag = true;
            
            EVENT._setEventsToObjs(obj);
            
            obj.addEventToArr = EVENT.addEventToArr;
            
            obj.delEventFromArr = EVENT.delEventFromArr;
            
            obj.listenEventsInArr = EVENT.listenEventsInArr;
            
        }

        // data

        obj.events = {}

        obj.events.data = {};

        obj.events.data.mouseoverFlag = false;

        obj.events.data.intersectObjs = [];

        obj.events.data.warnFlag = false;

        obj.events.callback = {};

        obj.events.currentList = [];

        // sys funcs
        
        if(obj.arrObjsFlag !== true){

            obj.getCurrentEvents = function(){

                return this.events.currentList;

            }
            
        }

        obj.listenEvents = function(){
            
            if(this.arrObjsFlag === true){
                
                this.listenEventsInArr();
                
                return false;
                
            }

            for(var i=0;i<this.events.currentList.length;i++){

                if(typeof this[this.events.currentList[i]] != 'undefined'){

                    this[this.events.currentList[i]]();

                }else{

                    pjs.system.log('Error! "' + this.events.currentList[i] + '" is not event');

                    pjs.game.stop();

                }

            }

        }

        obj.addEvent = function(ename,callback,objs){
            
            if(this.arrObjsFlag === true){
                
                this.addEventToArr(ename,callback,objs);
                
                return false;
                
            }

            var flag = EVENT.existsInList(ename,this.events.currentList);

            if(flag !== false && !this.events.data.warnFlag){

                pjs.system.log('Warning! addEvent("' + ename + '") function is called in a loop, it`s bad for optimization');

                this.events.data.warnFlag = true;

            }

            if(ename == 'intersect'){

                if(typeof objs == 'object' && !flag){

                    this.events.data.intersectObjs.push(objs);

                }else if(typeof objs == 'array' && !flag){

                    for(var i=0;i<objs.length;i++){

                        this.events.data.intersectObjs.push(objs[i]);

                    }

                }else if(this.events.data.intersectObjs.length == 0){

                    pjs.system.log('Error! For event "intersect" need one or more object in args');

                    pjs.game.stop();

                }

            }


            this.events.callback[ename] = callback;

            if(flag === false)
                this.events.currentList.push(ename);

        }

        obj.delEvent = function(ename){
            
            if(this.arrObjsFlag === true){
                
                this.delEventFromArr(ename);
                
                return true;
                
            }

            var flag = EVENT.existsInList(ename,this.events.currentList);

            if(flag === false)
                return false;

            this.events.currentList.splice(flag,1);

            delete this.events.callback[ename];

            if(ename == 'intersect'){

                delete this.events.data.intersectObjs;

                this.events.data.intersectObjs = [];

            }

        }

        
        // events
        if(obj.arrObjsFlag !== true){

        obj.click = function(){

            if((pjs.mouseControl.isPress('LEFT') || pjs.touchControl.isPress()) && (pjs.mouseControl.isInObject(this) || pjs.touchControl.isInObject(this))){

                this.events.callback.click(this);

            }

        }

        obj.mouseDown = function(){

            if((pjs.mouseControl.isDown('LEFT') || pjs.touchControl.isDown()) && (pjs.mouseControl.isInObject(this) || pjs.touchControl.isInObject(this))){

                this.events.callback.mouseDown(this);

            }

        }

        obj.mouseUp = function(){

            if((pjs.mouseControl.isUp('LEFT') || pjs.touchControl.isUp()) && (pjs.mouseControl.isInObject(this) || pjs.touchControl.isInObject(this))){

                this.events.callback.mouseUp(this);

            }

        }

        obj.mouseOver = function(){

            if(!this.events.data.mouseoverFlag && (pjs.mouseControl.isInObject(this) || pjs.touchControl.isInObject(this))){

                this.events.data.mouseoverFlag = true;

                this.events.callback.mouseOver(this);

            }

        }

        obj.mouseOut = function(){

            if(this.events.data.mouseoverFlag && !(pjs.mouseControl.isInObject(this) || pjs.touchControl.isInObject(this))){

                this.events.data.mouseoverFlag = false;

                this.events.callback.mouseOut(this);

            }

        }

        obj.wheelUp = function(){

            if(pjs.mouseControl.isWheel('UP') && pjs.mouseControl.isInObject(this)){

                this.events.callback.wheelUp(this);

            }

        }

        obj.wheelDown = function(){

            if(pjs.mouseControl.isWheel('DOWN') && pjs.mouseControl.isInObject(this)){

                this.events.callback.wheelDown(this);

            }

        }

        obj.intersect = function(){

            var intersectObj = this.isArrIntersect(this.events.data.intersectObjs);

            if(intersectObj){

                this.events.callback.intersect(intersectObj,this);

            }

        }
        
        }

    }

    EVENT.existsInList = function(ename,arr){

        for(var i=0; i<arr.length; i++){

            if(arr[i] == ename)
                return i;

        }

        return false;

    }
    
    
    return EVENT;
}