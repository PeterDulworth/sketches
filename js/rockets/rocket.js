class Rocket {
    constructor(dna) {
        // start the rocket in the middle
        this.pos = createVector(width / 2, height);
        // no initial vel / acc
        this.vel = createVector();
        this.acc = createVector();
        // essentially array of velocities
        if (dna) {
            this.dna = dna;
        } else {
            this.dna = new DNA();
        }
        this.fitness = 0;
        this.targetReached = false;
        this.collision = false;
    }

    applyForce(force) {
        this.acc.add(force)
    }

    // the time to target could factor into the fitness
    // lower the count, -> higher fitness
    calcFitness() {
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d, 0, width, width, 0);
        if (this.targetReached) {
            this.fitness *= 10;
        }

        // divide fitness by 10 if crashed (because crashing closer to target is still better than crashing farther)
        if (this.collision) {
            this.fitness /= 10;
        }
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

    // arrow functions??
    update() {
        
        // if the rocket has reached the target
        let d = dist(this.pos.x, this.pos.y, target.x, target.y);
        if (d < 10) {
            this.targetReached = true;
            this.pos = target.copy();
        } 

        this.checkCollisions();
        
        this.applyForce(this.dna.genes[count]);
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
        fill(255, 150);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);
        pop();
    }
}
