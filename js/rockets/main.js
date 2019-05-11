// the frame rate
let fr = 120;
// the population
let population;
// the number of frames per generation
let lifespan = 400;
// the <p> to display the current frame count
let frameCountDisplay;
// the <p> to display the current generation
let generationDisplay;
// vector containing the position of the target
let targetPos;
// diameter of the target
let targetSize = 32;
// the maximum force to allow
let maxForce = 0.2;
// array of obstacles
let obstacles = [];
// mathematical constant e
const e = 2.71828;
// the mutation rate: probability of randomly mutating any given gene entry
let mutationRate = 0.01;
// the number of rockets / generation
let popSize = 25;

function setup() {
    // setup framerate and canvas
    // let myCanvas = createCanvas(0.8 * windowWidth, 300);
    let myCanvas = createCanvas(400, 400);
    myCanvas.parent('p5canvas');
    frameRate(fr);

    // create a <p> to display the frame count
    frameCountDisplay = createP();
    frameCountDisplay.parent('frameCount')

    // create a <p> to display the generation
    generationDisplay = createP();
    generationDisplay.parent('generationCount')

    // the location of the target
    targetPos = createVector(width / 2, 50);

    // create the initial population
    population = new Population(popSize);

    // create obstacles
    obstacles = [
        new Obstacle(width / 2 + 100, height / 2 - 100, 200, 10),
        new Obstacle(width / 2 - 100, height / 2 - 50, 200, 10),
        new Obstacle(width / 2, height / 2, 50, 50),
    ]
}

function draw() {
    // redraw background every frame with slight transparency to create blur effect
    background(28, 77, 93, 50)
    drawTarget();

    // update all the rockets 
    population.run();

    // draw the obstacles
    for (let ob of obstacles) ob.show();
}

function drawTarget() {
    noStroke();
    fill('blue')
    ellipse(targetPos.x, targetPos.y, targetSize, targetSize);
    fill('white')
    ellipse(targetPos.x, targetPos.y, 0.6667 * targetSize, 0.6667 * targetSize);
    fill('red')
    ellipse(targetPos.x, targetPos.y, 0.3332 * targetSize, 0.3332 * targetSize);
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