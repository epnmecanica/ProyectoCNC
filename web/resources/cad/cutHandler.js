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
  
  var MODES_ELE_TYPE = { 
      LINE : 2,
      ARC : 5,
      ARC_TW : 9,
      ARC_TR : 10
      
  }
function CutHandler(gd){
    this.component = new Object();  
    this.codexgYAML = new Codexg();
    this.conversionTool = 0.1;

    
    this.codexgYAML.name = gd.displayName;
    this.codexgYAML.units = gd.unitMeasure;
    this.codexgYAML.type_machine = gd.typeOfCad;
    this.codexgYAML.z_x = gd.z_x;
    this.codexgYAML.z_y = gd.z_y;
    this.codexgYAML.max_size_x = gd.max_size_x;
    this.codexgYAML.max_size_y = gd.max_size_y;
    this.codexgYAML.spindle_speed = gd.spindle_speed;
    this.codexgYAML.guiCam();
    
         
    
      
};



CutHandler.prototype.setObject = function(objects){
    this.component = objects;

    for(var i = 0; i <= this.component.length - 1; i++){
       
        if (gd.typeOfCad == "Torno"){
            this.x1 = Math.abs(this.component[i].y1);
            this.y1 = this.component[i].x1;
            this.x2 = Math.abs(this.component[i].y2);
            this.y2 = this.component[i].x2;
            this.x3 = Math.abs(this.component[i].y3);
            this.y3 = this.component[i].x3;
        }else{
            this.x1 = this.component[i].x1;
            this.y1 = Math.abs(this.component[i].y1);
            this.x2 = this.component[i].x2;
            this.y2 = Math.abs(this.component[i].y2);
            this.x3 = this.component[i].x3;
            this.y3 = Math.abs(this.component[i].y3);
        }
        if(this.codexgYAML.units != "mm"){
                    this.conversionTool *= 0.03937;
        }
           switch (this.component[i].machined){
            
            case MODES_G_TYPE.DRILL:
                            this.codexgYAML.addCuts(new Drill(this.component[i].x1/10,
                                            Math.abs(this.component[i].y1/10),
                                            this.component[i].x2/10,
                                            Math.abs(this.component[i].y2/10)));
                            break;
            case MODES_G_TYPE.PATH:
               
                    switch (this.component[i].type){
                        
                            case MODES_ELE_TYPE.ARC_TW:
                                this.codexgYAML.addCuts(new Path(this.x1 * this.conversionTool,
                                            this.y1 * this.conversionTool,
                                            this.x2 * this.conversionTool,
                                            this.y2 * this.conversionTool, 
                                            
                                            distance(this.x1,
                                                    this.y1,
                                                    this.x2,
                                                    this.y2) * this.conversionTool / 2));
                                break;
                            case MODES_ELE_TYPE.ARC:
                                this.codexgYAML.addCuts(new Path(this.x1 * this.conversionTool,
                                            this.y1 * this.conversionTool,
                                            this.x3 * this.conversionTool,
                                            this.y3 * this.conversionTool, 
                                            
                                            distance(this.x1,
                                                    this.y1,
                                                    this.x2,
                                                    this.y2) * this.conversionTool));
                                break;
                            case MODES_ELE_TYPE.ARC_TR:
                                this.codexgYAML.addCuts(new Path(this.x1 * this.conversionTool,
                                            this.y1 * this.conversionTool,
                                            this.x2 * this.conversionTool,
                                            this.y2 * this.conversionTool, 
                                            
                                            distance(this.x1,
                                                    this.y1,
                                                    this.x3,
                                                    this.y3) * this.conversionTool));
                                break;

                            case MODES_ELE_TYPE.LINE :
                                this.codexgYAML.addCuts(new Path(this.x1 * this.conversionTool,
                                            this.y1 * this.conversionTool,
                                            this.x2 * this.conversionTool,
                                            this.y2 * this.conversionTool, null));
                                break;

                        
                        /*if (gd.typeOfCad == "Torno"){
                                if (this.component[i].type == 9){
                                    
                                    this.codexgYAML.addCuts(new Path(Math.abs(this.component[i].y1 * this.conversionTool),
                                            this.component[i].x1 * this.conversionTool,
                                            Math.abs(this.component[i].y2 * this.conversionTool),
                                            this.component[i].x2 * this.conversionTool, 
                                            
                                            distance(Math.abs(this.component[i].y1),
                                                    this.component[i].x1,
                                                    Math.abs(this.component[i].y2),
                                                    this.component[i].x2) * this.conversionTool / 2));
                                }else{
                                    this.codexgYAML.addCuts(new Path(Math.abs(this.component[i].y1 * this.conversionTool),
                                            this.component[i].x1 * this.conversionTool,
                                            Math.abs(this.component[i].y2 * this.conversionTool),
                                            this.component[i].x2 * this.conversionTool, null));
                                }
                                
                            }else{
                                this.codexgYAML.addCuts(new Path(this.component[i].x1 * this.conversionTool,
                                            Math.abs(this.component[i].y1) * this.conversionTool,
                                            this.component[i].x2 * this.conversionTool,
                                            Math.abs(this.component[i].y2) * this.conversionTool, null));
                            }*/
                    }
                            
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
      
    };
    return this.codexgYAML;
};

function distance (x1 , y1, x2, y2) {
    var dis = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
    return dis;
}







