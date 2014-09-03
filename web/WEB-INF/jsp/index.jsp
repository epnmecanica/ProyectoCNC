<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
           
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
        <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.1.min.js"></script>  
        <script src="<c:url value="/resources/js/jquery-1.10.2.js"/>" > </script>  
        <script type="texscript" src="<c:url value='/resources/js/configAjaxJason.js'/>"></script>        
        <script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script> 
        <link href="${pageContext.request.contextPath}/resources/css/style.css" rel="stylesheet">
        <link href="${pageContext.request.contextPath}/resources/css/style.responsive.css" rel="stylesheet">      
        <link href="${pageContext.request.contextPath}/resources/css/style.ie7.css" rel="stylesheet">    
               
        <title>OPEN CNC</title>
        
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
                        <a href="#" class="art-slidenavigatoritem"></a>
                        <a href="#" class="art-slidenavigatoritem"></a>
                    </div>
                
                </header>         
                <nav class="art-nav">
                    <ul class="art-hmenu"><li><a class="active" href="index.htm">Ingresar</a><ul class="active"><li><a href="usuario/crear.htm">Crear Nuevo Usuario</a></li><li><a href="usuario/login.htm">Login</a><ul><li><a href="usuario/recuperarContra.htm">Recuperar contraseña</a></li></ul></li></ul></li><li><a href="inicio/infcad.htm">CAD</a></li><li><a href="inicio/infcam.htm">CAM</a></li><li><a href="inicio/acercade.htm">Acerca de</a></li></ul> 
                </nav>                                  
                <div class="art-layout-wrapper">
                    <div class="art-content-layout">
			<div class="art-content-layout-row">
                            <div class="art-layout-cell art-content">
				<article class="art-post art-article">                                             
                                    <div class="art-postcontent art-postcontent-0 clearfix"><table class="art-article" border="0" cellspacing="0" cellpadding="0" style="margin:0;width:100%;"><tbody><tr class="even"><td style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;width:640px;border-top-width:0;border-right-width:0;border-bottom-width:0;border-left-width:0;">
                                        <img width="640" height="388" alt="" class="art-lightbox" src="../resources/images/intro.jpg" style="border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(142, 180, 204); border-right-color: rgb(142, 180, 204); border-bottom-color: rgb(142, 180, 204); border-left-color: rgb(142, 180, 204); border-top-width: 8px; border-right-width: 8px; border-bottom-width: 8px; border-left-width: 8px;">                                                 
                                            </td><td style="background-color:rgb(69, 82, 112);padding-top:10px;padding-right:16px;padding-bottom:0;padding-left:10px;border-top-width:0;border-right-width:0;border-bottom-width:0;border-left-width:0;"><p style="text-align: center; "><span style="color: rgb(228, 235, 236); "><span style="text-shadow: rgba(23, 23, 23, 0.976563) 0px 0px 6px; color: rgb(226, 52, 29); font-size: 16px; "><span style="color: rgb(3, 240, 252); font-family: 'Arial Black'; text-shadow: rgb(255, 255, 255) 1.4px 1.4px 0px, rgba(23, 23, 23, 0.792969) 2.1px 2.1px 0px; ">CAD-CAM</span><span style="font-family: Arial; text-shadow: rgb(255, 255, 255) 1.4px 1.4px 0px, rgba(23, 23, 23, 0.792969) 2.1px 2.1px 0px; ">&nbsp;</span></span></span></p><p style="text-align: justify; "><span style="font-size: 13px; color: rgb(228, 235, 236); font-family: Georgia;">Los sistemas CAD-CAM generan el programa de maquinado de forma&nbsp;automática. En el sistema CAD la pieza que se desea maquinar se diseña en la&nbsp;computadora con herramientas de dibujo y modelado sólido. El&nbsp;CAM toma la información del diseño y genera la ruta de corte que tiene que seguir la&nbsp;herramienta para fabricar la pieza deseada; se crea&nbsp;automáticamente el programa de maquinado, que puede ser introducido a la máquina&nbsp;por la correspondiente interface de comunicación</span></p><p style="text-align: justify; "><span style="color: rgb(228, 235, 236); font-family: Georgia; "><span style="font-size: 11px;">&nbsp; </span><span style="color: rgb(27, 47, 60); font-family: Arial, 'Arial Unicode MS', Helvetica, sans-serif; ">&nbsp; &nbsp; &nbsp; &nbsp;<a href="usuario/login.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">Entrar</a></span><span style="font-size: 11px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span><a href="usuario/crear.htm" class="art-button" style="font-size: 12px;  ">Crear Usuario</a><span style="font-size: 13px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></span></p></td></tr></tbody></table>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; BIENVENIDOS A OPEN CNC<br><span style="border-collapse: collapse; color: rgb(50, 146, 205); font-size: 28px; font-weight: bold;"><span style="color: rgb(129, 136, 152); font-family: Arial; font-size: 20px; text-align: right; ">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;</span></span><span style="border-collapse: collapse; color: rgb(50, 146, 205); font-size: 28px; font-weight: bold;"><span style="color: rgb(129, 136, 152); font-family: Arial; font-size: 20px; text-align: right; ">Más Información:</span></span><span style="border-collapse: collapse; color: rgb(129, 136, 152); font-family: Arial; font-weight: bold; ">&nbsp;<a href="http://www.automatizafill.com/wp/">http://www.automatizafill.com/wp/</a></span><p></p><p></p><p><br>
					</p>
                                    </div>
				</article>
				<div class="art-block clearfix">
                                    <div class="art-blockcontent"><p>Saber para ser....<br></p>
                                    </div>
				</div>
                            </div>
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
                            
         <%--    AUN FALTAN ESTILOS   
                      <a href="usuario/recuperarContra.htm" class="art-button">Recuperar Contraseña</a>&nbsp;<br></p>
                <br>
            <a href="usuario/lista.htm">Usuario</a>
        </br>                      
        <br>
            <a href="usuario/lista.htm">Usuario</a>
        </br>             
        <br>
            <a href="usuario/recuperarContra.htm">Recuperar contraseña</a>
        </br>
        <br>
            <a href="cam/abrir.htm">CAM</a>
        </br>
        <br>
            <a href="contenedor/Contenedor.htm">Contenedor</a>
        </br>       
        <br>
            <a href="modelo/abrir.htm">Abrir Modelo</a>  LISTA DE MODELO???
        </br>       
        <br>
            <a href="cad/cad.htm">CAD</a>
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
        <br>
            <a href="usuario/logout.htm">Log out</a>
        </br>        
        --%>       
    </body>
</html>
