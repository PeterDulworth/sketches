class DNA {
    constructor(genes) {
        // each rocket will life for "lifespan" frames so it needs to have an array
        // of "lifespan" vectors for the forces to apply in those 200 frames
        if (genes) {
            this.genes = genes;
        } else {
            this.genes = [];
            for (let i = 0; i < lifespan; i++) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxForce);
            }
        }
    }

    // create a new DNA by combining this DNA with the input partner DNA
    crossOver(partnerGenes) {
        let newGenes = [];
        let midPoint = floor(random(this.genes.length)); // pick random midpoint
        for (let i = 0; i < this.genes.length; i++) {
            if (i > midPoint) {
                newGenes[i] = this.genes[i];
            } else {
                newGenes[i] = partnerGenes.genes[i];
            }
        }

        return new DNA(newGenes);
    }

    // randomly mutate any given entry in the gene with a certain probability (the mutation rate)
    mutation() {
        for (let i = 0; i < this.genes.length; i++) {
            if(random(1) < mutationRate) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(maxForce);
            }
        }
    }
}