<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="<c:url value="/resources/js/jquery-1.10.2.js"/>" > </script>
        <script src="${pageContext.request.contextPath}/resources/js/jquery-1.10.2.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.10.4.custom.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script> 
        <script type="text/javascript"
            src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js">
        </script>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
       
        <script type="text/javascript" src="<c:url value='/resources/js/configAjaxJason.js'/>"></script>
        
        <title>OPEN CNC</title>
        
    </head>

    <body>
                
        <br>
            <a href="usuario/lista.htm">Usuario</a>
        </br>
        <br>
            <a href="usuario/login.htm">Login</a>
        </br>
        <br>
            <a href="usuario/crear.htm">Crear Nuevo Usuario</a>
        </br>
        <br>
            <a href="usuario/recuperarContra.htm">Recuperar contraseña</a>
        </br>
        <br>
            <a href="cam/abrir.htm">CAM</a>
        </br>
         <br>
        <a href="resources/index_back_cad.html">CAD</a>
        </br> 
        <%--
        <br>
            <a href="modelo/abrir.htm">Abrir Modelo</a>
        </br>
        <br>
            <a href="modelo/crearModelo.htm">Crear Nuevo Modelo</a>
        </br>
        
        
        <br>
        <a href="resources/index.html">CAD</a>
        </br>   
        
        <br>
            <a href="rol/crear.htm">Crear Rol</a>
        </br>
        <br>
            <a href="elemento/crear.htm">Elemento Grafico</a>
        </br>
        <br>
            <a href="programa/crear.htm">Programa</a>
        </br>
        <br>
            <a href="sentencia/crear.htm">Sentencia</a>
        </br>
        <br>
            <a href="cad/cad.htm">CAD CRUD</a>
        </br>
        --%>
        <br>
            <a href="usuario/logout.htm">Log out</a>
            <a href="resources/cuter/index.html">CAD</a>
        </br>
        
        
        
    </body>
</html>
