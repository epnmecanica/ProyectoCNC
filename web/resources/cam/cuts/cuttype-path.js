/**
 * Generate the gcode for a path cut. This is a path which follows the specified
 * path with the center of the cutting bit.
 *
 * TODO: shapes
 */
window.opencut.registerCutType("path", function generatePathCut(workspace, cut) {
  var warnings = [];
  var gcode = [];
  
  
  //cutter = cut;
  
  var z_y = (workspace.type_machine == 'Torno')? "Z" : "Y"; 
  
  
    
  var auxi = normVect(cut);
  gcode.push("G0" + " X" + auxi[0][0] + " Z2");
  gcode.push("G72 W0.5 R0.2");
  gcode.push("G72 P10 Q11 U0.1 W0.2 F0.15");
  
  gcode.push("N10 G0 Z" + auxi[0][1]);
  

  for (var i = 1 ; i < auxi.length ; i++){
     var tempP1 = (auxi[i][0] != auxi[i - 1][0]) ? auxi[i][0] : null;
     var tempP2 = (auxi[i][1] != auxi[i - 1][1]) ? auxi[i][1] : null;     
     
     var rad = (auxi[i].rad > 0)? "G2 " : "G3 ";
     
     if(tempP1 == null){
         if(auxi[i].rad && auxi[i].rad != "undefined"){
           gcode.push(rad + z_y + tempP2 + " R" + Math.abs(auxi[i].rad));  
         }else{
           gcode.push(z_y + tempP2);  
         }
     }else if(tempP2 == null){
         if(auxi[i].rad && auxi[i].rad != "undefined"){
            gcode.push(rad + "X" + tempP1 + " R" + Math.abs(auxi[i].rad)); 
         }else{
            gcode.push("X" + tempP1); 
         }
         
     }else{
         if(auxi[i].rad && auxi[i].rad != "undefined"){
             gcode.push(rad + " X" + tempP1 + " " + z_y + tempP2 + " R" + Math.abs(auxi[i].rad));
         }else{
             gcode.push("G1" + " X" + tempP1 + " " + z_y + tempP2); 
         }
         
     }
    
  }
  
  
  return {
    "warnings": warnings,
    "gcode": gcode
  };
});
