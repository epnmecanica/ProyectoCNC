<%-- 
    Document   : crearModelo
    Created on : 19/05/2014, 12:55:11 AM
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

        
        
        <script language="JavaScript">
            $(document).ready(function() {
			$("#botonGuardarModelo").button();
                    $("#formaModelo").form();
                    
                   
		});
           
        </script>
        
       
        
            
    </head>
    <body  onload='window.alert("Gracias por Ingresar, antes de salir cierre sesion.");'>
       
        <nav class="art-nav">
		<ul class="art-hmenu"><li><a href="/OpenCNC/index.htm" class="active">Ingresar</a><ul class="active"><li><a href="/OpenCNC/usuario/crear.htm">Crear Nuevo Usuario</a></li><li><a href="/OpenCNC/usuario/login.htm">Login</a></li></ul></li><li><a href="/OpenCNC/inicio/infcad.htm">CAD</a></li><li><a href="/OpenCNC/inicio/infcam.htm">CAM</a></li><li><a href="/OpenCNC/usuario/lista.htm">Lista de Usuarios</a></li></ul></nav>
 
        
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
                                     &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                                    &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp<a href="/OpenCNC/modelo/abrir.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">Abrir Proyecto existente</a><a href="/OpenCNC/usuario/cambiarContrasena.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">Cambiar Contraseña</a>&nbsp<a id="botonNuevo1" href="${pageContext.request.contextPath}/usuario/logout.htm " class="art-button">Cerrar</a>
                                     &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <span style="font-size: 25px; color: #5B6A72; ">Crear un Nuevo Modelo <br></span><p><br></p>
                                      &nbsp &nbsp &nbsp Nombre de Usuario: ${nombreUsuario}  
                                     <p style="text-align: center;"><span style="font-size: 14px;"><br></span></p>
                                     
 
                                 
                                    <form:form id="formaModelo" action="${pageContext.request.contextPath}/modelo/guardarModelo.htm" 
                                               method="POST"
                                               commandName="modelo">
                                        <p>
                                            <label for="nombre"> &nbsp &nbsp &nbsp Nombre de Modelo:</label>
                                            <form:input path="nombre" />
                                        </p>
                                        <p style="text-align: center;"><span style="font-size: 14px;"><br></span></p><p style="text-align: center;">
                                        <p>
                                            <label for="descripcion"> &nbsp &nbsp &nbsp Descripcion de modelo:</label>
                                            <form:textarea path="descripcion" rows="4" cols="5" />
                                        </p>

                                        <p>
                                            <label for="unidadMedidaId"> &nbsp &nbsp &nbsp Unidad Medida:</label>
                                            <%--<input id="unidadMedidaId" value="1" name="unidadMedidaId" type="text"/>--%>
                                            <select id="unidadMedidaId" name="unidadMedidaId">
                                                <option value=""></option>
                                                <c:forEach items="${listaUnidadMedida}" var="c">
                                                    <option value="${c.unidadMedidaId}" >${c.nombre}</option>
                                                </c:forEach>
                                            </select>
                                        </p>
                                        <p>
                                            <p style="text-align: center;"><span style="font-size: 14px;"><br></span></p><p style="text-align: left">
                                            <label for="tipoMaquinaId"> &nbsp &nbsp &nbsp Tipo Maquina:</label>

                                            <select id="tipoMaquinaId" name="tipoMaquinaId">
                                                <option value=""></option>
                                                <c:forEach items="${listaTipoMaquina}" var="c">
                                                    <option value="${c.tipoMaquinaId}" >${c.nombre}</option>
                                                </c:forEach>
                                            </select>
                                        </p>
                                        <p style="text-align: center;"><span style="font-size: 14px;"><br></span></p><p style="text-align: center;">
                                        <p>
                                            <label from="puntoCeroMaquinaction="${pageContext.request.contextPath}aX"> &nbsp &nbsp &nbsp Punto Cero Maquina X: </label>
                                            <form:input path="puntoCeroMaquinaX" />
                                        </p>
                                        <p style="text-align: center;"><span style="font-size: 14px;"><br></span></p><p style="text-align: center;">
                                        <p>
                                            <label from="puntoCeroMaquinaY"> &nbsp &nbsp &nbsp Punto Cero Maquina Y: </label>
                                            <form:input path="puntoCeroMaquinaY" />
                                        </p>
                                         <p style="text-align: center;"><span style="font-size: 14px;"><br></span></p><p style="text-align: center;">
                                        <p>
                                            <label from="piezaAncho"> &nbsp &nbsp &nbsp Pieza Ancho: </label>
                                            <form:input path="piezaAncho" />
                                        </p>
                                        <p style="text-align: center;"><span style="font-size: 14px;"><br></span></p><p style="text-align: center;">
                                        <p>
                                            <label from="piezaLargo"> &nbsp &nbsp &nbsp Pieza Largo: </label>
                                            <form:input path="piezaLargo" />
                                        </p>
                                        <p>                    
                                           <input id="${usuarioId}" value="${listaUsuarios}" name="usuarioId" type="hidden"/>     
                                        </p>
                                        <p style="text-align: center;"><span style="font-size: 14px;"><br></span></p><p style="text-align: center;">
                                        <input id="botonGuardarModelo" type="submit" value="Guardar Modelo" />
                                    </form:form>
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
