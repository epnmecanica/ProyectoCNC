<%-- 
    Document   : crear
    Created on : 20/05/2014, 01:52:11 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Crear Rol</title>
        <link href="${pageContext.request.contextPath}/resources/css/start/jquery-ui-1.10.4.custom.css" rel="stylesheet">
         
	<script src="${pageContext.request.contextPath}/resources/js/jquery-1.10.2.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.10.4.custom.js"></script> 
        <script>
            $(document).ready(function() {
			$("#botonGuardarRol").button();
                    $("#formaRol").form();
                    
                    
		});
        </script>
    </head>
    <body>
        <h1>Crear Rol</h1>
        <form:form id="formaRol" action="${pageContext.request.contextPath}/rol/guardarRol.htm" 
                   method="POST"
                   commandName="rol">
            <p>
		<label for="nombre">Nombre Rol</label>
                <form:input path="nombreRol" />
            </p>
            <p>
		<label for="codigo">Codigo Rol</label>
                <form:input path="codigo" />
            </p>
            <p>
		<label for="creadoPor">Creado por: </label>
                <form:input path="creadoPor" />
            </p>           
            <input type="submit" value="Crear Rol" id="botonGuardarRol"/>
        </form:form>
    </body>
</html>
