                                

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
        
        receiveAjax();
        loadIcons(gd);
        initCAD(gd);

});