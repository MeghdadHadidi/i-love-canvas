var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

window.addEventListener('resize', function(event){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})

let sky = new Sky({ frequency: 800 });
sky.show();
sky.animate(10);

canvas.addEventListener('click', function(){
    sky.pause();
});