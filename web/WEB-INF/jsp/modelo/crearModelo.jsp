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
        <script>
            $(document).ready(function() {
			$("#botonGuardarModelo").button();
                    $("#formaModelo").form();
                    
                    
		});
        </script>
    </head>
    <body>
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
                <label>Punto Cero Maquina X: </label>
                <form:input path="puntoCeroMaquinaX" />
            </p>
            <p>
                <label>Punto Cero Maquina Y: </label>
                <form:input path="puntoCeroMaquinaY" />
            </p>
             <p>
                <label>Pieza Ancho: </label>
                <form:input path="piezaAncho" />
            </p>
             <p>
                <label>Pieza Largo: </label>
                <form:input path="piezaLargo" />
            </p>
            <p>                    
               <input id="${usuarioId}" value="${listaUsuarios}" name="usuarioId" type="hidden"/>     
            </p>
            <input id="botonGuardarModelo" type="submit" value="Guardar Modelo" />
        </form:form>
    </body>
</html>
