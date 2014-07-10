/**
 * 
 * *****************************************************************************
 * Hace figuras predefinidas.
 * *****************************************************************************
 * No se usa en el proyecto.
 * *****************************************************************************
 * @returns {Shape|getShapeSerbatoioOrizzontaleO.s}
 */

// Serbatoio orizzontale O
function getShapeSerbatoioOrizzontaleO() {
	var s = new Shape(0,0);
	s.addComponent(new Rectangle(0,0,100,100));
	s.addComponent(new Arc(100,50,100,0,100,100));
	s.addComponent(new Arc(0,50,0,100,0,0));
	s.addComponent(new Label(50,100,"S.O."));
	
	return s;
}

// Serbatoio orizzontale V
function getShapeSerbatoioOrizzontaleV() {
	var s = new Shape(0,0);
	s.addComponent(new Arc(50,0,0,0,100,0));
	s.addComponent(new Rectangle(0,0,100,100));
	s.addComponent(new Arc(50,100,100,100,0,100));
	s.addComponent(new Label(50,150,"S.O."));
	
	return s;
}

// Serbatoio verticale
function getShapeSerbatoioVerticale() {
	var s = new Shape(0,0);
	s.addComponent(new Rectangle(0,0,100,100));
	s.addComponent(new Circle(50,50,50,100));
	s.addComponent(new Label(50,100,"S.V."));
	
	return s;
}

// Albero
function getShapeAlbero() {
	var s = new Shape(0,0);
	s.addComponent(new Circle(0,0,20,0));
	s.addComponent(new Line(-5,-5,5,5));
	s.addComponent(new Line(-5,5,5,-5));
	//s.addComponent(new Line(400,0,0,400));
	s.addComponent(new Label(50,40,"A"));
	
	return s;
}

// Ostacolo O
function getShapeOstacoloO() {
	var s = new Shape(0,0);
	s.addComponent(new Rectangle(0,0,200,50));
	s.addComponent(new Line(0,0,200,50));
	s.addComponent(new Line(200,0,0,50));
	s.addComponent(new Label(160,55,"O"));
	
	return s;
}

// Ostacolo V
function getShapeOstacoloV() {
	var s = new Shape(0,0);
	s.addComponent(new Rectangle(0,0,50,200));
	s.addComponent(new Line(0,0,50,200));
	s.addComponent(new Line(50,0,0,200));
	s.addComponent(new Label(60,205,"O"));
	
	return s;
}

// Autobotte O
function getShapeAutobotteO() {
	var s = new Shape(0,0);
	s.addComponent(new Rectangle(0,0,100,100));
	s.addComponent(new Rectangle(-50,0,150,100));
	s.addComponent(new Arc(100,50,100,0,100,100));
	s.addComponent(new Arc(0,50,0,100,0,0));
	s.addComponent(new Label(120,100,"AB"));
	
	return s;
}

// Autobotte V
function getShapeAutobotteV() {
	var s = new Shape(0,0);
	s.addComponent(new Rectangle(0,0,100,100));
	s.addComponent(new Rectangle(0,-50,100,150));
	s.addComponent(new Arc(50,0,0,0,100,0));
	s.addComponent(new Rectangle(0,0,100,100));
	s.addComponent(new Arc(50,100,100,100,0,100));
	s.addComponent(new Label(70,150,"AB"));
	
	return s;
}

// Cancello orizzontale
function getShapeCancelloO() {
	var s = new Shape(0,0);
	
	s.addComponent(new Line(0,0,300,0));
	s.addComponent(new Line(0,20,300,20));
	s.addComponent(new Line(0,20,0,-150));
	s.addComponent(new Line(300,20,300,-150));
	s.addComponent(new Line(0,-150,150,0));
	s.addComponent(new Line(300,-150,150,0));
	s.addComponent(new Label(150,30,"C"));
	
	return s;
}

// Cancello V
function getShapeCancelloV() {
	var s = new Shape(0,0);
	
	s.addComponent(new Line(0,0,0,300));
	s.addComponent(new Line(-20,0,-20,300));
	s.addComponent(new Line(0,0,150,0));
	s.addComponent(new Line(0,300,150,300));
	s.addComponent(new Line(150,0,0,150));
	s.addComponent(new Line(150,300,0,150));
	s.addComponent(new Label(160,130,"C"));
	
	return s;
}