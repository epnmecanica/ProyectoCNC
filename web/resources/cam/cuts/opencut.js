/**
 * The core of the opencut API. This is the code which users will interact with.
 * Individual cut types are defined externally to this code and registered at
 * startup. This makes it easy to add new cut types (even ones that compose
 * others).
 */
window.opencut = function() {
  var _cutTypes = {};
  var _opencut = {};

  /**
   * Register a new cut type.
   *
   * Cutting functions takes a workspace and cut description. The return value
   * is expected to be an object containing a list of warnings and a list of
   * gcode commands.
   *
   * @param {string} name The name of the cut type
   * @param {function(workspace, cut)} func The function to call.
   */
  _opencut.registerCutType = function(name, func) {
      
    if (_cutTypes[name]) {
      throw "cut [" + name + "] type already defined";
    }

    console.log("cut type registered: " + name);
    _cutTypes[name] = func;
  };

  /**
   * @return a list of defined cut types
   */
  _opencut.listCutTypes = function() {
    return Object.keys(_cutTypes);
  };

  /**
   * Convert a JSON object which represents a job to a g-code file for
   * sending to a CNC router.
   *
   * @return An object containing the gcode, and any warnings generated.
   */
  _opencut.toGCode = function(job) {
    var warnings = [];
    var errors = [];
    var commands = [];

    // Build up a workspace description.
    var workspace = {};
    workspace.units = "mm";
    
    if (job.units == "inch") {
      workspace.units = "inch";
    } else if (job.units != "mm") {
        warnings.push("'unidades' son requeridas para formatear ['mm', 'inch']. se asume como 'mm'");
      //warnings.push("'units' is requried to be set to ['mm', 'inch']. assuming 'mm'");
    }
    workspace.type_machine = "Torno";
    if (job.type_machine == "Torno") {
      workspace.type_machine = "Torno";
    } else if (job.type_machine == "Fresadora") {
        workspace.type_machine = "Fresadora";
    }else if (job.type_machine != "Fresadora"){
        warnings.push("'Tipo de maquina' son requeridas para formatear ['Torno', 'Fresadora']. se asume como 'Torno'");
    }
    workspace.wise == "clock";
    if (job.wise == "clock"){
        workspace.wise = "clock";
    }else if(job.wise == "anti-clock"){
        workspace.wise = "anti-clock";
    }else if (job.wise != "anti-clock"){
        warnings.push("'Tipo de sentido de giro' son requeridas para formatear ['Horario', 'Anti-horario']. se asume como 'Horario'");
    }
    
    workspace.feed_rate = (workspace.units == "mm") ? 100 : 4;
    if (job.feed_rate) {
      if (typeof job.feed_rate != "number") {
        errors.push("'feed_rate' se espera que sea un numero");
        //errors.push("'feed_rate' is expected to be a number");
      } else {
        workspace.feed_rate = job.feed_rate;
      }
    }
    workspace.plunge_rate = (workspace.units == "mm") ? 25 : 1;
    if (job.plunge_rate) {
      if (typeof job.plunge_rate != "number") {
        errors.push("'plunge_rate' se espera que sea un numero");
        //errors.push("'plunge_rate' is expected to be a number");
      } else {
        workspace.plunge_rate = job.plunge_rate;
      }
    }
    workspace.z_rapid_rate = 4 * workspace.plunge_rate;
    workspace.safety_height = (workspace.units == "mm") ? 5 : 0.25;
    if (job.safety_height) {
      if (typeof job.safety_height != "number") {
        errors.push("invalido safety_height: " + job.safety_height);
        //errors.push("invalid safety_height: " + job.safety_height);
      } else {
        workspace.safety_height = job.safety_height;
      }
    }
    workspace.z_step_size = (workspace.units == "mm") ? 1 : 0.125;
    if (!job.z_step_size) {
      warnings.push("z_step_size no esta especificado. use por defecto [" + workspace.z_step_size + "]");
      //warnings.push("z_step_size not specified. using default [" + workspace.z_step_size + "]");
    } else {
      if (typeof job.z_step_size != "number") {
        errors.push("invalido z_step_size: " + job.z_step_size);
        //errors.push("invalid z_step_size: " + job.z_step_size);
      } else {
        workspace.z_step_size = job.z_step_size;
      }
    }
    if (!job.bit_diameter) {
      errors.push("bit_diameter es un parametro requerido");
      //errors.push("bit_diameter is a required parameter");
    } else if (typeof job.bit_diameter != "number") {
      errors.push("bit_diameter se espera que sea un numero");
      //errors.push("bit_diameter is expected to be a number");
    } else if (job.bit_diameter <= 0) {
      errors.push("bit_diameter debe ser mas grande que 0");
      //errors.push("bit_diameter must be a number greater than 0");
    } else {
      workspace.bit_diameter = job.bit_diameter;
    }

    if (job.default_depth) {
      if (typeof job.default_depth != "number" || job.default_depth < 0) {
        errors.push("default_depth debe ser menor que 0");
        //errors.push("default_depth must be a number < 0");
      } else {
        workspace.default_depth = job.default_depth;
      }
    }
    
    
    

    // Configure the job parameters.
    commands.push("%");
    commands.push("O0002");
    commands.push("G90"); // Absolute distance mode
    commands.push("T0101");
    commands.push((workspace.units == "inch") ? "G20" : "G21");
    
    //
    if(workspace.z_x <= 0 && workspace.z_y <= 0){
        errors.push("Zero de pieza no especificado");
    }
    if (workspace.type_machine == 'Torno'){
        commands.push("G55 " + "X" + job.z_x + " Z" +job.z_y + " S" + job.spindle_speed);
    }else{
        commands.push("G54 " + "X" + job.z_x + " Y" +job.z_y + " S" + job.spindle_speed);
    }
        
    
    //
    (workspace.wise === 'clock') ? commands.push("M03") : commands.push("M04");
    
    //
    (!workspace.security_zone) ? commands.push("G43" + " Z" + job.security_zone): null;
    
    
    // Add commands for each cut operation.
    if (!job.cuts || job.cuts.length === 0) {
      warnings.push("'cuts' no esta especificado");
      //warnings.push("no 'cuts' were specified!");
      job.cuts = [];
    }
    //for (var i = 0; i < job.cuts.length; i++) {
      //var cut = job.cuts[i];
      var cut = job.cuts;
      
      // Use the workspace default depth if a cut depth was not specified.
      if (cut.depth === undefined && workspace.default_depth !== undefined) {
        cut.depth = workspace.default_depth;
      }

      //var cutType = cut.type;
      var cutType = "path";
      
      if (_cutTypes[cutType]) {
        try {
          var ret = _cutTypes[cutType].call({}, workspace, cut);

          // Check the response as a safety for any poorly implemented cut code.
          if (ret.warnings === undefined || ret.warnings === null) {
            throw "La respuesta de [" + cutType + "] no definio el 'warning'";
            //throw "response of [" + cutType + "] did not define 'warning'";
          }
          if (ret.gcode === undefined || ret.gcode === null) {
            throw "La respuesta de [" + cutType + "] no definio el 'gcode'";
            //throw "response of [" + cutType + "] did not define 'gcode'";
          }

          // Add the response to our compiled list of commands.
          commands.push("");
          
          commands.push("; begin cut: " + cutType);
          commands = commands.concat(ret.gcode);
          
          commands.push("N11 X0");
          commands.push("G70 P10 Q11 S300 F0.05");
          commands.push("; end cut: " + cut.type);
          commands.push("G0 Z100");
          commands.push("M30");
          commands.push("%");
          console.log(commands);
          warnings = warnings.concat(ret.warnings);
        } catch (err) {
          errors.push(err);
          console.error(err);
        }
      } else {
        errors.push("se desconoce tipo de corte [" + cutType + "]");
        //errors.push("unknown cut type [" + cutType + "]");
      }
   // }

    // Limit the precision of each command. It makes the lines shorter and there
    // is really no need to specify billionths of an inch for machines which are
    // only capable of thousandths.
    var MAX_DECIMAL_PLACES = 5;
    for (var l = 0; l < commands.length; l++) {
      if (commands[l][0] == "G") {
        // TODO: gcode does not require spaces, this assumes clean code.
        var parts = commands[l].split(" ");
        for (var m = 1; m < parts.length; m++) {
          if (parts[m].length < 2) {
            continue;
          }
          parts[m] = parts[m][0] + parseFloat(parts[m].substr(1)).toFixed(MAX_DECIMAL_PLACES);

          // Remove unnecessary over-specification.
          if (parts[m].indexOf(".") != -1) {
            var lst = parts[m].length - 1;
            while (parts[m][lst] == "0") {
              lst--;
            }
            if (parts[m][lst] == ".") {
              lst--;
            }
            parts[m] = parts[m].substring(0, lst + 1);            
          }
        }
        commands[l] = parts.join(" ");
      }
    }

    // Warn if any lines exceed 50 characters in length (problem for old grbl boards)
    // http://www.shapeoko.com/wiki/index.php/Grbl#Line_length_limit
    var GRBL_LINE_LIMIT = 50;
    for (var j = 0; j < commands.length; j++) {
      if (commands[j].length >= GRBL_LINE_LIMIT) {
        warnings.push("linea " + (j + 1) + " de gcode excedido " +
            GRBL_LINE_LIMIT + " caracteres. Tableros grbl viejos " +
            " lineas extensas y probablemente no hagan lo que usted desea.");
        /*
        warnings.push("line " + (j + 1) + " of gcode exceeds " +
            GRBL_LINE_LIMIT + " characters. Old grbl boards will truncate" +
            " long lines and likely not do what you want.");
        */
            break;
      }
    }

    return {
      "warnings": warnings,
      "errors": errors,
      "gcode": commands
    };
  };

  return _opencut;
}();
