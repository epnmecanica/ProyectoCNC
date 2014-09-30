<%-- 
    Document   : abrir
    Created on : 19/05/2014, 01:05:31 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8" session="true" language="java" import="java.util.*"%>
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
        <script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script>
        <link href="${pageContext.request.contextPath}/resources/css/style.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/css/style.responsive.css" rel="stylesheet">                   
        <link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/resources/images/favicon.ico"/> 
    </head>
    
    <body>
        
          <div id="art-main">
            <div class="art-sheet clearfix">
                <header class="art-header">
                    <div class="art-slider art-slidecontainerheader" data-width="978" data-height="100">
                        <div class="art-slider-inner">
                            <div class="art-slide-item art-slideheader0"></div>
                            <div class="art-slide-item art-slideheader1"></div>
                            <div class="art-slide-item art-slideheader2"></div>
                        </div>
                    </div>
                    <div class="art-slidenavigator art-slidenavigatorheader" data-left="93.46">
                        <a href="#" class="art-slidenavigatoritem"></a>
                        <a href="#" class="art-slidenavigatoritem"></a><a href="#" class="art-slidenavigatoritem"></a>
                    </div>
                    <div class="art-shapes">
                    </div>                                   
                </header>
                <div class="art-layout-wrapper">
                    <div class="art-content-layout">
                        <div class="art-content-layout-row">
                            <div class="art-layout-cell art-content">
                                <article class="art-post art-article"><p><br></p>                                                                                                         
                                    <p style="text-align: center;"><span style="font-size: 25px;">Abrir un Modelo Existente<br></span></p> 
                                    Nombre de usuario: ${nombreUsuario}
                                        <table id="tablaModelo" class="display" cellspacing="0" width="100%">
                                            <thead>
                                                <tr>                                                
                                                <th>Nombre</th>
                                                <th>Descripcion</th>
                                                <th>Unidades</th>
                                                <th>Tipo de Maquina</th>
                                                <th>Cero de Maquina X</th>
                                                <th>Cero de Maquina Y</th>
                                                <th>Pieza ancho</th>
                                                <th>Pieza largo</th>
                                                <th>Opciones &nbsp &nbsp &nbsp &nbsp</th>                                              
                                                </tr>
                                            </thead>
                                            <tfoot>
                                                 <tr>                                                    
                                                    <td>Nombre</td>
                                                    <td>Descripcion</td>
                                                    <td>Unidades</td>
                                                    <td>Tipo de Maquina</td>
                                                    <td>Cero de Maquina X</td>
                                                    <td>Cero de Maquina Y</td>
                                                    <td>Pieza ancho</td>
                                                    <td>Pieza largo</td>
                                                    <td>Opciones &nbsp &nbsp &nbsp &nbsp</td>
                                                </tr>
                                            </tfoot>
                                            <tbody>
                                            <c:forEach var="modelo" items="${modelos}"  >
                                                <tr>
                                                    <td>
                                                        ${modelo.nombre}
                                                    </td>
                                                    <td>
                                                        ${modelo.descripcion} 
                                                    </td>
                                                    <td>
                                                        ${modelo.unidadMedida.nombre}
                                                    </td>
                                                    <td> 
                                                        ${modelo.tipoMaquina.nombre}
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
                                                        &nbsp <a href="${pageContext.request.contextPath}/modelo/editarModelo/${modelo.modeloId}.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">Editar</a>
                                                        <a href="${pageContext.request.contextPath}/modelo/borrarModelo/${modelo.modeloId}.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">Borrar</a> 
                                                       <a href="${pageContext.request.contextPath}/elemento/crear/${modelo.modeloId}.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">AbrirCad</a> &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
                                                    
                                                    </td>
                                                </tr>
                                            </c:forEach>
                                            </tbody>
                                        </table>
                                    <footer class="art-footer">
                                        <div class="art-footer-inner">
                                            <p style="text-align: left;"><span style="border-collapse: collapse;">Versión Beta 1.0</span></p><p><br></p>
                                        </div>
                                    </footer>
                                </article>        
                            </div>
                        </div>
                    </div>  
                </div>
            </div>   
        </div>                                                                      
    </body>
</html>
