<%-- 
    Document   : login
    Created on : 14/05/2014, 05:37:18 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Login</title>
        <link href="${pageContext.request.contextPath}/resources/css/start/jquery-ui-1.10.4.custom.css" rel="stylesheet">
        <script src="${pageContext.request.contextPath}/resources/js/jquery-1.10.2.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.10.4.custom.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script> 
       
         <link href="${pageContext.request.contextPath}/resources/css/style.css" rel="stylesheet">
         <link href="${pageContext.request.contextPath}/resources/css/style.responsive.css" rel="stylesheet">      
             
        <script>
            $(document).ready(function() {
			$("#botonEntrarLogin").button();
                    $("#formLogin").form();
                    
                    
		});
        </script>
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
                </header>
                <div class="art-layout-wrapper">
                    <div class="art-content-layout">
                        <div class="art-content-layout-row">
                            <div class="art-layout-cell art-content">
                                <article class="art-post art-article">                                               
                                    <div class="art-postcontent art-postcontent-0 clearfix"><p style="text-align: center;"><span style="font-size: 14px;"><br></span></p><p style="text-align: center;"><img width="267" height="189" alt="" class="art-lightbox" src="../images/PUERTAS%20ABIERTAS.jpeg" style="border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(142, 180, 204); border-right-color: rgb(142, 180, 204); border-bottom-color: rgb(142, 180, 204); border-left-color: rgb(142, 180, 204); border-top-width: 8px; border-right-width: 8px; border-bottom-width: 8px; border-left-width: 8px;"><span style="font-size: 14px;"><br></span></p>                                              
                                    </div>            
                                  <h1>Login</h1>                 
                                  ${errorId}
                                    <form:form id="formLogin" action="${pageContext.request.contextPath}/usuario/iniciarSesion.htm" 
                                    method="POST"
                                    commandName="usuario">          
                                    <p>
                                        <label for="email">Email</label>
                                        <form:input path="email" />
                                    </p>
                                    <p>
                                        <label for="nombre">Contraseña</label>
                                        <form:input path="clave" type="password"/>
                                    </p>           
                                        <input id="botonEntrarLogin" type="submit" value="Ingresar" />
                                        </form:form>                   
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
