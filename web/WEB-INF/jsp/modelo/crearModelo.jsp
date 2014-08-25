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
                                    <div class="art-postcontent art-postcontent-0 clearfix"><p style="text-align: center;"><span style="font-size: 14px;"><br></span></p><p style="text-align: center;"><img width="267" height="189" alt="" class="art-lightbox" src="../images/PUERTAS%20ABIERTAS.jpeg" style="border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(142, 180, 204); border-right-color: rgb(142, 180, 204); border-bottom-color: rgb(142, 180, 204); border-left-color: rgb(142, 180, 204); border-top-width: 8px; border-right-width: 8px; border-bottom-width: 8px; border-left-width: 8px;"><span style="font-size: 14px;"><br></span></p>                                              
                                    </div>                  
                                    <h1>Crear Modelo</h1>        
                                    <a id="botonNuevo" href="${pageContext.request.contextPath}/modelo/abrir.htm" >Abrir Proyecto existente.</a>
                                    ${nombreUsuario}
                                    <form:form id="formaModelo" action="${pageContext.request.contextPath}/modelo/guardarModelo.htm" 
                                               method="POST"
                                               commandName="modelo">
                                        <p>
                                            <label for="nombre">Nombre de Modelo</label>
                                            <form:input path="nombre" />
                                        </p>
                                        <p>
                                            <label for="descripcion">Descripcion de modelo</label>
                                            <form:textarea path="descripcion" rows="4" cols="5" />
                                        </p>

                                        <p>
                                            <label for="unidadMedidaId">Unidad Medida</label>
                                            <%--<input id="unidadMedidaId" value="1" name="unidadMedidaId" type="text"/>--%>
                                            <select id="unidadMedidaId" name="unidadMedidaId">
                                                <option value=""></option>
                                                <c:forEach items="${listaUnidadMedida}" var="c">
                                                    <option value="${c.unidadMedidaId}" >${c.nombre}</option>
                                                </c:forEach>
                                            </select>
                                        </p>
                                        <p>
                                            <label for="tipoMaquinaId">Tipo Maquina</label>

                                            <select id="tipoMaquinaId" name="tipoMaquinaId">
                                                <option value=""></option>
                                                <c:forEach items="${listaTipoMaquina}" var="c">
                                                    <option value="${c.tipoMaquinaId}" >${c.nombre}</option>
                                                </c:forEach>
                                            </select>
                                        </p>
                                        <p>
                                            <label from="puntoCeroMaquinaction="${pageContext.request.contextPath}aX">Punto Cero Maquina X: </label>
                                            <form:input path="puntoCeroMaquinaX" />
                                        </p>
                                        <p>
                                            <label from="puntoCeroMaquinaY">Punto Cero Maquina Y: </label>
                                            <form:input path="puntoCeroMaquinaY" />
                                        </p>
                                         <p>
                                            <label from="piezaAncho">Pieza Ancho: </label>
                                            <form:input path="piezaAncho" />
                                        </p>
                                         <p>
                                            <label from="piezaLargo">Pieza Largo: </label>
                                            <form:input path="piezaLargo" />
                                        </p>
                                        <p>                    
                                           <input id="${usuarioId}" value="${listaUsuarios}" name="usuarioId" type="hidden"/>     
                                        </p>
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
