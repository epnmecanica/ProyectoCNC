<%-- 
    Document   : cambiarContrasena
    Created on : 15/05/2014, 06:30:21 AM
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
        
    </head>
    <body>
        
        
        <div id="art-main">
    <div class="art-sheet clearfix">
<header class="art-header">
<div class="art-slider art-slidecontainerheader" data-width="978" data-height="100">
    <div class="art-slider-inner">
<div class="art-slide-item art-slideheader0">

</div>
<div class="art-slide-item art-slideheader1">

</div>
<div class="art-slide-item art-slideheader2">

</div>

    </div>
</div>
<div class="art-slidenavigator art-slidenavigatorheader" data-left="93.46">
<a href="#" class="art-slidenavigatoritem"></a><a href="#" class="art-slidenavigatoritem"></a><a href="#" class="art-slidenavigatoritem"></a>
</div>



    <div class="art-shapes">

            </div>
              
                    
</header>

<div class="art-layout-wrapper">
                <div class="art-content-layout">
                    <div class="art-content-layout-row">
                        <div class="art-layout-cell art-content"><article class="art-post art-article">
                                <h2 class="art-postheader"><span class="art-postheadericon"></span></h2>
                                                
                                <div class="art-postcontent art-postcontent-0 clearfix"><div class="art-content-layout">
    <div class="art-content-layout-row">
    <div class="art-layout-cell" style="width: 50%" >
        <p style="text-align: center;"><img width="250" height="300" alt="" class="art-lightbox" src="../images/olvido1.jpg" style="border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(142, 180, 204); border-right-color: rgb(142, 180, 204); border-bottom-color: rgb(142, 180, 204); border-left-color: rgb(142, 180, 204); border-top-width: 6px; border-right-width: 6px; border-bottom-width: 6px; border-left-width: 6px; "><br></p><p style="text-align: center;"><br></p><p style="text-align: center;"><br></p>
    </div>
        
    </div>
</div>
</div>                                      
</div>
        
        
        
        <h1>Cambio de contraseña</h1>
        ${nombreUsuario}
         <form:form id="forma" action="${pageContext.request.contextPath}/usuario/guardar.htm" 
                   method="POST"
                   commandName="usuario">
            <p>
		<label for="nombre">e-mail: </label>
                
            </p>
            <p>
		<label for="clave">Cambiar Contraseña: </label>
                <input type="text" name="clave" value="" />
            </p>
            <p>
		<label for="reClave">Confirmar Contraseña: </label>
                <input type="text" name="reClave" value="" />
            </p>
            
            
            <input id="botonGuardar" type="submit" value="Cambiar" />
        </form:form>

            
            </article><div class="art-block clearfix">
        <div class="art-blockcontent"><p>Saber para ser....<br></p></div>
</div></div>
                    </div>
                </div>
            </div>
    </div>
<footer class="art-footer">
  <div class="art-footer-inner">
<p style="text-align: left;"><span style="border-collapse: collapse;">Versión Beta 1.0</span></p><p><br></p>
    <p class="art-page-footer">
        
    </p>
  </div>
</footer>

            
            
            
    </body>
</html>
