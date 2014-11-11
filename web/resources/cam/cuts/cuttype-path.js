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
  gcode.push("G1" + " X" + cut[cut.length - 1].points[0][0] + 5);
  for (var i = cut.length; i > 0; i--){
      gcode.push("X" + cut[i - 1].points[0][0] + " " + z_y + cut[i - 1].points[0][1]);
      gcode.push("X" + cut[i - 1].points[1][0] + " " + z_y + cut[i - 1].points[1][1]);
  }

  return {
    "warnings": warnings,
    "gcode": gcode
  };
});
