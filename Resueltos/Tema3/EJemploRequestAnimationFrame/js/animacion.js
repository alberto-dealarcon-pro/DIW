var game = (function () {
    var canvas, ctx;
    var speed = 2;
    var x = 0;
    var y = 50;
    var fps = 60; //También puede ser un valor  de 30
    lastTime = 0
    deltaTime = 0
    
    function round(number){
        return Math.round(number * 100) / 100
    }
    
    function update(){
        requestAnimationFrame(update);
        currentTime = performance.now()
        deltaTime = currentTime - lastTime
        deltaTimeSeconds = deltaTime / 1000
        lastTime = currentTime
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        x += speed;
        if(x > canvas.width) x = 0;
        ctx.fillRect(x, y, 50, 50);
        ctx.fillText(round(deltaTime) + " ms", canvas.width/2-60, canvas.height/2);
        ctx.fillText(round(1000/deltaTime) + " fps", canvas.width/2-60, canvas.height/2+60)
    }
    
    function init() {
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        ctx.font = "30px serif";
        //setInterval(update,16);
        update();
    }
    return {
        init: init
    }
})();