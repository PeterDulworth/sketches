let fr = 30;
let rocket;
let population;
let lifespan = 200;
let lifeParagraph;
let count = 0;
let target;


function setup() {
    let myCanvas = createCanvas(windowWidth, 600);
    myCanvas.parent('p5canvas');
    frameRate(fr);
    population = new Population();
    lifeParagraph = createP();
    lifeParagraph.parent('frameCount')
    target = createVector(width / 2, 50);
}

function draw() {
    noStroke();
    background(28, 77, 93)
    ellipse(target.x, target.y, 16, 16);
    population.run();
    lifeParagraph.html(count);
    count++;
    if (count == lifespan) {
        population = new Population();
        count = 0;
    }
}