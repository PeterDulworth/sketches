let fr = 30; // default 30
// let slider;
let zOff = 0;
let t = 0;
let numLoops = 0;
let history = [];
let fade = 0.3; // fade speed (0 - 1)

var scrollCount = 30.0;

window.addEventListener("wheel", (e) => {
    if(e.wheelDelta < 0 && scrollCount < 100) scrollCount += 1;
    else if(e.wheelDelta>0 && scrollCount > 0) scrollCount -= 1;
	document.querySelector('.number').innerHTML = scrollCount;
});

function setup() { 
    // create the canvas
    let myCanvas = createCanvas(windowWidth, 600);
    myCanvas.parent('p5canvas');
    // set the frame rate
    frameRate(fr);
    // create a slider
    // slider = createSlider(0, 100, 5, 0.1); // min, max, val, step
    // slider.parent('slider')
    // background(0);
    background(28, 77, 93)
} 
  
function draw() { 
    // fade background by setting a small opacity each time
    background(28, 77, 93, map(fade, 0, 1, 0, 255));
    translate(width / 2, height / 2)
    stroke(255)
    stroke(map(noise(t), 0, 1, 0, 20), map(noise(t), 0, 1, 200, 255), 255)
    // stroke(64, 224, 208)
    // stroke(255)
    noFill();
    noiseSeed(99); // start with the same shape everytime
    
    // beginShape();
    // let noiseMax = slider.value();
    let noiseMax = map(scrollCount, 0, 100, 2, 20);
    // dictates the number of vertices 
    // note: this also dictates how fast we move through the 2D perlin surface 
    // the larger the step size through the surface, the less smooth the noise
    // note 2: the angle gets reset for each draw() so in the first note i am 
    // refering to the smoothness between vertices on a single draw()
    let angleStepSize = 0.01; 
    beginShape();
    for (let a = 0; a < TWO_PI; a += angleStepSize) {
        let xOff = map(cos(a), -1, 1, 0, noiseMax);
        let yOff = map(sin(a), -1, 1, 0, noiseMax);
        // pick radius for each point in interval (50, 100)
        // using perlin noise
        // perlin noise takes in a time step and returns a value between 0 and 1
        // so we map it to the range 100 to 200
        // it uses the time step t to keep the noise "smooth"
        let r = map(noise(xOff, yOff, zOff), 0, 1, 200, 300);
        // x, y coords of point rel to center
        let x = r * cos(a);
        let y = r * sin(a);
        
        // history.push(createVector(x, y));
        curveVertex(x, y);
        // if (history.length > 3 * (TWO_PI / angleStepSize)) history.splice(0, 1)
    }
    endShape(CLOSE);
    
    // beginShape();
    // for (let i = 0; i < history.length; i++) {
    //     curveVertex(history[i].x, history[i].y)
    // }
    // endShape(CLOSE);

    t += 0.01; // color time step
    zOff += 0.1; // speed moving through the animation
    numLoops += 1;

    // if (numLoops > 10) noLoop();
}
