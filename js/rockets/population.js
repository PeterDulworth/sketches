class Population {
    constructor() {
        this.rockets = [];
        this.size = 25;
        this.matingPool = [];

        for(let i = 0; i < this.size; i++) {
            this.rockets[i] = new Rocket();
        }
    }

    eval() {
        let maxFit = 0;
        for(let i = 0; i < this.size; i++) { 
            this.rockets[i].calcFitness();
            if (this.rockets[i].fitness > maxFit) {
                maxFit = this.rockets[i].fitness;
            }
        }

        for(let i = 0; i < this.size; i++) { 
            this.rockets[i].fitness /= maxFit; 
        }

        // a rocket with fitness value 1.0 should be in the fitness pool 100 times
        // a rocket with fitness value 0.3 should be in the fitness pool 030 times
        for(let i = 0; i < this.size; i++) { 
            let n = this.rockets[i].fitness * 100;
            for (var j = 0; j < n; j++) {
                this.matingPool.add(this.rockets[i]);
            }
        }

        this.matingPool = [];

    }

    selection() {
        let newRockets = [];
        // for (let i = 0; i < this.rockets.length) {
            
        // }
        let parentA = random(this.matingPool).dna;
        let parentB = random(this.matingPool).dna;
        let child = parentA.crossOver(parentB);
    }

    run() {
        for(let i = 0; i < this.size; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
}