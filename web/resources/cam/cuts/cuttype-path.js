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
  gcode.push("N10 G0 Z-20");
    
  var auxi = normVect(cut);
  gcode.push("X" + auxi[0][0] + " " + z_y + (auxi[auxi.length - 1][1] + 3));
  gcode.push(z_y + auxi[0][1]);

  for (var i = 1 ; i < auxi.length ; i++){
     var tempP1 = (auxi[i][0] != auxi[i - 1][0]) ? auxi[i][0] : null;
     var tempP2 = (auxi[i][1] != auxi[i - 1][1]) ? auxi[i][1] : null;     
     
     if(tempP1 == null){
         gcode.push(z_y + tempP2); 
     }else if(tempP2 == null){
         gcode.push("X" + tempP1);
     }else{
         gcode.push("X" + tempP1 + " " + z_y + tempP2); 
     }
    
  }
  
  
  return {
    "warnings": warnings,
    "gcode": gcode
  };
});
