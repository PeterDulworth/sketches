// population contains an array of rockets, and a mating pool
class Population {
    constructor(size) {
        this.rockets = [];
        this.popSize = size;
        this.generation = 0;
        this.frame = 0;

        for(let i = 0; i < this.popSize; i++) {
            this.rockets[i] = new Rocket();
        }
    }

    // construct the mating pool based on the fitness of each rocket
    computeProbs() {
        // calculate fitness and find the max and total of all rockets
        let maxFit = 0;
        let totalFit = 0;
        for(let i = 0; i < this.popSize; i++) { 
            this.rockets[i].calcFitness();
            totalFit += this.rockets[i].fitness;
            if (this.rockets[i].fitness > maxFit) {
                maxFit = this.rockets[i].fitness;
            }
        }
        console.log("generation: ", this.generation)
        console.log("max fit:", maxFit)
        console.log("total fit:", totalFit)
        console.log("max %:", maxFit / totalFit)
        console.log("--------------------\n")

        // two methods for normalization:

        // (1) normalize between 0 and 1
        // for(let i = 0; i < this.popSize; i++) { 
        //     this.rockets[i].fitness /= maxFit; 
        // }

        // (2) normalize as a percentage
        let s = 0;
        for(let i = 0; i < this.popSize; i++) { 
            this.rockets[i].prob = this.rockets[i].fitness / totalFit; 
            s += this.rockets[i].prob;
            console.log(this.rockets[i].prob)
        }
        console.log("total ", s)
    }

    // https://www.youtube.com/watch?v=ETphJASzYes&list=PLRqwX-V7Uu6bJM3VgzjNV5YxVxUwzALHV&index=8
    pickRocket() {
        let i = 0;
        let r = random(1);
        while(r > 0) {
            r = r - this.rockets[i].prob;
            i++;
        }
        i--;
        return this.rockets[i];
    }

    // generate the new population
    createNewGeneration() {
        // create new generation
        let newRockets = [];
        for (let i = 0; i < this.rockets.length; i++) {
            // get the DNA of two random rockets from the mating pool (rockets with higher fitness will be more likely)
            let parentADNA = this.pickRocket().dna;
            let parentBDNA = this.pickRocket().dna;

            // create a child from the DNA of the two random parents
            let childDNA = parentADNA.crossOver(parentBDNA);    

            childDNA.mutation();

            // create a new rocket with the new DNA
            newRockets[i] = new Rocket(childDNA);
        }

        this.rockets = newRockets;

        // increment the generation
        this.generation += 1;
        // reset the frame counter
        this.frame = 0;
    }

    // evaluate the fitness of each element of the population and build a mating pool.
    selection() {
        // construct the mating pool based on the fitness of each rocket
        this.computeProbs();

        this.createNewGeneration();
    }

    run() {
        // update all the rockets
        for(let i = 0; i < this.popSize; i++) {
            this.rockets[i].update(this.frame);
            this.rockets[i].show();
        }
        
        this.frame += 1;

        generationDisplay.html("generation: " + this.generation);
        frameCountDisplay.html("frame: " + this.frame);

        if (this.frame == lifespan) {
            this.selection();
        }

    }
}