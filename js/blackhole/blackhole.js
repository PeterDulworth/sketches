// black hole class
class Blackhole {
    // takes position and mass
    constructor(x, y, m) {
        this.pos = createVector(x, y);
        this.mass = m;
        this.rs = (2 * G * this.mass) / (c * c);
    }

    // changes the given photons velocity by pulling it towards the black hole
    pull(photon) {
        const force = p5.Vector.sub(this.pos, photon.pos);
        const r = force.mag();
        const fg = (G * this.mass / (r * r)) * 0.2;
        force.setMag(fg);
        photon.vel.add(force);
        photon.vel.setMag(c);
    
        if (r < this.rs) photon.stop();
    }    

    show() {
        // draw the shadow of the black whole (measured with the event horizon)
        fill(0);
        stroke(0);
        ellipseMode(RADIUS);
        ellipse(this.pos.x, this.pos.y, this.rs);
    
        // draw the photon ring - light will orbit here but not stable
        // noFill();
        // stroke(100, 100);
        // strokeWeight(64);
        // ellipse(this.pos.x, this.pos.y, this.rs * 3 + 32);
    
        // accretion disk
        // stroke(255, 150, 0, 100);
        // strokeWeight(32);
        // ellipse(this.pos.x, this.pos.y, this.rs * 1.5 + 16);
    }
}

// pull method using relativity
// pull(photon) {
//     const force = p5.Vector.sub(this.pos, photon.pos);
//     const theta = force.heading();
//     const r = force.mag();
//     const fg = G * this.mass / (r * r);
//     let deltaTheta = -fg * (dt / c) * sin(photon.theta - theta);
//     deltaTheta /= abs(1.0 - 2.0 * G * this.mass / (r * c * c));
//     photon.theta += deltaTheta;
//     photon.vel = p5.Vector.fromAngle(photon.theta);
//     photon.vel.setMag(c);
    
//     // if the photon is inside the event horizon - we don't need to keep updating it
//     if (r <= this.rs + 0.5) photon.stop();
// }