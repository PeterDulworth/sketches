let fr = 60;
let population;
let lifespan = 400;
let frameCountDisplay;
let count = 0;
let target;
let maxForce = 0.2;
let obstacles = [];

function setup() {
    // setup framerate and canvas
    let myCanvas = createCanvas(400, 300);
    myCanvas.parent('p5canvas');
    frameRate(fr);

    // create a <p> to display the frame count
    frameCountDisplay = createP();
    frameCountDisplay.parent('frameCount')

    // create the goal
    target = createVector(width / 2, 50);

    // create the initial population
    population = new Population();

    // create obstacles
    obstacles = [
        new Obstacle(100, 150, 200, 10),
    ]
}

function draw() {
    // render targer
    noStroke();
    background(28, 77, 93)
    ellipse(target.x, target.y, 16, 16);

    for (let ob of obstacles) {
        ob.show();
    }
    
    // update all the rockets 
    population.run();
    frameCountDisplay.html(count);
    count++;

    // if we have reached the end of the lifespan
    if (count == lifespan) {
        // create the a new population
        population.selection();
        count = 0;
    }
}

class Obstacle {
    // xpos, ypos, width, height
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    show() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }
}