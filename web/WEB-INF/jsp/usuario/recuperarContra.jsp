<%-- 
    Document   : recuperarContra
    Created on : 18/05/2014, 11:16:57 PM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Recuperar Contraseña</title>
        <script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/jquery-1.10.2.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.10.4.custom.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script> 
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css" media="screen">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.responsive.css" media="all">
        <link href="${pageContext.request.contextPath}/resources/css/style.ie7.css" rel="stylesheet" media="all">
               
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
                                <article class="art-post art-article">                                 
                                    <div class="art-postcontent art-postcontent-0 clearfix">
                                        <div class="art-content-layout">
                                            <div class="art-content-layout-row">
                                                <div class="art-layout-cell" style="width: 50%" >
                                                    <p style="text-align: center;"><img width="250" height="300" alt="" class="art-lightbox" src="../resources/images/olvido1.jpg" style="border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(142, 180, 204); border-right-color: rgb(142, 180, 204); border-bottom-color: rgb(142, 180, 204); border-left-color: rgb(142, 180, 204); border-top-width: 6px; border-right-width: 6px; border-bottom-width: 6px; border-left-width: 6px; "><br></p><p style="text-align: center;"><br></p><p style="text-align: center;"><br></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>       
                                    <h1>Recuperar Contraseña</h1>
                                    <form:form action="${pageContext.request.contextPath}/usuario/enviarMail.htm"
                                                method="POST"
                                                commandName="mail"
                                                >
                                        <input id="enviarMail" value="example@example.com" name="enviarMail" type="text"/>

                                         <input type="submit" value="Enviar contraseña"/>
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
