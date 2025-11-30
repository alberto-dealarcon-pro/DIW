var game = (function () {
    var canvas, ctx;
    var speed = 2;
    var x = 0;
    var y = 50;
    var lastTime = 0
    var deltaTime = 0
    var imgPerro=0;
    function round(number){
        return Math.round(number * 100) / 100
    }
    
    function update(){
        //Comentar esta línea si se usa setInterval en init()
        requestAnimationFrame(update);
        currentTime = performance.now()
        deltaTime = currentTime - lastTime
        deltaTimeSeconds = deltaTime / 1000
        lastTime = currentTime
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x += speed;
        if(x > canvas.width) x = 0;
        ctx.drawImage(imgPerro,x,y);
        ctx.fillText(round(deltaTime) + " ms", canvas.width/2-60, canvas.height/2+150);
        ctx.fillText(round(1000/deltaTime) + " fps", canvas.width/2-60, canvas.height/2+210)
    }
    
    function init() {
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        ctx.font = "30px serif";
        
        imgPerro = new Image();
        imgPerro.src = 'images/perro.png';
        imgPerro.addEventListener('load', function() {
            // Este trozo de código se ejecutará de manera asíncrona cuando la imagen se haya realmente cargado.
            
            update();  //llamar update() directamente en caso de usar requestAnimationFrame()
            //Si usamos setInterval(), la función update se llamará regularmente al tiempo que fijemos.
            //setInterval(update,16); 
        }, false);
    
    }
    return {
        init: init
    }
})();