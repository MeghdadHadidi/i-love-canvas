var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

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

let particles = [];
let scene = new Scene({ frequency: 6, particles });
scene.show();
// scene.animate();

canvas.addEventListener('click', function(){
    scene.pause();
});