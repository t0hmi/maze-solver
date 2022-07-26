import { Injectable } from '@angular/core';
import { Graph } from '../common/graph/graph';
import { Node } from '../common/graph/node';
import { MazeGenerationAlgorithm, SolvingAlgorithm } from '../store/form';

@Injectable({
  providedIn: 'root',
})
export class MazeService {

  graph : Graph;

  xSize
  ySize

  initializeMaze(x : number, y : number) : boolean{

    this.graph = new Graph();

    this.xSize = x;
    this.ySize = y;

    for(let i = 0; i < x; i++) {
      for(let j = 0; j < y; j++) {
        
        const actualNode = this.graph.addNode(`${i}-${j}`);

        let adjacent : string[] = [];

        if(i > 0)
        adjacent.push(`${i - 1}-${j}`);
        
        if(i < x - 1)
        adjacent.push(`${i + 1}-${j}`);
        
        if(j > 0)
        adjacent.push(`${i}-${j - 1}`);
        
        if(j < y - 1)
        adjacent.push(`${i}-${j + 1}`);

        if(adjacent.length > 0) {
          adjacent.forEach(a => {
            actualNode.addAdjacent(this.graph.addNode(a))
          })
        }

      }

    }

    return true;
  }
 
  clearMaze() {}

  generateMaze(mazeGenerationAlgorithm : MazeGenerationAlgorithm) {}

  solveMaze(mazeSolvingAlgorithm : SolvingAlgorithm) {}

  addWall(x: number, y:number) : Node {
    return this.graph.removeNode(`${x}-${y}`);
  }

  removeWall(x: number, y: number) : Node {
    const node = this.graph.getNode(x,y);
    let adjacent = []
    if(x > 0)
    adjacent.push(`${x - 1}-${y}`);
    
    if(x < this.xSize - 1)
    adjacent.push(`${x + 1}-${y}`);
    
    if(y > 0)
    adjacent.push(`${x}-${y - 1}`);
    
    if(y < this.ySize - 1)
    adjacent.push(`${x}-${y + 1}`);

    if(adjacent.length > 0) {
      adjacent.forEach(a => {
        node.addAdjacent(this.graph.addNode(a))
      })
    }

    node.getAdjacent().forEach(adjacentNode => {
      this.graph.addEdgeFromTo(adjacentNode.getValue(), node.getValue())
    })

    console.log(node, node.getAdjacent())

    return node;
  }

  getCell(x: number,y: number) : Node {
    return this.graph.nodes.get(`${x}-${y}`);
  }

  isWall(x: number,y: number) : boolean {
    return this.getCell(x,y).getAdjacent().length === 0;
  }
  
  constructor() {
  }
}
