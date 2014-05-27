<%-- 
    Document   : crearModelo
    Created on : 19/05/2014, 12:55:11 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
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
		<label for="creadoPor">Creado por: </label>
                <form:input path="creadoPor" />
            </p>
            <p>
		<label for="unidadMedida">Unidad Medida</label>
                
                <form:select path="unidadMedida" >
                    <form:option value="1">milimetros</form:option>
                    <form:option value="2">Pulgadas</form:option>
                </form:select> 
                
                <form:input path="unidadMedida" />
            </p>
            <p>
		<label for="tipoMaquina">Tipo de Maquina</label>
                
                <form:select path="tipoMaquina" >
                    <form:option value="1">Fresadora</form:option>
                    <form:option value="2">Torno</form:option>
                </form:select>
                
                <form:input path="tipoMaquina" />
            </p>
            <p>
                <label from="puntoCeroMaquinaX">Punto Cero Maquina X: </label>
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
            
            
            <input id="botonGuardarModelo" type="submit" value="Guardar Modelo" />
        </form:form>
    </body>
</html>
