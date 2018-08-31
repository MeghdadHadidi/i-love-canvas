var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var mouse = {x: undefined, y: undefined};

setCanvasSize(1024, 768)

function setCanvasSize(width, height){
    canvas.width = width || window.innerWidth - 20 
    canvas.height = height || window.innerHeight - 20
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame   || 
    window.mozRequestAnimationFrame      || 
    window.oRequestAnimationFrame        || 
    window.msRequestAnimationFrame       || 
    function(callback, element){
        window.setTimeout(function(){
           
            callback(+performance.now);
        }, 1000 / 60);
    };
})();

window.addEventListener('resize', setCanvasSize)
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

let particles = [];
let scene = new Scene({ frequency: 3000, particles });
scene.show();
scene.animate();

canvas.addEventListener('click', function(){
    scene.pause();
});