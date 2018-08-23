class Star {
    constructor(options = {}){
        this.z = this.getRandomInt(1, 10);

        this.color = options.color || `hsla(0, 0%, ${this.z == 10 ? 100 : (this.z / 8) * 100}%, 1)`;
        this.blur = options.blur ? `blur(${options.blur}px)` : (10 - this.z < 5) ? `blur(${(10 - this.z)}px)` : `none`;

        console.log(this.blur);

        this.minRadius = options.minRadius || this.getRandomInt(10, 20);
        this.radius = this.minRadius * ((10 - this.z) / 10);

        this.xVelocity = (options.velocity || (Math.random() - 0.5)) * ((10 - this.z) / 10);
        this.yVelocity = (options.velocity || (Math.random() - 0.5)) * ((10 - this.z) / 10);

        this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius;
        this.y = Math.random() * (innerWidth - this.radius * 2) + this.radius;
    }

    getRandom(min = 0, max = 1) {
        let n = parseFloat((Math.random() * (max - min) + min).toFixed(1));
        if(n > 0.88){
            n = Math.round(n)
        }
        return n;
    }

    getRandomInt(min = 0, max = 1) {
        let n = Math.floor(Math.random() * (max - min + 1) + min);
        return n;
    }
    
    show(){
        context.beginPath();
        context.shadowColor = "rgba(0, 0, 0, 0.4)";
        context.shadowBlur = 10;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }

    animate(){
        if(this.x - this.radius < 0 + this.radius || this.x + this.radius > canvas.width + this.radius){
            this.xVelocity = -this.xVelocity
        }

        if(this.y - this.radius < 0 + this.radius  || this.y + this.radius > canvas.height + this.radius){
            this.yVelocity = this.yVelocity
        }

        this.x += this.xVelocity;
        this.y += this.yVelocity;

        this.show();
    }

}