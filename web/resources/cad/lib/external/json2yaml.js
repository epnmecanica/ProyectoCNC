/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function (self) { 
  /*
   * TODO, lots of concatenation (slow in js)
   */
  var spacing = "  ";

  function getType(obj) {
    var type = typeof obj;
    
    if (obj instanceof Array) {
      return 'array';
    } else if (type == 'string') {
      return 'string';
    } else if (type == 'boolean') {
      return 'boolean';
    } else if (type == 'number') {
      return 'number';
    } else if (type == 'undefined' || obj === null) {
      return 'null';
    } else {
      return 'hash';
    }
  }

  function convert(obj, ret) {
    var type = getType(obj);
   
    switch(type) {
      case 'array':
        convertArray(obj, ret);
        break;
      case 'hash':
        convertHash(obj, ret);
        break;
      case 'string':
        convertString(obj, ret);
        break;
      case 'null':
        ret.push('null');
        break;
      case 'number':
        ret.push(obj.toString());
        break;
      case 'boolean':
        ret.push(obj ? 'true' : 'false');
        break;
    }
  }
//Organizar el array
  function convertArray(obj, ret) {
      //console.log(obj);
      
      
      k++;
    for (var i=0; i<obj.length; i++) {
      var ele     = obj[i];
      var recurse = [];
      convert(ele, recurse);
      //console.log("el objeto es " + obj);
      for (var j=0; j<recurse.length; j++) {
          if (j === 0 & recurse[0].charAt(0) === 't'){
         
              ret.push(('- ') + recurse[j]);
               //console.log(ret + ' 1');
          }else if (j === 0 & recurse[0].charAt(0) !== 't'){
      
               //ret.push(('[') + recurse[j] );
               //console.log(ret + ' 2');
          }else{   
              //console.log(ret + ' 3');
                ret.push((spacing + recurse[j]));  
          }
          //console.log(recurse);
        //ret.push((j === 0 ? "- " : spacing) + recurse[j]);
        //console.log("objeto " + j + " " + ret);
        
      }
    }
  }

  function convertHash(obj, ret) {
    for (var k in obj) {
      var recurse = [];
      if (obj.hasOwnProperty(k)) {
        var ele = obj[k];
        convert(ele, recurse);
        var type = getType(ele);
        if (type == 'string' || type == 'null' || type == 'number' || type == 'boolean') {
          ret.push(normalizeString(k) + ': ' +  recurse[0]);
        } else {
          ret.push(normalizeString(k) + ': ');
          for (var i=0; i<recurse.length; i++) {
            ret.push(spacing + recurse[i]);
          }
        }
      }
    }
  }

  function normalizeString(str) {
    if (str.match(/^[\w]+$/)) {
      return str;
    } else {
      return '"'+escape(str).replace(/%u/g,'\\u').replace(/%U/g,'\\U').replace(/%/g,'\\x')+'"';
    }
  }

  function convertString(obj, ret) {
    ret.push(normalizeString(obj));
  }
  
  function normalizacionCam (obj,ret){
      var aux_points = [];
      var aux_index = [];
      var aux = 0;
        for(var j = 0; j < obj.cuts.length; j++ ){
            //console.log(obj.cuts[j]);
            aux_points.push(obj.cuts[j].points);
        }
        while(aux !== -1){
            aux = (ret.indexOf("    points: ", aux + 1));
            if(aux !== -1){
              aux_index.push(aux);  
            }
        }
    for (var j = 0; j < aux_index.length ; j++){
       
        ret.splice(aux_index[j] , 1 , '    points: ' + JSON.stringify(aux_points[j]));
    }
    return ret;
  }
  
  self.json2yaml = function(obj) {
    if (typeof obj == 'string') {
        
      obj = JSON.parse(obj);
     
    }
    var ret = [];
    convert(obj, ret);    
    //return ret.join("\n");
    return normalizacionCam(obj,ret).join("\n");
  };
})(this);