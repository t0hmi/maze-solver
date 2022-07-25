export class Node {

    private value : string
    private adjacent : Node[]

    constructor(value : string) {
        this.value = value;
        this.adjacent = [];
    }

    addAdjacent(node : Node) {
        this.adjacent = [...this.adjacent, node]
    }

    removeAdjacent(nodeValue : string) : Node | null {
        const index = this.adjacent.findIndex( (node) => node.value === nodeValue);
        if(index === -1) return;

        return this.adjacent.splice(index, 1)[0]
    }

    getValue() : string {
        return this.value;
    }

    getAdjacent() : Node[] {
        return this.adjacent;
    }

}