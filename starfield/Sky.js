class Sky {
    constructor(options){
        this.stars = [];
        this.paused = false;
        this.frequency = options.frequency || 100;

        this.mouse = {x: undefined, y: undefined}

        document.addEventListener('mousemove', (event) => {
            this.mouse.x = event.x;
            this.mouse.y = event.y;
        });
    }

    show(){
        for(let i = 0; i < this.frequency; i++){
            this.stars[i] = new Star({mouse: this.mouse});
            this.stars[i].show();
        }
    }

    animate(speed){
        setTimeout(() => {
            requestAnimationFrame(() => {
                this.animate(speed)
            })
        }, speed || 100)

        if(this.paused) return;

        context.clearRect(0, 0, canvas.width, canvas.height);
        
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);

        this.stars.forEach((star) => {
            star.animate();
        });
    }

    pause(){
        this.paused = !this.paused;
    }
}