<%-- 
    Document   : editarModelo
    Created on : 19/05/2014, 04:11:48 AM
    Author     : root
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" session="true" language="java" import="java.util.*"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Crear Modelo</title>
        <link href="${pageContext.request.contextPath}/resources/css/start/jquery-ui-1.10.4.custom.css" rel="stylesheet">
         
	<script src="${pageContext.request.contextPath}/resources/js/jquery-1.10.2.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.10.4.custom.js"></script>
         <script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script> 
       
         <link href="${pageContext.request.contextPath}/resources/css/style.css" rel="stylesheet">
         <link href="${pageContext.request.contextPath}/resources/css/style.responsive.css" rel="stylesheet">      
       <link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/resources/images/favicon.ico"/>

        
        
        <script>
            $(document).ready(function() {
			$("#botonGuardarModelo").button();
                    $("#formaModelo").form();
                    
                    
		});
        </script>
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
                                <article class="art-post art-article">                                               
                                    <div class="art-postcontent art-postcontent-0 clearfix">
                                    </div>                                                                        
                                    <p style="text-align: center;"><span style="font-size: 18px;"><br></span></p>                                           
                                    <p style="text-align: center;"><span style="font-size: 25px; color: #5B6A72; ">Editar Modelo Existente</span><p></p>
                                     &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
                                     <a href="/OpenCNC/modelo/abrir.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">Regresar a Lista de Proyectos</a>&nbsp &nbsp &nbsp &nbsp<a href="/OpenCNC/usuario/login.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">Cerrar</a>
                                    <p style="text-align: center;"><span style="font-size: 14px;">
                                            <form:form action="${pageContext.request.contextPath}/modelo/guardarModelo.htm"
                                                method="POST"
                                                commandName="modelo"
                                                        > 
                                                &nbsp &nbsp &nbsp &nbsp Nombre:
                                                 <form:input path="nombre" ></form:input><br/><br/>
                                                &nbsp &nbsp &nbsp &nbsp Descripcion:
                                                 <form:input path="descripcion" ></form:input><br/><br/>
                                                &nbsp &nbsp &nbsp &nbsp  Punto Cero Maquina X:
                                                 <form:input path="puntoCeroMaquinaX"></form:input><br/><br/>
                                                &nbsp &nbsp &nbsp &nbsp Punto Cero Maquina Y:
                                                 <form:input path="puntoCeroMaquinaY"></form:input><br/><br/>
                                                &nbsp &nbsp &nbsp &nbsp  Ancho:
                                                 <form:input path="piezaAncho" />
                                                &nbsp &nbsp &nbsp &nbsp  Largo:
                                                 <form:input path="piezaLargo" /><br/><br/>
                                                &nbsp &nbsp &nbsp &nbsp <input type="submit" value="Guardar Cambios"/>
                                                </form:form>
                                                 </span></p>
                                        <footer class="art-footer">
                                                <div class="art-footer-inner">
                                                    <p style="text-align: left;"><span style="border-collapse: collapse;">Versión Beta 1.0</span></p><p><br></p>
                                                </div>
                                        </footer>  
                                </article>                                                     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
       
 