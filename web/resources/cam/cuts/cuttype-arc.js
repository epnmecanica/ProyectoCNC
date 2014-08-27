/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

window.opencut.registerCutType("arc", function generatePathCut(workspace, cut) {
  var warnings = [];
  var gcode = [];

  // Validate the requested cut.
  if (cut.points === undefined || cut.points === null || cut.points.length === 0) {
    throw "path cut does not have any 'points'";
  }
  if (cut.depth === undefined || typeof cut.depth != "number" || cut.depth >= 0) {
    throw "path cut has an invalid 'depth'";
  }
  for (var i = 0; i < cut.points.length; i++) {
    if (cut.points[i].length != 2) {
      throw "path cut expects [x,y] coordinate points: " + JSON.stringify(cut.points[i]);
    }
    if (typeof cut.points[i][0] != "number" ||
        typeof cut.points[i][1] != "number") {
      throw "path cut points must be numbers: "  + JSON.stringify(cut.points[i]);
    }
  }
  //N0070 G3 X15.183 Z-20.14 R11.818(g03=interpolacion circular en sentido antihorario, entre el punto anterior y el punto X15.183 Z-20.14 R11.818)
  gcode.push("G03");
  
  var z = workspace.safety_height;
  gcode.push("G1 Z" + z + " F" + workspace.z_rapid_rate);
    return {
    "warnings": warnings,
    "gcode": gcode
  };
});

