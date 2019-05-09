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
                this.genes[i].setMag(0.1);
            }
        }
    }

    crossOver(partnerGenes) {
        let newGenes = [];
        let midPoint = floor(random(genes.length)); // pick random midpoint
        for (let i = 0; i < this.genes.length; i++) {
            if (i > midPoint) {
                newGenes[i] = this.genes[i];
            } else {
                newGenes[i] = this.partnerGenes[i];
            }
        }

        return new DNA(newGenes);
    }
}