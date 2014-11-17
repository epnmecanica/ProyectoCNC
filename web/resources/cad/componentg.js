/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var COMPONENT_G_TYPES = {
		DRILL : 'drill',
                ARCS : 'arcs',
		PATH : 'path',
		PROFILE : 'profile',
		POCKET : 'pocket',
                CYCLE: 'cycle',
                POINTS : 'points'
};

function ComponentG(){
    this.type = '';   
   
};


function Drill(x1,y1,x2,y2) {
    Points.call(this,x1,y1,x2,y2);
    this.type = COMPONENT_G_TYPES.DRILL;
    
    
};
Drill.prototype = new Points();
Drill.prototype.constructor = Drill;

function Cycle(x1,y1,x2,y2) {
    Points.call(this,x1,y1,x2,y2);
    this.type = COMPONENT_G_TYPES.CYCLE;    
};
Cycle.prototype = new Points();
Cycle.prototype.constructor = Cycle;

function Arcs(x1,y1,x2,y2) {
    Points.call(this,x1,y1,x2,y2);
    this.radius = Distance(x1,y1,x2,y2);
    this.type = COMPONENT_G_TYPES.ARCS;
        
};
Arcs.prototype = new Points();
Arcs.prototype.constructor = Arcs;

function Path(x1,y1,x2,y2, radio) {
  
    Points.call(this,x1,y1,x2,y2);
    if(radio != null){
        this.radius = radio;
    }
    this.type = COMPONENT_G_TYPES.PATH;
    
};
Path.prototype = new Points();
Path.prototype.constructor = Path;

function Profile(x1,y1,x2,y2) {
    Points.call(this,x1,y1,x2,y2);
    this.type = COMPONENT_G_TYPES.PROFILE;
    this.depth = -0.05;
    this.side = 'outside';
    this.size = new Array();
    this.origin = new Array();
    this.corner_compensation = true;
    
    
};
Profile.prototype = new ComponentG();
Profile.prototype.constructor = Profile;

function Pocket(x1,y1,x2,y2) {
    Points.call(this,x1,y1,x2,y2);
    this.type = COMPONENT_G_TYPES.POCKET;
    this.depth = -0.05;
    
};
Pocket.prototype = new ComponentG();
Pocket.prototype.constructor = Pocket;

function Points(x1, y1, x2, y2) {
    ComponentG.call(this);
    this.type = COMPONENT_G_TYPES.POINTS;
     
    this.points = new Array();
    this.points = [ [x1 , y1],[x2 , y2]];
};
Points.prototype = new ComponentG();
Points.prototype.constructor = Points;

function Distance (x1,y1,x2,y2){
    var distance = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
	
	return distance.toFixed(2);
}