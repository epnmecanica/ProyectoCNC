<%-- 
    Document   : abrir
    Created on : 14/07/2014, 09:34:52 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!doctype html>
<html>
  <head>
    <title>openCut</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width">
  
    <link href="<c:url value='/resources/cuter/opencut-master/src/index.css" rel="stylesheet'/>">
    
    <script type="text/javascript" src="<c:url value='/resources/cuter/opencut-master/src/index-deps.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/cuter/opencut-master/src/opencut/opencut.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/cuter/opencut-master/src/opencut/cuttype-drill.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/cuter/opencut-master/src/opencut/cuttype-gcode.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/cuter/opencut-master/src/opencut/cuttype-path.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/cuter/opencut-master/src/opencut/cuttype-pocket.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/cuter/opencut-master/src/opencut/cuttype-profile.js'/>"></script>
    <script type="text/javascript" src="<c:url value='/resources/cuter/opencut-master/src/cuttype-profile.js'/>"></script>
    
    
  </head>
  <body>
    <nav id="top-nav">
      <h1>opencut</h1>
      <a href="about.html" >about</a>
      <a href="docs.html" >docs</a>
    </nav>

    <div id="controls">
      <!-- this input is needed to let a user select a file, but it is ugly so we hide it. -->
      <input type="file" id="input-file-local" style="display:none">
      <button id="btn-open-file">open file</button>
      <button id="btn-save-file">save file</button>
      <button id="btn-compile-gcode">compile gcode</button>
      <button id="btn-preview">preview</button>
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