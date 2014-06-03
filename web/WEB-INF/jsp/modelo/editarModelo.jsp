<%-- 
    Document   : editarModelo
    Created on : 19/05/2014, 04:11:48 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Edicion modelo</title>
    </head>
    <body>
        <h1>Edicion Modelo</h1>
        
        <form:form action="${pageContext.request.contextPath}/modelo/guardarModelo.htm"
                   method="POST"
                   commandName="modelo"
                   >
            Nombre:
            <form:input path="nombre" ></form:input><br/>
            Descripcion:
            <form:input path="descripcion" ></form:input><br/>
            Punto Cero Maquina X:
            <form:input path="puntoCeroMaquinaX"></form:input><br/>
            Punto Cero Maquina Y:
            <form:input path="puntoCeroMaquinaY"></form:input><br/>
            Ancho:
            <form:input path="piezaAncho" />
            Largo:
            <form:input path="piezaLargo" />
             
            <input type="submit" value="Guardar Cambios"/>
        </form:form>
    </body>
</html>
