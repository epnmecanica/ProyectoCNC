<%-- 
    Document   : abrir
    Created on : 19/05/2014, 01:05:31 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Abrir Modelo</title>
        <link href="${pageContext.request.contextPath}/resources/css/start/jquery-ui-1.10.4.custom.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/css/jquery.dataTables.css" rel="stylesheet">
        
        
	<script src="${pageContext.request.contextPath}/resources/js/jquery-1.10.2.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.10.4.custom.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery.dataTables.js"></script>
    </head>
    <body>
        <h1>Abrir modelo existente.</h1>
        <table id="tablaModelo" class="display" cellspacing="0" width="100%">
            <thead>
                <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Descripcion</th>
                <th>Creado</th>
                <th>Unidades</th>
                <th>Tipo de Maquina</th>
                <th>Cero de Maquina X</th>
                <th>Cero de Maquina Y</th>
                <th>Pieza ancho</th>
                <th>Pieza largo</th>
                <th></th>
                <th></th>
                </tr>
            </thead>
            <tfoot>
                 <tr>
                    <td>Id</td>
                    <td>Nombre</td>
                    <td>Usuario</td>
                    <td>Descripcion</td>
                    <td>Creado</td>
                    <td>Unidades</td>
                    <td>Tipo de Maquina</td>
                    <td>Cero de Maquina X</td>
                    <td>Cero de Maquina Y</td>
                    <td>Pieza ancho</td>
                    <td>Pieza largo</td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
            <tbody>
            <c:forEach var="modelo" items="${modelos}"  >
                <tr>
                    <td>
                        ${modelo.modeloId}
                    </td>
                    <td>
                        ${modelo.nombre}
                    </td>
                    <td>
                        <%--${modelo.usuario}--%>
                    </td>
                    <td>
                        ${modelo.descripcion} 
                    </td>
                    <td>
                        ${modelo.creadoPor} 
                    </td>
                    <td>
                        <%--${modelo.unidadMedida} --%>
                    </td>
                    <td>
                        <%-- ${modelo.tipoMaquina} --%>
                    </td>
                    <td>
                        ${modelo.puntoCeroMaquinaX} 
                    </td>
                    <td>
                        ${modelo.puntoCeroMaquinaY} 
                    </td>
                    <td>
                        ${modelo.piezaAncho} 
                    </td>
                    <td>
                        ${modelo.piezaLargo} 
                    </td>
                    <td>
                       
                        <a href="${pageContext.request.contextPath}/modelo/editarModelo/${usuario.usuarioId}.htm">Editar</a>
                        <a href="${pageContext.request.contextPath}/modelo/borrarModelo/${usuario.usuarioId}.htm">Borrar</a>
                        
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </body>
</html>
