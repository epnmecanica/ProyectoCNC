<%-- 
    Document   : lista
    Created on : 17/06/2014, 11:15:05 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Lista Roles</title>
        <link href="${pageContext.request.contextPath}/resources/css/start/jquery-ui-1.10.4.custom.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/css/jquery.dataTables.css" rel="stylesheet">
        
        
	<script src="${pageContext.request.contextPath}/resources/js/jquery-1.10.2.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.10.4.custom.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery.dataTables.js"></script>
    </head>
    <body>
        
        <h1>Lista Rol</h1>
        <table id="tablaRol" class="display" cellspacing="0" width="100%">
            <thead>
                <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Fecha de creado</th>
                
                </tr>
            </thead>
            <tfoot>
                 <tr>
                    <td>Id</td>
                    <td>Nombre</td>
                    <td>Fecha de creado</td>
                    
                </tr>
            </tfoot>
            <tbody>
            <c:forEach var="rol" items="${rol}"  >
                <tr>
                    <td>
                        ${rol.codigo}
                    </td>
                    <td>
                        ${rol.nombreRol}
                    </td>
                    <td>
                        ${rol.creadoPor}
                    </td>
                   
                    <td>
                        <a href="${pageContext.request.contextPath}/rol/borrarRol/${rol.rolId}.htm">Borrar</a>   
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </body>
</html>
