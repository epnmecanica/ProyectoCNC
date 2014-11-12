/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var MODES_G_TYPE = {
    DRILL : 'Drill',
    ARCS : 'Arcs',
    PATH : 'Path',
    PROFILE : 'Profile',
    CYCLE: 'Cycle',
    POCKET : 'Pocket'
  };
function CutHandler(gd){
    this.component = new Object();  
    this.codexgYAML = new Codexg();
    
    this.codexgYAML.name = gd.displayName;
    this.codexgYAML.units = gd.unitMeasure;
    this.codexgYAML.type_machine = gd.typeOfCad;
    this.codexgYAML.z_x = gd.z_x;
    this.codexgYAML.z_y = gd.z_y;
    this.codexgYAML.max_size_x = gd.max_size_x;
    this.codexgYAML.max_size_y = gd.max_size_y;
    this.codexgYAML.spindle_speed = gd.spindle_speed;
    this.codexgYAML.p_block = 100;
      
};

CutHandler.prototype.setObject = function(objects){
    this.component = objects;

    for(var i = 0; i <= this.component.length - 1; i++){
        if(this.component[i].x != 0 
            &&  this.component[i].y != 0 
            && this.component[i].x1 != 0 
            &&this.component[i].y1 != 0 
            &&  this.component[i].x2 != 0
            && this.component[i].y2 != 0 
            &&  this.component[i].x3 != 0
            &&  this.component[i].y3 != 0){
           switch (this.component[i].machined){
            
            case MODES_G_TYPE.DRILL:
                            this.codexgYAML.addCuts(new Drill(this.component[i].x1/10,
                                            Math.abs(this.component[i].y1/10),
                                            this.component[i].x2/10,
                                            Math.abs(this.component[i].y2/10)));
                            break;
            case MODES_G_TYPE.PATH:
                            this.codexgYAML.addCuts(new Path(Math.abs(this.component[i].x1 / 10),
                                            this.component[i].y1 / 10,
                                            Math.abs(this.component[i].x2 / 10),
                                            this.component[i].y2 / 10));
                            break;
            case MODES_G_TYPE.PROFILE:
                            this.codexgYAML.addCuts(new Profile(this.component[i].x1/10,
                                            Math.abs(this.component[i].y1/10),
                                            this.component[i].x2/10,
                                            Math.abs(this.component[i].y2/10)));
                            break;
            case MODES_G_TYPE.POCKET:
                            this.codexgYAML.addCuts(new Pocket(this.component[i].x1/10,
                                            Math.abs(this.component[i].y1/10),
                                            this.component[i].x2/10,
                                            Math.abs(this.component[i].y2/10)));
                            break;
            case MODES_G_TYPE.ARCS:
                            this.codexgYAML.addCuts(new Arcs(this.component[i].x1/10,
                                            Math.abs(this.component[i].y1/10),
                                            this.component[i].x2/10,
                                            Math.abs(this.component[i].y2/10)));
                            break;
            case MODES_G_TYPE.CYCLE:
                            this.codexgYAML.addCuts(new Cycle(this.component[i].x1/10,
                                            Math.abs(this.component[i].y1/10),
                                            this.component[i].x2/10,
                                            Math.abs(this.component[i].y2/10)));
                            break;
        } 
        }
        
    
    };
    return this.codexgYAML;
};









