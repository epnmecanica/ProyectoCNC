/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var yaml = {
       name: "Cut_Demo",
       units: "Inch",
       cuts: [{
               type: "drill",
               points: ["[1,2]","[2,2]","[2,3]","[2,4]"]
       }]
   }
   
 
function Codexg(){
    //this.components = new Array();
    
    this.name = 'cut_demo';
    this.units = 'inch';
    this.bit_diameter = 0.125;
    this.feed_rate = 15;
    this.plunge_rate = 5;
    this.z_step_size = 0.1;
    this.default_depth = -0.2;
    this.cuts = new Array();
    
    
};

Codexg.prototype.addCuts = function (cut){
  this.cuts.push(cut);  
};

Codexg.prototype.exportYAML = function(){
    //return json2yaml(this.components);
    return json2yaml(JSON.stringify(this.cuts));  
    //return json2yaml(JSON.stringify(yaml)); 
};

Codexg.prototype.init = function(){
    //alert('codexg');
    this.test();
    //console.log(this.exportYAML());
};

Codexg.prototype.test = function(){
   
   
   
   
   this.cuts.push(new Drill(1,2,5,6));
   this.cuts.push(new Drill(15,22,55,66));
   //this.cuts.push(new Path());
   //console.log(this.components);
    //this.components.push("{type: 'drill', points:[[0.93, 0.75], [0.93, 0.75], [0.93, 0.75]]}");
   //console.log(yaml);
   
};

