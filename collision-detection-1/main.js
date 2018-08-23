var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var mouse = {
    x: 200,
    y: 200
}

setCanvasSize()

function setCanvasSize(){
    canvas.width = window.innerWidth - 20 
    canvas.height = window.innerHeight - 20
}

window.addEventListener('resize', setCanvasSize)
window.addEventListener('mousemove', function(event){
    mouse.x = event.clientX
    mouse.y = event.clientY
})

// Feature related scripts
var circle1 = new Circle();
var circle2 = new Circle();

function getDistance(c1, c2){
    let xDist = mouse.x - c2.x;
    let yDist = c1.y - mouse.y;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function animate(){
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height);

    circle1.show();
    circle2.update(getDistance(circle1, circle2) > circle1.radius + circle2.radius).show();
}

animate();