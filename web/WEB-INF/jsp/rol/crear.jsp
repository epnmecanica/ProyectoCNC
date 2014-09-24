<%-- 
    Document   : abrir_error
    Created on : 27/08/2014, 10:48:16 AM
    Author     : root
--%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Error</title>         
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
                <nav class="art-nav">
                    <ul class="art-hmenu"><li><a href="/OpenCNC/index.htm">Ingresar</a></li><li><a href="infcad.htm">CAD</a></li><li><a href="infcam.htm">CAM</a></li><li><a href="acercade.htm">Acerca de</a></li></ul> 
                </nav>
                 <div class="art-layout-wrapper">
                    <div class="art-content-layout">
                        <div class="art-content-layout-row">
                            <div class="art-layout-cell art-content">
                                <article class="art-post art-article"><p><br></p><p><br></p>
                                    <form:form id="formaRol" action="${pageContext.request.contextPath}/rol/guardarRol.htm" 
                                                method="POST"
                                                commandName="rol">
                                         <p>
                                             <label for="nombre">Nombre Rol</label>
                                             <form:input path="nombreRol" />
                                         </p>
                                         <p>
                                             <label for="codigo">Codigo Rol</label>
                                             <form:input path="codigo" />
                                         </p>
                                         <p>
                                             <label for="creadoPor">Creado por: </label>
                                             <form:input path="creadoPor" />
                                         </p>           
                                         <input type="submit" value="Crear Rol" id="botonGuardarRol"/>
                                     </form:form> 
                                </article>                                                 
                            </div>
                        </div>
                    </div> 
                    <footer class="art-footer">
                    <div class="art-footer-inner">
                        <p style="text-align: left;"><span style="border-collapse: collapse;">Versión Beta 1.0</span></p><p><br></p>                       
                    </div>
                    </footer>
                 </div>
            </div>                                      
        </div>
    </body>
</html>

