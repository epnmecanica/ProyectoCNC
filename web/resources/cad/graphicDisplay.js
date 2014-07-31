//******************************************************************************
//La logica de los graficos en el Display
//******************************************************************************

/**
 * This class handle the graphical behaviour
 * of the CAD
 */
// habilita funciones de grafico
// este es el de trabajo
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
			DELETE : 20,
			TRIM : 21,
			NAVIGATE : 22,
			MOVE : 23,
			EDIT : 24,
                        NAN : 25
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
	this.selectedRadius = "2";
	
	this.logicDisplay;
	this.logicAjax;
        //variable para codigo g YAML
        this.codexgYAML;
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
	
	this.fontSize = 24;
	
	this.displayName = displayName;
	this.cvn = 0; // Canvas HTML element
	this.context; // Canvas object

        this.tooltipDefault = "OpenCNC";
	this.tooltip = this.tooltipDefault;
        
        this.tooltipCodeDefault = "Code";
	this.tooltipCode = this.tooltipCodeDefault;
	
        this.keyboard = null;
	this.mouse = null;
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
	this.logicDisplay.init();
        
        //Inicializa la logica de codexg
        this.codexgYAML = new Codexg();
        this.codexgYAML.init();
        
	//alert(this.logicDisplay.exportJSON());
        //this.logicAjax = new LogicAjax();
        //this.logicAjax.init(this.logicDisplay.exportJSON());
        //alert(this.logicDisplay.exportJSON()); //asi se exporta json!!!!!!!!!!
        
	/*
	 * INITIALIZE INPUT HANDLER 
	 */
	this.keyboard = new KeyboardHandler();
	this.mouse = new MouseHandler();
	
	this.cvn = $('#' + this.displayName);
	this.cvn.css('cursor','crosshair');
	this.context = this.cvn[0].getContext('2d');
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
        this.drawToolCode();
        
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
        this.context.fillStyle = "#3C65AB";
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
	
	this.drawPoint(x1, y1, color, radius);
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
	
	this.drawPoint(x1, y1, color, radius);
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
	var firstAngle = this.getAngle(x1, y1, x2, y2);
	var secondAngle = this.getAngle(x1, y1, x3, y3);
	
	this.context.lineWidth = radius;
	this.context.fillStyle = color;
	this.context.strokeStyle = color;
	this.context.beginPath();
        if (x3 > x1){
            this.context.arc(
                            (x1 + this.cOutX) * this.zoom, 
                        (y1 + this.cOutY) * this.zoom, 
                        this.getDistance(x1, y1, x2, y2) * this.zoom,
                        firstAngle, secondAngle, false);
            this.context.stroke();
        }else{
            this.context.arc(
                            (x1 + this.cOutX) * this.zoom, 
                        (y1 + this.cOutY) * this.zoom, 
                        this.getDistance(x1, y1, x2, y2) * this.zoom,
                        firstAngle, secondAngle, true);
            this.context.stroke();
        }
            
	
	this.drawPoint(x1, y1, color, radius);
	this.drawPoint(x2, y2, color, radius);
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
    
    document.getElementById("codex").value = this.getTextCode();
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
			 
                       
			this.cvn.css('cursor', 'default');
                        
			if (action === this.MOUSEACTION.MOVE) {
                            
				if (this.temporaryComponentType === null) {
					this.temporaryComponentType = COMPONENT_TYPES.POINT;
                                        
				} else if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					 this.temporaryCoorFirst = this.findIntersectionObject();                                    
                                    if (this.findIntersectionWith(this.getCursorXLocal(),this.getCursorYLocal()) !== null){
                                        this.tooltip = "interseccion";
                                        
                                        this.temporaryPoints[0] = this.temporaryCoorFirst[0];
					this.temporaryPoints[1] = this.temporaryCoorFirst[1];
                                    }else{
                                        this.tooltip = "no inter";
                                        this.temporaryPoints[0] = this.getCursorXLocal();
                                        this.temporaryPoints[1] = this.getCursorYLocal();
                                    }
				} else if (this.temporaryComponentType === COMPONENT_TYPES.LINE) {
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				}
			} else if ( action === this.MOUSEACTION.DOWN ) {
				if (this.temporaryComponentType === COMPONENT_TYPES.POINT) {
					this.temporaryComponentType = COMPONENT_TYPES.LINE;
					this.temporaryPoints[2] = this.getCursorXLocal();
					this.temporaryPoints[3] = this.getCursorYLocal();
				} else if (this.temporaryComponentType === COMPONENT_TYPES.LINE) {
					this.logicDisplay.addComponent(new Line(
							this.temporaryPoints[0],
							this.temporaryPoints[1],
							this.temporaryPoints[2],
							this.temporaryPoints[3]));
					
					this.temporaryPoints[0] = this.temporaryPoints[2];
					this.temporaryPoints[1] = this.temporaryPoints[3];
                                        // para quitar las lineas continuas.
                                        //this.resetMode();
				}
                                
                                this.tooltipCode = this.getTextCode() + '\n' + ' Linea: ' + this.temporaryPoints[0] + ', ' + this.temporaryPoints[1];
                                
			}
			//this.tooltip = "Add linea";
                        
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
	text += " | (" + this.getCursorXLocal() + "," + (-1)*(this.getCursorYLocal()) + ")";
	
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
 * *****************************************************************************
 * encontrar la interseccion con los objetos, no los vertices.
 * *****************************************************************************
 * @returns {Array}
 */
GraphicDisplay.prototype.findIntersectionObject = function(){
        
        this.selectedComponent = this.findIntersectionWith(
							this.getCursorXLocal(),
							this.getCursorYLocal());
                        
                                if(this.selectedComponent !== null){
                                    
                                 
                                    this.temporaryIntersectionsPoinst[0] = this.logicDisplay.components[this.selectedComponent].x1;
                                    this.temporaryIntersectionsPoinst[1] = this.logicDisplay.components[this.selectedComponent].y1;
                                    this.temporaryIntersectionsPoinst[2] = this.logicDisplay.components[this.selectedComponent].x2;
                                    this.temporaryIntersectionsPoinst[3] = this.logicDisplay.components[this.selectedComponent].y2;
                                    
                                    
                                    if (this.temporaryIntersectionsPoinst[0] === this.getCursorXLocal() 
                                            && this.temporaryIntersectionsPoinst[1] === this.getCursorYLocal()){
                                        
                                                  //  this.tooltip = this.temporaryIntersectionsPoinst[0] + " | " 
                                                        //    + -this.temporaryIntersectionsPoinst[1];
                                                    this.temporaryCoor[0] = this.temporaryIntersectionsPoinst[0];
                                                    this.temporaryCoor[1] = this.temporaryIntersectionsPoinst[1];
                                                    
                                    }else if (this.temporaryIntersectionsPoinst[2] === this.getCursorXLocal() 
                                            && this.temporaryIntersectionsPoinst[3] === this.getCursorYLocal()){
                                        
                                                    //this.tooltip = this.temporaryIntersectionsPoinst[2] + " | "
                                                          //  + -this.temporaryIntersectionsPoinst[3];
                                                    this.temporaryCoor[0] = this.temporaryIntersectionsPoinst[2];
                                                    this.temporaryCoor[1] = this.temporaryIntersectionsPoinst[3];
                                    }
                                    return this.temporaryCoor;
                                    
                                }else{
                                    //this.tooltip = "Add linea";
                                }    
                                return null;
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
				var delta = this.getDistance(x ,y, this.logicDisplay.components[i].x1, this.logicDisplay.components[i].y1);
                                var delta2 = this.getDistance(x ,y, this.logicDisplay.components[i].x2, this.logicDisplay.components[i].y2);
				if ( delta >= 0 && delta <= this.snapTolerance / this.zoom ||delta2 >= 0 && delta2 <= this.snapTolerance / this.zoom  )
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
            this.tooltipCode = ctext;
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
		gd.logicDisplay.foo();
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
	setInterval(function() {
		gd.execute();
	}, 100);
};
