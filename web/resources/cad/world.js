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
        
       this.compensacionWidth = 500;
       this.compensacionHeight = 200;
        
        if( typeof( window.innerWidth ) == 'number' ) {
          //No-IE
          this.width = window.innerWidth - this.compensacionWidth;
          this.height = window.innerHeight - this.compensacionHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
          //IE 6+
          this.width = document.documentElement.clientWidth - this.compensacionWidth;
          this.height = document.documentElement.clientHeight - this.compensacionHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
          //IE 4 compatible
          this.width = document.body.clientWidth - this.compensacionWidth;
          this.height = document.body.clientHeight - this.compensacionHeight;
        }
       
        // Create the canvas
        //this.width = 800;
        //this.height = 600;
        
        
        this.id = "CADCanvas"
        
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.id = this.id;
           
        document.body.appendChild(canvas);
        
        var gd = new GraphicDisplay(this.id, this.width, this.height);
        gd.camX = - this.width + 50;
        gd.camY =  this.height -100;
        //gd.unitMeasure = "mm";
        //gd.unitAngle = "Rad";
        gd.selectedColor = "black";
        //gd.typeOfCad = "fresadora";
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
        
        
});
