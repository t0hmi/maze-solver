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
        
        node.getAdjacent().forEach(adjacentNode => {
            this.removeEdge(node.getValue(), adjacentNode.getValue())
        })

        return node;
    }

    addEdge(firstNode : string, secondNode : string) : void {
        const first = this.addNode(firstNode);
        const second = this.addNode(secondNode);

        first.addAdjacent(second);
        second.addAdjacent(first);
    }

    addEdgeFromTo(from : string, to : string) : void {
        const fromNode = this.addNode(from);
        const toNode = this.addNode(to);

        fromNode.addAdjacent(toNode);
    }

    removeEdge(firstNode : string, secondNode : string) : void {
        const first = this.nodes.get(firstNode);
        const second = this.nodes.get(secondNode);

        if(first && second) {
            second.removeAdjacent(first.getValue())
            first.removeAdjacent(second.getValue())
        }
    }

    getNode(x: number, y: number) : Node | null {
        return this.nodes.get(`${x}-${y}`)
    }

    
    print() : void {
        console.log(this.nodes)
    }
}