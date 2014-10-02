<%-- 
    Document   : infcam
    Created on : 13/08/2014, 10:25:05 AM
    Author     : user
--%>

<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Computer Aided Manufacturing</title>         
	<script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css" media="screen">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.responsive.css" media="all">
        <link href="${pageContext.request.contextPath}/resources/css/style.ie7.css" rel="stylesheet">
               
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
		<ul class="art-hmenu"><li><a href="/OpenCNC/index.htm" class="active">Ingresar</a><ul class="active"><li><a href="/OpenCNC/usuario/crear.htm">Crear Nuevo Usuario</a></li><li><a href="/OpenCNC/usuario/login.htm">Login</a></li></ul></li><li><a href="/OpenCNC/inicio/infcad.htm">CAD</a></li><li><a href="/OpenCNC/inicio/infcam.htm">CAM</a></li><li><a href="/OpenCNC/inicio/acercade.htm">Acerca de</a></li></ul></nav>
                <div class="art-layout-wrapper">
                    <div class="art-content-layout">
                        <div class="art-content-layout-row">
                            <div class="art-layout-cell art-content">
                                <article class="art-post art-article">                                                                                                                                                                                       
                                        <p style="text-align: center; margin-right: 25px; margin-left: 25px;"><span style="font-family: Arial;"><span style="font-weight: bold; color:rgb(69, 82, 112)">COMPUTER AIDED MANUFACTURING</span><br></span></p><p><br></p>                                                                                                                                               
                                            <p style="text-align: center;"><span style="font-family: 'Palatino Linotype'; font-size: 14px;">Producción Asistida por Computadora.&nbsp;</span></p>
                                            <p style="text-align: center;"><span style="font-family: 'Palatino Linotype'; font-size: 14px;"><br></span></p>
                                            <p style="text-align: justify;"><span style="font-family: 'Palatino Linotype'; font-size: 14px;">El término CAM se puede definir como el uso de sistemas informáticos para la planificación, gestión y control de las operaciones de una planta de fabricación mediante una interfaz directa o indirecta entre el sistema informático y los recursos de producción. Cosiste en usar tecnología mediante el uso de computadores para realizar diversas tareas como: </span></p>  
                                            <p style="text-align: justify;"><span style="font-family: 'Palatino Linotype'; font-size: 14px;">&nbsp; &nbsp; Modelación, Geométrica, Planificación, Programación, Inspección, Ensamblado y Embalaje de la producción.</span></p> 
                                            <p style="text-align: justify;"><span style="font-family: 'Palatino Linotype'; font-size: 14px;">El CAM toma la información del diseño y genera la ruta de corte que tiene que seguir la herramienta para fabricar la pieza deseada; a partir de esta ruta de corte se creará automáticamente el programa de maquinado, el cual puede ser introducido a la Máquina CNC mediante un disco o a su vez también puede ser enviado electrónicamente.</span></p>                                            
                                </article>                              
                            </div>
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
    </body>
</html>
