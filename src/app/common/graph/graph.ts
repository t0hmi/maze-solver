import { Node } from "./node";

export class Graph {
    nodes : Map<string, Node>;

    constructor() {
        this.nodes = new Map();
    }

    addNode(nodeValue : string) : Node {
        let node = this.nodes.get(nodeValue);

        if(node) return node;

        node = new Node(nodeValue);
        this.nodes.set(nodeValue, node)
        return node;
    }

    removeNode(nodeValue : string) : Node | null {
        const node = this.nodes.get(nodeValue);

        if(!node) return null;
        
        this.nodes.forEach( (n) => {
            n.removeAdjacent(node.getValue());
        });
    }

    addEdge(firstNode : string, secondNode : string) : void {
        const first = this.addNode(firstNode);
        const second = this.addNode(secondNode);

        first.addAdjacent(second);
        second.addAdjacent(first);
    }

    removeEdge(firstNode : string, secondNode : string) : void {
        const first = this.nodes.get(firstNode);
        const second = this.nodes.get(secondNode);

        if(first && second) {
            first.removeAdjacent(second.getValue())
            second.removeAdjacent(first.getValue())
        }
    }

    
    print() : void {
        console.log(this.nodes)
    }
}