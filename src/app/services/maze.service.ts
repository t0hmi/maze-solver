import { Injectable } from '@angular/core';
import { Graph } from '../common/graph/graph';
import { MazeGenerationAlgorithm, SolvingAlgorithm } from '../store/form';

@Injectable({
  providedIn: 'root',
})
export class MazeService {

  graph : Graph;

  initializeMaze(x : number, y : number) : boolean{

    this.graph = new Graph();

    let n = 0;

    for(let i = 0; i < x; i++) {
      for(let j = 0; j < y - 1; j++) {
        
        const actualNode = this.graph.addNode(`${i}${j}`);

        if(i !== x) {
          actualNode.addAdjacent(this.graph.addNode(`${i + 1}${j}`))
        }

        if(i !== 0) {
          actualNode.addAdjacent(this.graph.addNode(`${i - 1}${j}`)) 
        }

        if(j !== y) {
          actualNode.addAdjacent(this.graph.addNode(`${i}${j + 1}`));
        }

        if(j !== 0) {
          actualNode.addAdjacent(this.graph.addNode(`${i}${j - 1}`));
        }
        
        n++
      }

    }
    this.graph.print()
    console.log({n})
    return true;
  }
 
  clearMaze() {}

  generateMaze(mazeGenerationAlgorithm : MazeGenerationAlgorithm) {}

  solveMaze(mazeSolvingAlgorithm : SolvingAlgorithm) {}

  constructor() {
  }
}
