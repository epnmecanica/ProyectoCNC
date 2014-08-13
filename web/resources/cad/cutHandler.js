/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var MODES_G_TYPE = {
    DRILL : 'Drill',
    PATH : 'Path',
    PROFILE : 'Profile',
    POCKET : 'Pocket'
  }
function CutHandler(name, units){
  this.component = new Object();  
  this.codexgYAML = new Codexg();
  this.codexgYAML.name = name;
  this.codexgYAML.units = units;

  
};

CutHandler.prototype.setObject = function(objects){
    this.component = objects;

    
    for(var i = 0; i <= this.component.length - 1; i++){
        
        switch (this.component[i].machined){
            
            case MODES_G_TYPE.DRILL:
                            this.codexgYAML.addCuts(new Drill(this.component[i].x1,
                                            Math.abs(this.component[i].y1),
                                            this.component[i].x2,
                                            Math.abs(this.component[i].y2)));
                            break;
            case MODES_G_TYPE.PATH:
                            this.codexgYAML.addCuts(new Path(this.component[i].x1,
                                            Math.abs(this.component[i].y1),
                                            this.component[i].x2,
                                            Math.abs(this.component[i].y2)));
                            break;
            case MODES_G_TYPE.PROFILE:
                            this.codexgYAML.addCuts(new Profile(this.component[i].x1,
                                            Math.abs(this.component[i].y1),
                                            this.component[i].x2,
                                            Math.abs(this.component[i].y2)));
                            break;
            case MODES_G_TYPE.POCKET:
                            this.codexgYAML.addCuts(new Pocket(this.component[i].x1,
                                            Math.abs(this.component[i].y1),
                                            this.component[i].x2,
                                            Math.abs(this.component[i].y2)));
                            break;
        }
    
    };
    return this.codexgYAML;
};








//Para pasar de yaml a Json
    /*
        var doc = jsyaml.load('greeting: hello\nname: world');
        console.log(doc);
    */
    //Para pasar de json a yaml
        //var obj  = { hello: 'world', hello2: [ 'hello', 'world' ] };
               /* var obj =  [{"active":true,
                            "type":2,
                            "color":"blue",
                            "radius":1,
                            "x1":478,
                            "y1":-484,
                            "x2":1110,
                            "y2":-822},
                        {"active":true,
                            "type":3,
                            "color":"blue",
                            "radius":1,
                            "x1":1112,
                            "y1":-228,
                            "x2":1102,
                            "y2":-508},
                        {"active":true,
                            "type":5,
                            "color":"blue",
                            "radius":1,
                            "x1":212,
                            "y1":-672,
                            "x2":226,
                            "y2":-924,
                            "x3":404,
                            "y3":-696},
                        {"active":true,
                            "type":7,
                            "color":"#eee",
                            "radius":5,
                            "x":484,
                            "y":-968,
                            "text":"hola"}];
        var yaml = json2yaml(obj);
        console.log(yaml);
        */
       
       
