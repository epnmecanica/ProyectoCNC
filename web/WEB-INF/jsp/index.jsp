<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="<c:url value="/resources/js/jquery-1.10.2.js"/>" > </script>
        <script type="text/javascript"
            src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js">
        </script>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
       
        
        <title>OPEN CNC</title>
        <script language="javascript">
          $(document).ready(function(){
              $("#btnLineas").click( function(){
                  var datosJ = { modeloId: 1 };
                  //var datos = JSON.stringify( datosJ );
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
                                },
                            
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
            
        </script>
    </head>

    <body>
        <input type="button" value="Traer Lista linea" id="btnLineas" />
        
        <br>
            <a href="usuario/lista.htm">Usuario</a>
        </br>
        <br>
            <a href="usuario/login.htm">Login</a>
        </br>
        <br>
            <a href="usuario/crear.htm">Crear Nuevo Usuario</a>
        </br>
        <br>
            <a href="usuario/recuperarContra.htm">Recuperar contraseña</a>
        </br>
        <br>
            <a href="modelo/abrir.htm">Abrir Modelo</a>
        </br>
        <br>
            <a href="modelo/crearModelo.htm">Crear Nuevo Modelo</a>
        </br>
        <br>
            <a href="resources/index.html">CAD</a>
        </br>       
        <br>
            <a href="rol/crear.htm">Crear Rol</a>
        </br>
        <br>
            <a href="elemento/crear.htm">Elemento Grafico</a>
        </br>
        <br>
            <a href="programa/crear.htm">Programa</a>
        </br>
        <br>
            <a href="sentencia/crear.htm">Sentencia</a>
        </br>
        <br>
            <a href="usuario/logout.htm">Log out</a>
        </br>
        
        <br>
            <a href="cad/cad.htm">CAD CRUD</a>
        </br>
        
    </body>
</html>
