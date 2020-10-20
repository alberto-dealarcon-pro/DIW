
var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
var snakeSize = 10; //Número de cuadrados inicial de la serpiente
var w = mycanvas.width;
var h = mycanvas.height;
var score = 0;
var tiempoFrame=100; //Cada frame dura 100 milisegundos. Si incrementamos el tiempo el juego va mas lento.
var snake; //array donde ponemos las coordenadas que ocupa la serpiente
var food;