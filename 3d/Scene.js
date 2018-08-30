class Scene {
    constructor(options){
        this.particles = options.particles;
        this.paused = false;
        this.frequency = options.frequency || 100;
        this.lastRun = 0;
        this.showFps = true;
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
        for(let i = 0; i < this.frequency; i++){
            this.particles[i] = new Particle({ mouse: this.mouse, particles: this.particles });

            for(let j = 0; j < this.particles.length; j++){
                if(j === i) continue;
    
                if(this.distance(this.particles[i], this.particles[j]) - (this.particles[i].radius + this.particles[j].radius) < 0){
                    this.particles[i].setRandomSize();
                    j = -1;
                }
            }

            this.particles[i].show();
        }
    }

    printFps(){
        let fpsDiv = document.getElementById('fps');
        if(this.showFps){
            if(fpsDiv){
                fpsDiv.className = 'active';
                return fpsDiv.innerHTML = 'Framerate: ' + this.calculateFps().toFixed(2) + ' fps';
            }
            
            console.log(this.calculateFps());
        }
        else{
            if(fpsDiv){
                fpsDiv.className = '';
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