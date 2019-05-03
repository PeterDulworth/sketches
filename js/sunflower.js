let fr = 30; // default 30
let n = 0;
let c = 4;
let p = 137.50776405003785;
let a, r;

function setup() {
    // create the canvas
    let myCanvas = createCanvas(windowWidth, 600);
    myCanvas.parent('p5canvas');
    frameRate(fr);
    background(28, 77, 93)
    angleMode(DEGREES)
    colorMode(HSB)
}

function draw() {
    // move origin to center
    translate(width / 2, height / 2)
    scale(2)
    
    // n -> a, r
    // given n, find the angle and radius of the next point
    let a = p * n;
    let r = c * sqrt(n);

    // convert the polar coords to cartesian
    let x = r * cos(a);
    let y = r * sin(a);

    // draw the next point
    // fill(a%256, r%256, r%256);
    fill(a % 360, 255, 255);
    noStroke();
    ellipse(x, y, 4, 4);
    
    // increment 
    n++;

    // change angle at rate of 0.5 / 15 frames
    // if (n % 15 == 0) p += 0.5
}