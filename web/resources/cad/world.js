                                

$(document).ready(function() {
        var gd = new GraphicDisplay("CADCanvas", 800, 600);
        gd.unitMeasure = "cm";
        gd.unitConversionFactor = 1/100; 
        gd.showOrigin = true;
        gd.showGrid = true;
        
        $.ajax({
            type: 'GET',
            url:  "linea/getJSON.htm",
            /*dataType: 'json',*/
            async: true,
            success: function(result) {
                            
                            
                           // var tmp = JSON.stringify(result);
                            
                            
                            $("#theJson").html(result);

            }/*,
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Issue fetching the JSON: "
                                    + textStatus + " "
                                    + errorThrown + " !");
            }*/
        });

        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          // Great success! All the File APIs are supported.

        } else {
          alert('Su navegador no es compatible con nuestra arquitectura.');
        }


        loadIcons(gd);
        initCAD(gd);

});