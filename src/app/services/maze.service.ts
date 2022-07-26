import { Injectable } from '@angular/core';
import { Graph } from '../common/graph/graph';
import { Node } from '../common/graph/node';
import { MazeGenerationAlgorithm, SolvingAlgorithm } from '../store/form';

@Injectable({
  providedIn: 'root',
})
export class MazeService {

  graph : Graph;

  initializeMaze(x : number, y : number) : boolean{

    this.graph = new Graph();

    for(let i = 0; i < x; i++) {
      for(let j = 0; j < y; j++) {
        
        const actualNode = this.graph.addNode(`${i}-${j}`);

        // if(i !== x) {
        //   actualNode.addAdjacent(this.graph.addNode(`${i + 1}${j}`))
        // }

        // if(i !== 0) {
        //   actualNode.addAdjacent(this.graph.addNode(`${i - 1}${j}`)) 
        // }

        // if(j !== y) {
        //   actualNode.addAdjacent(this.graph.addNode(`${i}${j + 1}`));
        // }

        // if(j !== 0) {
        //   actualNode.addAdjacent(this.graph.addNode(`${i}${j - 1}`));
        // }

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

  getCell(x: number,y: number) : Node {
    return this.graph.nodes.get(`${x}-${y}`);
  }

  isWall(x: number,y: number) : boolean {
    return this.getCell(x,y).getAdjacent().length === 0;
  }
  
  constructor() {
  }
}
