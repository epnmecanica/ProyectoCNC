<%-- 
    Document   : lista
    Created on : 14/05/2014, 12:38:05 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cambiar Contraseña</title>
        <script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script>         
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css" media="screen">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.responsive.css" media="all">
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
                                      <p style="text-align: center;"><span style="font-family: webkit-body; font-size: 30px;">Lista de Usuarios</span></p><p><br></p>                                                                    
                                            <p style="text-align: justify;"><span style="font-family: webkit-body; font-size: 25px;">Nombre de Usuario: ${nombreUsuario}
                                            &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp 
                                            <a href="/OpenCNC/usuario/crear.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">Registrar un Nuevo Usuario</a><p><br></p> 
                                            <table id="tabla" class="display" cellspacing="0" width="100%">
                                                <thead>
                                                    <tr>
                                                    <th>Id</th>
                                                    <th>Nombre</th>
                                                    <th>Login</th>
                                                    <th>e-Mail</th>
                                                    <th>Clave</th>
                                                    <th>Opciones:</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                     <tr>
                                                        <td>Id</td>
                                                        <td>Nombre</td>
                                                        <td>Login</td>
                                                        <td>e-Mail</td>
                                                        <td>Clave</td>
                                                        <td>Opciones</td>
                                                          
                                                     </tr>
                                                </tfoot>
                                                <tbody>
                                                <c:forEach var="usuario" items="${usuarios}"  >
                                                    <tr>
                                                        <td>
                                                            ${usuario.usuarioId}
                                                        </td>
                                                        <td>
                                                            ${usuario.nombre}
                                                        </td>
                                                        <td>
                                                            ${usuario.apellido}
                                                        </td>
                                                        <td>
                                                            ${usuario.email} 
                                                        </td>
                                                        <td>
                                                            ${usuario.clave} 
                                                        </td>
                                                        <td>
                                                            <a href="${pageContext.request.contextPath}/usuario/editar/${usuario.usuarioId}.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">Editar</a>
                                                            <a href="${pageContext.request.contextPath}/usuario/borrar/${usuario.usuarioId}.htm"class="art-button" style="font-size: 12px; cursor: pointer; ">Borrar</a>

                                                        </td>
                                                    </tr>
                                                </c:forEach>
                                                </tbody>
                                            </table>
                                </article>                                                            
                            </div>
                        </div>
                    </div>
                </div>
                    <footer class="art-footer">
                        <div class="art-footer-inner">
                            <p style="text-align: left;"><span style="border-collapse: collapse;">Versión Beta 1.0</span></p><p><br></p>
                            <p class="art-page-footer"></p>
                        </div>
                    </footer>  
            </div>                                                  
        </div>                                      
    </body>
</html>

