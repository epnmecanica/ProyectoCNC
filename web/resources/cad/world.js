/**
 * *****************************************************************************
 * Se inicializan todos los componentes.
 * *****************************************************************************
 * @param {type} param
 */                                
var respuesta;
$(document).ready(function() {
    // Imprime por consola la IP de conexion.
        console.log(myIP());
        //alert('hi')
        
        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          // Great success! All the File APIs are supported.

        } else {
          alert('Su navegador no es compatible con nuestra arquitectura.');
        }
        cargarPantalla();
       
              
        
        
        
});
var cargarPantalla  = function(){
        this.xH = new WindowHandler();
        
        this.xH.init();
       
        this.id = "CADCanvas";
        
        var canvas = document.createElement("canvas");
        
        //canvas.width = this.width;
        //canvas.height = this.height;
        canvas.width = this.xH.getWidth();
        canvas.height = this.xH.getHeight();
        canvas.id = this.id;
           
        document.body.appendChild(canvas);
        
        var gd = new GraphicDisplay(this.id, this.xH.getWidth(), this.xH.getHeight());
    
        gd.camX = - this.xH.getWidth() + 50;
        gd.camY =  this.xH.getHeight() -50;
        //gd.unitMeasure = "mm";
        //gd.unitAngle = "Rad";
        gd.selectedColor = "black";
        //gd.typeOfCad = "fresadora";
        gd.unitConversionFactor = 1/100; 
        gd.showOrigin = true;
        gd.showGrid = true;
        gd.snapTolerance = 5;
        
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
                           // console.log("JSON: " + tmp);
                            //console.log("String: " + result);
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
        $.ajax({
            type: 'GET',
            url:  "linea/obtenerElementoPorModelo.htm",
            dataType: 'json',
            async: true,
            success: function(result) {
                          var tmp = JSON.stringify(result);
                          console.log('nombre: '+tmp);    
                          console.log(gd.typeOfCad = result[0].tipoMaquina);
                          console.log(gd.displayName = result[0].nombre);
                          console.log(gd.unitMeasure = result[0].unidadMedida);
                          
                          console.log(gd.z_x = result[0].puntoCeroMaquinaX);
                          console.log(gd.z_y = result[0].puntoCeroMaquinaY);
                          console.log(gd.max_size_x = result[0].piezaAncho);
                          console.log(gd.max_size_y = result[0].piezaLargo);
                          console.log(gd.spindle_speed = 1600);
                          //alert(tmp);
                          
            }
        });
        receiveAjax();
        $(window).resize(function() {
             this.xH.init();
             canvas.width = this.xH.getWidth();
             canvas.height = this.xH.getHeight();
             gd.setWinWidthAndHeight(this.xH.getWidth(), this.xH.getHeight());
             
             gd.camX = - this.xH.getWidth() + 50;
             gd.camY =  this.xH.getHeight() -100;
        });
};
