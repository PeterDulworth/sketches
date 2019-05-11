let fr = 30;
let w = 1600;
let h = 2200;
let scale = 20;
let cols, rows;
let terrain = [];
let distFlown = 0;

function setup() {
    // create the canvas
    let myCanvas = createCanvas(600, 600, WEBGL);
    myCanvas.parent('p5canvas');
    frameRate(fr);

    // number of rows and columns
    cols = w / scale;
    rows = h / scale;
}

function draw() {
    terrain = []
    let cOff = 0;
    for (let i = 0; i < cols; i++) {
        let rOff = distFlown;
        terrain.push([]);
        for (let j = 0; j < rows; j++) {
            terrain[i].push(map(noise(cOff, rOff), 0, 1, -100, 100))
            rOff += 0.1;
        }
        cOff += 0.1;
    }
    distFlown -= 0.05; // flying speed

    background(0)
    stroke(255);
    noFill();
    
    rotateX(PI / 4)
    translate(- w / 2, - h / 2)

    for (let y = 0; y < (rows - 1); y++) {
        // each row is a shape
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < cols; x++) {
            stroke(map(terrain[x][y], -100, 100, 0, 255))
            vertex(x * scale, y * scale, terrain[x][y])
            vertex(x * scale, (y + 1) * scale, terrain[x][y + 1]) 
        }
        endShape();
    }
}