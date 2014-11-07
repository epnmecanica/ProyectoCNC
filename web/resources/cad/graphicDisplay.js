//******************************************************************************
//La logica de los graficos en el Display
//Aplicacion
//******************************************************************************

/**
 * This class handle the graphical behaviour
 * of the CAD
 */
// habilita funciones de grafico

var k, i = 0;

/**
 * *****************************************************************************
 * Funcion constructora del Display.
 * *****************************************************************************
 * @param {type} displayName
 * @param {type} width
 * @param {type} height
 * @returns {GraphicDisplay}
 */
function GraphicDisplay(displayName, width, height) {
	// Enumerate all available modes
	this.MODES = {
			ADDPOINT : 1,
			ADDLINE : 2,
			ADDCIRCLE : 3,
			ADDRECTANGLE : 4,
			ADDARC : 5,
			ADDMEASURE : 6,
			ADDLABEL : 7,
			ADDSHAPE : 8,
                        ADDARC_TWO : 9,
                        ADDARC_TR : 10,
			DELETE : 20,
			TRIM : 21,
			NAVIGATE : 22,
			MOVE : 23,
			EDIT : 24,
                        NAN : 25,
                        CUT: 26,
                        CODE_G : 27
	};
	
	// Enumerate all type of action
	this.MOUSEACTION = {
			MOVE : 0,
			DOWN : 1,
			UP : 2
	};
	// type of CAD
        this.typeOfCad = "Torno";
        
	// Draw read only
	this.readonly = false;
	
	// By default the mode is NAVIGATE
	this.mode = this.MODES.NAVIGATE;
	
	this.previousColor = null;
	this.previousRadius = null;
	
	// The index of temporary selected component
	this.temporarySelectedComponent = null;
	// The index of selected component
	this.selectedComponent = null;
	this.temporaryComponentType = null;
	this.temporaryShape = null;
	this.temporaryPoints = new Array(
			null, null,   // x1, y1
			null, null,   // x2, y2
			null, null);  // x3, y3
	this.temporaryIntersectionsPoinst = new Array();
        this.temporaryCoor = new Array();
        this.temporaryCoorFirst = new Array(
                        null, null);
	// Temporary or selected color
	this.selectedColor = "#c0c";
        this.backGraundColor = "#3C65AB";
	this.selectedRadius = "2";
	
	this.logicDisplay;
	this.logicAjax;
        //variable para codigo g YAML
        this.codexgYAML;
        this.componentG;
	this.counter = 0;
	
	this.displayWidth = width;
	this.displayHeight = height;
	this.offsetX = 0;
	this.offsetY = 0;
	
	// Camera
	this.camX = 0;
	this.camY = 0;
	this.zoom = 0.5;
	this.zoomin = 2;
	this.zoomout = 0.5;
	this.camMoving = false;
	this.xCNaught = 0;
	this.yCNaught = 0;
	this.cOutX = 0;
	this.cOutY = 0;
	
	this.inFocus = false;
	this.initResize = false;
	
	this.showGrid = true;
	this.showOrigin = true;
        this.showOriginArrow = true;
	this.showRules = true;
	this.gridPointer = false;
	this.gridSpacing = 100; // Pixel
	
	this.conversionFactor = 1;
	this.unitName = "px";
	this.unitMeasure = "m";
        this.unitAngle = "Grade";
	this.unitFactor = 1;
	this.unitConversionFactor = 1/100;
        
        
	
	// Snapping setting
	this.snap = false;
	this.snapTolerance = 10;
        // Radius mouse
        this.radius = 1;
	
	this.fontSize = 24;
             
	this.displayName = displayName;
	this.cvn = 0; // Canvas HTML element
	this.context; // Canvas object

        this.tooltipDefault = "OpenCNC";
	this.tooltip = this.tooltipDefault;
        this.index = null;
        this.tooltipCodeDefault = "Code";
	this.tooltipCode = this.tooltipCodeDefault;
	
        this.keyboard = null;
	this.mouse = null;
        
        this.z_x = 0;
        this.z_y = 0;
        this.max_size_x = 100;
        this.max_size_y = 100;
        this.spindle_speed = 900;
        this.g_code = function() {
            
            this.cuthandler = new CutHandler(gd);
            gui_G(this.cuthandler.setObject(this.getObjects()));
            //helperYAML(this.cuthandler.setObject(this.getObjects()));
        };

}



/**
 * *****************************************************************************
 * Inicializa la logica del display
 * *****************************************************************************
 * @returns {undefined}
 */
GraphicDisplay.prototype.init = function() {
	/*
	 * INITIALIZE THE LOGIC
	 */ 
	this.logicDisplay = new LogicDisplay();
	
        this.cuthandler = new CutHandler(gd);
        
	/*
	 * INITIALIZE INPUT HANDLER 
	 */
	this.keyboard = new KeyboardHandler();
	this.mouse = new MouseHandler();
	
        // Create the canvas
       
    
        this.cvn = $('#' + this.displayName);
	this.cvn.css('cursor','crosshair');
	this.context = this.cvn[0].getContext('2d');
        
        this.gui();
        //console.log(this.cvn);
       
        
};


/**
 * *****************************************************************************
 *se ejecuta despues de las logica y ayuda a la ejecucion de 
 *******************************************************************************
 *funciones para graficos 
 * @returns {undefined}
 */
GraphicDisplay.prototype.execute = function() {
    
	this.offsetX = this.cvn.offset().left;
	this.offsetY = this.cvn.offset().top;
	
	this.updateCamera();
	
	this.clearGrid();
	
	// Draw basic grid
	if (this.showGrid)
		this.drawGrid(this.cOutX, this.cOutY);
	
	if (this.showOrigin)
		this.drawOrigin(this.cOutX, this.cOutY);
            
        if (this.showOriginArrow)
                this.drawOriginArrow(this.cOutX,  this.cOutY);
	
	this.drawRules();
	
	// Draw all components
	this.drawAllComponents(this.logicDisplay.components, 0, 0);
	
	// Draw temporary component
	if ( this.temporaryComponentType !== null )
		this.drawTemporaryComponent();
	
	// Draw to tooltip
	this.drawToolTip();
        //this.drawToolCode();
      
        
};
GraphicDisplay.prototype.drawArea= function(){
       //this.cuthandler = new CutHandler(gd);
       //helperYAML(this.cuthandler.setObject(this.getObjects()));
       this.logicDisplay.init(gd);
       this.logicDisplay.components[0].color = "#FF00FF"; 
       
};

/**
 * *****************************************************************************
 * hace la cuadricula
 * *****************************************************************************
 * @param {type} e
 * @returns {undefined}
 */
GraphicDisplay.prototype.clearGrid = function(e) {
	this.context.restore();
	//this.context.fillStyle = "#202020";
        //this.context.fillStyle = "#3C65AB";
        this.context.fillStyle = this.backGraundColor;
        this.context.fillRect(0, 0, this.displayWidth, this.displayHeight);
	//this.context.fillRect(0, 0, 400, 400);
	this.context.save();
	
	this.context.translate(this.displayWidth/2, this.displayHeight/2);
	//this.context.strokeStyle = "#666";
	this.context.strokeStyle = "white";
	this.context.lineWidth = 0.2;
};

/**
 * *****************************************************************************
 * dibuja los componentes
 * *****************************************************************************
 * @param {type} components
 * @param {type} moveByX
 * @param {type} moveByY
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawAllComponents = function(components, moveByX, moveByY) {
	for (var i = 0; i < components.length; i++) {
		if ( !components[i].isActive() )
			continue;
		
		this.drawComponent(components[i], moveByX, moveByY);
	}
};

/**
 * *****************************************************************************
 * dibuja un solo componente 
 * *****************************************************************************
 * @param {type} component
 * @param {type} moveByX
 * @param {type} moveByY
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawComponent = function(component, moveByX, moveByY) {
	switch (component.type) {
		case COMPONENT_TYPES.POINT:
			this.drawPoint(
					component.x + moveByX,
					component.y + moveByY,
					component.color,
					component.radius);
                                        
			break;
		case COMPONENT_TYPES.LINE:
			this.drawLine(
					component.x1 + moveByX,
					component.y1 + moveByY,
					component.x2 + moveByX,
					component.y2 + moveByY,
					component.color,
					component.radius);
                                        
  
			break;
		case COMPONENT_TYPES.CIRCLE:
			this.drawCircle(
					component.x1 + moveByX,
					component.y1 + moveByY,
					component.x2 + moveByX,
					component.y2 + moveByY,
					component.color,
					component.radius);
			break;
		case COMPONENT_TYPES.RECTANGLE:
			this.drawRectangle(
					component.x1 + moveByX,
					component.y1 + moveByY,
					component.x2 + moveByX,
					component.y2 + moveByY,
					component.color,
					component.radius);
			break;
		case COMPONENT_TYPES.MEASURE:
			this.drawMeasure(
					component.x1 + moveByX,
					component.y1 + moveByY,
					component.x2 + moveByX,
					component.y2 + moveByY,
					component.color,
					component.radius);
			break;
		case COMPONENT_TYPES.LABEL:
			this.drawLabel(
					component.x + moveByX,
					component.y + moveByY,
					component.text,
					component.color,
					component.radius);
			break;
		case COMPONENT_TYPES.ARC:
			this.drawArc(
					component.x1 + moveByX,
					component.y1 + moveByY,
					component.x2 + moveByX,
					component.y2 + moveByY,
					component.x3 + moveByX,
					component.y3 + moveByY,
					component.color,
					component.radius);
			break;
                case COMPONENT_TYPES.ARC_TWO:
			this.drawArcTwoPoints(
                                        component.x1 + moveByX,
					component.y1 + moveByY,
					component.x2 + moveByX,
					component.y2 + moveByY,
					component.color,
					component.radius);
			break;
                case COMPONENT_TYPES.ARC_TR:
			this.drawArcTrPoints(
                                        component.x1 + moveByX,
					component.y1 + moveByY,
					component.x2 + moveByX,
					component.y2 + moveByY,
					component.x3 + moveByX,
					component.y3 + moveByY,
					component.color,
					component.radius);
			break;
		case COMPONENT_TYPES.SHAPE:
                
			this.drawShape(component);
			break;
	} 
};

/**
 * This method is used to draw current temporary component
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawTemporaryComponent = function() {
	switch (this.temporaryComponentType) {
		case COMPONENT_TYPES.POINT:
			this.drawPoint(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.selectedColor,
					this.selectedRadius);
			break;
		case COMPONENT_TYPES.LINE:
			this.drawMeasure(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
					this.selectedColor,
					this.selectedRadius);
                        this.drawAngle(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
                                        this.selectedColor);               
                        
			break;
		case COMPONENT_TYPES.CIRCLE:
			this.drawCircle(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
					this.selectedColor,
					this.selectedRadius);
			this.drawMeasure(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
					this.selectedColor,
					this.selectedRadius);
			break;
		case COMPONENT_TYPES.RECTANGLE:
			this.drawRectangle(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
					this.selectedColor,
					this.selectedRadius);
			this.drawMeasure(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
					this.selectedColor,
					this.selectedRadius);
			this.drawMeasure(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[1],
					this.selectedColor,
					this.selectedRadius);
			this.drawMeasure(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[0],
					this.temporaryPoints[3],
					this.selectedColor,
					this.selectedRadius);
			break;
		case COMPONENT_TYPES.MEASURE:
			this.drawMeasure(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
					this.selectedColor,
					this.selectedRadius);
                        this.drawAngle(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
                                        this.selectedColor);
			break;
		case COMPONENT_TYPES.LABEL:
			this.drawLabel(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryText,
					this.selectedColor,
					this.selectedRadius);
			break;
		case COMPONENT_TYPES.ARC:
                    
			this.drawArc(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
					this.temporaryPoints[4],
					this.temporaryPoints[5],
					this.selectedColor,
					this.selectedRadius);
                        this.drawAngle(
					this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
                                        this.selectedColor);
			break;
                case COMPONENT_TYPES.ARC_TWO:
			this.drawArcTwoPoints(
                                        this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
					this.selectedColor,
					this.selectedRadius);
			break;
                case COMPONENT_TYPES.ARC_TR:
			this.drawArcTrPoints(
                                        this.temporaryPoints[0],
					this.temporaryPoints[1],
					this.temporaryPoints[2],
					this.temporaryPoints[3],
					this.temporaryPoints[4],
					this.temporaryPoints[5],
					this.selectedColor,
					this.selectedRadius);
			break;
		case COMPONENT_TYPES.SHAPE:
			this.drawShape(this.temporaryShape);
			break;
	} 
};

/**
 * *****************************************************************************
 *  dibuja puntos cuando se activa el boton.
 * *****************************************************************************
 * @param {type} x
 * @param {type} y
 * @param {type} color
 * @param {type} radius
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawPoint = function(x, y, color, radius) {
	this.context.lineWidth = radius;
	this.context.fillStyle = color;
	this.context.strokeStyle = color;
	this.context.beginPath();
	this.context.arc(
			(x + this.cOutX) * this.zoom, 
		    (y + this.cOutY) * this.zoom, 
		    2, 0, 3.14159*2, false);
	this.context.closePath();
	this.context.stroke();
        
};

/**
 * *****************************************************************************
 * dibuja linea cuando se activa el boton.
 * *****************************************************************************
 * @param {type} x1
 * @param {type} y1
 * @param {type} x2
 * @param {type} y2
 * @param {type} color
 * @param {type} radius
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawLine = function(x1, y1, x2, y2, color, radius) {
        
        //para hacer con angulos.
        /*
        var firstAngle = this.getAngle(x1, y1, x2, y2);
        firstAngle = Math.round((firstAngle * (-180 / Math.PI)));
        */
	this.context.lineWidth = radius;
	this.context.fillStyle = color;
	this.context.strokeStyle = color;
	this.context.beginPath();
        /*
        if ( k === 's' && (firstAngle > 350 && firstAngle < 10) || 
                (firstAngle > 170 && firstAngle < 190)){
            this.context.moveTo(
			(x1 + this.cOutX) * this.zoom,
			(y1 + this.cOutY) * this.zoom);
            this.context.lineTo(
			(x2 + this.cOutX) * this.zoom,
			(y1 + this.cOutY) * this.zoom);
        }
        /*
        if ( k === 's' && (firstAngle > 80 && firstAngle < 100) || 
                (firstAngle > 260 && firstAngle < 280)){
            this.context.moveTo(
			(x1 + this.cOutX) * this.zoom,
			(y1 + this.cOutY) * this.zoom);
            this.context.lineTo(
			(x1 + this.cOutX) * this.zoom,
			(y2 + this.cOutY) * this.zoom);
        }
        */
            this.context.moveTo(
			(x1 + this.cOutX) * this.zoom,
			(y1 + this.cOutY) * this.zoom);
            this.context.lineTo(
			(x2 + this.cOutX) * this.zoom,
			(y2 + this.cOutY) * this.zoom);
        
        /*
	this.context.moveTo(
			(x1 + this.cOutX) * this.zoom,
			(y1 + this.cOutY) * this.zoom);
	this.context.lineTo(
			(x2 + this.cOutX) * this.zoom,
			(y2 + this.cOutY) * this.zoom);
	*/
        this.context.closePath();
	this.context.stroke();

	//this.drawPoint(x1, y1, color, radius); //Dibuja el punto inicial
        
	//this.drawPoint(x2, y2, color, radius);
        //this.setToolTip('Angulo: ' + firstAngle);
        //this.setTextCode('angulo' + ' ' + firstAngle + ' ' + x1 + ' ' + y1 + '\n' + this.getTextCode());
        //this.tooltipCode = 'Linea' + ' ' + firstAngle + ' ' + x1 + ' ' + y1 + '\n';
};

/**
 * *****************************************************************************
 * dibuja circulos cuando se activa el boton.
 * *****************************************************************************
 * @param {type} x1
 * @param {type} y1
 * @param {type} x2
 * @param {type} y2
 * @param {type} color
 * @param {type} radius
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawCircle = function(x1, y1, x2, y2, color, radius) {
	this.context.lineWidth = radius;
	this.context.fillStyle = color;
	this.context.strokeStyle = color;
	this.context.beginPath();
	this.context.arc(
			(x1 + this.cOutX) * this.zoom, 
		    (y1 + this.cOutY) * this.zoom, 
		    this.getDistance(x1, y1, x2, y2) * this.zoom,
		    0, 3.14159*2, false);
	this.context.closePath();
	this.context.stroke();
	
	//this.drawPoint(x1, y1, color, radius); // Dibuja el punto del centro
};

/**
 * *****************************************************************************
 * Dibuja rectangulo cuando se activa el boton
 * *****************************************************************************
 * @param {type} x1
 * @param {type} y1
 * @param {type} x2
 * @param {type} y2
 * @param {type} color
 * @param {type} radius
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawRectangle = function(x1, y1, x2, y2, color, radius) {
	this.drawLine(x1, y1, x2, y1, color, radius);
	this.drawLine(x2, y1, x2, y2, color, radius);
	this.drawLine(x2, y2, x1, y2, color, radius);
	this.drawLine(x1, y2, x1, y1, color, radius);
};

/**
 * *****************************************************************************
 * Dibuja una medida.
 * *****************************************************************************
 * @param {type} x1
 * @param {type} y1
 * @param {type} x2
 * @param {type} y2
 * @param {type} color
 * @param {type} radius
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawMeasure = function(x1, y1, x2, y2, color, radius) {
	var distance = this.getDistance(x1, y1, x2, y2) * this.unitFactor * this.unitConversionFactor;
	
	var localZoom = this.zoom;
	var localDiff = 0;
	
	if ( this.zoom <= 0.25 ) {
		localZoom = 0.5;
		localDiff = 20;
	}
	
	this.drawLine(x1, y1, x2, y2, color, radius);
	
	this.context.fillStyle = color;
	this.context.font = (this.fontSize * localZoom) + "px courier";
	this.context.fillText(
			distance.toFixed(2) + "" + this.unitMeasure,
			(this.cOutX + x2 - 120) * this.zoom,
			(this.cOutY + y2 + 30 + localDiff) * this.zoom);
};

/**
 * *****************************************************************************
 * Dibuja temporalmente el angulo de la linea
 * *****************************************************************************
 * @param {type} x1
 * @param {type} y1
 * @param {type} x2
 * @param {type} y2
 * @param {type} color
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawAngle = function(x1, y1, x2, y2, color){
        var angle = 0 ;
        if (this.unitAngle === "Rad"){
            angle = this.getAngle(x1, y1, x2, y2);
        }else if(this.unitAngle === "Grade"){
            angle = -this.getAngle(x1, y1, x2, y2) * 180 / Math.PI;
        }
        
                	
	var localZoom = this.zoom;
	var localDiff = 0;
	
	if ( this.zoom <= 0.25 ) {
		localZoom = 0.5;
		localDiff = 20;
	}
		
	this.context.fillStyle = color;
	this.context.font = (this.fontSize * localZoom) + "px courier";
	this.context.fillText(
			angle.toFixed(1) + "º" + this.unitAngle,
			(this.cOutX + x1 - 120) * this.zoom,
			(this.cOutY + y1 + 30 + localDiff) * this.zoom);
};

/**
 * *****************************************************************************
 * inserta un texto.
 * *****************************************************************************
 * @param {type} x
 * @param {type} y
 * @param {type} text
 * @param {type} color
 * @param {type} radius
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawLabel = function(x, y, text, color, radius) {
	this.drawPoint(x, y, '#0ff', 2);
	
	var localZoom = this.zoom;
	var localDiff = 0;
	
	if ( this.zoom <= 0.25 ) {
		localZoom = 0.5;
		localDiff = 20;
		y += localDiff;
	}
	
	this.context.fillStyle = color;
	this.context.font =  (this.fontSize * localZoom) + "px courier";
	
	var maxLength = 24; // 24 Characters per row
	var tmpLength = 0;
	var tmpText = "";
	var arrText = text.split(" ");
	
	for (var i = 0; i < arrText.length; i++) {
		tmpLength += arrText[i].length + 1;
		tmpText += " " + arrText[i];
		
		if ( tmpLength > maxLength ) {
			this.context.fillText(
					tmpText,
					(this.cOutX + x - 150) * this.zoom,
					(this.cOutY + y + 30) * this.zoom);
			y += 25 + localDiff;
			tmpLength = 0;
			tmpText = "";
		}
	}
	
	// Print the remainig text
	this.context.fillText(
			tmpText,
			(this.cOutX + x - 150) * this.zoom,
			(this.cOutY + y + 30) * this.zoom);
};

/**
 * *****************************************************************************
 * dibuja arcos.
 * *****************************************************************************
 * @param {type} x1
 * @param {type} y1
 * @param {type} x2
 * @param {type} y2
 * @param {type} x3
 * @param {type} y3
 * @param {type} color
 * @param {type} radius
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawArc = function(x1, y1, x2, y2, x3, y3, color, radius) {

	this.context.lineWidth = radius;
	this.context.fillStyle = color;
	this.context.strokeStyle = color;
	this.context.beginPath();
        if (x3 > x1){
            this.context.arc(
                            (x1 + this.cOutX) * this.zoom, 
                        (y1 + this.cOutY) * this.zoom, 
                        this.getDistance(x1, y1, x2, y2) * this.zoom,
                        this.getAngle(x1, y1, x2, y2), 
                        this.getAngle(x1, y1, x3, y3), false);
            this.context.stroke();
        }else{
            this.context.arc(
                            (x1 + this.cOutX) * this.zoom, 
                        (y1 + this.cOutY) * this.zoom, 
                        this.getDistance(x1, y1, x2, y2) * this.zoom,
                        this.getAngle(x1, y1, x2, y2), 
                        this.getAngle(x1, y1, x3, y3), true);
            this.context.stroke();
        }
            
	
	this.drawPoint(x1, y1, color, radius);//Dibuja punto central
	//this.drawPoint(x2, y2, color, radius);//Dibuja punto inicial de arco
	//this.drawPoint(x3, y3, color, radius);
        //this.setToolTip('Angulo: ' + firstAngle + ' ' + secondAngle);
};
GraphicDisplay.prototype.drawArcTwoPoints = function(x1, y1, x2, y2, color, radius) {
        
	this.context.lineWidth = radius;
	this.context.fillStyle = color;
	this.context.strokeStyle = color;
	this.context.beginPath();
            this.context.arc(
                            (this.getPointMiddle(x1,x2) + this.cOutX) * this.zoom, 
                        (this.getPointMiddle(y1,y2) + this.cOutY) * this.zoom, 
                        (this.getDistance(x1, y1, x2, y2))/2 * this.zoom,
                        this.getAngle(this.getPointMiddle(x1,x2), this.getPointMiddle(y1,y2), x1, y1), 
                        this.getAngle(this.getPointMiddle(x1,x2), this.getPointMiddle(y1,y2), x2, y2), false);
            this.context.stroke();
            this.drawPoint(this.getPointMiddle(x1,x2), this.getPointMiddle(y1,y2), color, radius)
};
GraphicDisplay.prototype.drawArcTrPoints = function(x1, y1, x2, y2, x3, y3, color, radius) {
        
	this.context.lineWidth = radius;
	this.context.fillStyle = color;
	this.context.strokeStyle = color;
	this.context.beginPath();
        
        /*var xm = this.getPointMiddle(x1,x2);
        var ym = this.getPointMiddle(y1,y2);
        var m = - (1 / this.getSlope(x1,y1,x2,y2));
        var yc = ((m*x3) - (x1*m) + y1).toFixed(0);
        */
        
        var xm = (x1 + x2)/2;
        var ym = (y1 + y2)/2;
        
        var m = (y2 - y1) / (x2 - x1);
        
        var yc = (-m)*x3 - (x1*(-m)) + y1;
        
         
        console.log(x3  + ',' + yc.toFixed(0));
        
        this.context.arc(
                        (x3 + this.cOutX) * this.zoom, 
                        (yc + this.cOutY) * this.zoom, 
                    this.getDistance(xm, ym, x3, y3) * this.zoom,
                    this.getAngle(x3, y3, x1, y1), 
                    this.getAngle(x3, y3, x2, y2), false);
        this.context.stroke();
        
            
	
	//this.drawPoint(x1, y1, color, radius);//Dibuja punto central
	//this.drawPoint(x2, y2, color, radius);//Dibuja punto inicial de arco
	//this.drawPoint(x3, y3, color, radius);
        //this.setToolTip('Angulo: ' + firstAngle + ' ' + secondAngle);
            
};

/**
 * *****************************************************************************
 * dibuja formas
 * *****************************************************************************
 * @param {type} shape
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawShape = function(shape) {
	this.drawAllComponents(shape.components, shape.x, shape.y);
	this.drawPoint(shape.x, shape.y, shape.color, shape.radius);
};

/**
 * *****************************************************************************
 * Dibuja el cuadro inferior de coordenadas.
 * *****************************************************************************
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawToolTip = function() {
	//func for draw rectangle inf
        //coment star
	this.context.fillStyle = "#202020";
	this.context.fillRect(-this.displayWidth/2, this.displayHeight/2 - 20, this.displayWidth, 20);
	this.context.strokeStyle = "black";
        //pone sombras
	//this.context.lineWidth = 1;
	//this.context.strokeRect(-this.displayWidth/2 + 1, this.displayHeight/2 - 21, this.displayWidth-2, 20);
        
	//end
        
	this.context.fillStyle = "#909090";
	this.context.font = "16px courier";
	this.context.fillText(this.getToolTip(), -this.displayWidth/2 + 3, this.displayHeight/2-6);
        
};

/**
 * *****************************************************************************
 * Ventana de codigo.
 * *****************************************************************************
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawToolCode  = function(){
    //console.log(this.getTextCode.valueOf());
    //document.getElementById("codex").value = this.getTextCode();
};

/**
 * *****************************************************************************
 *  dibuja origenes
 *  ****************************************************************************
 * @param {type} cx
 * @param {type} cy
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawOrigin = function(cx, cy) {
	this.context.lineWidth = 1;
        // Origen Horizontal
	//this.context.strokeStyle = "#fff";
	this.context.strokeStyle = "red";
	this.context.beginPath();
	this.context.moveTo(cx * this.zoom, -this.displayHeight);
	this.context.lineTo(cx * this.zoom, this.displayHeight);
	this.context.closePath();
	this.context.stroke();
        
        //Origen Vertical
	this.context.strokeStyle = "green";
	this.context.beginPath();
	this.context.moveTo(-this.displayWidth, cy * this.zoom);
	this.context.lineTo(this.displayWidth, cy * this.zoom);
	this.context.closePath();
	this.context.stroke();
        
};

/**
 * *****************************************************************************
 *  dibuja la cruz del origen
 *  ****************************************************************************
 * @param {type} cx
 * @param {type} cy
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawOriginArrow = function(cx, cy){
        
        var delta = this.getDistance(0, 0, this.getCursorXLocal(), this.getCursorYLocal());
        
        this.context.lineWidth = 3;
        // Origen Horizontal
	//this.context.strokeStyle = "#fff";
	this.context.strokeStyle = "black";
	this.context.beginPath();
        this.context.moveTo(
			(0 + this.cOutX) * this.zoom,
			(-20 + this.cOutY) * this.zoom);
        this.context.lineTo(
			(0 + this.cOutX) * this.zoom,
			(20 + this.cOutY) * this.zoom);
	
        //Origen Vertical
	
        this.context.moveTo(
			(-20 + this.cOutX) * this.zoom,
			(0 + this.cOutY) * this.zoom);
        this.context.lineTo(
			(20 + this.cOutX) * this.zoom,
			(0 + this.cOutY) * this.zoom);
                        
        if(delta >= 0 && delta <= this.snapTolerance / this.zoom){
            this.context.strokeStyle = "white";
            this.context.arc(
			(0 + this.cOutX) * this.zoom, 
                        (0 + this.cOutY) * this.zoom, 
                        2, 0, 3.14159*2, false);
        }                
        
                    
	this.context.closePath();
	this.context.stroke();
};

/**
 * *****************************************************************************
 * dibuja reglas guias
 * *****************************************************************************
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawRules = function() {
	if (!this.showRules)
		return;
	
	if (this.gridPointer) {
		this.context.lineWidth = 0.2;
		this.context.strokeStyle = "#ccc";
		
		this.context.beginPath();
		this.context.moveTo(this.getCursorXInFrame(), -this.displayHeight);
		this.context.lineTo(this.getCursorXInFrame(), this.displayHeight);
		this.context.closePath();
		this.context.stroke();
                
		// horizontal
		this.context.beginPath();
		this.context.moveTo(-this.displayWidth, this.getCursorYInFrame());
		this.context.lineTo(this.displayWidth, this.getCursorYInFrame());
		this.context.closePath();
		this.context.stroke();
	}
	
	// TODO Show rules!
};

/**
 * *****************************************************************************
 * dibuja la cuadricula
 * *****************************************************************************
 * @param {type} camXoff
 * @param {type} camYoff
 * @returns {undefined}
 */
GraphicDisplay.prototype.drawGrid = function(camXoff, camYoff) {
	var naught = (camXoff % this.gridSpacing) * this.zoom - this.displayWidth/2;
        
	// hace la grilla vertical
	for (var i = 0; i < 1 + this.displayWidth / this.gridSpacing / this.zoom; i++){
		this.context.beginPath();
		this.context.moveTo(naught, -this.displayHeight);
		this.context.lineTo(naught, this.displayHeight);
		this.context.closePath();
		this.context.stroke();
		
		naught += this.gridSpacing * this.zoom;
	}
	
	// TODO this is a weird solution. Generalize it for all zoom factor
	if ( this.zoom === 2 )
		naught = (camYoff % this.gridSpacing) * this.zoom - this.displayHeight/2 + this.gridSpacing/2 * this.zoom;
	else
		naught = (camYoff % this.gridSpacing) * this.zoom - this.displayHeight/2;
            
	// hace la grilla horizontal
	for (var i = 1 + this.displayHeight / this.gridSpacing / this.zoom ; i >= 0; i--){
		this.context.beginPath();
		this.context.moveTo(-this.displayWidth, naught);
		this.context.lineTo(this.displayWidth , naught);
		this.context.closePath();
		this.context.stroke();
		
		naught += this.gridSpacing * this.zoom;
	}
};

/**
 * *****************************************************************************
 * determina que componente es seleccionado para dibujar.
 * *****************************************************************************
 * This method is used to perform a 
 * specithis.tooltipCode = "Linea" + " " +;fied action based on the
 * 
 * type of mouse action (action) see above MOUSEACTION
 * *****************************************************************************
 * @param e
 * @param action
 */
GraphicDisplay.prototype.performAction = function(e, action) {
	switch(this.mode) {
		case this.MODES.ADDPOINT:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if (this.temporaryComponentType === null) {
					this.temporaryComponentType = COMPONENT_TYPES.POINT;
				}
				this.temporaryPoints[0] = this.getCursorXLocal(); // TODO this.getCursorSnapX();
				this.temporaryPoints[1] = this.getCursorYLocal(); // TODO this.getCursorSnapY();
                                
                                //puntos en movimiento
                                //this.tooltipCode = this.getTextCode() + '\n' + ' Puntos: ' + this.temporaryPoints;
			} else if ( action === this.MOUSEACTION.DOWN ) {
				this.logicDisplay.addComponent(new Point(
						this.temporaryPoints[0],
						this.temporaryPoints[1]));
                                                
                                                this.tooltipCode = this.getTextCode() + '\n' + ' Puntos: ' + this.temporaryPoints;
				this.resetMode();
                                
                                
			}
			this.tooltip = "Add punto";
			break;
                case this.MODES.ADDLINE:
                        if (e.which == 3)
                            this.resetMode();
                            this.cvn.css('cursor', 'default');
                        if (action == this.MOUSEACTION.MOVE) {
                            if (this.temporaryComponentType == null) {
                                this.temporaryComponentType = COMPONENT_TYPES.POINT;
                            } else if (this.temporaryComponentType == COMPONENT_TYPES.POINT) {
                                this.index = this.findIntersectionWith(this.getCursorXLocal(),this.getCursorYLocal());
                                if( this.index !== null){
                                    if (this.getDistance(this.getCursorXLocal(),
                                                        this.getCursorYLocal(),
                                                        this.logicDisplay.components[this.index].x1,
                                                        this.logicDisplay.components[this.index].y1) 
                                                                
                                                    <=  
                                        this.getDistance(this.getCursorXLocal(),
                                                        this.getCursorYLocal(),
                                                        this.logicDisplay.components[this.index].x2,
                                                        this.logicDisplay.components[this.index].y2)){
                                                            
                                        this.temporaryPoints[0] = this.logicDisplay.components[this.index].x1;
                                        this.temporaryPoints[1] = this.logicDisplay.components[this.index].y1;
                                    }else{
                                        this.temporaryPoints[0] = this.logicDisplay.components[this.index].x2;
                                        this.temporaryPoints[1] = this.logicDisplay.components[this.index].y2;
                                    }
                                }else{
                                    this.temporaryPoints[0] = this.getCursorXLocal();
                                    this.temporaryPoints[1] = this.getCursorYLocal();
                                }
                            } else if (this.temporaryComponentType == COMPONENT_TYPES.LINE) {
                                    this.temporaryPoints[2] = this.getCursorXLocal();
                                    this.temporaryPoints[3] = this.getCursorYLocal();
                            }
                        } else if ( action == this.MOUSEACTION.DOWN ) {
                            if (this.temporaryComponentType == COMPONENT_TYPES.POINT) {
                                this.temporaryComponentType = COMPONENT_TYPES.LINE;
                                    this.temporaryPoints[2] = this.getCursorXLocal();
                                    this.temporaryPoints[3] = this.getCursorYLocal();                                
                            } else if (this.temporaryComponentType == COMPONENT_TYPES.LINE) {
                                this.logicDisplay.addComponent(new Line(
                                                                this.temporaryPoints[0],
                                                                this.temporaryPoints[1],
                                                                this.temporaryPoints[2],
                                                                this.temporaryPoints[3]));
                                this.temporaryPoints[0] = this.temporaryPoints[2];
                                this.temporaryPoints[1] = this.temporaryPoints[3];
                                //this.resetMode();   
                            }
                        }
                        this.tooltip = "Add line";
                        break;
                
		case this.MODES.ADDCIRCLE:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if (this.temporaryComponentType === null) {
					this.temporaryComponentType = COMPONENT_TYPES.POINT;
				} else if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryPoints[0] = this.getCursorXLocal();
					this.temporaryPoints[1] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.CIRCLE) {
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryComponentType = COMPONENT_TYPES.CIRCLE;
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.CIRCLE) {
					this.logicDisplay.addComponent(new Circle(
							this.temporaryPoints[0],
							this.temporaryPoints[1],
							this.temporaryPoints[2],
							this.temporaryPoints[3]));
                                                        this.tooltipCode = this.getTextCode() + '\n' 
                                                                + ' Circulo: ' + 
                                                                this.temporaryPoints;
					this.resetMode();      
				}
			}
			this.tooltip = "Add circulo";
			break;
		case this.MODES.ADDARC:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if (this.temporaryComponentType === null) {
					this.temporaryComponentType = COMPONENT_TYPES.POINT;
				} else if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryPoints[0] = this.getCursorXLocal();
					this.temporaryPoints[1] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.CIRCLE) {
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.ARC) {
					// TODO: point 4 and 5 must represent a point intersection between
					//		 the circle and the straight line
					this.temporaryPoints[4] = this.getCursorXLocal();
					this.temporaryPoints[5] = this.getCursorYLocal();
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryComponentType = COMPONENT_TYPES.CIRCLE;
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.CIRCLE) {
					this.temporaryComponentType = COMPONENT_TYPES.ARC;
					this.temporaryPoints[4] = this.getCursorXLocal();
					this.temporaryPoints[5] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.ARC) {
					this.logicDisplay.addComponent(new Arc(
							this.temporaryPoints[0],
							this.temporaryPoints[1],
							this.temporaryPoints[2],
							this.temporaryPoints[3],
							this.temporaryPoints[4],
							this.temporaryPoints[5]));
                                                        this.tooltipCode = this.getTextCode() + '\n' + ' Arco: ' + this.temporaryPoints;
					this.resetMode();
				}
			}
			this.tooltip = "Add arc";
			break;
                case this.MODES.ADDARC_TR:
                   
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if (this.temporaryComponentType === null) {
					this.temporaryComponentType = COMPONENT_TYPES.POINT;
				} else if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryPoints[0] = this.getCursorXLocal();
					this.temporaryPoints[1] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.CIRCLE) {
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.ARC_TR) {
					// TODO: point 4 and 5 must represent a point intersection between
					//		 the circle and the straight line
					this.temporaryPoints[4] = this.getCursorXLocal();
					this.temporaryPoints[5] = this.getCursorYLocal();
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryComponentType = COMPONENT_TYPES.CIRCLE;
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.CIRCLE) {
					this.temporaryComponentType = COMPONENT_TYPES.ARC_TR;
					this.temporaryPoints[4] = this.getCursorXLocal();
					this.temporaryPoints[5] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.ARC_TR) {
					this.logicDisplay.addComponent(new Arc_tr(
							this.temporaryPoints[0],
							this.temporaryPoints[1],
							this.temporaryPoints[2],
							this.temporaryPoints[3],
							this.temporaryPoints[4],
							this.temporaryPoints[5]));
                                                        this.tooltipCode = this.getTextCode() + '\n' + ' Arco: ' + this.temporaryPoints;
					this.resetMode();
				}
			}
			this.tooltip = "Add arc";
			break;
                case this.MODES.ADDARC_TWO:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if (this.temporaryComponentType === null) {
					this.temporaryComponentType = COMPONENT_TYPES.POINT;
				} else if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.index = this.findIntersectionWith(this.getCursorXLocal(),this.getCursorYLocal());
                                        if( this.index !== null){

                                            if (this.getDistance(this.getCursorXLocal(),
                                                                this.getCursorYLocal(),
                                                                this.logicDisplay.components[this.index].x1,
                                                                this.logicDisplay.components[this.index].y1) 

                                                            <=  
                                                this.getDistance(this.getCursorXLocal(),
                                                                this.getCursorYLocal(),
                                                                this.logicDisplay.components[this.index].x2,
                                                                this.logicDisplay.components[this.index].y2)){

                                                this.temporaryPoints[0] = this.logicDisplay.components[this.index].x1;
                                                this.temporaryPoints[1] = this.logicDisplay.components[this.index].y1;
                                            }else{
                                                this.temporaryPoints[0] = this.logicDisplay.components[this.index].x2;
                                                this.temporaryPoints[1] = this.logicDisplay.components[this.index].y2;
                                            }
                                        }else{
                                            this.temporaryPoints[0] = this.getCursorXLocal();
                                            this.temporaryPoints[1] = this.getCursorYLocal();
                                        }
				} else if (this.temporaryComponentType === COMPONENT_TYPES.ARC_TWO) {
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryComponentType = COMPONENT_TYPES.ARC_TWO;
					this.index = this.findIntersectionWith(this.getCursorXLocal(),this.getCursorYLocal());
                                        if( this.index !== null){

                                            if (this.getDistance(this.getCursorXLocal(),
                                                                this.getCursorYLocal(),
                                                                this.logicDisplay.components[this.index].x1,
                                                                this.logicDisplay.components[this.index].y1) 

                                                            <=  
                                                this.getDistance(this.getCursorXLocal(),
                                                                this.getCursorYLocal(),
                                                                this.logicDisplay.components[this.index].x2,
                                                                this.logicDisplay.components[this.index].y2)){

                                                this.temporaryPoints[2] = this.logicDisplay.components[this.index].x1;
                                                this.temporaryPoints[3] = this.logicDisplay.components[this.index].y1;
                                            }else{
                                                this.temporaryPoints[2] = this.logicDisplay.components[this.index].x2;
                                                this.temporaryPoints[3] = this.logicDisplay.components[this.index].y2;
                                            }
                                        }else{
                                            this.temporaryPoints[2] = this.getCursorXLocal();
                                            this.temporaryPoints[3] = this.getCursorYLocal();
                                        }
				} else if (this.temporaryComponentType === COMPONENT_TYPES.ARC_TWO) {
					this.logicDisplay.addComponent(new Arc_two(
							this.temporaryPoints[0],
							this.temporaryPoints[1],
							this.temporaryPoints[2],
							this.temporaryPoints[3]));
					this.resetMode();
				}
			}
			this.tooltip = "Arc Two Points";
			break;
		case this.MODES.ADDRECTANGLE:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if (this.temporaryComponentType === null) {
					this.temporaryComponentType = COMPONENT_TYPES.POINT;
				} else if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryPoints[0] = this.getCursorXLocal();
					this.temporaryPoints[1] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.RECTANGLE) {
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryComponentType = COMPONENT_TYPES.RECTANGLE;
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.RECTANGLE) {
					this.logicDisplay.addComponent(new Rectangle(
							this.temporaryPoints[0],
							this.temporaryPoints[1],
							this.temporaryPoints[2],
							this.temporaryPoints[3]));
                                                        
                                                        this.tooltipCode = this.getTextCode() + '\n' + ' Rectangulo: ' + this.temporaryPoints;
					this.resetMode();
				}
			}
			this.tooltip = "Add rectangulo";
			break;
		case this.MODES.ADDMEASURE:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if (this.temporaryComponentType === null) {
					this.temporaryComponentType = COMPONENT_TYPES.POINT;
				} else if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryPoints[0] = this.getCursorXLocal();
					this.temporaryPoints[1] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.MEASURE) {
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryComponentType = COMPONENT_TYPES.MEASURE;
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.MEASURE) {
					this.logicDisplay.addComponent(new Measure(
							this.temporaryPoints[0],
							this.temporaryPoints[1],
							this.temporaryPoints[2],
							this.temporaryPoints[3]));
					this.resetMode();
				}
			}
			this.tooltip = "Add medida";
			break;
		case this.MODES.ADDLABEL:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if (this.temporaryComponentType === null) {
					this.temporaryComponentType = COMPONENT_TYPES.POINT;
				} else if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryPoints[0] = this.getCursorXLocal();
					this.temporaryPoints[1] = this.getCursorYLocal();
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				var text = prompt("Texto:");
				if ( text.length > 0 ) {
					this.logicDisplay.addComponent(new Label(
							this.temporaryPoints[0],
							this.temporaryPoints[1],
							text));
					this.resetMode();
				}
			}
			this.tooltip = "Add texto";
			break;
		case this.MODES.ADDSHAPE:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if (this.temporaryComponentType === null) {
					this.temporaryComponentType = COMPONENT_TYPES.SHAPE;
				} else if (this.temporaryComponentType === COMPONENT_TYPES.SHAPE) {
					this.temporaryShape.x = this.getCursorXLocal();
					this.temporaryShape.y = this.getCursorYLocal();
				}
			} else if (action === this.MOUSEACTION.DOWN) {
				this.logicDisplay.addComponent(this.temporaryShape);
				this.resetMode();
			}
			break;
		case this.MODES.NAVIGATE:
			this.cvn.css('cursor', 'move');
			if (action === this.MOUSEACTION.DOWN) {
				this.camMoving = true; 
				this.xCNaught = this.getCursorXLocal();
				this.yCNaught = this.getCursorYLocal();
			} else if (action === this.MOUSEACTION.UP) {
				this.camMoving = false;
				this.camX += this.getCursorXLocal() - this.xCNaught;
				this.camY += this.getCursorYLocal() - this.yCNaught;
			}
			this.tooltip = "Navegar";
			break;
		case this.MODES.MOVE:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if ( this.selectedComponent === null ) {
					this.temporarySelectedComponent = this.findIntersectionWith(
							this.getCursorXLocal(),
							this.getCursorYLocal());
				} else {
					this.moveComponent(
							this.selectedComponent,
							this.getCursorXLocal(),
							this.getCursorYLocal());
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				if ( this.selectedComponent === null ) {
					this.selectComponent(this.temporarySelectedComponent);
				} else {
					this.unselectComponent();
				}
			}
			this.tooltip = "Mover";
			break;
		case this.MODES.EDIT:
			// TODO: In the next release
                        this.cvn.css('cursor', 'default');
                        
			if (action === this.MOUSEACTION.MOVE) {
				if ( this.selectedComponent === null ) {
					this.temporarySelectedComponent = this.findIntersectionWith(
							this.getCursorXLocal(),
							this.getCursorYLocal());
				} else{
                                        this.editComponent(this.selectedComponent);
				}
			} else if (action === this.MOUSEACTION.DOWN) {
				if ( this.selectedComponent === null ) {
					this.selectComponent(this.temporarySelectedComponent);
				} else {
					this.unselectComponent();
				}
			}
			
			this.tooltip = "Editar";
			break;
		
                case this.MODES.DELETE:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if ( this.selectedComponent === null ) {
                                    //console.log(this.IntersectionWith(false));
                                    /*this.temporarySelectedComponent = this.interseccion(
							this.getCursorXLocal(),
							this.getCursorYLocal());*/
					this.temporarySelectedComponent = this.findIntersectionWith(
							this.getCursorXLocal(),
							this.getCursorYLocal());
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				if ( this.temporarySelectedComponent !== null && confirm("Desea borrar este componente?") ) {
					this.logicDisplay.components[this.temporarySelectedComponent].setActive(false);
				}
			}
			this.tooltip = "Borrar";
			break;
                        
                case this.MODES.CODE_G:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if ( this.selectedComponent === null ) {
					this.temporarySelectedComponent = this.findIntersectionWith(
							this.getCursorXLocal(),
							this.getCursorYLocal());
				} else {
					
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				if ( this.selectedComponent === null ) {
                                        this.selectComponent(this.temporarySelectedComponent);
					//console.log(this.logicDisplay.components[this.temporarySelectedComponent]);
                                        
                                        seleccionElementos(this.logicDisplay.components);
				} else {
					this.unselectComponent();
				}
                                
			}
			this.tooltip = "Seleccion elemento para codigo G";
			break;
                /*        
                case this.MODES.CODE_G:
			this.cvn.css('cursor', 'default');
			if (action === this.MOUSEACTION.MOVE) {
				if ( this.selectedComponent === null ) {
					this.temporarySelectedComponent = this.findIntersectionWith(
							this.getCursorXLocal(),
							this.getCursorYLocal());
				} else {
					
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				if ( this.selectedComponent === null ) {
                                        this.selectComponent(this.temporarySelectedComponent);
					//console.log(this.logicDisplay.components[this.temporarySelectedComponent]);
                                        
                                        seleccionElementos(this.logicDisplay.components[this.temporarySelectedComponent]);
				} else {
					this.unselectComponent();
				}
                                
			}
			this.tooltip = "Seleccion elemento para codigo G";
			break;*/
                        
                case this.MODES.CUT:
			 
                                    this.cvn.css('cursor', 'default');

                         if (action === this.MOUSEACTION.MOVE) {

                            
                                 if (this.Interseccion(this.getCursorXLocal(), this.getCursorYLocal()) !== null) {
                                     this.tooltip = "intersecciones";
                                 } else {
                                     this.tooltip = "no inter";
                                    
                                 }
                            
                         } else if (action === this.MOUSEACTION.DOWN) {
                             if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
                                
                             } else if (this.temporaryComponentType === COMPONENT_TYPES.LINE) {
                                 
                                 this.resetMode();
                             }

                             this.tooltipCode = this.getTextCode() + '\n' + ' Corte: ' + this.temporaryPoints[0] + ', ' + this.temporaryPoints[1];

                         }
                         //this.tooltip = "Add linea";

			break;        
                  
                  
                  
                  
                  
		default:
			this.tooltip = this.tooltipDefault;
	}
};

/**
 * *****************************************************************************
 * Edicion de los componentes, encuentra el componente y lo habilita para su
 * edicion
 * *****************************************************************************
 * @param {type} index
 * @returns {undefined}
 */
GraphicDisplay.prototype.editComponent = function(index){
 //TODO editar componentes 
            if (index !== null) {
		switch ( this.logicDisplay.components[index].type ) {
			case COMPONENT_TYPES.POINT:
                            
                                //temporal para dar el punto de movimiento.
                                var dx = document.getElementById('x1Pos').value;
                                var dy = document.getElementById('y1Pos').value;
                                
                                this.logicDisplay.components[index].x = dx;
				this.logicDisplay.components[index].y = dy;
                                break;
			case COMPONENT_TYPES.LABEL:
			case COMPONENT_TYPES.SHAPE:
				var dx = x - this.logicDisplay.components[index].x;
				var dy = y - this.logicDisplay.components[index].y;
				
				this.logicDisplay.components[index].x += dx;
				this.logicDisplay.components[index].y += dy;
				break;
			case COMPONENT_TYPES.LINE:
                        case COMPONENT_TYPES.CIRCLE:
                        case COMPONENT_TYPES.RECTANGLE:
                                var dx = document.getElementById('x1Pos').value;
                                var dy = document.getElementById('y1Pos').value;
                                var dx2 = document.getElementById('x2Pos').value;
                                var dy2 = document.getElementById('y2Pos').value;
                                
                                this.logicDisplay.components[index].x = dx;
				this.logicDisplay.components[index].y = dy;
                                this.logicDisplay.components[index].x1 = dx2;
				this.logicDisplay.components[index].y1 = dy2;
                               
                                break;
			                             
			
			case COMPONENT_TYPES.MEASURE:
				var dx = x - this.logicDisplay.components[index].x1;
				var dy = y - this.logicDisplay.components[index].y1;
				
				this.logicDisplay.components[index].x1 += dx;
				this.logicDisplay.components[index].y1 += dy;
				this.logicDisplay.components[index].x2 += dx;
				this.logicDisplay.components[index].y2 += dy;
				break;
                                
                                //Organizar para poder mover el arco
			case COMPONENT_TYPES.ARC:
				var dx = x - this.logicDisplay.components[index].x1;
				var dy = y - this.logicDisplay.components[index].y1;
				
				this.logicDisplay.components[index].x1 += dx;
				this.logicDisplay.components[index].y1 += dy;
				this.logicDisplay.components[index].x2 += dx;
				this.logicDisplay.components[index].y2 += dy;
				this.logicDisplay.components[index].x3 += dx;
				this.logicDisplay.components[index].y3 += dy;
				break;
		}
	}
};

/**
 * *****************************************************************************
 * mueve los componentes
 * *****************************************************************************
 * @param {type} index
 * @param {type} x
 * @param {type} y
 * @returns {undefined}
 */
GraphicDisplay.prototype.moveComponent = function(index, x, y) {
	if (index !== null) {
		switch ( this.logicDisplay.components[index].type ) {
			case COMPONENT_TYPES.POINT:
			case COMPONENT_TYPES.LABEL:
			case COMPONENT_TYPES.SHAPE:
				var dx = x - this.logicDisplay.components[index].x;
				var dy = y - this.logicDisplay.components[index].y;
				
				this.logicDisplay.components[index].x += dx;
				this.logicDisplay.components[index].y += dy;
				break;
			case COMPONENT_TYPES.LINE:
			case COMPONENT_TYPES.CIRCLE:
			case COMPONENT_TYPES.RECTANGLE:
			case COMPONENT_TYPES.MEASURE:
				var dx = x - this.logicDisplay.components[index].x1;
				var dy = y - this.logicDisplay.components[index].y1;
				
				this.logicDisplay.components[index].x1 += dx;
				this.logicDisplay.components[index].y1 += dy;
				this.logicDisplay.components[index].x2 += dx;
				this.logicDisplay.components[index].y2 += dy;
				break;
                                
                                //Organizar para poder mover el arco
			case COMPONENT_TYPES.ARC:
				var dx = x - this.logicDisplay.components[index].x1;
				var dy = y - this.logicDisplay.components[index].y1;
				
				this.logicDisplay.components[index].x1 += dx;
				this.logicDisplay.components[index].y1 += dy;
				this.logicDisplay.components[index].x2 += dx;
				this.logicDisplay.components[index].y2 += dy;
				this.logicDisplay.components[index].x3 += dx;
				this.logicDisplay.components[index].y3 += dy;
				break;
		}
	}
};

/**
 * *****************************************************************************
 * selecciona el componente
 * *****************************************************************************
 * @param {type} index
 * @returns {undefined}
 */
GraphicDisplay.prototype.selectComponent = function(index) {
	if (index !== null) {
		this.selectedComponent = index;
		this.previousColor = this.logicDisplay.components[index].color;
		this.previousRadius = this.logicDisplay.components[index].radius;
		this.logicDisplay.components[index].color = this.selectedColor;
		this.logicDisplay.components[index].radius = this.selectedRadius;
	}
};

/**
 * *****************************************************************************
 * quita la seleccion del componente
 * *****************************************************************************
 * @returns {undefined}
 */
GraphicDisplay.prototype.unselectComponent = function() {
	if ( this.selectedComponent !== null ) {
		this.logicDisplay.components[this.selectedComponent].color = this.previousColor;
		this.logicDisplay.components[this.selectedComponent].radius = this.previousRadius;
		this.selectedComponent = null;
	}
};

/**
 * *****************************************************************************
 * Carga la camara
 * *****************************************************************************
 * @returns {undefined}
 */
GraphicDisplay.prototype.updateCamera = function() {
	this.cOutX = this.camX;
	this.cOutY = this.camY;
	
	if (this.camMoving) {
		this.cOutX += this.getCursorXLocal() - this.xCNaught;
		this.cOutY += this.getCursorYLocal() - this.yCNaught;
	}
};
GraphicDisplay.prototype.setWinWidthAndHeight = function(width,height) {
	this.displayWidth = width;
	this.displayHeight = height;
};

/**
 * This method is used to set CAD in SHAPE mode
 * @param getShape : a function that return a shape
 */
GraphicDisplay.prototype.setModeShape = function(getShape) {
	this.setMode(this.MODES.ADDSHAPE);
	this.temporaryShape = getShape();
};

/**
 * *****************************************************************************
 * Exporta JSON
 * *****************************************************************************
 * @returns {GraphicDisplay.prototype@pro;logicDisplay@call;exportJSON}
 */
GraphicDisplay.prototype.getJSON = function(){
        
        alert(this.logicDisplay.exportJSON());
        
};

/**
 * *****************************************************************************
 * Selecciona el modo.
 * *****************************************************************************
 * @param {type} mode
 * @returns {undefined}
 */
GraphicDisplay.prototype.setMode = function(mode) {
	this.resetMode();
	
	if (this.readonly)
		this.mode = this.MODES.NAVIGATE;
	else
		this.mode = mode;
};

/**
 * *****************************************************************************
 * Resetea el modo
 * *****************************************************************************
 * @returns {undefined}
 */
GraphicDisplay.prototype.resetMode = function() {
	this.temporaryComponentType = null;
	this.temporaryShape = null;
	
	for (var i = 0; i < this.temporaryPoints.length; i++)
		delete this.temporaryPoints[i];
	
	this.mode = -1;
	this.tooltip = this.tooltipDefault;
};

/**
 * *****************************************************************************
 * Setea el Zoom
 * *****************************************************************************
 * @param {type} zoomFactor
 * @returns {undefined}
 */
GraphicDisplay.prototype.setZoom = function(zoomFactor) {
	var newZoom = this.zoom * zoomFactor; 
	
	// Zoom interval control
	if ( newZoom === 0.125 || newZoom === 4 )
		return;
	
	this.zoom = newZoom;
};

/**
 * *****************************************************************************
 * Hace ZoomIn
 * *****************************************************************************
 * @returns {undefined}
 */
GraphicDisplay.prototype.zoomIn = function() {
	this.setZoom(this.zoomin);
};

/**
 * *****************************************************************************
 * Hace ZoomOut
 * *****************************************************************************
 * @returns {undefined}
 */
GraphicDisplay.prototype.zoomOut = function() {
	this.setZoom(this.zoomout);
};

/**
 * *****************************************************************************
 * Necesita un JSON para dibujar
 * *****************************************************************************
 * @param {type} fileJson
 * @returns {GraphicDisplay.prototype@pro;logicDisplay@call;import}
 */
GraphicDisplay.prototype.setJSON = function(fileJson){
        return(this.logicDisplay.import(fileJson));
        //alert(this.logicDisplay.exportJSON());
        
};

/**
 * *****************************************************************************
 * Retorna un JSON
 * *****************************************************************************
 * @returns {GraphicDisplay.prototype@pro;logicDisplay@call;exportJSON}
 */
GraphicDisplay.prototype.getJSON = function(){
        return(this.logicDisplay.exportJSON());      
};
GraphicDisplay.prototype.getObjects = function(){
        return(this.logicDisplay.exportObject());      
};
GraphicDisplay.prototype.getPointMiddle = function(p1,p2){
        this.middle = (p1 + p2) / 2;
        return this.middle;
};
/**
 * *****************************************************************************
 * Obtiene la posicion del cursor en x
 * *****************************************************************************
 * @returns {GraphicDisplay.cvn.offset.left|newZoom|type|GraphicDisplay.mouse.cursorXGlobal|Number}
 */

GraphicDisplay.prototype.getCursorXLocal = function() {
	return (this.mouse.cursorXGlobal - this.offsetX - this.displayWidth/2)/this.zoom - this.camX;
};

/**
 * *****************************************************************************
 * Obtiene la posicion del cursor en y
 * *****************************************************************************
 * @returns {GraphicDisplay.cvn.offset.top|newZoom|type|Number|GraphicDisplay.mouse.cursorYGlobal}
 */

GraphicDisplay.prototype.getCursorYLocal = function() {
	return (this.mouse.cursorYGlobal - this.offsetY - this.displayHeight/2)/this.zoom - this.camY;
};

/**
 * 
 * @returns {GraphicDisplay.cvn.offset.left|type|GraphicDisplay.mouse.cursorXGlobal|Number}
 */

GraphicDisplay.prototype.getCursorXInFrame = function() {
	return this.mouse.cursorXGlobal - this.offsetX - this.displayWidth/2;
};

/**
 * 
 * @returns {GraphicDisplay.cvn.offset.top|type|Number|GraphicDisplay.mouse.cursorYGlobal}
 */

GraphicDisplay.prototype.getCursorYInFrame = function() {
	return this.mouse.cursorYGlobal - this.offsetY - this.displayHeight/2;
};

/**
 * *****************************************************************************
 * Textos en la barra inferior
 * *****************************************************************************
 * @param {type} text
 * @returns {undefined}
 */

GraphicDisplay.prototype.setToolTip = function(text) {
	this.tooltip = text;
};

/**
 * 
 * @returns {GraphicDisplay.prototype.getToolTip@pro;tooltip}
 */

GraphicDisplay.prototype.getToolTip = function() {
	var text = this.tooltip;
	// normalice las medidas
	text += " | (" + this.getCursorXLocal() / 10 + "," + (-1)*(this.getCursorYLocal()) / 10 + ")";
	
	return text;
};

//TODO: Move in Utils.

/**
 * *****************************************************************************
 * Devueltve la distancia entre dos puntos.
 * *****************************************************************************
 * @param {type} x1
 * @param {type} y1
 * @param {type} x2
 * @param {type} y2
 * @returns {unresolved}
 */
GraphicDisplay.prototype.getDistance = function(x1, y1, x2, y2) {
	var distance = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
	
	return distance.toFixed(2);
};

/**
 * 
 * @param {type} x
 * @param {type} y
 * @param {type} x1
 * @param {type} y1
 * @returns {y2|x2}
 */
GraphicDisplay.prototype.getSlope = function(x, y, x1, y1) {
	var m = (Math.abs(y1)-Math.abs(y))/(Math.abs(x1)-Math.abs(x));
	return m.toFixed(2);
};
GraphicDisplay.prototype.getB = function(m,x1,y1) {
	var b = (y1-(m*x1));
	return b.toFixed(1);
};

GraphicDisplay.prototype.gui = function(){
  var gui = new dat.GUI({ autoPlace: false });  
  gui.add(gd, 'showOrigin');
  gui.add(gd, 'showGrid');
  gui.add(gd, 'showOriginArrow');
  gui.add(gd, 'showRules');
  gui.add(gd, 'readonly');
  //gui.add(gd, 'selectedColor');
  gui.addColor(gd, 'backGraundColor');
  gui.add(gd, 'fontSize', 10 , 70);
  gui.add(gd, 'unitAngle', [ 'Grade', 'Rad']);
  gui.add(gd, 'g_code');

  
  var customContainer = document.getElementById('my-gui-container');
        
  customContainer.appendChild(gui.domElement);
    
};

GraphicDisplay.prototype.Interseccion = function (x, y) {
    var vector = new Array();
    var pendiente = 0;
    var x1, x2, y1, y2;
    vector = this.getObjects();
    var tamaño = vector.length;
    console.log("grupo");
    var equis = new Array();
    var yes = new Array();
    //
    var puntos = new Array();
    for (var i = 0; i < tamaño; i++) {
        var obj = vector[i];
        x1 = obj.x1.valueOf();
        y1 = obj.y1.valueOf();
        x2 = obj.x2.valueOf();
        y2 = obj.y2.valueOf();

        //almacena para ordenar y comparar
        equis[0] = x;
        equis[1] = x1;
        equis[2] = x2;
        yes[0] = y;
        yes[1] = y1;
        yes[2] = y2;
        equis= this.ordenar(equis);
        yes=this.ordenar(yes);

        pendiente = (y2 - y1) / (x2 - x1);
        //pendiente=pendiente*100;
        pendiente = pendiente.toFixed(2);
        // pendiente=pendiente/100;
        var calculada;
        calculada = (y2 - y) / (x2 - x);
        // calculada=calculada*100;
        calculada = calculada.toFixed(2);


        // if(obj.type.valueOf() == 2){
         console.log("vector equis"+equis+ "  pendiente calculada = " + pendiente + "x1" + x1 + "x2" + x2 + "x" + x + "y1" + y1 + "y1" + y1);
        
        if (calculada == pendiente && y==yes[1] && x==equis[1]) {
      //
            console.log("hay interseccion")
                        puntos[0]=x;
            puntos[1]=y;
         //la funcion cambiar es la que realiza el corte aqui esta implementada dentro de interseccion
            this.cambiar(vector,puntos,i,0);
            return 1;
            

        }
    }
};
//la funcion cortar deberia realizar el corte independiente en este caso tiene el mismo codigo que interseccion ya que lo modifique dentro de interseccion para probar su funcionamiento
GraphicDisplay.prototype.cortar = function (x,y) {
 var vector = new Array();//almacena la lista de objetos
 var puntos = new Array();//almacena la ubicacion del cursor
    var pendiente = 0;
    var x1, x2, y1, y2;
    vector = this.getObjects();
    var tamaño = vector.length;
    console.log("grupo");
    var equis = new Array(); //almacena los valores en x del punto inicial y final de la recta y del de la posicion del mouse
    var yes = new Array(); //almacena los valores en y del punto inicial y final de la recta y del de la posicion del mouse
    var seleccion;
    //obtiene los valores de los puntos de cada linea
    for (var i = 0; i < tamaño; i++) {
        var obj = vector[i];
        x1 = obj.x1.valueOf();
        y1 = obj.y1.valueOf();
        x2 = obj.x2.valueOf();
        y2 = obj.y2.valueOf();

        //almacena para ordenar y comparar
        equis[0] = x;
        equis[1] = x1;
        equis[2] = x2;
        yes[0] = y;
        yes[1] = y1;
        yes[2] = y2;
        //ordena los puntos de mayor a menos para comprobar que la ubicacion del cursor esta dentro de la recta
        equis= this.ordenar(equis);
        yes=this.ordenar(yes);

        pendiente = (y2 - y1) / (x2 - x1);
        //pendiente=pendiente*100;
        pendiente = pendiente.toFixed(2);
        // pendiente=pendiente/100;
        var calculada = (y2 - y) / (x2 - x);
        // calculada=calculada*100;
        calculada = calculada.toFixed(2);


        // if(obj.type.valueOf() == 2){

        console.log("vector equis"+equis.toString()+ "  pendiente calculada = " + pendiente + "x1" + x1 + "x2" + x2 + "x" + x + "y1" + y1 + "y1" + y1);
        
        //con esta funcion compara si la pendiente es igual a la de la recta y si esta dentro de la recta
        if (calculada == pendiente && y==yes[1] && x==equis[1]) {
            puntos[0]=x;
            puntos[1]=y;
            this.cambiar(vector,puntos,i,0);
            console.log("que corte desea hacer")
            
            //
        }
    }

};

//la funcion cambiar es la encargada de cambiar los los puntos de la recta al momento de encontrar una interseccion
GraphicDisplay.prototype.cambiar = function (vector, puntos,posicion,seleccion) {
    
    //el switch nos permitira decidir si desea realizar el corte hacia la derecha o izquierda
    //EN este caso esta por defecto a la derecha
            
    /*switch (seleccion) {
            case seleccion==menor:
            vector[posicion].x1=puntos[0];
            vector[posicion].y1=puntos[1];
           break;*/
            //case seleccion==mayor:
            vector[posicion].x2=puntos[0];
            vector[posicion].y2=puntos[1];
            //break;
//}
};
//ordena un vector de mayor a menor me permite saber si la interseccion de los puntos esta dentro de la linea y no fuera para evitar errores
//con esta funcion y la de interseccion se podria resolver la parte de si las lineas son colineales ya que en el caso de que el punto este fuera de la recta habria que comprobar que la posicion [1] no es la del mouse
GraphicDisplay.prototype.ordenar = function (x) {
    
    var aux;
    var aux2;
    for (var i = 0; i < 3; i++) {
        for (var j=i+1; j<3; j++) {
            if (x[i].valueOf() > x[j].valueOf()) {
                aux = x[i].valueOf();
                aux2 = x[j].valueOf();
                x[i] = aux2;
                x[j] = aux;
            }
        }
    }
    
    return x;
};


// TODO: Move in Utils.

/**
 * *****************************************************************************
 * Interseccion con el puntero y el objeto
 * *****************************************************************************
 * @param {type} x
 * @param {type} y
 * @returns {Number|GraphicDisplay.prototype.findIntersectionWith@pro;logicDisplay@pro;components@pro;length}
 */
GraphicDisplay.prototype.findIntersectionWith = function(x, y) {
	for ( var i = this.logicDisplay.components.length - 1; i >= 0; i-- ) {
		if (!this.logicDisplay.components[i].isActive())
			continue;
		
		switch (this.logicDisplay.components[i].type) {
			case COMPONENT_TYPES.POINT:
			case COMPONENT_TYPES.LABEL:	
			case COMPONENT_TYPES.SHAPE:
				var delta = this.getDistance(x, y, this.logicDisplay.components[i].x, this.logicDisplay.components[i].y); 
                                if ( delta >= 0 && delta <= this.snapTolerance / this.zoom )
					return i;
				break;
			case COMPONENT_TYPES.LINE:
			case COMPONENT_TYPES.CIRCLE:
			case COMPONENT_TYPES.RECTANGLE:
			case COMPONENT_TYPES.MEASURE:
                        case COMPONENT_TYPES.ARC:
                        case COMPONENT_TYPES.ARC_TWO:
				var delta = this.getDistance(x ,y, this.logicDisplay.components[i].x1, this.logicDisplay.components[i].y1);
                                var delta2 = this.getDistance(x ,y, this.logicDisplay.components[i].x2, this.logicDisplay.components[i].y2);
				if ( delta >= 0 && delta <= this.snapTolerance / this.zoom ||delta2 >= 0 && delta2 <= this.snapTolerance / this.zoom  )
					return i;
				break;
		}
	}
	
	return null;
};

//Funcion fuera de linea.
GraphicDisplay.prototype.IntersectionWith = function(positive) {
    this.positive = true; 
    this.positive = positive;
    
    var x1 = 400;
    var x2 = 700;
    var y1 = 500;
    var y2 = 600;
    //var x_C = 3;
    //var y_C = 3;
    this.x_C = this.getCursorXLocal();
    this.y_C = this.getCursorYLocal();
    
    var m = this.getSlope(x1,y1,x2,y2);
    
    var z = this.getB(m,x1,y1);
    
    var c = Math.pow((this.x_C),2) + Math.pow((this.y_C),2) - Math.pow(this.radius,2);
    
    var b = -(2*this.y_C);
    var a = -(2*this.x_C);
    var f_a = Math.pow(m,2) + 1;
    var f_b = (b*m) + (2*m*z) + a;  
    var f_c = Math.pow(z,2) + (b*z) + c;
    console.log('a: ' + f_a + ' b: ' + f_b + ' c: ' + f_c);
    var x_f = Math.pow(f_b,2) - (4*f_a*f_c);
    x_f = Math.sqrt(x_f);
    if(this.positive === true){
        x_f = -f_b + x_f;
        x_f = x_f / (2*f_a);
    }else{
        x_f = -f_b - x_f;
        x_f = x_f / (2*f_a);
    }
    
    return x_f;
    
};
GraphicDisplay.prototype.interseccion = function(x,y){
    
    for ( var i = this.logicDisplay.components.length - 1; i >= 0; i-- ) {
		if (!this.logicDisplay.components[i].isActive())
			continue;
		
		switch (this.logicDisplay.components[i].type) {
			case COMPONENT_TYPES.POINT:
			case COMPONENT_TYPES.LABEL:	
			case COMPONENT_TYPES.SHAPE:
                        case COMPONENT_TYPES.CIRCLE:
			case COMPONENT_TYPES.RECTANGLE:
			case COMPONENT_TYPES.MEASURE:
				break;
			case COMPONENT_TYPES.LINE:
                                var m_PointA_Cursor = this.getSlope(
                                                    this.logicDisplay.components[i].x1, 
                                                    this.logicDisplay.components[i].y1,
                                                    x,y);
                                var m_Cursor_PointB = this.getSlope(x,y,
                                                    this.logicDisplay.components[i].x2, 
                                                    this.logicDisplay.components[i].y2);
                                var m_PointA_PointB = this.getSlope(
                                                    this.logicDisplay.components[i].x1, 
                                                    this.logicDisplay.components[i].y1,
                                                    this.logicDisplay.components[i].x2, 
                                                    this.logicDisplay.components[i].y2);
                       
				if (m_PointA_Cursor === m_Cursor_PointB && m_PointA_Cursor === m_PointA_PointB && m_Cursor_PointB === m_PointA_PointB)
					return i;
				break;
		}
	}
	
	return null;
};


//TODO: Move in Utils.
/**
 * Return the angle in radiants
 */

/**
 * *****************************************************************************
 * Return the angle in radiants
 * *****************************************************************************
 * @param {type} x1
 * @param {type} y1
 * @param {type} x2
 * @param {type} y2
 * @returns {@exp;Math@pro;PI|@exp;GraphicDisplay@pro;prototype@pro;getAngle@pro;theta|@exp;Math@call;atan|Number}
 */
GraphicDisplay.prototype.getAngle = function(x1, y1, x2, y2) {
	var m = ((y2 - y1) / (x2 - x1));
        var rad = 0, theta = 0;
        
        theta = Math.atan(m) * (180/Math.PI);
        if(theta < 0 && x2 < x1 && y2 > y1){
            theta = ((-1 * theta) + 180);
        }
        if(theta < 0){
            theta = -1 * theta;
        }
        if (theta > 0 && x2 > x1 && y2 > y1){
            theta = 360 - theta;
        }
        if (x2 < x1 && y2 < y1){
            theta = 180 - theta;
        }
        rad = ((theta * Math.PI) / 180);
	//this.tooltip = theta;
	return -1 * rad;
};

/**
 * *****************************************************************************
 * Selecciona el tipo de medida de los angulos
 * *****************************************************************************
 * @param {type} Grad
 * @returns {undefined}
 */
GraphicDisplay.prototype.setAngleGrad = function(Grad){
        
};

/**
 * 
 * @param {type} ctext
 * @returns {undefined}
 */
GraphicDisplay.prototype.setTextCode = function(ctext) {
            this.tooltipCode = ctext ;
};

/**
 * *****************************************************************************
 * Obtiene el texto del tooltip
 * *****************************************************************************
 * @returns {GraphicDisplay.prototype.getTextCode@pro;tooltipCode}
 */

GraphicDisplay.prototype.getTextCode = function() {
	var text = this.tooltipCode;
        //text += text + '\n';
        return text;      
};

/*
 * Helper function used to initialize the
 * graphic environment and behaviour (mainly input events)
 */
/**
 * *****************************************************************************
 * Inicia todas las funciones.
 * *****************************************************************************
 * @param {type} gd
 * @returns {undefined}
 */
var initCAD = function(gd) {
       
	gd.init();
        
	 
	// Bind keyboard events
	$(document).keyup(function(e) {
		gd.keyboard.onKeyUp(e);
	});
	
	$(document).keydown(function(e) {
		gd.keyboard.onKeyDown(e);
	});
	
	// Adding keyboard events 
        gd.keyboard.addKeyEvent(true, gd.keyboard.KEYS.H, function() {
		console.log(JSON.stringify(gd.getObjects())); 
                //compilarG ();
	});
        gd.keyboard.addKeyEvent(true, gd.keyboard.KEYS.Q, function() {
		console.log('PRESIONA : Q');
                gd.setMode(gd.MODES.ADDARC);
	});
        gd.keyboard.addKeyEvent(true, gd.keyboard.KEYS.W, function() {
		console.log('PRESIONA : W');
                gd.setMode(gd.MODES.ADDARC_TWO);
	});
        gd.keyboard.addKeyEvent(true, gd.keyboard.KEYS.R, function() {
		console.log('PRESIONA : R');
                
                gd.setMode(gd.MODES.ADDARC_TR);
	});
	gd.keyboard.addKeyEvent(true, gd.keyboard.KEYS.E, function() {
		console.log('PRESIONA : E');
                gd.setMode(gd.MODES.ADDLINE);
	});
        
        
	gd.keyboard.addKeyEvent(true, gd.keyboard.KEYS.I, function(){
		gd.zoomIn();
	});
	
	gd.keyboard.addKeyEvent(true, gd.keyboard.KEYS.O, function(){
		gd.zoomOut();
	});
        gd.keyboard.addKeyEvent(true, gd.keyboard.KEYS.N, function(){
                gd.setMode(gd.MODES.NAVIGATE);
        });
        gd.keyboard.addKeyEvent(true, gd.keyboard.KEYS.ESC, function(){
                gd.setMode(gd.MODES.NAN);
        });
        // cuando se presione SHIFT se hagan lineas rectas.
	gd.keyboard.addKeyEvent(true, gd.keyboard.KEYS.SHIFT, function(){
               
        });
       
	// Bind mouse events
	gd.cvn.mousemove(function(e) {
		gd.mouse.onMouseMove(e);
		
		if (!gd.gridPointer)
			gd.gridPointer = true;
		
		gd.performAction(e, gd.MOUSEACTION.MOVE);
                
	});
	
	gd.cvn.mouseout(function(e) {
		gd.gridPointer = false;
	});
	
	gd.cvn.mousedown(function(e) {
		gd.mouse.onMouseDown(e);
		gd.performAction(e, gd.MOUSEACTION.DOWN);
	});
	
	gd.cvn.mouseup(function(e) {
		gd.mouse.onMouseUp(e);
		gd.performAction(e, gd.MOUSEACTION.UP);
	});
	
	// Start CAD
        var iter = 0;
	setInterval(function() {
            iter++;
            
		gd.execute();
                if(iter == 1){
                 gd.drawArea();   
                }
	}, 100);
        
        
};
