/*En este módulo registramos los eventos del juego: click en el botón "Start", y teclas
de movimiento*/
(function (window, document, drawModule, undefined) {

var btn = document.getElementById('btn');
btn.addEventListener("click", function(){ drawModule.init();});

document.onkeydown = function(event) {
    switch (event.key) {
      case "ArrowLeft":
        if (direction != 'right') { //impide que se mueva a la izquierda si se está moviendo a la derecha
          direction = 'left';
        }
        break;
      case "ArrowRight":
        if (direction != 'left') {
          direction = 'right';
          console.log('right');
        }
        break;
      case "ArrowUp":
        if (direction != 'down') {
          direction = 'up';
          console.log('up');
        }
        break;
      case "ArrowDown":
        if (direction != 'up') {
          direction = 'down';
          console.log('down');
        }
        break;
    }
  }
})(window, document, drawModule);
