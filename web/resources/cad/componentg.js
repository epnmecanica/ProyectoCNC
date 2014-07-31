/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var COMPONENT_TYPES = {
		
                DRILL : 1,
                PATH : 2,
                PROFILE : 3,
                POCKET : 4
};
var yaml = {
       name: "Cut_Demo",
       units: "Inch",
       cuts: [{
               type: "drill",
               points: ["[1,2]","[2,2]","[2,3]","[2,4]"]
       }]
   }
    
function Componentg(){
    //Esto no es por componente, es por programa.
    //Ojo para poner a trabajar
    /*this.name = null;
    this.units = "inch";
    this.bit_diameter = 0.0125;
    this.feed_rate = 15;
    this.z_step_size = 0.1;
    this.default_depth = -0.2;
    */
    
    this.type = 0;
    this.points = new Array(); 
};


function Drill(x1, y1, x2, y2, x3, y3) {
		
	this.type = COMPONENT_TYPES.DRILL;
	
	
	if ( x1 !== undefined
		&& y1 !== undefined
		&& x2 !== undefined
		&& y2 !== undefined
		&& x3 !== undefined
		&& y3 !== undefined)
	{
                this.points = [x1,x2,y1,y2,x3,y3];
                
                
	}
};
Drill.prototype = new Component();
Drill.prototype.constructor = Drill;

function Path(x1, y1, x2, y2, x3, y3) {
	
	
	this.type = COMPONENT_TYPES.PATH;
	this.x1 = 0;
	this.y1 = 0;
	this.x2 = 0;
	this.y2 = 0;
	this.x3 = 0;
	this.y3 = 0;
	
	if ( x1 !== undefined
		&& y1 !== undefined
		&& x2 !== undefined
		&& y2 !== undefined
		&& x3 !== undefined
		&& y3 !== undefined)
	{
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
	}
};
Path.prototype = new Component();
Path.prototype.constructor = Path;

function Profile(x1, y1, x2, y2, x3, y3) {
	
	
	this.type = COMPONENT_TYPES.PROFILE;
	this.x1 = 0;
	this.y1 = 0;
	this.x2 = 0;
	this.y2 = 0;
	this.x3 = 0;
	this.y3 = 0;
	
	if ( x1 !== undefined
		&& y1 !== undefined
		&& x2 !== undefined
		&& y2 !== undefined
		&& x3 !== undefined
		&& y3 !== undefined)
	{
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
	}
};
Profile.prototype = new Component();
Profile.prototype.constructor = Profile;

function Pocket(x1, y1, x2, y2, x3, y3) {
	
	
	this.type = COMPONENT_TYPES.POCKET;
	this.x1 = 0;
	this.y1 = 0;
	this.x2 = 0;
	this.y2 = 0;
	this.x3 = 0;
	this.y3 = 0;
	
	if ( x1 !== undefined
		&& y1 !== undefined
		&& x2 !== undefined
		&& y2 !== undefined
		&& x3 !== undefined
		&& y3 !== undefined)
	{
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.x3 = x3;
		this.y3 = y3;
	}
};
Pocket.prototype = new Component();
Pocket.prototype.constructor = Pocket;