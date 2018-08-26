var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

setCanvasSize(1024, 768)

function setCanvasSize(width, height){
    canvas.width = width || window.innerWidth - 20 
    canvas.height = height || window.innerHeight - 20
}

window.addEventListener('resize', setCanvasSize)

let particles = [];
let scene = new Scene({ frequency: 500, particles });
scene.show();
scene.animate();

canvas.addEventListener('click', function(){
    scene.pause();
});