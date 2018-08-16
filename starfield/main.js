var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

class Star {
    constructor(){
        this.x = Math.floor(Math.random() * 800) + 1;
        this.y = Math.floor(Math.random() * 600) + 1;
        this.z = Math.floor(Math.random() * 20) + 1;
    }

    show(){
        context.beginPath();
        context.fillStyle = '#fff';
        context.fillRect(this.x, this.y, this.z, this.z);
    }

    update(){

    }


}

let stars = [];
for(let i = 0; i < 100; i++){
    stars[i] = new Star();
    stars[i].show();
}