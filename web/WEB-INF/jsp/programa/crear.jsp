<%-- 
    Document   : crear
    Created on : 17/06/2014, 11:57:48 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Programa</title>
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
        <h1>Crear Programa</h1>
        <form:form action="${pageContext.request.contextPath}/programa/actualizarPrograma.htm"
                   method="POST"
                   commandName = "programa"
                   >
            ID:
            <form:input path="programaId"></form:input><br/>
            Nombre:
            <form:input path="descripcion" ></form:input><br/>
            Punto Cero Maquina X:
                         
            <input type="submit" value="Guardar Cambios"/>
        </form:form>
    </body>
</html>
