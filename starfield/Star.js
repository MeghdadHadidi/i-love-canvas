class Star {
    constructor(options = {}){
        this.xVelocity = options.velocity || (Math.random() - 0.5);
        this.yVelocity = options.velocity || (Math.random() - 0.5);

        this.colorSets = [
            '#ff4c00',
            '#000000',
            '#aec8e8',
            '#c5d2e2'
        ]

        this.mouse = options.mouse;

        const randomColor = this.getRandomInt(0, this.colorSets.length - 1);
        this.color = options.color || this.colorSets[randomColor];

        this.alpha = options.alpha || this.getRandom();

        this.minRadius = options.minRadius || this.getRandomInt(2, 5);
        this.radius = this.minRadius;
        this.maxRadius = options.maxRadius || 30;

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
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }

    animate(){
        if(this.x - this.radius < 0 + this.radius || this.x + this.radius > canvas.width + this.radius){
            this.xVelocity = -this.xVelocity
        }

        if(this.y - this.radius < 0 + this.radius  || this.y + this.radius > canvas.height + this.radius){
            this.yVelocity = -this.yVelocity
        }

        this.x += this.xVelocity;
        this.y += this.yVelocity;

        if(this.mouse.x - this.x < 50 && this.mouse.x - this.x > -50 
            && this.mouse.y - this.y < 50 && this.mouse.y - this.y > -50
            ){
            this.grow();
        } else {
            this.shrink();
        }

        this.show();
    }

    grow(){
        if(this.radius < this.maxRadius){
            this.radius += 1;
        }
    }

    shrink(){
        if(this.radius > this.minRadius){
            this.radius -= 1;
        }
    }

}