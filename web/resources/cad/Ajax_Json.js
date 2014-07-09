/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


    function receiveAjax(){
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
    };
    function sendAjax(datos){
          var pathname = window.location.pathname;
              var datosJ = {datos:datos};
                  
                
                  $.ajax({  type: 'GET',
                            url: 'linea/lista.htm',
                            data: datosJ,
                            dataType: 'json',
                            //contentType: 'application/json; charset=utf-8',
                            contentType: 'application/json',
                            //mimeType: 'application/json',
                            success:/*ObtenerPuntos*/alert('envio Ok')/*,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Accept', 'application/json');
                                xhr.setRequestHeader('Content-Type', 'application/json');
                                },
                              
                            error: function(jqXHR, textStatus, errorThrown) {
                                alert("Issue fetching the JSON: "
                                                    + textStatus + " "
                                                    + errorThrown + " !");
                            }
                            */
                        }
                    );
    };

