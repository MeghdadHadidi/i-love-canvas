var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

let sky = new Sky({ frequency: 200 });
sky.show();
sky.animate(30);

canvas.addEventListener('click', function(){
    sky.pause();
});