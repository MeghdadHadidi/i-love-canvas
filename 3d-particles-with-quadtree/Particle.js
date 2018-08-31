class Particle {
    constructor(options = {}){
        this.z = this.getRandomInt(1, 10);
        // this.z = 1;

        this.color = options.color || `hsla(0, 0%, ${this.z == 10 ? 100 : (this.z / 8) * 100}%, 1)`;
        this.blur = options.blur ? `blur(${options.blur}px)` : (10 - this.z < 5) ? `blur(${(10 - this.z)}px)` : `none`;

        this.minRadius = options.minRadius || this.getRandomInt(10, 10);
        this.radius = this.minRadius * ((10 - this.z) / 10);

        this.velocity = { 
            x: (options.velocity || (Math.random() - 0.5)) * ((10 / this.z) * 2),
            y: (options.velocity || (Math.random() - 0.5)) * ((10 / this.z) * 2)
        }

        this.setRandomSize();

        this.mass = options.mass || 1;
        this.particles = options.particles;
    }

    setRandomSize(){
        this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
        this.y = Math.random() * (canvas.height - this.radius * 2) + this.radius;
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

    /**
     * Rotates coordinate system for velocities
     *
     * Takes velocities and alters them as if the coordinate system they're on was rotated
     *
     * @param  Object | velocity | The velocity of an individual particle
     * @param  Float  | angle    | The angle of collision between two objects in radians
     * @return Object | The altered x and y velocities after the coordinate system has been rotated
     */

    rotate(velocity, angle) {
        const rotatedVelocities = {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };

        return rotatedVelocities;
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
     

    /**
     * Swaps out two colliding particles' x and y velocities after running through
     * an elastic collision reaction equation
     *
     * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
     * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
     * @return Null | Does not return a value
     */

    resolveCollision(particle, otherParticle) {
        const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
        const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

        const xDist = otherParticle.x - particle.x;
        const yDist = otherParticle.y - particle.y;

        // Prevent accidental overlap of particles
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

            // Grab angle between the two colliding particles
            const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

            // Store mass in var for better readability in collision equation
            const m1 = particle.mass;
            const m2 = otherParticle.mass;

            // Velocity before equation
            const u1 = this.rotate(particle.velocity, angle);
            const u2 = this.rotate(otherParticle.velocity, angle);

            // Velocity after 1d collision equation
            const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
            const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

            // Final velocity after rotating axis back to original location
            const vFinal1 = this.rotate(v1, -angle);
            const vFinal2 = this.rotate(v2, -angle);

            // Swap particle velocities for realistic bounce effect
            particle.velocity.x = vFinal1.x;
            particle.velocity.y = vFinal1.y;

            otherParticle.velocity.x = vFinal2.x;
            otherParticle.velocity.y = vFinal2.y;
        }
    }
    
    show(){
        context.beginPath();
        context.shadowColor = "rgba(0, 0, 0, 0.4)";
        // context.shadowBlur = 10;
        // context.shadowOffsetX = 0;
        // context.shadowOffsetY = 0;
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }

    animate(){
        let range = new Rectangle({ x: this.x - this.radius * 2, y: this.y - this.radius * 2, w: this.radius * 4, h: this.radius * 4 });
        // context.beginPath();
        // context.shadowBlur = 0;
        // context.shadowOffsetX = 0;
        // context.shadowOffsetY = 0;
        // context.strokeStyle = 'red';
        // context.strokeRect(range.x, range.y, range.w, range.h);

        // context.beginPath();
        // context.shadowColor = "green";
        // context.shadowBlur = 0;
        // context.shadowOffsetX = 0;
        // context.shadowOffsetY = 0;
        // context.fillStyle = this.color;
        // context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // context.fill();

        let inRangeParticles = scene.quadtree.query(range);
        for(let i = 0; i < inRangeParticles.length; i++){
            if(this === inRangeParticles[i]) continue;

            if(this.distance(this, inRangeParticles[i]) - (this.radius + inRangeParticles[i].radius) < 0){
                this.resolveCollision(this, inRangeParticles[i]);
            }
        }

        if(this.x - this.radius <= 0 || this.x + this.radius >= canvas.width){
            this.velocity.x = -this.velocity.x;
        }

        if(this.y - this.radius <= 0 || this.y + this.radius >= canvas.height){
            this.velocity.y = -this.velocity.y;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.show();
    }

}