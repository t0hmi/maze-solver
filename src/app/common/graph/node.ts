export class Node {

    private value : string;
    private adjacent : Node[];
    private nearNodes : Node[];
    private isBorder : boolean = false;

    constructor(value : string) {
        this.value = value;
        this.adjacent = [];
        this.nearNodes = [];
    }

    addAdjacent(node : Node) {
        this.nearNodes = [...this.nearNodes, node]
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

    getNearWall() : Node[] {
        return this.nearNodes;
    }

    getX() : number {
        return parseInt(this.value.split('-')[0])
    }

    getY() : number {
        return parseInt(this.value.split('-')[1])
    }

    removeNearNode(key : string) {
        this.nearNodes = this.nearNodes.filter(node => node.getValue() !== key);
    }

    getIsBorder() : boolean {
        return this.isBorder;
    }

    setIsBorder(isBorder : boolean) : void {
        this.isBorder = isBorder;
    }
}