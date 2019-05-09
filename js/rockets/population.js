// population contains an array of rockets, and a mating pool
class Population {
    constructor() {
        this.rockets = [];
        this.popSize = 25;
        this.matingPool = [];
        // the current generation 0, 1, 2, ...
        this.generation = 0;

        for(let i = 0; i < this.popSize; i++) {
            this.rockets[i] = new Rocket();
        }
    }

    // construct the mating pool based on the fitness of each rocket
    eval() {
        // find the max fitness of all the rockets
        let maxFit = 0;
        for(let i = 0; i < this.popSize; i++) { 
            this.rockets[i].calcFitness();
            if (this.rockets[i].fitness > maxFit) {
                maxFit = this.rockets[i].fitness;
            }
        }
        console.log("max fit:", maxFit)

        // normalize between 0 and 1
        for(let i = 0; i < this.popSize; i++) { 
            this.rockets[i].fitness /= maxFit; 
        }

        // create the mating pool
        // a rocket with fitness value 1.0 should be in the fitness pool 100 times
        // a rocket with fitness value 0.3 should be in the fitness pool 030 times
        this.matingPool = [];
        for(let i = 0; i < this.popSize; i++) { 
            let n = this.rockets[i].fitness * 100;
            for (var j = 0; j < n; j++) {
                this.matingPool.push(this.rockets[i]);
            }
        }
    }

    // generate the new population
    selection() {
        // construct the mating pool based on the fitness of each rocket
        this.eval();

        // create new generation
        let newRockets = [];
        for (let i = 0; i < this.rockets.length; i++) {
            // get the DNA of two random rockets from the mating pool (rockets with higher fitness will be more likely)
            let parentADNA = random(this.matingPool).dna;
            let parentBDNA = random(this.matingPool).dna;

            // create a child from the DNA of the two random parents
            let childDNA = parentADNA.crossOver(parentBDNA);    

            childDNA.mutation();
            
            // create a new rocket with the new DNA
            newRockets[i] = new Rocket(childDNA);
        }

        this.rockets = newRockets;
        this.generation += 1;
    }

    run() {
        for(let i = 0; i < this.popSize; i++) {
            this.rockets[i].update();
            this.rockets[i].show();
        }
    }
}