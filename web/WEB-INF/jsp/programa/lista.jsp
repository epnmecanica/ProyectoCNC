<%-- 
    Document   : lista
    Created on : 17/06/2014, 11:57:56 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
         <link href="${pageContext.request.contextPath}/resources/css/start/jquery-ui-1.10.4.custom.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/css/jquery.dataTables.css" rel="stylesheet">
        
        
	<script src="${pageContext.request.contextPath}/resources/js/jquery-1.10.2.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.10.4.custom.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery.dataTables.js"></script>
        
        

<script>
            $(document).ready(function() {
                $('#tabla').dataTable({"language": {
                                            "url": "${pageContext.request.contextPath}/resources/es_es.txt"
                                        }});
                $('#botonNuevo').button();
            } );
            
        </script>
        <style>
            div.dataTables_wrapper {
                margin-bottom: 1em;
            }
        </style>
        
    </head>
    <body>
        <h1>Programa CAM</h1>
         
        <table id="tabla" class="display" cellspacing="0" width="100%">
            <thead>
                <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th> </th>
                </tr>
            </thead>
            <tfoot>
                 <tr>
                    <td>Id</td>
                    <td>Nombre</td>
                    <td>Descripcion</td>
                    <td> </td>
                </tr>
            </tfoot>
            <tbody>
            <c:forEach var="programa" items="${programas}"  >
                <tr>
                    <td>
                        ${programa.programaId}
                    </td>
                    <td>
                        ${programa.modelo}
                    </td>
                    <td>
                        ${programa.descripcion}
                    </td>
                    
                    <td>
                        <a href="${pageContext.request.contextPath}/programa/borrar/${programa.programaId}.htm">Borrar</a>    
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </body>
</html>
