import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MazeService } from '../services/maze.service';

@Directive({
  selector: '[appCell]'
})
export class CellDirective {

  @Input() x;
  @Input() y;

  isWall = false;

  constructor(
    private el : ElementRef,
    private mazeService : MazeService
  ) { }

  @HostListener('click')
  toggleWall() : void {
    if(this.mazeService.isWall(this.x,this.y)) {
      this.mazeService.removeWall(this.x,this.y)
      this.el.nativeElement.classList.remove('wall') 
    }else {
      this.mazeService.addWall(this.x , this.y);
      this.el.nativeElement.classList.add('wall') 
    }
    console.log(this.mazeService.isWall(this.x,this.y), this.el)
  }

}
