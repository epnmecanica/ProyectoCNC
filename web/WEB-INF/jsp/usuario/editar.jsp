<%-- 
    Document   : editar
    Created on : 14/05/2014, 02:25:24 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Editar Modelo</title>
    </head>
    <body>
        
        <h1>Editar Usuario</h1>
        <form:form action="${pageContext.request.contextPath}/usuario/guardar.htm"
                   method="post"
                   commandName="usuario"
                   >
            Usuario:
            <form:input path="usuarioId" readonly="true" ></form:input><br/>
            Nombre:
            <form:input path="nombre" ></form:input><br/>
            Apellido:
            <form:input path="apellido" ></form:input><br/>
            Email:
            <form:input path="email"></form:input><br/>
            Organizacion:
            <form:input path="organizacion"></form:input><br/>
            
            
            <input type="submit" value="Guardar"/>
        </form:form>
    </body>
</html>
