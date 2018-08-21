var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

setCanvasSize()

function setCanvasSize(){
    canvas.width = window.innerWidth - 20 
    canvas.height = window.innerHeight - 20
}

window.addEventListener('resize', setCanvasSize)

let sky = new Sky({ frequency: 1000 });
sky.show();
sky.animate(10);

canvas.addEventListener('click', function(){
    sky.pause();
});