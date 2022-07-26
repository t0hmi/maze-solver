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

    removeAdjacent(nodeValue : string) : void {
        this.adjacent = this.adjacent.filter((node) => node.getValue() !== nodeValue);
    }

    getValue() : string {
        return this.value;
    }

    getAdjacent() : Node[] {
        return this.adjacent;
    }

}