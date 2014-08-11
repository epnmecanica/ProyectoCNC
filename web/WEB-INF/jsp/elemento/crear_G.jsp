<%-- 
    Document   : crear_G
    Created on : 11/08/2014, 03:10:06 PM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width">
        
        <script src="<c:url value='/resources/cad/lib/external/jquery.min.js'/>"></script>
        <script src="<c:url value='/resources/cad/lib/external/jquery-ui.min.js'/>"></script>
        
        <link href="<c:url value='/resources/cam/styles/style.css" rel="stylesheet'/>">
        <script src="<c:url value='/resources/cam/cam-deps.js'/>"></script>
        
        <script src="<c:url value='/resources/cam/cuts/opencut.js'/>"></script>
        <script src="<c:url value='/resources/cam/cuts/cuttype-drill.js'/>"></script>
        <script src="<c:url value='/resources/cam/cuts/cuttype-gcode.js'/>"></script>
        <script src="<c:url value='/resources/cam/cuts/cuttype-path.js'/>"></script>
        <script src="<c:url value='/resources/cam/cuts/cuttype-pocket.js'/>"></script>
        <script src="<c:url value='/resources/cam/cuts/cuttype-profile.js'/>"></script>
        
        
        <script src="<c:url value='/resources/cam/cam.js'/>"></script>
        
        <title>CAM</title>
        
        
    </head>
    <body>
       <nav id="top-nav">
      <h1>OpenCNC_CAM</h1>
    </nav>
    
    <div id="controls">
      <!-- this input is needed to let a user select a file, but it is ugly so we hide it. -->
      <input type="file" id="input-file-local" style="display:none">
      
      <button id="btn-open-file">Abrir Archivo</button>
      <button id="btn-save-file">Guardar Archivo</button>
      <button id="btn-compile-gcode">Compilar codigo G</button>
      
      <a id="link-download-gcode" style="display:none">download gcode</a>
    </div>

    <div id="user-warnings"></div>

    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <div id="editor-holder">
            <div id="yaml-editor"></div>
          </div>
        </div>
      </div>
    </div>
    </body>
</html>
