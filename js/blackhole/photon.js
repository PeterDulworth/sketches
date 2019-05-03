// photon class
class Photon {
    
    // constructor takes 
    //  x - x position
    //  y - y position
    //  vx - initial x velocity
    //  vy - initial y velocity
    constructor(x, y, vx, vy) {
        this.pos = createVector(x, y);
        this.vel = createVector(vx, vy);
        this.history = [];
        this.stopped = false;
        this.theta = 0;
        this.trailLen = 100;
    }

    stop() {
        this.stopped = true;
    }

    update() {
        // if we haven't stopped yet
        if (!this.stopped) {
            // push the current location onto history
            this.history.push(this.pos.copy());
            
            // scale the change in location
            const scaledV = this.vel.copy().mult(dt);
            // use the scaled velocity to calculate new position
            this.pos.add(scaledV); 
        } else {
            // if we have stopped, remove one thing from the history each time and don't add anything new
            this.history.splice(0, 1);
        }
    
        // limit the history to this.trailLen
        if (this.history.length > this.trailLen) this.history.splice(0, 1);
        
        // stop if we have left the screen
        if (this.pos.x < 0 || this.pos.x > width ||
            this.pos.y < 0 || this.pos.y > height) {
            this.stop(); 
        }
    }

    show() {
        colorMode(HSB)
        strokeWeight(1);
        noFill();
        beginShape(QUAD_STRIP);
        for (let i = 0; i < this.history.length; i++) {
            stroke(map(i, 0, this.history.length, 0, 50), 40, 255)
            let ph = this.history[i];
            vertex(ph.x, ph.y);
        }
        endShape();
        colorMode(RGB)
    }
}