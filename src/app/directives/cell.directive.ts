import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';
import { CellProcessorService } from '../services/cell-processor.service';
import { MazeService } from '../services/maze.service';

@Directive({
  selector: '[appCell]'
})
export class CellDirective implements AfterViewInit {

  @Input() x;
  @Input() y;

  isWall = false;

  constructor(
    private el : ElementRef,
    private mazeService : MazeService,
    private cellProcessorService : CellProcessorService
  ) {
 
  }

  @HostListener('window:resize', ['$event'])
  ngAfterViewInit(): void {
    if(this.el.nativeElement.classList.contains('start')){
      this.el.nativeElement.classList.remove('start')
    }else if(this.el.nativeElement.classList.contains('finish')) {
      this.el.nativeElement.classList.remove('finish')
    }
    if(this.mazeService.getCell(this.x,this.y).getValue() === this.mazeService.startCoords) {
      this.el.nativeElement.classList.add('start')
    }else if(this.mazeService.getCell(this.x,this.y).getValue() === this.mazeService.finishCoords) {
      this.el.nativeElement.classList.add('finish')
    }

    this.cellProcessorService.processedCell$.subscribe(key => {
      if(key === `${this.x}-${this.y}`) {
        this.el.nativeElement.classList.add('processed')
      }
    })
  }

  @HostListener('click')
  toggleWall() : void {
    if(this.mazeService.finishCoords === `${this.x}-${this.y}` || this.mazeService.startCoords === `${this.x}-${this.y}`) return
    
    if(this.mazeService.isWall(this.x,this.y)) {
      this.mazeService.removeWall(this.x,this.y)
      this.el.nativeElement.classList.remove('wall') 
    }else {
      this.mazeService.addWall(this.x , this.y);
      this.el.nativeElement.classList.add('wall') 
    }
  }
}
