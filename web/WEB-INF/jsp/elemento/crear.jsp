<%-- 
    Document   : crear
    Created on : 17/06/2014, 11:57:20 AM
    Author     : root
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<!DOCTYPE html>
<html>
	<head>
                <title>OpenCNC</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width">
                
                <link href="${pageContext.request.contextPath}/resources/css/start/jquery-ui-1.10.4.custom.css" rel="stylesheet">
                <link href="${pageContext.request.contextPath}/resources/css/jquery.dataTables.css" rel="stylesheet">


                <script src="${pageContext.request.contextPath}/resources/js/jquery-1.10.2.js"></script>
                <script src="${pageContext.request.contextPath}/resources/js/jquery-ui-1.10.4.custom.js"></script>
                <script src="${pageContext.request.contextPath}/resources/js/jquery.dataTables.js"></script>
                
                
                
                
                
                
                <script type="text/javascript" src="<c:url value='/resources/cad/archivotxt.js'/>"></script>
		<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>-->
                <script src="<c:url value='/resources/cad/lib/external/jquery.min.js'/>"></script>
		<!--<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>-->
                <script src="<c:url value='/resources/cad/lib/external/jquery-ui.min.js'/>"></script>
               
                <link rel='stylesheet' type='text/css' href='http://trentrichardson.com/Impromptu/jquery-impromptu.css' />
                
                <script src="http://trentrichardson.com/Impromptu/jquery-impromptu.min.js"></script>
                      
                <script src="<c:url value='/resources/cam/cam-deps.js'/>"></script>

                <script src="<c:url value='/resources/cam/cuts/opencut.js'/>"></script>
                <script src="<c:url value='/resources/cam/cuts/cuttype-arc.js'/>"></script>
                <script src="<c:url value='/resources/cam/cuts/cuttype-drill.js'/>"></script>
                <script src="<c:url value='/resources/cam/cuts/cuttype-gcode.js'/>"></script>
                <script src="<c:url value='/resources/cam/cuts/cuttype-path.js'/>"></script>
                <script src="<c:url value='/resources/cam/cuts/cuttype-pocket.js'/>"></script>
                <script src="<c:url value='/resources/cam/cuts/cuttype-profile.js'/>"></script>


                <script src="<c:url value='/resources/cam/cam.js'/>"></script>
                
                <script src="<c:url value='/resources/cad/lib/external/raphael-min.js'/>"></script>	
                <script type="text/javascript" src="<c:url value='/resources/cad/rp/rph.js'/>"></script>
                <script src="<c:url value='/resources/cad/component.js'/>"></script>
		<!--<script src="resources/js/customShapes.js"></script>-->
                <script src="<c:url value='/resources/cad/inputHandler.js'/>"></script>
                <script src="<c:url value='/resources/cad/logicDisplay.js'/>"></script>
                <script src="<c:url value='/resources/cad/graphicDisplay.js'/>"></script>
                <script src="<c:url value='/resources/cad/cutHandler.js'/>"></script>
                
                <script src="<c:url value='/resources/cad/Ajax_Json.js'/>"></script>
                <script src="<c:url value='/resources/cad/world.js'/>"></script>
                
                
                <script src="<c:url value='/resources/cad/customShapes.js'/>"></script>
                
                <script src="<c:url value='/resources/cad/lib/external/js-yaml.js'/>"></script>
                <script src="<c:url value='/resources/cad/lib/external/json2yaml.js'/>"></script>
                <script src="<c:url value='/resources/cad/codexg.js'/>"></script>
                
                             
                <script src="<c:url value='/resources/cad/componentg.js'/>"></script>              
                 
                <link href="<c:url value='/resources/cad/styles/main.css" rel="stylesheet'/>">
                
                <script src="<c:url value="/resources/js/jquery-1.10.2.js"/>" > </script>
                <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
                <script type="text/javascript" src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
                    
                <script type="text/javascript" src="<c:url value='/resources/js/configAjaxJason.js'/>"></script>
                
                
               
                <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		
                <link href="<c:url value='/resources/theme_prompt/base.css" rel="stylesheet'/>">
                
                <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.1.0/pure-min.css" />
		
		<script src="<c:url value='/resources/cad/prompt.js'/>"></script>
		                
                <script type="text/javascript" src="<c:url value='/resources/js/jquery-impromptu.js'/>"></script>
               
                
        
	</head>
	<body>  
            
                <nav id="top-nav">
                   <!-- <h1>OpenCNC</h1> -->
                     <div id="controls">
                        <!-- this input is needed to let a user select a file, but it is ugly so we hide it. -->
                         <input type="file" id="input-file-local" style="display:none">
                        <button id="btn-open-file">Abrir Archivo</button>
                        <button id="btn-save-file">Guardar Archivo</button>
                        <button id="btn-compile-gcode">Compilar codigo G</button>

                        <a id="link-download-gcode" style="display:none">download gcode</a>
                      </div>
                </nav>      
            
             

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
            
		
                                    
                <div class="cad">
                   
                    <div id="paper2"></div>
                    
                    <canvas id="CADCanvas"
                                    width="800"
                                    height="600"
                                    onContextMenu="javascript: return false;"
                                    tabindex="1">
                                        
                    </canvas>
                    
                    
                    
                </div>
              <div id="info">
                  <c:forEach var="modelo" items="${modelos}"  >
                      <br> Modelo: ${modelo.modeloId} 
                      <br> Nombre: ${modelo.nombre}
                      <br> Unidad Medida: ${modelo.unidadMedida.nombre}
                      <br> Tipo de Maquina: ${modelo.tipoMaquina.nombre}
                      <br> Ancho: ${modelo.piezaAncho}
                      <br> Largo: ${modelo.piezaLargo}
                      <br> Cero X: ${modelo.puntoCeroMaquinaX}
                      <br> Cero Y: ${modelo.puntoCeroMaquinaY}
                  </c:forEach>
            </div>
        </body>    
</html>
