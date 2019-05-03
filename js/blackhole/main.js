let fr = 30; // frame rate
const c = 30; // speed of light (made up)
const G = 3.54; // gravitational constant (made up)
const dt = 0.1; // 
const particles = [];
let m87, start, end;

function setup() {
    // create the canvas
    let myCanvas = createCanvas(windowWidth / 1.1, 600);
    myCanvas.parent('p5canvas');
    frameRate(fr);
    ellipseMode(RADIUS);

    // create the blackhole centered with mass 10000
    m87 = new Blackhole(width / 2, height / 2, 10000);

    initialPhotons()

    button = createButton('photons');
    button.mousePressed(initialPhotons);
    button.parent('btn')

    button2 = createButton('more photons');
    button2.mousePressed(initialWobblyPhotons);
    button2.parent('btn2')
}


// create a photon wherever you click the mouse
function mousePressed() {
    // create a photon going left or right depending on where you click
    let dir = 1.0;
    if (mouseX > width / 2) dir = -1.0;
    particles.push(new Photon(mouseX, mouseY, c * dir, 0));

    // alternate version: creates a photon going towards the center
    // let towardsCenter = createVector((width / 2) - mouseX, (height / 2) - mouseY)
    // towardsCenter.setMag(c)
    // particles.push(new Photon(mouseX, mouseY, towardsCenter.x, towardsCenter.y));
}

function draw() {
    // first overlay the entire background with transparency to create blur effect
    background(7, 7, 7, 20)
    
    // then draw the particles
    for (let p of particles) {
        // change the photons velocity to pull it towards the black hole
        m87.pull(p);
        // use the photons velocity to update it's position
        p.update();
        // paint the photon
        p.show();
    }

    // last: draw the blackhole so nothing will be above it
    m87.show();

    // draw lines through center and 2.6rs above center
    // stroke(255)
    // strokeWeight(1)
    // line(0, height / 2, width, height / 2) // x1, y1, x2, y2
    // line(0, height / 2 - m87.rs * 2.6, width, height / 2 - m87.rs * 2.6)
}

/*****************
 * helper methods
 *****************/

 // create 12 photons
function initialPhotons() {
    createPhotons(167.42756477591035, -151.5);
    createPhotons(177.42883801247774, 154.5);
    createPhotons(234.4360954609116, 162.5);
}

// does the same as above with some randomness
function initialWobblyPhotons() {
    createWobblyPhotons(167.42756477591035, -151.5);
    createWobblyPhotons(177.42883801247774, 154.5);
    createWobblyPhotons(234.4360954609116, 162.5);
}

// create four photons all equidistant from the blackhole in the four quadrants
// where xOff and yOff are the offsets from the center of the blackhole
function createPhotons(xOff, yOff) {
    xCenter = width / 2;
    yCenter = height / 2;
    particles.push(new Photon(xCenter - xOff, yCenter - yOff, c, 0))
    particles.push(new Photon(xCenter - xOff, yCenter + yOff, c, 0))
    particles.push(new Photon(xCenter + xOff, yCenter + yOff, -c, 0))
    particles.push(new Photon(xCenter + xOff, yCenter - yOff, -c, 0))
}

// does same as above with some randomness
function createWobblyPhotons(xOff, yOff) {
    particles.push(new Photon(width / 2 - xOff + random(-100, 100), height / 2 - yOff + random(-50, 50), c, 0))
    particles.push(new Photon(width / 2 - xOff + random(-100, 100), height / 2 + yOff + random(-50, 50), c, 0))
    particles.push(new Photon(width / 2 + xOff + random(-100, 100), height / 2 + yOff + random(-50, 50), -c, 0))
    particles.push(new Photon(width / 2 + xOff + random(-100, 100), height / 2 - yOff + random(-50, 50), -c, 0))
}


