import { Injectable } from '@angular/core';
import { Stack } from '../common/data-structures/stack';
import { Graph } from '../common/graph/graph';
import { Node } from '../common/graph/node';
import { Settings } from '../common/settings';
import { MazeGenerationAlgorithm, SolvingAlgorithm } from '../store/form';
import { CellProcessorService } from './cell-processor.service';

@Injectable({
  providedIn: 'root',
})
export class MazeService {

  graph : Graph;

  xSize : number;
  ySize : number;

  startCoords : string;
  finishCoords : string;  

  startX: number;
  startY: number;

  finishX: number;
  finishY: number

  initializeMaze(x : number, y : number) : boolean{

    this.graph = new Graph();

    this.xSize = x;
    this.ySize = y;

    this.startX = Math.round((x/2)/2);
    this.startY = Math.round(y/2);

    this.finishX = Math.round((x/2) + (x/2)/2);
    this.finishY = Math.round(y/2);

    this.startCoords = `${this.startX}-${this.startY}`
    this.finishCoords = `${this.finishX}-${this.finishY}`



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
  
  constructor(private cellProcessor : CellProcessorService) {
  }

  async dfs() {
    let visited : Map<string, Node> = new Map();
    
    let stack = new Stack<Node>()

    stack.push(this.graph.getNode(this.startX, this.startY));

    let currentNode : Node;
    let isFinishFind = false;

    while(!stack.isEmpty() || !isFinishFind) {
      currentNode = stack.pop();
      if(!visited.get(currentNode.getValue())) {

        visited.set(currentNode.getValue(), currentNode);
        
        if(currentNode.getValue() === this.finishCoords) {
          isFinishFind = true;
          break;
        } 
        
        await this.sleep(100)
        
        this.cellProcessor.addNewProcessedCell(currentNode.getValue())
        currentNode.getAdjacent().forEach(node => {
          stack.push(node);
        })

      }
    }
  }


  private sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay))
  }
}
