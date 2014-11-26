<%-- 
    Document   : acercade
    Created on : 7/10/2014, 10:37:21 AM
    Author     : root
--%>

<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">                
	<script src="${pageContext.request.contextPath}/resources/js/jquery.js"></script>
	<script src="${pageContext.request.contextPath}/resources/js/script.js"></script> 
        <script src="${pageContext.request.contextPath}/resources/js/script.responsive.js"></script>
        <link rel="stylesheet"  href="${pageContext.request.contextPath}/resources/css/style.css" media="screen">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.responsive.css" media="all">
        <link href="${pageContext.request.contextPath}/resources/css/style.ie7.css" rel="stylesheet">
        <link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/resources/images/favicon.ico"/>
        <title>Ayuda</title>  
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
                 &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp  &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp <a href="${pageContext.request.contextPath}/elemento/crear/${modelo.modeloId}.htm" class="art-button" style="font-size: 12px; cursor: pointer; ">Regresar</a>
                 <div class="art-layout-wrapper">
                    <div class="art-content-layout">
                        <div class="art-content-layout-row">
                            <div class="art-layout-cell art-content">
                                <article class="art-post art-article"><p><br></p> 
                                    <iframe width="560" height="315" src="//www.youtube.com/embed/6PgyeHOhfnI" frameborder="0" allowfullscreen></iframe>
                                    <p style="text-align: center; margin-right: 25px; margin-left: 25px;"><span style="font-family: Arial;"><span style="font-weight: bold; color:rgb(69, 82, 112)">OpenCNC - Ayuda</span><br></span></p><p><br></p>   
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: Arial; font-size: 20px;"><span style="font-weight: bold; color:rgb(69, 82, 112)">Realización de un SKETCH</span><br></span></p>                                      
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Para la creación de un Sketch usted cuenta con las siguientes Herrramientas: </span></p>
                                        <p><img style="float: left; margin-top: 10px; margin-right: 10px; margin-bottom: 10px; margin-left: 10px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px;" width="590" height="530" alt="" class="art-lightbox" src="../resources/images/fotosinfo/herramientas1.jpg"><br></p>                                       
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">- Herramientas Gráficas: </span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 50px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Lineas: dibuja lineas continuas, para detener el uso se presiona la tecla ESC.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 50px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Rectángulos: primitivas en rectángulos.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 50px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Puntos: dibuja puntos de ayuda en el Sketch.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 50px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Círculos: dibuja círculos en el lienzo.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 50px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Arcos: se define el centro del arco, luego el radio y posterior el arco.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 50px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Label: introduce texto en el sketch.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 50px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Regla: mide distancias en el sketch.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">- Borrado de objetos: esta herramienta selecciona los objetos y los borra.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">- Mueve objetos: la particularidad del CAD es que nuestros objetos no se quedan plasmados en el lienzo de trabajo, se pueden mover de manera individual.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">- Navega: nos permite movernos por el lienzo de trabajo sin necesidad de mover los objetos.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">- Zoom: podemos acercar o alejar los objetos.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">- Guarda Sketch: envía los objetos a nuestra base de datos en el servidor.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">- Lienzo de trabajo: espacio en donde se suspenden los objetos creados por el usuario. (Render).</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">- Handler Tool: vemos las coordenadas y las herramientas a usar.</span></p><p><br></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: Arial;"><span style="font-weight: bold; color:rgb(69, 82, 112)">CAM</span><br></span></p>                                      
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Para usar el CAM, es necesario explicar las herramientas que permiten el uso de nuestro CAM. Una vez terminado el Sketch, es necesario que el usuario  especifique los cortes y el tipo de mecanizado que desea realizar sobre la pieza.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">- Herramienta de mecanizado: es un ciclo en donde seleccionamos objeto por objeto, permitiendo seleccionar los diferentes mecanizados que tenemos.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">- Generación de código YAML: El formato YAML, es un formato de codificación que permite entender al usuario el proyecto que está trabajando antes de enviar a compilar el código en formato G.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Al generar las sentencias YAML, podemos ver y modificar algunos parámetros que alteran el comportamiento de los mecanismos CNC dependiendo independiente de su marca.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Al usar las herramientas de código G, podemos abrir, guardar y compilar el código G.</span></p>
                                        <p style="text-align: center; margin-right: 25px; margin-left: 25px;"><span style="font-family: Arial;"><span style="font-weight: bold; color:rgb(69, 82, 112)">Cuadro de Controles:   Open Controls</span><br></span></p> 
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">El cuadro de Controles presenta las siguientes Opciones para el usuario.-</span></p>
                                        <p style="text-align: Center; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Display </span></p>
                                        <p style="text-align: center;"><img width="307" height="380" alt="" class="art-lightbox" src="../resources/images/fotosinfo/display.jpg" style="border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(214, 220, 218); border-right-color: rgb(214, 220, 218); border-bottom-color: rgb(214, 220, 218); border-left-color: rgb(214, 220, 218); border-top-width: 3px; border-right-width: 3px; border-bottom-width: 3px; border-left-width: 3px; "><span style="color: rgb(38, 44, 42);"><br></span></p>   
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* showOrigin: Muestra al Usuario El espacio de Trabajo Original</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* showGrid: Muestra/Oculta al la Cuadrícula sobre el espacio de Trabajo</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* showOriginArrow: Muestra/Oculta al Usuario el Origen del Plano de coordenas</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* showRulers: Muestra/Oculta al Usuario las Reglas</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* readOnly: Activa/Desactiva al usuario la opcion única de leer.</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* backGroundColor: Permite al usuario Elegir el color Fondo del Espacio de Trabajo</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* fontSize: Permite al Usuario elegir el tamaño de la Fuente dentro del Espacio de Trabajo</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* unitAngle: Permite al Usuario elegir el tipo de unidades a usarse para los Ángulos</span></p>
                                        <p style="text-align: Center; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">G_Códex</span></p>
                                        <p style="text-align: center;"><img width="307" height="150" alt="" class="art-lightbox" src="../resources/images/fotosinfo/g_codex.jpg" style="border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(214, 220, 218); border-right-color: rgb(214, 220, 218); border-bottom-color: rgb(214, 220, 218); border-left-color: rgb(214, 220, 218); border-top-width: 3px; border-right-width: 3px; border-bottom-width: 3px; border-left-width: 3px; "><span style="color: rgb(38, 44, 42);"><br></span></p>   
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* spindle_speed: Le permite al Usuario definir la Velocidad del Husillo </span></p>
                                        <p style="text-align: center; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">g_code</span></p>
                                        <p style="text-align: center;"><img width="307" height="400" alt="" class="art-lightbox" src="../resources/images/fotosinfo/codigog.jpg" style="border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(214, 220, 218); border-right-color: rgb(214, 220, 218); border-bottom-color: rgb(214, 220, 218); border-left-color: rgb(214, 220, 218); border-top-width: 3px; border-right-width: 3px; border-bottom-width: 3px; border-left-width: 3px; "><span style="color: rgb(38, 44, 42);"><br></span></p>   
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">Abre la ventana que contiene el Código G del proyecto, permitiéndole al usuario la posibilidad de editar este código .g </span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* compile_gcode: Compila el código G del Proyecto</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* saveFile: Permite al Usuario descargar en su ordenador el código G que ha generado el proyecto</span></p>
                                        <p style="text-align: justify; margin-right: 25px; margin-left: 25px;"><span style="font-family: 'Palatino Linotype'; font-size: 16px;">* Close Controls: Cierra el cuadro de controles</span></p>
                                       
                                       
                                
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
