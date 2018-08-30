class QuadTree{
    constructor(params = { capacity: 4, boundary: { x: 0, y: 0, w: canvas.width, h: canvas.height } }){
        this.capacity = params.capacity || 4;
        this.boundary = params.boundary;
        this.points = [];
        this.divided = false;
    }

    insert(point){
        if(!this.boundary.contains(point)) return false;

        if(this.points.length < this.capacity){
            this.points.push(point)
            return true;
        } else {
            if(!this.divided){
                this.subdivide();            }
            if(this.northwest.insert(point)) return true;
            if(this.northeast.insert(point)) return true;
            if(this.southwest.insert(point)) return true;
            if(this.southeast.insert(point)) return true;
        }

        return true;
    }

    query(range, found){
        found = found || [];
        if(!this.boundary.intersects(range)){
            return found;
        } else {
            for(let p of this.points){
                if(range.contains(p)){
                    found.push(p);
                }
            }

            if(this.divided){
                this.northwest.query(range, found);
                this.northeast.query(range, found);
                this.southwest.query(range, found);
                this.southeast.query(range, found);
            }

            return found;
        }
    }

    show(){
        context.beginPath();
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.strokeStyle = '#000000';
        context.lineWidth = 1;
        context.strokeRect(this.boundary.x, this.boundary.y, this.boundary.w, this.boundary.h);

        if(this.divided){
            this.northwest.show();
            this.northeast.show();
            this.southwest.show();
            this.southheast.show();
        }
    }

    subdivide(){
        let nw = new Rectangle({ x: this.boundary.x, y: this.boundary.y, w: this.boundary.w/2, h: this.boundary.h/2 });
        this.northwest = new QuadTree({ boundary: nw });

        let ne = new Rectangle({ x: this.boundary.x + this.boundary.w/2, y: this.boundary.y, w: this.boundary.w/2, h: this.boundary.h/2 });
        this.northeast = new QuadTree({ boundary: ne });

        let sw = new Rectangle({ x: this.boundary.x, y: this.boundary.y + this.boundary.h/2, w: this.boundary.w/2, h: this.boundary.h/2 });
        this.southwest = new QuadTree({ boundary: sw });

        let se = new Rectangle({ x: this.boundary.x + this.boundary.w/2, y: this.boundary.y + this.boundary.h/2, w: this.boundary.w/2, h: this.boundary.h/2 });
        this.southeast = new QuadTree({ boundary: se });

        this.divided = true;
    }
}