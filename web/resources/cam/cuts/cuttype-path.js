/**
 * Generate the gcode for a path cut. This is a path which follows the specified
 * path with the center of the cutting bit.
 *
 * TODO: shapes
 */
window.opencut.registerCutType("path", function generatePathCut(workspace, cut) {
  var warnings = [];
  var gcode = [];

  
  cutter = cut;
  console.log(cutter);
  var z_y = (workspace.type_machine == 'Torno')? "Z" : "Y"; 
  gcode.push("G72 W1 R.2");
  gcode.push("G72 P10 Q11 U0.1 W0.2 F0.15");
  gcode.push("N10 G0 Z-20 M8");
    
  var auxi = normVect(cut);
  
  
  
  for (var i = 0 ; i < auxi.length ; i++){
      gcode.push("X" + auxi[i][0] + " " + z_y + auxi[i][1]);
      
  }
  
  function normVect (cut){
      this.cut = cut;
      this.aux = [];
      
      this.aux.push(this.cut[0].points[0]);
    
      for(var i = 0 ; i < this.cut.length ; i++){
          this.aux.push(this.cut[i].points[1]);
      }
  
      if (min(this.aux) != 0){
          this.aux.reverse();
          
      }
          return this.aux;
  }
  
  function min (auxi){
      this.auxi = auxi;

      var dis1 = (Math.sqrt(Math.pow(this.auxi[0][0] - 0, 2) + Math.pow(this.auxi[0][1]-0, 2)));
      var dis2 = (Math.sqrt(Math.pow(this.auxi[this.auxi.length - 1][0] - 0, 2) + Math.pow(this.auxi[this.auxi.length - 1][1]-0, 2)));
      var aus = (dis1 < dis2) ? this.auxi.length : 0; 
      return aus;
  }
  return {
    "warnings": warnings,
    "gcode": gcode
  };
});
