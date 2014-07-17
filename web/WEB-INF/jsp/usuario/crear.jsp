<%-- 
    Document   : crear
    Created on : 14/05/2014, 01:51:46 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Crear Usuario</title>
        <link href="${pageContext.request.contextPath}/resources/css/start/jquery-ui-1.10.4.custom.css" rel="stylesheet">
         
	<script src="${pageContext.request.contextPath}/resources/js/jquery-1.10.2.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.10.4.custom.js"></script> 
        <script>
            $(document).ready(function() {
			$("#botonGuardar").button();
                    $("#forma").form();
                    
                    
		});
        </script>
        <title>Crear Usuario</title>
    </head>
    <body>
        
        <h1>Crear Usuario</h1>
        ${error}
        <form:form id="forma" action="${pageContext.request.contextPath}/usuario/guardar.htm" 
                   method="POST"
                   commandName="usuario">
            <p>
		<label for="nombre">Nombre</label>
                <form:input path="nombre" />
            </p>
            <p>
		<label for="apellido">Apellido</label>
                <form:input path="apellido" />
            </p>
            <p>
		<label for="organizacion">Organizacion</label>
                <form:input path="organizacion" />
            </p>
            <p>
		<label for="email">Email</label>
                <form:input path="email" />
            </p>
            <p>
		<label for="clave">Contraseña</label>
                <form:input path="clave" type="password"/>
            </p>
            <p>
		<label for="email">Confirmar Contraseña</label>
                <form:input path="" type="password"/>
            </p>
            
            <input id="botonGuardar" type="submit" value="Crear" />
        </form:form>
    </body>
</html>
