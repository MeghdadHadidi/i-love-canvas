class Rectangle {
    constructor(params = { x: 0, y: 0, w: 100, h: 100 }){
        this.x = params.x;
        this.y = params.y;
        this.w = params.w;
        this.h = params.h;
    }

    contains(point){
        return (
            point.x >= this.x &&
            point.x <= this.x + this.w &&
            point.y >= this.y &&
            point.y <= this.y + this.h
        )
    }

    intersects(range){
        return (
            range.x + range.w > this.x && range.x < this.x + this.w && 
            range.y + range.h > this.y && range.y < this.y + this.h
        )
    }
}