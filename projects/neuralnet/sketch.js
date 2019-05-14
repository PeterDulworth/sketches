let fr = 30; // default 30
let fadeSpeed = 0.5; // fade speed (0 - 1)

function setup() { 
    // create the canvas
    let myCanvas = createCanvas(windowWidth, 600);
    myCanvas.parent('p5canvas');
    frameRate(fr);
    background(28, 77, 93)
} 

function draw() { 
    // fade background by setting a small opacity each time
    background(28, 77, 93, map(fadeSpeed, 0, 1, 0, 255));
    noStroke();
    ellipse(random(width), random(height), random(100), random(100))
}