/**
 * *****************************************************************************
 * Se inicializan todos los componentes.
 * *****************************************************************************
 * @param {type} param
 */                                
var respuesta;
$(document).ready(function() {
    
     
        var gd = new GraphicDisplay("CADCanvas", 800, 600);
        gd.camX = -750;
        gd.camY =  500;
        gd.unitMeasure = "cm";
        //gd.unitAngle = "Rad";
        gd.selectedColor = "black";
        gd.unitConversionFactor = 1/100; 
        gd.showOrigin = true;
        gd.showGrid = true;
        gd.snapTolerance = 5;
       

        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          // Great success! All the File APIs are supported.

        } else {
          alert('Su navegador no es compatible con nuestra arquitectura.');
        }
        /*
         var f = [{"active":true,
                            "type":2,
                            "color":"blue",
                            "radius":1,
                            "x1":478,
                            "y1":-484,
                            "x2":1110,
                            "y2":-822},
                        {"active":true,
                            "type":3,
                            "color":"blue",
                            "radius":1,
                            "x1":1112,
                            "y1":-228,
                            "x2":1102,
                            "y2":-508},
                        {"active":true,
                            "type":5,
                            "color":"blue",
                            "radius":1,
                            "x1":212,
                            "y1":-672,
                            "x2":226,
                            "y2":-924,
                            "x3":404,
                            "y3":-696},
                        {"active":true,
                            "type":7,
                            "color":"#eee",
                            "radius":5,
                            "x":484,
                            "y":-968,
                            "text":"hola"}];
    */
       
        
        
        loadIcons(gd);
        initCAD(gd);
        //deberia estar todo en una sola funcion
        $.ajax({
            type: 'GET',
            url:  "linea/getJSON.htm",
            dataType: 'json',
            async: true,
            success: function(result) {
                                                       
                          var tmp = JSON.stringify(result);
                            $("#theJson").html(result);
                            console.log("JSON: " + tmp);
                            console.log("String: " + result);
                            respuesta = tmp;
                            console.log("respuesta: " + respuesta);
                            gd.setJSON(result);
            }/*,
            complete: function(){
                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Issue fetching the JSON: "
                                    + textStatus + " "
                                    + errorThrown + " !");
            }*/
            
        });
        
        receiveAjax();
        
        
});