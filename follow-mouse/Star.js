class Star {
    constructor(options = {}){
        this.xVelocity = options.velocity || (Math.random() - 0.5);
        this.yVelocity = options.velocity || (Math.random() - 0.5);

        this.colorSets = [
            '#000000',
            '#586F7C',
            '#B8DBD9',
            '#04724D'
        ]

        this.mouse = options.mouse;

        const randomColor = this.getRandomInt(0, this.colorSets.length - 1);
        this.color = options.color || this.colorSets[randomColor];

        this.alpha = options.alpha || this.getRandom();

        this.minRadius = options.minRadius || this.getRandomInt(3, 8);
        this.radius = this.minRadius;

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

        if(this.mouse.x - this.x < 100 && this.mouse.x - this.x > -100 
            && this.mouse.y - this.y < 100 && this.mouse.y - this.y > -100
            ){
                this.getClose();
        } else {
            this.getAway();
        }

        this.show();
    }

    getClose(){
        if(!this.position){
            this.position = {
                x: this.x,
                y: this.y
            }
        }
        if((this.mouse.x  < this.x && this.xVelocity > 0) || (this.mouse.x > this.x && this.xVelocity < 0)){
            this.xVelocity = -this.xVelocity;
        }

        if((this.mouse.y  < this.y && this.yVelocity > 0) || (this.mouse.y > this.y && this.yVelocity < 0)){
            this.yVelocity = -this.yVelocity;
        }
    }

    getAway(){
        if(this.position){
            if((this.position.x < this.x && this.xVelocity > 0) || (this.position.x > this.x && this.xVelocity < 0)){
                this.xVelocity = -this.xVelocity;
            }

            if((this.position.y  < this.y && this.yVelocity > 0) || (this.position.y > this.y && this.yVelocity < 0)){
                this.yVelocity = -this.yVelocity;
            }

            delete this.position
        }
    }

}