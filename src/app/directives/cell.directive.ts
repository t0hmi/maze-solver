import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CellProcessorService } from '../services/cell-processor.service';
import { MazeService } from '../services/maze.service';
import { MazeAction } from '../store/maze/maze.action';
import { MazeSelector } from '../store/maze/maze.selector';

@Directive({
  selector: '[appCell]'
})
export class CellDirective implements OnInit, AfterViewInit {

  @Input() x;
  @Input() y;

  isWall = false;
  isProcessing = false;

  mazeIsProcessing$ = this.store.select(MazeSelector.selectMazeIsProcessing);
  mazeIsWallsSet$ = this.store.select(MazeSelector.selectMazeIsWallsSet);
  markersCoords$ = this.store.select(MazeSelector.selectMarkersCoords);

  constructor(
    private el : ElementRef,
    private mazeService : MazeService,
    private cellProcessorService : CellProcessorService,
    private store : Store
  ) {
 
  }
  ngOnInit(): void {
    this.mazeIsProcessing$.subscribe(isProcessing => {
      this.isProcessing = isProcessing;
      if(!isProcessing) {
        this.el.nativeElement.classList.remove('processed');
      }
    })

    this.mazeIsWallsSet$.subscribe(isWallsSet => {
      if(!isWallsSet) {
        this.el.nativeElement.classList.remove('wall');
      }
    })

    this.markersCoords$.subscribe(([startCoords, finishCoords]) => {
      console.log({startCoords,finishCoords})
      if(this.el.nativeElement.classList.contains('start')){
        this.el.nativeElement.classList.remove('start')
      }else if(this.el.nativeElement.classList.contains('finish')) {
        this.el.nativeElement.classList.remove('finish')
      }
      if(this.mazeService.getCell(this.x,this.y).getValue() === startCoords) {
        this.el.nativeElement.classList.add('start')
      }else if(this.mazeService.getCell(this.x,this.y).getValue() === finishCoords) {
        this.el.nativeElement.classList.add('finish')
      }
    })
  }

  

  @HostListener('window:resize', ['$event'])
  ngAfterViewInit(): void {
    // if(this.el.nativeElement.classList.contains('start')){
    //   this.el.nativeElement.classList.remove('start')
    // }else if(this.el.nativeElement.classList.contains('finish')) {
    //   this.el.nativeElement.classList.remove('finish')
    // }
    // if(this.mazeService.getCell(this.x,this.y).getValue() === this.mazeService.startCoords) {
    //   this.el.nativeElement.classList.add('start')
    // }else if(this.mazeService.getCell(this.x,this.y).getValue() === this.mazeService.finishCoords) {
    //   this.el.nativeElement.classList.add('finish')
    // }

    this.cellProcessorService.processedCell$.subscribe(key => {
      if(key === `${this.x}-${this.y}`) {
        this.el.nativeElement.classList.add('processed');
      }
    })

    this.cellProcessorService.wallCell$.subscribe(key => {
      if(key === `${this.x}-${this.y}`) {
        this.el.nativeElement.classList.add('wall');
      }
    })

    this.cellProcessorService.blankCell$.subscribe(key => {
      if(key === `${this.x}-${this.y}`) {
        this.el.nativeElement.classList.remove('wall');
      }
    })
  }

  @HostListener('click')
  toggleWall() : void {
    
    this.store.dispatch(MazeAction.setMazeIsWallsSet({isWallsSet: true}))

    if(this.isProcessing) {
      this.store.dispatch(MazeAction.setMazeIsProcessing({isProcessing : false}))
    }

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
