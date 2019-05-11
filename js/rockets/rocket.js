class Rocket {
    constructor(dna) {
        // initial location of the rocket
        this.pos = createVector(width / 2, height);
        // no initial vel / acc
        this.vel = createVector();
        this.acc = createVector();
        this.fitness = 0;
        this.targetReached = false;
        this.finishFrame = 0;
        this.collision = false;
        this.recordDist = Infinity; // closest rocket gets to target in a given generation
        this.prob = 0;

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
        this.fitness = pow(1.0 / (this.recordDist * this.finishFrame), 4);

        // gain fitness for reaching target
        if (this.targetReached) this.fitness *= 10; // 10x more likely to show up in the mating pool

        // lose fitness for hitting obstacle
        if (this.collision) this.fitness /= 10;
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
        // distance between rocket and target
        let d = dist(this.pos.x, this.pos.y, targetPos.x, targetPos.y);
        if (d < this.recordDist) this.recordDist = d;
        
        // if target reached
        if (d < targetSize / 2 && !this.targetReached) this.targetReached = true;
        else this.finishFrame++;

        this.checkCollisions();

        if (!this.targetReached && !this.collision) {
            this.applyForce(this.dna.genes[frame]);
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
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