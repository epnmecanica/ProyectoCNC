<%-- 
    Document   : cambiarContrasena
    Created on : 15/05/2014, 06:30:21 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cambiar Contraseña</title>
        <script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script>         
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css" media="screen">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.responsive.css" media="all">
        <link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/resources/images/favicon.ico"/>


    </head>
    <body>
        <div id="art-main">
            <div class="art-sheet clearfix">
                <header class="art-header">
                    <div class="art-slider art-slidecontainerheader" data-width="978" data-height="100">
                        <div class="art-slider-inner">
                            <div class="art-slide-item art-slideheader0"></div>
                            <div class="art-slide-item art-slideheader1"></div>
                            <div class="art-slide-item art-slideheader2"></div>
                        </div>
                    </div>
                    <div class="art-slidenavigator art-slidenavigatorheader" data-left="93.46">
                        <a href="#" class="art-slidenavigatoritem"></a>
                        <a href="#" class="art-slidenavigatoritem"></a><a href="#" class="art-slidenavigatoritem"></a>
                    </div>
                    <div class="art-shapes">
                    </div>                                   
                </header>
                <div class="art-layout-wrapper">
                    <div class="art-content-layout">
                        <div class="art-content-layout-row">
                            <div class="art-layout-cell art-content">
                                <article class="art-post art-article"><p><br></p> 
                                      <p style="text-align: center;"><span style="font-family: webkit-body; font-size: 30px;"> Cambiar Contraseña</span></p>
                                       &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <a href="/OpenCNC/modelo/crearModelo.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">Cancelar</a><p><br></p>
                               
                                        ${nombreUsuario}                                        
                                         <form:form id="forma" action="${pageContext.request.contextPath}/usuario/nuevaContrasena.htm" onsubmit="return comprobarClave()"
                                                   method="POST"
                                                   commandName="usuario">
                                            <p>
                                                &nbsp &nbsp &nbsp &nbsp <label for="nombre">e-mail: </label>  
                                                <input id="mail" value="alguien@example.com" name="mail" type="text"/>
                                            </p>
                                            <p><br></p> 
                                            <p>
                                                &nbsp &nbsp &nbsp &nbsp <label for="clave">Cambiar Contraseña: </label>
                                                <input id="nuevaContrasena" type="text" name="nuevaContrasena" value="" />                                            
                                            </p>
                                            <p><br></p> 
                                            <p>
                                                &nbsp &nbsp &nbsp &nbsp <label for="reClave">Confirmar Contraseña: </label>
                                                <input type="password" name="reClave" value="" />                                                                                              
                                            </p>
                                            <p><br></p>               
                                            &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <input id="botonGuardar" type="submit" value="Cambiar" />
                                                                                       
                                        </form:form>
                                </article>                                                            
                            </div>
                        </div>
                    </div>
                </div>
                    <footer class="art-footer">
                        <div class="art-footer-inner">
                            <p style="text-align: left;"><span style="border-collapse: collapse;">Versión Beta 1.0</span></p><p><br></p>
                            <p class="art-page-footer"></p>
                        </div>
                    </footer>  
            </div>                                                  
        </div>
         <script type="text/javascript">
            $(document).ready(function() {

            $(document).bind("ajaxComplete",function() {

            alert("La Contraseña Temporal Caduco");
            });

            $.get("/hola",function(datos) {

            alert(datos);

            });
           
            });
           
        
            </script>
    </body>
</html>
