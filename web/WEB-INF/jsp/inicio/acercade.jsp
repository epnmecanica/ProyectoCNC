<<%-- 
    Document   : acercajsp
    Created on : 13/08/2014, 10:24:30 AM
    Author     : user
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Acerca de</title>         
	<script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css" media="screen">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.responsive.css" media="all">
         
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
                                    <h2 class="art-postheader"><span class="art-postheadericon">Acerca de</span></h2>                                               
                                    <div class="art-postcontent art-postcontent-0 clearfix"><p>Grupo de Trabajo:</p><p>EPN</p><p>ESPOCH</p><p>UPS</p>
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
    </body>
</html>
