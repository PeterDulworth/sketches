let fr = 30; // default 30

// One commonly used set of constants is a = 10, b = 28, c = 8 / 3. Another is a = 28, b = 46.92, c = 4. 
let a = 10.0; // sigma
let b = 28.0; // ro
let c = 8.0 / 3.0; // beta

// let a = 28;
// let b = 46.92;
// let c = 4;

let dt = 0.01;

let attractors = [];

function setup() { 
    // create the canvas
    let myCanvas = createCanvas(windowWidth, 600, WEBGL);
    myCanvas.parent('p5canvas');
    frameRate(fr);
    background(28, 77, 93)
    attractors = [
        new LorenzAttractor(1, 3, 42, 255, 0, 0),
        new LorenzAttractor(5, 2, 40, 0, 255, 0),
        new LorenzAttractor(2, 4, 40, 0, 0, 255)
    ]
    
    // camera(0, -30, 100, 0, 0, 0, 0, 1, 0);
    // normalMaterial();
    // debugMode(AXES);
} 

function draw() { 
    background(28, 77, 93)
    //drag to move the world.
    orbitControl();
    scale(5);
    for (let la of attractors) {
        la.update();
        la.show();
    }
}

class LorenzAttractor {
    constructor(x, y, z, r, g, b) {
        this.pos = createVector(x, y, z);
        this.col = createVector(r, g, b);
        this.history = [];
    }

    update() {
        this.history.push(this.pos);

        // update the changes in x, z, z
        let dx = (a * (this.pos.y - this.pos.x)) * dt;
        let dy = (this.pos.x * (b - this.pos.z) - this.pos.y) * dt;
        let dz = (this.pos.x * this.pos.y - c * this.pos.z) * dt;

        // increment the actual value
        this.pos = p5.Vector.add(this.pos, createVector(dx, dy, dz));
    }

    show() {
        strokeWeight(2);
        stroke(this.col.x, this.col.y, this.col.z)
        noFill();
        beginShape(QUAD_STRIP);
        for (let i = 0; i < this.history.length; i++) {
            let p = this.history[i];
            curveVertex(p.x, p.y, p.z);
        }
        endShape();

        // point(this.pos.x, this.pos.y, this.pos.z)
    }
}