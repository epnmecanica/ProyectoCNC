/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var COMPONENT_G_TYPES = {
		DRILL : 'drill',
		PATH : 'path',
		PROFILE : 'profile',
		POCKET : 'pocket',
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

function Path(x1,y1,x2,y2) {
    Points.call(this,x1,y1,x2,y2);
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

