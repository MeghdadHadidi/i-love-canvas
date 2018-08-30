class Scene {
    constructor(options){
        this.particles = options.particles;
        this.paused = false;
        this.frequency = options.frequency || 100;
        this.lastRun = 0;
        this.showFps = true;
        this.to;
        this.quadtree;
    }

    /**
     * Returns actual distance between two given particles
     *
     * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
     * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
     * @return Number | Sqrt from sum of 2 distances
     */
    distance(particle, otherParticle){
        const xDist = otherParticle.x - particle.x;
        const yDist = otherParticle.y - particle.y;

        return Math.sqrt(
            Math.pow(xDist, 2) +
            Math.pow(yDist, 2)
        )
    }

    show(){
        let bnd = new Rectangle({ x: 0, y: 0, w: canvas.width, h: canvas.height });
        this.quadtree = new QuadTree({ boundary: bnd });
        for(let i = 0; i < this.frequency; i++){
            this.particles[i] = new Particle({ mouse: this.mouse, particles: this.particles });

            for(let j = 0; j < this.particles.length; j++){
                if(j === i) continue;
    
                if(this.distance(this.particles[i], this.particles[j]) - (this.particles[i].radius + this.particles[j].radius) < 0){
                    this.particles[i].setRandomSize();
                    j = -1;
                }
            }

            this.quadtree.insert(particles[i]);
            this.particles[i].show();
        }

        // this.quadtree.show();

        let area = new Rectangle({ x: 100, y: 100, w: 450, h: 450 });
        context.beginPath();
        context.shadowBlur = 0;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = 0;
        context.strokeStyle = 'rgb(0, 255, 0)';
        context.lineWidth = 3;
        context.strokeRect(area.w, area.y, area.w, area.h);

        let particlesFoundInRange = this.quadtree.query(area);
        console.log(particlesFoundInRange);
    }

    printFps(){
        let fpsDiv = document.getElementById('fps');
        if(this.showFps){
            if(fpsDiv){
                let fps = this.calculateFps().toFixed(2);
                if(!this.to){
                    this.to = setTimeout(() => {
                        fpsDiv.className = 'active';
                        fpsDiv.innerHTML = 'Framerate: ' + fps + ' fps';
                        this.to = null;
                    }, 500);
                }

                return;
            }
            
            console.log(this.calculateFps());
        }
        else{
            if(fpsDiv){
                fpsDiv.className = '';

                clearTimeout(this.to);
            }
        }
    }

    calculateFps(){
        let delta = (performance.now() - this.lastRun)/1000;
        this.lastRun = performance.now();
        return 1/delta;
    }

    animate() {
        if(!this.paused){
            if(!this.lastRun){
                this.lastRun = performance.now();
                requestAnimFrame(() => this.animate());
                return;
            }
    
            this.printFps();
    
            context.clearRect(0, 0, canvas.width, canvas.height);
            
            context.fillStyle = '#fff';
            context.fillRect(0, 0, canvas.width, canvas.height);
    
            this.particles = this.particles.sort((a, b) => {
                return a.z < b.z
            })
    
            this.particles.forEach((particle) => {
                particle.animate();
            });
    
            requestAnimFrame(() => this.animate())
        }
    }

    pause(){
        this.paused = !this.paused;
        this.animate();
    }
}