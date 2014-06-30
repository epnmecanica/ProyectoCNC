    function RestDelete(){  
        alert("funciona");
    } 
    $(document).ready(function(){
              $("#btnLineas").click( function(){
                  var datosJ = { modeloId: 1 , myVal2: "hi" };
                  //var datos = JSON.stringify( datosJ );
                  $.ajax({  type: 'GET',
                            url: 'linea/crear.htm',
                            data: datosJ,
                            dataType: 'json',
                            //contentType: 'application/json; charset=utf-8',
                            contentType: 'application/json',
                            //mimeType: 'application/json',
                            success:ObtenerPuntos,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Accept', 'application/json');
                                xhr.setRequestHeader('Content-Type', 'application/json');
                                },
                            /*   
                            error: function(jqXHR, textStatus, errorThrown) {
                                alert("Issue fetching the JSON: "
                                                    + textStatus + " "
                                                    + errorThrown + " !");
                            }*/
                            
                        }
                    );
                  //alert("solicitada la información");
              }); 
            });
            
            function ObtenerPuntos( data ){
                alert("entera");
                var a = JSON.parse('[{"id": "1","nombre": "nombre 1"},{"id": "2","nombre": "nombre 2"}]');
                console.debug(a);
                for(i=0;i<data.length;i++)
                {
                    console.debug("- data[i]: ");
                    console.debug(data[i]);
                    
                    
                    console.debug("- data[i].elementoId: ");
                    console.debug(data[i].elementoId);
                    
                    console.debug("- data[i].elementoGrafico.descripcion: ");
                    console.debug(data[i].elementoGrafico.descripcion);
                }
            }