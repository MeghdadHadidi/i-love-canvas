class Star {
    constructor(options = {}){
        this.xVelocity = options.velocity || (Math.random() - 0.5) * 8;
        this.yVelocity = options.velocity || (Math.random() - 0.5) * 8;

        this.colorSets = [
            {r: 0, g: 0, b: 0 },
            {r: 70, g: 5, b: 5 }
        ]

        this.color = options.color || this.colorSets[this.getRandomInt()];

        this.alpha = options.alpha || this.getRandom();
        console.log(this.color.r, this.alpha);

        this.radius = options.radius || this.getRandomInt(3, 8);

        this.x = Math.random() * (innerWidth - this.radius * 2) + this.radius;
        this.y = Math.random() * (innerWidth - this.radius * 2) + this.radius;
        this.z = Math.floor(Math.random() * 20) + 1;
    }

    getRandom(min = 0, max = 1) {
        let n = Math.random() * (max - min) + min;
        if(n > 0.92){
            n = Math.round(n)
        }

        return n;
    }

    getRandomInt(min = 0, max = 1) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    show(){
        context.beginPath();
        context.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
        context.arc(this.x - this.radius, this.y - this.radius, this.radius, 0, Math.PI * 2);
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

        this.show();
    }


}