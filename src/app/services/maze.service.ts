import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Queue } from '../common/data-structures/queue';
import { Stack } from '../common/data-structures/stack';
import { Graph } from '../common/graph/graph';
import { Node } from '../common/graph/node';
import { Settings } from '../common/settings';
import { MazeGenerationAlgorithm, SolvingAlgorithm } from '../store/form';
import { MazeAction } from '../store/maze/maze.action';
import { MazeSelector } from '../store/maze/maze.selector';
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
  finishY: number;

  isProcessing;

  constructor(private cellProcessor : CellProcessorService, 
    private store : Store) {
      this.store.select(MazeSelector.selectMazeIsProcessing).subscribe(isProcessing => {
        this.isProcessing = isProcessing;
      })
    }


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

    this.store.dispatch(MazeAction.setMazeMarkers({finishCoords : this.finishCoords, startCoords : this.startCoords}))


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
  

  async dfs() {
    let visited : Map<string, Node> = new Map();
    
    let stack = new Stack<Node>()

    stack.push(this.graph.getNode(this.startX, this.startY));

    let currentNode : Node;
    let isFinishFind = false;

    while(!stack.isEmpty() || !isFinishFind) {

      if(!this.isProcessing) return;

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

  async bfs() {
     let visited = new Map<string,Node>()
     let queue = new Queue<Node>();

     queue.push(this.graph.getNode(this.startX, this.startY))
     
     let currentNode : Node;
     let isFinishFind = false;

     while(!queue.isEmpty() || isFinishFind) {
      
       
      currentNode = queue.pop();
      
      if(!visited.get(currentNode.getValue())) {
        visited.set(currentNode.getValue(), currentNode);
        
        if(currentNode.getValue() === this.finishCoords) {
          isFinishFind = true;
          break;
        }
        
        await this.sleep(10);
        
        
        if(!this.isProcessing) return;
        this.cellProcessor.addNewProcessedCell(currentNode.getValue())
        
        currentNode.getAdjacent().forEach(node => {
          if(!visited.get(node.getValue())) {
            queue.push(node);
          }
        })
      }

     }
  }


  private sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay))
  }

  addBorders() {
    this.store.dispatch(MazeAction.setMazeIsWallsSet({isWallsSet : true}))
    for(let i = 0; i < this.xSize; i++) {
      this.addWall(i,0);
      this.cellProcessor.addWallCell(`${i}-0`)
      this.graph.getNode(i,0).setIsBorder(true);
      this.addWall(i, this.ySize - 1)
      this.cellProcessor.addWallCell(`${i}-${this.ySize - 1}`)
      this.graph.getNode(i, this.ySize - 1).setIsBorder(true);
    }

    for(let j = 0; j < this.ySize; j++) {
      this.addWall(0, j);
      this.cellProcessor.addWallCell(`0-${j}`);
      this.graph.getNode(0, j).setIsBorder(true);
      this.addWall(this.xSize - 1, j);
      this.cellProcessor.addWallCell(`${this.xSize - 1}-${j}`)
      this.graph.getNode(this.xSize - 1, j).setIsBorder(true);
    }
  }

  initMazeGeneration() {
    this.startX = 1;
    this.startY = 1;
    this.finishX = this.xSize - 2;
    this.finishY = this.ySize - 2;

    this.startCoords = `${this.startX}-${this.startY}`
    this.finishCoords = `${this.finishX}-${this.finishY}`

    this.store.dispatch(MazeAction.setMazeMarkers({finishCoords : this.finishCoords, startCoords : this.startCoords}))


    this.addBorders();
  }

  randomizedPrims() {
    this.initializeFullWall(); 

    let stack = new Stack<Node>();
    let visited = new Map<string, Node>();

    let currentNode = this.graph.getNode(this.startX, this.startY);
    stack.push(currentNode);
    visited.set(this.startCoords, currentNode);

    while(!stack.isEmpty()) {
      currentNode = stack.pop();

      // todo have a function to get adjacentWall
      const adjacentUnvisited = currentNode.getNearWall().filter(node => (!visited.get(node.getValue()) && !node.getIsBorder()));
      const selectedNode = adjacentUnvisited[Math.round(Math.random() * adjacentUnvisited.length - 1)]
      console.log(adjacentUnvisited)
      this.removeWall(selectedNode.getX(), selectedNode.getY());
      this.cellProcessor.addBlankCell(selectedNode.getValue());
      visited.set(selectedNode.getValue(), selectedNode);
      stack.push(selectedNode);
    }
  }

  initializeFullWall() {
    for(let i = 0; i < this.xSize; i++){
      for(let j = 0; j < this.ySize; j++) {
        if(!(`${i}-${j}` === this.finishCoords ||`${i}-${j}`===this.startCoords)) {
          this.addWall(i, j);
          this.cellProcessor.addWallCell(`${i}-${j}`);
        }
      }
    }
  }
}
