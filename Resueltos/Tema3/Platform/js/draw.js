
var drawModule = (function () { 

  //Pinta un cuadrado de la serpiente
  var bodySnake = function(x, y) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }
  //Pinta una pizza 
  var pizza = function(x, y) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }
  //Pinta el marcador
  var scoreText = function() {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.fillText(score_text, 145, h-5);
  }
  //Crea la serpiente inicial, que es un array de tuplas
  //La cabeza de la serpiente está en la posición 0 del array
  var createSnake = function() {
      var length = snakeSize;
      snake = [];
      for (var i = length-1; i>=0; i--) {
          snake.push({x:i, y:0});
      }  
  }
  //Pinta un "frame" del juego, y controla la acción  
  var paint = function(){
      //Repintamos todo el fondo
      
      ctx.fillStyle = 'lightgrey';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, w, h);
      
      btn.setAttribute('disabled', true);

      //Obtenemos las coordenadas de la cabeza 
      var snakeX = snake[0].x;
      var snakeY = snake[0].y;
      
      //La desplazamos en función de la tecla pulsada
      //en el fichero app.js se gestiona el evento de teclado
      if (direction == 'right') { 
        snakeX++; }
      else if (direction == 'left') { 
        snakeX--; }
      else if (direction == 'up') { 
        snakeY--; 
      } else if(direction == 'down') { 
        snakeY++; }
      
      //Comprobamos si ha chocado con el borde o consigo misma
      if (snakeX == -1 || snakeX >= w/snakeSize || snakeY == -1 || snakeY >= h/snakeSize || checkCollision(snakeX, snakeY, snake)) {
          //Si entra por aquí es que ha chocado
          //Reiniciamos 
          btn.removeAttribute('disabled', true);

          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          return;          
        }
        //La cabeza ha encontrado la comida
        if(snakeX == food.x && snakeY == food.y) {
          var newHead = {x: snakeX, y: snakeY}; //Creamos una nueva cabeza de la serpiente para hacerla más larga
          score ++;
          
          createFood(); //Create new food
        } else { //si no ha encontrado comida
          var newHead = snake.pop(); //sacamos la cola y la convertimos en la nueva cabeza
          newHead.x = snakeX; 
          newHead.y = snakeY;
        }
        //Ponemos la cabeza
        snake.unshift(newHead); //Ponemos la cabeza al principio de nuevo

        //repintamos la serpiente
        for(var i = 0; i < snake.length; i++) {
          bodySnake(snake[i].x, snake[i].y);
        } 
        //Repintamos la pizza y el marcador
        pizza(food.x, food.y); 
        scoreText();
  }

  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
      
        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 30) + 1);
          food.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }

  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

  var init = function(){
      direction = 'down';
      createSnake();
      createFood();
      gameloop = setInterval(paint, tiempoFrame);
  }
    return {
      init : init
    };   
}());
