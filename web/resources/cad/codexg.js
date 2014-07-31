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
    this.components = new Array();
};

Codexg.prototype.addComponent = function (component){
  this.components.push(component);  
};

Codexg.prototype.exportYAML = function(){
    //return json2yaml(this.components);
    return json2yaml(JSON.stringify(this.components));  
    //return json2yaml(JSON.stringify(yaml)); 
};

Codexg.prototype.init = function(){
    //alert('codexg');
    this.test();
    console.log(this.exportYAML());
};

Codexg.prototype.test = function(){
   
   
   
   
   this.components.push(new Drill(1,2,3,4,5,6));
   console.log(this.components);
    //this.components.push("{type: 'drill', points:[[0.93, 0.75], [0.93, 0.75], [0.93, 0.75]]}");
   //console.log(yaml);
   
};

