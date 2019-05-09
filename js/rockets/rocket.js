class Rocket {
    constructor() {
        // start the rocket in the middle
        this.pos = createVector(width / 2, height / 2);
        // no initial vel / acc
        this.vel = createVector();
        this.acc = createVector();
        // essentially array of velocities
        this.dna = new DNA();
        this.fitness = 0;
    }

    applyForce(force) {
        this.acc.add(force)
    }

    calcFitness() {
        var d = distance(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d, 0, width, width, 0);
    }

    // arrow functions??
    update() {
        this.applyForce(this.dna.genes[count]);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
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
