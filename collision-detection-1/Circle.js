class Circle {
    constructor(props = {}) {
        this.radius = props.radius || getRandomInt(50, 100)
        this.color = props.color || 'black'

        this.speed = props.speed || 10;

        this.x = props.x || getRandomInt(this.radius, innerWidth - this.radius);
        this.y = props.y || getRandomInt(this.radius, innerHeight - this.radius);
    }
    
    show(){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();

        return this;
    }

    update(cond){
        // if(cond){
            this.x = mouse.x
            this.y = mouse.y
        // }

        return this;
    }
}