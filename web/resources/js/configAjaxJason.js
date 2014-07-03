    
    
    function RestDelete(){  
        alert("funciona 2335");
    };
       $(document).ready(function(){
        
        var prefix = new Object();
        prefix.Modos = new Array();
        prefix.Acciones = new Array();
        prefix.Extensiones = new Array();
        
        prefix.Modos[0]= 'linea/';
        prefix.Modos[1]= 'arco/';
        prefix.Modos[2]= 'texto/';
        
        prefix.Acciones[0]= 'crear';
        prefix.Acciones[1]= 'obtener';
        prefix.Acciones[2]= 'actualizar';
        prefix.Acciones[3]= 'borrar';
        
        prefix.Extensiones[0] = '.htm';
        
        //prefix.url = 'linea/obtener.htm';
        prefix.url = prefix.Modos[0] + prefix.Acciones[0] + prefix.Extensiones[0];
        
        //alert(prefix.url);
              $("#btnLineas").click( function(){
                  
              var datosJ = {datos:JSON.stringify([{"active":true,
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
                                "text":"hola"}])};
/*
                   var datosJ = { modeloId: 1 , 
                                 myVal2: "hi",
                                 tipoElemento: "linea",
                                 posicionX1: 0,
                                 posicionX2: 0,
                                 posicionY1: 0,
                                 posicionY2: 0,
                                 radio: 0,
                                 angulo1: 0,
                                 angulo2: 0,
                                 tamanio: 1,
                                 orden: 1,
                                 color:"blanco",
                                 descripcion: "",
                                 acccion: "crear",
                                 x2: 5,
                                 y2: 3
                                };*/
                  //var datos = JSON.stringify( datosJ );
                   // datosJ.color = "negro";
                  
                  $.ajax({  type: 'GET',
                            url: 'linea/lista.htm',
                            data: datosJ,
                            dataType: 'json',
                            //contentType: 'application/json; charset=utf-8',
                            contentType: 'application/json',
                            //mimeType: 'application/json',
                            success:ObtenerPuntos,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Accept', 'application/json');
                                xhr.setRequestHeader('Content-Type', 'application/json');
                                }/*,
                              
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