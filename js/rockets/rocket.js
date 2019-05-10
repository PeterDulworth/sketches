class Rocket {
    constructor(dna) {
        // initial location of the rocket
        this.pos = createVector(width / 2, height);
        // no initial vel / acc
        this.vel = createVector();
        this.acc = createVector();
        this.fitness = 0;
        this.targetReached = false;
        this.frameTargetReached;
        this.collision = false;

        // essentially array of velocities
        if (dna) this.dna = dna;
        else this.dna = new DNA();
    }

    applyForce(force) {
        this.acc.add(force)
    }

    // calculate fitness roughly following these rules:
    // 1. lower distance to target -> higher fitness
    // 2. lower frame count -> higher fitness
    // 3. actually hit the target -> fitness boost
    // 4. left frame or hit obstacle -> fitness lowered
    calcFitness() {
        // find the distance from the rocket to the target
        let d = dist(this.pos.x, this.pos.y, targetPos.x, targetPos.y);
        // normally 0 would be the best distance and width the worst. flip it
        this.fitness = map(d, 0, width, width, 0);
        this.fitness = pow(this.fitness, 2);

        // if the target is reached give a big reward
        if (this.targetReached) {
            this.fitness *= 10; // 10x more likely to show up in the mating pool
        }

        // divide fitness by 10 if crashed (because crashing closer to target is still better than crashing farther)
        if (this.collision) {
            this.fitness /= 10;
        }

        // reward reaching the target sooner
        if (this.targetReached) {
            this.fitness = map(this.frameTargetReached, 0, lifespan, 10, 1) * this.fitness;
        }

        // this.fitness = pow(e, this.fitness);
    }

    // check if the rocket has collided with any obstacle
    checkCollisions() {
        // check for collisions with window boundaries
        if (this.pos.x > width || this.pos.x < 0 ||
            this.pos.y > height || this.pos.y < 0) {
            this.collision = true;
        }

        // check for collisions with all obstacles
        for (let ob of obstacles) {
            if (this.pos.x > ob.x && this.pos.x < ob.x + ob.width &&
                this.pos.y > ob.y && this.pos.y < ob.y + ob.height) {
                    this.collision = true;
                    break;
                }
        }
    }

    update(frame) {
        // if the rocket has reached the target
        let d = dist(this.pos.x, this.pos.y, targetPos.x, targetPos.y);
        if (d < 10) {
            this.targetReached = true;
            if (!this.frameTargetReached) this.frameTargetReached = frame;
        } 

        this.checkCollisions();

        this.applyForce(this.dna.genes[frame]);
        if (!this.targetReached && !this.collision) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    }

    show() {
        push(); // wrapping in push / pop keeps rotating and translating from affecting other things
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        scale(0.3);

        if (!this.collision && !this.targetReached) {
            fill(255, 200);
            this.drawRocketBody();
            this.drawRocketFlame();
        } else if (this.collision) {
            fill(255, 0, 0, 200);
            this.drawRocketBody();
        } else if (this.targetReached) {
            fill(0, 255, 0, 200);
            this.drawRocketBody();
        }

        pop();
    }

    // vertices of the rocket body
    drawRocketBody() {
        beginShape();
        vertex(15, 10)
        vertex(0, 10)
        vertex(-15, 10)
        vertex(-26, 10)
        vertex(-40, 18)
        
        vertex(-40, 0)
        
        vertex(-40, -18)
        vertex(-26, -10)
        vertex(-15, -10)
        vertex(0, -10)
        vertex(15, -10)
        
        vertex(30, 0)
        endShape(CLOSE);
    }

    // the flame behind the rocket
    drawRocketFlame() {
        stroke('red')
        line(-50, 0, -100, 0)
        line(-50, 4, -70, 4)
        line(-50, -4, -85, -4)
    }
}